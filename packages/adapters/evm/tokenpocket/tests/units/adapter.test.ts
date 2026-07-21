import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import { WalletNotFoundError, WalletSendTransactionError } from '@tronweb3/abstract-adapter-evm';
import { TokenPocketEvmAdapter } from '../../src/adapter.js';
import { TokenPocketProvider, installTokenPocketEIP6963Provider } from './tokenpocket-provider.js';

let provider: TokenPocketProvider;
let cleanupEIP6963: (() => void) | null = null;

beforeEach(() => {
    vi.useFakeTimers();
    provider = new TokenPocketProvider();
    (window as any).ethereum = null;
    (window as any).tokenpocket = undefined;
    vi.clearAllMocks();
});

afterEach(() => {
    if (cleanupEIP6963) {
        cleanupEIP6963();
        cleanupEIP6963 = null;
    }
    (window as any).ethereum = null;
    (window as any).tokenpocket = undefined;
    vi.clearAllTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

async function flushPromises() {
    for (let i = 0; i < 5; i++) {
        await Promise.resolve();
    }
}

const typedData = {
    domain: {
        chainId: 1,
        name: 'Ether Mail',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
    },
    primaryType: 'Mail',
    types: {
        Mail: [
            { name: 'from', type: 'string' },
            { name: 'to', type: 'string' },
            { name: 'contents', type: 'string' },
        ],
    },
    message: {
        from: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        to: '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
        contents: 'Hello',
    },
};

describe('TokenPocketEvmAdapter', () => {
    test('base props should be valid', () => {
        const adapter = new TokenPocketEvmAdapter();
        expect(adapter.name).toEqual('TokenPocket');
        expect(adapter.url).toEqual('https://tokenpocket.pro');
        expect(adapter.readyState).toEqual('Loading');
        expect(adapter.address).toEqual(null);
        expect(adapter.connected).toEqual(false);
    });

    describe('provider detection should work fine', () => {
        test('adapter should discover provider via EIP-6963', async () => {
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider);
            const adapter = new TokenPocketEvmAdapter();
            await flushPromises();

            expect(adapter.readyState).toEqual('Found');
            await expect(adapter.getProvider()).resolves.toBe(provider);
        });

        test('adapter should discover injected provider in mobile webview without EIP-6963', async () => {
            (window as any).ethereum = provider;
            vi.stubGlobal('navigator', {
                ...window.navigator,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
            });

            const adapter = new TokenPocketEvmAdapter();
            vi.advanceTimersByTime(200);
            await flushPromises();

            expect(adapter.readyState).toEqual('Found');
            await expect(adapter.getProvider()).resolves.toBe(provider);
        });

        test('adapter should discover injected provider in mobile webview via window.tokenpocket.ethereum', async () => {
            (window as any).tokenpocket = { ethereum: provider };
            vi.stubGlobal('navigator', {
                ...window.navigator,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
            });

            const adapter = new TokenPocketEvmAdapter();
            vi.advanceTimersByTime(200);
            await flushPromises();

            expect(adapter.readyState).toEqual('Found');
            await expect(adapter.getProvider()).resolves.toBe(provider);
        });

        test('adapter should discover desktop injected provider without EIP-6963', async () => {
            (window as any).ethereum = provider;

            const adapter = new TokenPocketEvmAdapter();
            vi.advanceTimersByTime(200);
            await flushPromises();

            expect(adapter.readyState).toEqual('Found');
            await expect(adapter.getProvider()).resolves.toBe(provider);
        });

        test('adapter should discover desktop injected provider via window.tokenpocket.ethereum', async () => {
            (window as any).tokenpocket = { ethereum: provider };

            const adapter = new TokenPocketEvmAdapter();
            vi.advanceTimersByTime(200);
            await flushPromises();

            expect(adapter.readyState).toEqual('Found');
            await expect(adapter.getProvider()).resolves.toBe(provider);
        });

        test('adapter should not discover desktop injected provider if it is not TokenPocket', async () => {
            (window as any).ethereum = { isMetaMask: true };

            const adapter = new TokenPocketEvmAdapter();
            vi.advanceTimersByTime(3000);
            await flushPromises();

            expect(adapter.readyState).toEqual('NotFound');
            await expect(adapter.getProvider()).resolves.toBeNull();
        });

        test('adapter should not match provider with wrong rdns', async () => {
            (window as any).ethereum = null;
            (window as any).tokenpocket = undefined;
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider, { name: 'Other Wallet', rdns: 'io.other.wallet' });
            const adapter = new TokenPocketEvmAdapter();
            vi.advanceTimersByTime(3000);
            await flushPromises();

            expect(adapter.readyState).toEqual('NotFound');
        });

        test('adapter should be NotFound when no EIP-6963 provider announces', async () => {
            const adapter = new TokenPocketEvmAdapter();
            expect(adapter.readyState).toEqual('Loading');
            vi.advanceTimersByTime(3000);
            await flushPromises();
            expect(adapter.readyState).toEqual('NotFound');
        });
    });

    describe('#signTypedData()', () => {
        test('should work fine', async () => {
            provider._setAccountsRes(['address']);
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider);
            const adapter = new TokenPocketEvmAdapter();
            await flushPromises();
            const request = vi.spyOn(provider, 'request');
            const getProvider = vi.spyOn(adapter, 'getProvider');
            await adapter.signTypedData({ typedData });
            expect(getProvider).toHaveBeenCalledTimes(1);
            expect(request).toHaveBeenLastCalledWith({
                method: 'eth_signTypedData_v4',
                params: [adapter.address, JSON.stringify(typedData)],
            });
            request.mockReset();
            request.mockRestore();
        });
        test('should throw error when provider.request throws error', async () => {
            provider._setAccountsRes(['address']);
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider);
            const adapter = new TokenPocketEvmAdapter();
            await flushPromises();
            const oldRequest = provider.request;
            const error = new Error();
            provider.request = vi.fn(() => {
                throw error;
            });
            await expect(adapter.signTypedData({ typedData })).rejects.toEqual(error);
            provider.request = oldRequest;
        });
    });

    describe('#connect()', () => {
        test('should work fine when provider.request return account list', async () => {
            provider._setRequestAccountsRes(['address']);
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider);
            const adapter = new TokenPocketEvmAdapter();
            await flushPromises();
            const res = await adapter.connect();
            expect(res).toEqual('address');
        });
        test('should throw WalletNotFoundError when there is no EIP-6963 provider', async () => {
            const adapter = new TokenPocketEvmAdapter();
            const res = adapter.connect();
            vi.advanceTimersByTime(5000);
            await expect(res).rejects.toBeInstanceOf(WalletNotFoundError);
            expect(adapter.connecting).toBe(false);
        });
        test('should throw WalletConnectionError when provider.request throws error', async () => {
            provider._setAccountsRes(['address']);
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider);
            const adapter = new TokenPocketEvmAdapter();
            await flushPromises();
            const oldRequest = provider.request;
            const error = new Error();
            provider.request = vi.fn(() => {
                throw error;
            });
            await expect(adapter.connect()).rejects.toThrow();
            provider.request = oldRequest;
        });
    });

    describe('#sendTransaction()', () => {
        test('should return tx hash on success', async () => {
            provider._setAccountsRes(['address']);
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider);
            const adapter = new TokenPocketEvmAdapter();
            await flushPromises();

            const txHash = '0xmocktxhash';
            const request = vi.spyOn(provider, 'request').mockResolvedValue(txHash);

            const tx = { from: '0xaddress', to: '0xreceiver', value: '0x1' } as any;
            const res = await adapter.sendTransaction(tx);
            expect(res).toEqual(txHash);
            expect(request).toHaveBeenCalledWith({
                method: 'eth_sendTransaction',
                params: [tx],
            });
            request.mockReset();
        });

        test('should throw error when provider returns a JSON error object instead of rejecting', async () => {
            provider._setAccountsRes(['address']);
            cleanupEIP6963 = installTokenPocketEIP6963Provider(provider);
            const adapter = new TokenPocketEvmAdapter();
            await flushPromises();

            const errorObj = {
                code: -32000,
                message:
                    'client: transaction check failed: runtime error: module: core code: 20 message: gas price too low',
            };
            const request = vi.spyOn(provider, 'request').mockResolvedValue(errorObj);

            const tx = { from: '0xaddress', to: '0xreceiver', value: '0x1' } as any;
            const resPromise = adapter.sendTransaction(tx);

            await expect(resPromise).rejects.toBeInstanceOf(WalletSendTransactionError);
            request.mockReset();
        });
    });
});
