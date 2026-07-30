import { describe, test, expect, vi, afterEach } from 'vitest';
import { WalletDisconnectedError } from '@tronweb3/tronwallet-abstract-adapter';
import { MetaMaskAdapter } from '../../src/adapter.js';
import { Scope } from '../../src/types.js';

const MAINNET_CHAIN_ID = '0x2b6653dc';
const NILE_CHAIN_ID = '0xcd8690dc';
const ADDRESS = 'TWmXsCSKGT5jGgcsFvHfLBAAsHvBRfDrnB';

/**
 * Puts the adapter into a connected-on-mainnet state with a stubbed multichain
 * client, so `switchChain()` can be driven without a real MetaMask connection.
 */
function createConnectedAdapter(getSession: () => Promise<unknown>) {
    const adapter = new MetaMaskAdapter();
    const internals = adapter as unknown as {
        _scope: Scope;
        _address: string;
        _client: { getSession: () => Promise<unknown> };
        _switchingChain: boolean;
    };
    internals._scope = Scope.MAINNET;
    internals._address = ADDRESS;
    internals._client = { getSession };
    return { adapter, internals };
}

function sessionWithNileAccount() {
    return {
        sessionScopes: {
            [Scope.NILE]: { accounts: [`${Scope.NILE}:${ADDRESS}`] },
        },
    };
}

/**
 * Minimal multichain client stub that tracks live `onNotification` subscriptions, so
 * tests can assert temporary listeners are torn down instead of accumulating.
 */
function createNotificationTrackingClient() {
    const listeners = new Set<(data: any) => void>();
    return {
        listeners,
        onNotification(handler: (data: any) => void) {
            listeners.add(handler);
            return () => {
                listeners.delete(handler);
            };
        },
        emitAccountsChanged(address?: string) {
            const data = {
                method: 'wallet_notify',
                params: {
                    notification: {
                        method: 'metamask_accountsChanged',
                        params: address ? [address] : [],
                    },
                },
            };
            for (const handler of [...listeners]) {
                handler(data);
            }
        },
    };
}

type TrackingClient = ReturnType<typeof createNotificationTrackingClient>;

/**
 * Builds an adapter whose client is the notification-tracking stub, with `updateSession`
 * stubbed out so tests stay focused on subscription lifecycle.
 */
function createAdapterWithTrackingClient(createSession: () => Promise<unknown>) {
    const adapter = new MetaMaskAdapter();
    const client = createNotificationTrackingClient();
    const internals = adapter as unknown as {
        _client: TrackingClient & { createSession: () => Promise<unknown> };
        updateSession: (...args: any[]) => void;
        createSession: (scope: Scope, addresses?: string[]) => Promise<void>;
        getInitialSelectedAddress: () => Promise<string | undefined>;
        _disposeInitialAddressListener: (() => void) | undefined;
    };
    internals._client = Object.assign(client, { createSession });
    internals.updateSession = vi.fn();
    return { adapter, client, internals };
}

