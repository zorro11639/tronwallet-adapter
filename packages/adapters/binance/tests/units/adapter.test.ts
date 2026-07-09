// @ts-ignore
import { BinanceWalletAdapter } from '../../src/index.js';
import { AdapterState, WalletSignTransactionError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

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

describe('BinanceWalletAdapter', () => {
    describe('#adapter()', function () {
        it('constructor', () => {
            const adapter = new BinanceWalletAdapter();
            expect(adapter.name).toEqual('Binance Wallet');
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

    describe('#signAndSendTransaction()', function () {
        it('throws a clear WalletSignTransactionError when connected via WalletConnect fallback', async () => {
            const adapter = new BinanceWalletAdapter();

            // Simulate a successful WalletConnect fallback connection: the main
            // adapter is Connected with a WalletConnect adapter but no provider.
            (adapter as any)._walletConnectAdapter = {};
            (adapter as any)._provider = null;
            (adapter as any)._state = AdapterState.Connected;

            const onError = vi.fn();
            adapter.on('error', onError);

            await expect(adapter.signAndSendTransaction({} as any)).rejects.toBeInstanceOf(WalletSignTransactionError);
            await expect(adapter.signAndSendTransaction({} as any)).rejects.toThrow(/WalletConnect fallback/);
            expect(onError).toHaveBeenCalled();
        });
    });

    describe('#openAppWithDeeplink (mobile deeplink)', function () {
        const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)';
        const DESKTOP_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';
        const originalUserAgent = navigator.userAgent;

        function setUserAgent(ua: string) {
            Object.defineProperty(navigator, 'userAgent', { value: ua, configurable: true });
        }
        afterEach(() => {
            setUserAgent(originalUserAgent);
            delete (window as any).isBinance;
        });

        it('does not fire the deeplink when openAppWithDeeplink is disabled', () => {
            setUserAgent(MOBILE_UA);
            (window as any).isBinance = undefined;
            const adapter = new BinanceWalletAdapter({ openAppWithDeeplink: false });
            expect((adapter as any)._openAppByDeepLinkIfNeed()).toBe(false);
        });

        it('does not fire the deeplink on a non-mobile browser', () => {
            setUserAgent(DESKTOP_UA);
            const adapter = new BinanceWalletAdapter();
            expect((adapter as any)._openAppByDeepLinkIfNeed()).toBe(false);
        });

        it('fires the deeplink on a mobile browser when the Binance provider is missing', () => {
            setUserAgent(MOBILE_UA);
            (window as any).isBinance = undefined;
            const adapter = new BinanceWalletAdapter();
            expect((adapter as any)._openAppByDeepLinkIfNeed()).toBe(true);
        });

        it('opens the app via deeplink on mobile even when WalletConnect fallback is enabled', async () => {
            setUserAgent(MOBILE_UA);
            (window as any).isBinance = undefined;
            const adapter = new BinanceWalletAdapter({
                checkTimeout: 0, // resolve "wallet not found" immediately
                useWalletConnectWhenWalletNotFound: true,
                walletConnectConfig: { network: 'Nile', options: { projectId: 'x' } } as any,
            });
            const deeplinkSpy = vi.spyOn(adapter as any, '_openAppByDeepLinkIfNeed');
            adapter.on('error', () => {});

            // Deeplink is attempted first; the WalletConnect fallback is NOT used.
            await expect(adapter.connect()).rejects.toBeInstanceOf(WalletNotFoundError);
            expect(deeplinkSpy).toHaveReturnedWith(true);
            expect((adapter as any)._walletConnectAdapter).toBeNull();
        });
    });
});
