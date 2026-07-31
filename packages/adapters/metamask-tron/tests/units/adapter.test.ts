import { describe, test, expect, vi, afterEach } from 'vitest';
import { AdapterState, WalletDisconnectedError, WalletSwitchChainError } from '@tronweb3/tronwallet-abstract-adapter';
import { MetaMaskAdapter } from '../../src/adapter.js';
import { Scope } from '../../src/types.js';

const MAINNET_CHAIN_ID = '0x2b6653dc';
const NILE_CHAIN_ID = '0xcd8690dc';
const SHASTA_CHAIN_ID = '0x94a9059e';
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
        _switchChainPromise: Promise<void> | null;
        _switchingToScope: Scope | undefined;
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
            expect(internals._switchChainPromise).toBeNull();
        });

        test('should release the mutex when setScope() throws', async () => {
            const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
                throw new Error('localStorage is full');
            });
            const { adapter, internals } = createConnectedAdapter(vi.fn().mockResolvedValue(sessionWithNileAccount()));

            await expect(adapter.switchChain(NILE_CHAIN_ID)).rejects.toThrow('localStorage is full');
            expect(internals._switchChainPromise).toBeNull();
            setItem.mockRestore();
        });

        test('should release the mutex when the wallet is not connected', async () => {
            const { adapter, internals } = createConnectedAdapter(vi.fn());
            internals._scope = undefined as unknown as Scope;

            await expect(adapter.switchChain(NILE_CHAIN_ID)).rejects.toThrow(WalletDisconnectedError);
            expect(internals._switchChainPromise).toBeNull();
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
            expect(internals._switchChainPromise).toBeNull();
        });

        test('parallel calls for the same chain should share one switch and all succeed', async () => {
            let resolveSession!: (value: unknown) => void;
            const getSession = vi.fn().mockImplementation(
                () =>
                    new Promise((resolve) => {
                        resolveSession = resolve;
                    })
            );
            const { adapter, internals } = createConnectedAdapter(getSession);

            // TronWallet issues several of these in parallel during initial connection.
            const calls = [
                adapter.switchChain(NILE_CHAIN_ID),
                adapter.switchChain(NILE_CHAIN_ID),
                adapter.switchChain(NILE_CHAIN_ID),
            ];
            resolveSession(sessionWithNileAccount());

            await expect(Promise.all(calls)).resolves.toEqual([undefined, undefined, undefined]);
            // One shared switch, not three concurrent createSession() calls.
            expect(getSession).toHaveBeenCalledTimes(1);
            expect(internals._scope).toEqual(Scope.NILE);
            expect(internals._switchChainPromise).toBeNull();
        });

        test('parallel calls for the same chain should share a failure', async () => {
            const getSession = vi.fn().mockRejectedValue(new Error('getSession failed'));
            const { adapter } = createConnectedAdapter(getSession);

            const first = adapter.switchChain(NILE_CHAIN_ID);
            const second = adapter.switchChain(NILE_CHAIN_ID);

            await expect(first).rejects.toThrow('getSession failed');
            await expect(second).rejects.toThrow('getSession failed');
        });

        test('a parallel call for a different chain should be rejected', async () => {
            let resolveSession!: (value: unknown) => void;
            const getSession = vi.fn().mockImplementation(
                () =>
                    new Promise((resolve) => {
                        resolveSession = resolve;
                    })
            );
            const { adapter, internals } = createConnectedAdapter(getSession);

            const first = adapter.switchChain(NILE_CHAIN_ID);
            await expect(adapter.switchChain(SHASTA_CHAIN_ID)).rejects.toThrow(WalletSwitchChainError);

            resolveSession(sessionWithNileAccount());
            await first;
            expect(internals._scope).toEqual(Scope.NILE);
        });

        test('should accept a different chain once the previous switch settled', async () => {
            const getSession = vi.fn().mockResolvedValue({
                sessionScopes: {
                    [Scope.NILE]: { accounts: [`${Scope.NILE}:${ADDRESS}`] },
                    [Scope.SHASTA]: { accounts: [`${Scope.SHASTA}:${ADDRESS}`] },
                },
            });
            const { adapter, internals } = createConnectedAdapter(getSession);

            await adapter.switchChain(NILE_CHAIN_ID);
            await adapter.switchChain(SHASTA_CHAIN_ID);

            expect(internals._scope).toEqual(Scope.SHASTA);
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

    describe('connection state guards', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        function deferred<T>() {
            let resolve!: (value: T) => void;
            const promise = new Promise<T>((r) => {
                resolve = r;
            });
            return { promise, resolve };
        }

        const TRANSACTION = {
            raw_data: { contract: [{ type: 'TransferContract' }] },
            raw_data_hex: '0a02fe',
        } as any;

        /**
         * Adapter in a fully connected state with a stubbed client. `tryRestoringSession` is
         * neutralised so the constructor's auto-restore cannot touch the stubbed client.
         */
        function createConnectedAdapterWithClient(client: Record<string, unknown>) {
            const adapter = new MetaMaskAdapter();
            const internals = adapter as unknown as {
                _client: any;
                _state: AdapterState;
                _address: string | null;
                _scope: Scope | undefined;
                tryRestoringSession: () => Promise<void>;
                handleEvents: (data: any) => Promise<void>;
            };
            internals.tryRestoringSession = vi.fn().mockResolvedValue(undefined);
            internals._client = client;
            internals._state = AdapterState.Connected;
            internals._address = ADDRESS;
            internals._scope = Scope.MAINNET;
            return { adapter, internals };
        }

        function accountsChangedEvent(address: string) {
            return {
                method: 'wallet_notify',
                params: { notification: { method: 'metamask_accountsChanged', params: [address] } },
            };
        }

        test('a stale accountsChanged callback should not restore state after disconnect', async () => {
            const NEW_ADDRESS = 'TQ2fBcAV5Y8dxbFmVCWLbYVQ4bqfCFPqPS';
            const pendingSession = deferred<any>();
            const { adapter, internals } = createConnectedAdapterWithClient({
                getSession: () => pendingSession.promise,
                revokeSession: vi.fn().mockResolvedValue(undefined),
                onNotification: () => () => undefined,
            });

            // accountsChanged arrives and parks on getSession()
            const inFlight = internals.handleEvents(accountsChangedEvent(NEW_ADDRESS));

            await adapter.disconnect();
            expect(adapter.state).toEqual(AdapterState.Disconnect);

            // The wallet now answers with the pre-disconnect session
            pendingSession.resolve({
                sessionScopes: {
                    [Scope.MAINNET]: { accounts: [`${Scope.MAINNET}:${NEW_ADDRESS}`] },
                },
            });
            await inFlight;

            expect(adapter.state).toEqual(AdapterState.Disconnect);
            expect(adapter.address).toBeNull();
            expect(internals._scope).toBeUndefined();
        });

        test('signTransaction/signMessage should reject when disconnected but scope is still set', async () => {
            const invokeMethod = vi.fn();
            const { adapter, internals } = createConnectedAdapterWithClient({
                invokeMethod,
                onNotification: () => () => undefined,
            });
            // The state a stale callback or aborted connect can leave behind
            internals._state = AdapterState.Disconnect;

            await expect(adapter.signTransaction(TRANSACTION)).rejects.toThrow(WalletDisconnectedError);
            await expect(adapter.signMessage('hello')).rejects.toThrow(WalletDisconnectedError);
            expect(invokeMethod).not.toHaveBeenCalled();
        });

        test('signTransaction/signMessage should reject when the address is empty but scope is set', async () => {
            const invokeMethod = vi.fn();
            const { adapter, internals } = createConnectedAdapterWithClient({
                invokeMethod,
                onNotification: () => () => undefined,
            });
            // updateSession() clears the address without clearing the scope
            internals._address = null;

            await expect(adapter.signTransaction(TRANSACTION)).rejects.toThrow(WalletDisconnectedError);
            await expect(adapter.signMessage('hello')).rejects.toThrow(WalletDisconnectedError);
            expect(invokeMethod).not.toHaveBeenCalled();
        });

        test('signTransaction/signMessage should invoke the wallet when fully connected', async () => {
            const invokeMethod = vi.fn().mockResolvedValue({ signature: 'sig' });
            const { adapter } = createConnectedAdapterWithClient({
                invokeMethod,
                onNotification: () => () => undefined,
            });

            await expect(adapter.signTransaction(TRANSACTION)).resolves.toMatchObject({ signature: ['sig'] });
            await expect(adapter.signMessage('hello')).resolves.toEqual('sig');
            expect(invokeMethod).toHaveBeenCalledTimes(2);
            expect(invokeMethod.mock.calls[0][0]).toMatchObject({
                scope: Scope.MAINNET,
                request: { params: { address: ADDRESS } },
            });
        });
    });
});