describe('MetaMaskAdapter', () => {
    test('should be defined', () => {
        expect(MetaMaskAdapter).not.toBeNull();
    });
    test('#constructor() should work fine', () => {
        const adapter = new MetaMaskAdapter();
        expect(adapter.name).toEqual('MetaMask');
        expect(adapter).toHaveProperty('icon');
        expect(adapter).toHaveProperty('url');
        expect(adapter).toHaveProperty('readyState');
        expect(adapter).toHaveProperty('address');
        expect(adapter).toHaveProperty('connecting');
        expect(adapter).toHaveProperty('connected');

        expect(adapter).toHaveProperty('connect');
        expect(adapter).toHaveProperty('disconnect');
        expect(adapter).toHaveProperty('signMessage');
        expect(adapter).toHaveProperty('signTransaction');

        expect(adapter).toHaveProperty('on');
        expect(adapter).toHaveProperty('off');
    });

    describe('#switchChain()', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        test('should release the mutex when an awaited step rejects', async () => {
            const getSession = vi.fn().mockRejectedValue(new Error('getSession failed'));
            const { adapter, internals } = createConnectedAdapter(getSession);

            await expect(adapter.switchChain(NILE_CHAIN_ID)).rejects.toThrow('getSession failed');
            expect(internals._switchingChain).toBe(false);
        });

        test('should release the mutex when setScope() throws', async () => {
            const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
                throw new Error('localStorage is full');
            });
            const { adapter, internals } = createConnectedAdapter(vi.fn().mockResolvedValue(sessionWithNileAccount()));

            await expect(adapter.switchChain(NILE_CHAIN_ID)).rejects.toThrow('localStorage is full');
            expect(internals._switchingChain).toBe(false);
            setItem.mockRestore();
        });

        test('should release the mutex when the wallet is not connected', async () => {
            const { adapter, internals } = createConnectedAdapter(vi.fn());
            internals._scope = undefined as unknown as Scope;

            await expect(adapter.switchChain(NILE_CHAIN_ID)).rejects.toThrow(WalletDisconnectedError);
            expect(internals._switchingChain).toBe(false);
        });

        test('should still switch chain on a retry after an earlier call failed', async () => {
            const getSession = vi
                .fn()
                .mockRejectedValueOnce(new Error('transient failure'))
                .mockResolvedValue(sessionWithNileAccount());
            const { adapter, internals } = createConnectedAdapter(getSession);

            await expect(adapter.switchChain(NILE_CHAIN_ID)).rejects.toThrow('transient failure');

            // Before the fix the stuck mutex made this resolve immediately without switching.
            await expect(adapter.switchChain(NILE_CHAIN_ID)).resolves.toBeUndefined();
            expect(internals._scope).toEqual(Scope.NILE);
        });

        test('should release the mutex when switching to the current chain', async () => {
            const { adapter, internals } = createConnectedAdapter(vi.fn());
            const onChainChanged = vi.fn();
            adapter.on('chainChanged', onChainChanged);

            await adapter.switchChain(MAINNET_CHAIN_ID);

            expect(onChainChanged).toHaveBeenCalledWith({ chainId: MAINNET_CHAIN_ID });
            expect(internals._switchingChain).toBe(false);
        });
    });

    describe('temporary accountChanged subscriptions', () => {
        afterEach(() => {
            vi.useRealTimers();
            vi.restoreAllMocks();
        });

        test('#createSession() should remove its listener when an address arrives', async () => {
            const { client, internals } = createAdapterWithTrackingClient(async () => {
                client.emitAccountsChanged(ADDRESS);
                return sessionWithNileAccount();
            });

            await internals.createSession(Scope.NILE);

            expect(client.listeners.size).toBe(0);
            expect(internals.updateSession).toHaveBeenCalledWith(sessionWithNileAccount(), undefined, ADDRESS);
        });

        test('#createSession() should remove its listener when no notification arrives', async () => {
            vi.useFakeTimers();
            const { client, internals } = createAdapterWithTrackingClient(async () => sessionWithNileAccount());

            const pending = internals.createSession(Scope.NILE);
            await vi.advanceTimersByTimeAsync(2000);
            await pending;

            expect(client.listeners.size).toBe(0);
            expect(internals.updateSession).toHaveBeenCalledWith(sessionWithNileAccount(), undefined, undefined);
        });

        test('#createSession() should remove its listener when createSession() rejects', async () => {
            const { client, internals } = createAdapterWithTrackingClient(async () => {
                throw new Error('createSession failed');
            });

            await expect(internals.createSession(Scope.NILE)).rejects.toThrow('createSession failed');
            expect(client.listeners.size).toBe(0);
        });

        test('#createSession() should clear the timeout timer on success', async () => {
            const { client, internals } = createAdapterWithTrackingClient(async () => {
                client.emitAccountsChanged(ADDRESS);
                return sessionWithNileAccount();
            });
            // Installed after construction so only timers created by createSession() count.
            vi.useFakeTimers();

            await internals.createSession(Scope.NILE);

            expect(vi.getTimerCount()).toBe(0);
        });

        test('#createSession() should not accumulate listeners across repeated timeouts', async () => {
            vi.useFakeTimers();
            const { client, internals } = createAdapterWithTrackingClient(async () => sessionWithNileAccount());

            // Before the fix each timed-out call left a listener behind, so a single later
            // account event would invoke every stale callback.
            for (let i = 0; i < 3; i++) {
                const pending = internals.createSession(Scope.NILE);
                await vi.advanceTimersByTimeAsync(2000);
                await pending;
            }

            expect(client.listeners.size).toBe(0);
        });

        test('#getInitialSelectedAddress() should remove its listener on timeout', async () => {
            vi.useFakeTimers();
            const { client, internals } = createAdapterWithTrackingClient(vi.fn());

            const pending = internals.getInitialSelectedAddress();
            await vi.advanceTimersByTimeAsync(2000);

            await expect(pending).resolves.toBeUndefined();
            expect(client.listeners.size).toBe(0);
        });

        test('#getInitialSelectedAddress() should remove its listener when an address arrives', async () => {
            const { client, internals } = createAdapterWithTrackingClient(vi.fn());

            const pending = internals.getInitialSelectedAddress();
            client.emitAccountsChanged(ADDRESS);

            await expect(pending).resolves.toEqual(ADDRESS);
            expect(client.listeners.size).toBe(0);
        });

        test('#getInitialSelectedAddress() should keep waiting on a notification with no address', async () => {
            vi.useFakeTimers();
            const { client, internals } = createAdapterWithTrackingClient(vi.fn());

            const pending = internals.getInitialSelectedAddress();
            client.emitAccountsChanged(undefined);
            expect(client.listeners.size).toBe(1);

            await vi.advanceTimersByTimeAsync(2000);
            await expect(pending).resolves.toBeUndefined();
            expect(client.listeners.size).toBe(0);
        });

        test('disconnecting inside the window should settle the page-load wait without hanging', async () => {
            const { client, internals } = createAdapterWithTrackingClient(vi.fn());

            const pending = internals.getInitialSelectedAddress();
            expect(client.listeners.size).toBe(1);

            (internals as unknown as { stopListeners: () => void }).stopListeners();

            await expect(pending).resolves.toBeUndefined();
            expect(client.listeners.size).toBe(0);
        });
    });
});
