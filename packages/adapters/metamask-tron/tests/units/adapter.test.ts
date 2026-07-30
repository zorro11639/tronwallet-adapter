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
});
