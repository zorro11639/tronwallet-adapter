import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { TokenPocketAdapter } from '../../src/adapter.js';

beforeEach(function () {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        })
    );
});
afterEach(function () {
    vi.unstubAllGlobals();
});

describe('TokenPocketAdapter', () => {
    test('should be defined', () => {
        expect(TokenPocketAdapter).not.toBeNull();
    });
    test('#constructor() should work fine', () => {
        const adapter = new TokenPocketAdapter();
        expect(adapter.name).toEqual('TokenPocket');
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
});

describe('TokenPocketAdapter#_checkWallet() re-detection', () => {
    const ADDRESS = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';

    afterEach(() => {
        delete (window as any).tokenpocket;
        delete (window as any).tronWeb;
    });

    function injectWallet() {
        // `_updateWallet()` reads window.tokenpocket.tron.tronWeb on the desktop path,
        // so the stub has to carry the whole chain.
        const tronWeb = { defaultAddress: { base58: ADDRESS }, ready: true };
        (window as any).tokenpocket = {
            tron: { tronWeb, request: vi.fn().mockResolvedValue([ADDRESS]), on: vi.fn(), off: vi.fn() },
            tronWeb,
        };
        (window as any).tronWeb = tronWeb;
    }

    /**
     * A negative detection used to stay in `_checkPromise` for the adapter's whole life,
     * so an extension injected a moment too late could never be picked up. This adapter
     * takes the TIP-6963 path, which is a different code branch from the polling ones.
     */
    test('detects a wallet injected after the first attempt timed out', async () => {
        vi.useFakeTimers();
        try {
            const adapter = new TokenPocketAdapter({ checkTimeout: 200 });
            adapter.on('error', () => {});

            const first = (adapter as any)._checkWallet();
            await vi.advanceTimersByTimeAsync(300);
            expect(await first).toBe(false);

            injectWallet();

            const second = (adapter as any)._checkWallet();
            await vi.advanceTimersByTimeAsync(300);
            expect(await second).toBe(true);
        } finally {
            vi.useRealTimers();
        }
    });
});
