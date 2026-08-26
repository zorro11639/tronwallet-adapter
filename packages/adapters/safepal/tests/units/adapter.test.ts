import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { SafepalAdapter } from '../../src/adapter.js';
import {
    AdapterState,
    WalletConnectionError,
    WalletNotFoundError,
    WalletReadyState,
} from '@tronweb3/tronwallet-abstract-adapter';

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

describe('SafepalAdapter platform support', () => {
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
     * Both platforms are supported, but they inject different globals, so the desktop
     * extension needs its own detection and its own explicit account request.
     */
    test('connects through the PC extension', async () => {
        setUserAgent(DESKTOP_UA);
        // A freshly installed extension exposes no address until the site is authorised;
        // granting access is what `tron_requestAccounts` does.
        const tronWeb: any = { defaultAddress: {}, ready: true };
        const request = vi.fn(async () => {
            tronWeb.defaultAddress = { base58: ADDRESS };
            return { code: 200 };
        });
        (window as any).safepalTronProvider = { tronWeb, request };
        (window as any).tronWeb = tronWeb;

        const adapter = new SafepalAdapter({ checkTimeout: 0 });
        adapter.on('error', () => {});
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(adapter.readyState).toBe(WalletReadyState.Found);
        expect(adapter.connected).toBe(false);

        await adapter.connect();

        expect(request).toHaveBeenCalledWith({ method: 'tron_requestAccounts' });
        expect(adapter.address).toBe(ADDRESS);
        expect(adapter.state).toBe(AdapterState.Connected);
    });

    /**
     * When the extension already has the site authorised it exposes an address straight
     * away, so the adapter reflects that on construction without asking for accounts again.
     */
    test('reflects an already-authorised extension without a request', async () => {
        setUserAgent(DESKTOP_UA);
        const tronWeb = { defaultAddress: { base58: ADDRESS }, ready: true };
        const request = vi.fn();
        (window as any).safepalTronProvider = { tronWeb, request };
        (window as any).tronWeb = tronWeb;

        const adapter = new SafepalAdapter({ checkTimeout: 0 });
        adapter.on('error', () => {});
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(adapter.readyState).toBe(WalletReadyState.Found);
        expect(adapter.address).toBe(ADDRESS);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(request).not.toHaveBeenCalled();
    });

    /**
     * Detection landing in `Connected` must announce itself. A dapp that only listens for
     * `connect` would otherwise never learn it is connected, even though `adapter.connected`
     * already reads `true`.
     */
    test('emits connect when the extension is already authorised', async () => {
        setUserAgent(DESKTOP_UA);
        const tronWeb = { defaultAddress: { base58: ADDRESS }, ready: true };
        (window as any).safepalTronProvider = { tronWeb, request: vi.fn() };
        (window as any).tronWeb = tronWeb;

        const adapter = new SafepalAdapter({ checkTimeout: 0 });
        adapter.on('error', () => {});
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(adapter.state).toBe(AdapterState.Connected);
        expect(onConnect).toHaveBeenCalledWith(ADDRESS);
    });

    test('reports NotFound on desktop when the extension is absent', async () => {
        setUserAgent(DESKTOP_UA);

        const adapter = new SafepalAdapter({ checkTimeout: 0 });
        adapter.on('error', () => {});
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(adapter.readyState).toBe(WalletReadyState.NotFound);
        await expect(adapter.connect()).rejects.toBeInstanceOf(WalletNotFoundError);
        expect(adapter.address).toBeNull();
    });

    /**
     * `tron_requestAccounts` resolving is not the same thing as being connected — the user
     * may have dismissed the prompt. Entering `Connected` with an empty address would let
     * every later signing call pass the state guard and fail inside the wallet instead.
     */
    test('rejects the connect when the extension yields no address', async () => {
        setUserAgent(DESKTOP_UA);
        // Request resolves, but the provider never populates an address.
        const tronWeb: any = { defaultAddress: {}, ready: true };
        const request = vi.fn(async () => ({ code: 200 }));
        (window as any).safepalTronProvider = { tronWeb, request };
        (window as any).tronWeb = tronWeb;

        const adapter = new SafepalAdapter({ checkTimeout: 0 });
        adapter.on('error', () => {});
        await new Promise((resolve) => setTimeout(resolve, 50));

        await expect(adapter.connect()).rejects.toBeInstanceOf(WalletConnectionError);
        expect(adapter.address).toBeNull();
        expect(adapter.state).not.toBe(AdapterState.Connected);
        expect(adapter.connected).toBe(false);
    });

    /**
     * An extension that already exposes an address reaches `Connected` without ever going
     * through `connect()`. The security check has to run on that path too, or
     * `securityOptions` is bypassed there.
     */
    test('runs the security check on the already-authorised extension path', async () => {
        setUserAgent(DESKTOP_UA);
        const tronWeb = { defaultAddress: { base58: ADDRESS }, ready: true };
        (window as any).safepalTronProvider = { tronWeb, request: vi.fn() };
        (window as any).tronWeb = tronWeb;

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: () =>
                    Promise.resolve({
                        v: '1',
                        ts: Date.now(),
                        wallets: { SafePal: [{ title: 'risk', noticeType: 1 }] },
                    }),
            })
        );
        const onRiskDetected = vi.fn(async () => {
            throw new Error('blocked by risk');
        });

        const adapter = new SafepalAdapter({
            checkTimeout: 0,
            securityOptions: { enabled: true, configUrls: ['https://example.com/risk.json'], onRiskDetected },
        });
        adapter.on('error', () => {});
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(onRiskDetected).toHaveBeenCalled();
        expect(adapter.state).not.toBe(AdapterState.Connected);
        expect(adapter.address).toBeNull();
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
