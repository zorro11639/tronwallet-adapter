import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { SafepalAdapter } from '../../src/adapter.js';
import { AdapterState, WalletNotFoundError, WalletReadyState } from '@tronweb3/tronwallet-abstract-adapter';

describe('SafepalAdapter', () => {
    test('should be defined', () => {
        expect(SafepalAdapter).not.toBeNull();
    });
    test('#constructor() should work fine', () => {
        const adapter = new SafepalAdapter();
        expect(adapter.name).toEqual('SafePal');
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

describe('SafepalAdapter mobile-only support', () => {
    const ADDRESS = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';
    const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)';
    const DESKTOP_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';
    const realUserAgent = navigator.userAgent;

    function setUserAgent(ua: string) {
        Object.defineProperty(navigator, 'userAgent', { value: ua, configurable: true });
    }

    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) }));
        vi.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => {
        setUserAgent(realUserAgent);
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
        delete (window as any).safepalTronProvider;
        delete (window as any).safepalwallet;
        delete (window as any).tronWeb;
    });

    /**
     * The PC extension's `signTransaction()` throws, so this release does not support
     * it. Detecting it anyway would connect the user to a wallet that cannot sign —
     * worse than reporting it unavailable.
     */
    test('ignores the PC extension even when it is installed', async () => {
        setUserAgent(DESKTOP_UA);
        const request = vi.fn();
        const tronWeb = { defaultAddress: { base58: ADDRESS }, ready: true };
        (window as any).safepalTronProvider = { tronWeb, request };
        (window as any).tronWeb = tronWeb;

        const adapter = new SafepalAdapter({ checkTimeout: 0 });
        adapter.on('error', () => {});
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(adapter.readyState).toBe(WalletReadyState.NotFound);
        await expect(adapter.connect()).rejects.toBeInstanceOf(WalletNotFoundError);
        // The extension provider must never be asked to connect.
        expect(request).not.toHaveBeenCalled();
        expect(adapter.address).toBeNull();
        expect(adapter.state).not.toBe(AdapterState.Connected);
    });

    test('still connects inside the SafePal mobile app', async () => {
        setUserAgent(MOBILE_UA);
        const tronWeb = { defaultAddress: { base58: ADDRESS }, ready: true };
        (window as any).safepalwallet = {
            tron: { tronWeb, request: vi.fn(), on: vi.fn(), off: vi.fn() },
            tronWeb,
        };

        const adapter = new SafepalAdapter({ checkTimeout: 0 });
        adapter.on('error', () => {});
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(adapter.readyState).toBe(WalletReadyState.Found);
        await adapter.connect();

        expect(adapter.address).toBe(ADDRESS);
        expect(adapter.state).toBe(AdapterState.Connected);
    });
});
