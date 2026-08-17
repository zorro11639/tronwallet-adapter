// @ts-ignore
import { BinanceWalletAdapter } from '../../src/index.js';
import {
    AdapterState,
    WalletSignTransactionError,
    WalletNotFoundError,
    WalletConnectionError,
    WalletReadyState,
} from '@tronweb3/tronwallet-abstract-adapter';
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

    describe('#connect() address validation', function () {
        const ADDRESS = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';

        /** Put the adapter in the state where connect() reaches the injected-provider path. */
        function makeConnectable(getAccount: () => Promise<{ address?: string | null }>) {
            const adapter = new BinanceWalletAdapter();
            (adapter as any)._readyState = WalletReadyState.Found;
            (adapter as any)._state = AdapterState.Disconnect;
            (adapter as any)._provider = {
                getAccount: vi.fn(getAccount),
                on: vi.fn(),
                removeListener: vi.fn(),
            };
            return adapter;
        }

        it.each([
            ['an empty string', ''],
            ['null', null],
            ['undefined', undefined],
        ])('rejects when the wallet returns %s as the address', async (_label, address) => {
            const adapter = makeConnectable(async () => ({ address }));
            const onConnect = vi.fn();
            adapter.on('connect', onConnect);
            adapter.on('error', () => {});

            await expect(adapter.connect()).rejects.toBeInstanceOf(WalletConnectionError);
            await expect(adapter.connect()).rejects.toThrow(/empty address/);

            // The adapter must not claim to be connected with no address.
            expect(adapter.address).toBeNull();
            expect(adapter.state).not.toBe(AdapterState.Connected);
            expect(adapter.connected).toBe(false);
            expect(onConnect).not.toHaveBeenCalled();
        });

        it('connects normally when the wallet returns a real address', async () => {
            const adapter = makeConnectable(async () => ({ address: ADDRESS }));
            const onConnect = vi.fn();
            adapter.on('connect', onConnect);

            await adapter.connect();

            expect(adapter.address).toBe(ADDRESS);
            expect(adapter.state).toBe(AdapterState.Connected);
            expect(adapter.connected).toBe(true);
            expect(onConnect).toHaveBeenCalledWith(ADDRESS);
        });
    });

    describe('#_onAccountsChanged()', function () {
        const ADDR_A = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';
        const ADDR_B = 'TVj7RNVHy6thbM7BWdSe9G6gXwKhjhdNZS';

        /** Build an adapter already connected as `address`, with all events spied. */
        function makeConnected(address: string | null) {
            const adapter = new BinanceWalletAdapter();
            (adapter as any)._address = address;
            (adapter as any)._state = address ? AdapterState.Connected : AdapterState.Disconnect;

            const events = {
                accountsChanged: vi.fn(),
                connect: vi.fn(),
                disconnect: vi.fn(),
                stateChanged: vi.fn(),
            };
            adapter.on('accountsChanged', events.accountsChanged);
            adapter.on('connect', events.connect);
            adapter.on('disconnect', events.disconnect);
            adapter.on('stateChanged', events.stateChanged);

            const fire = (payload: string[] | string) => (adapter as any)._onAccountsChanged(payload);
            return { adapter, events, fire };
        }

        /**
         * The core defect: only `_address` was updated, so `state` stayed Connected
         * and `connected` — which derives from it — stayed true forever.
         */
        it.each([
            ['an empty array', [] as string[]],
            ['an empty string', ''],
        ])('disconnects when the wallet reports %s', (_label, payload) => {
            const { adapter, events, fire } = makeConnected(ADDR_A);

            fire(payload);

            expect(adapter.address).toBeNull();
            expect(adapter.state).toBe(AdapterState.Disconnect);
            expect(adapter.connected).toBe(false);
            expect(events.accountsChanged).toHaveBeenCalledWith('', ADDR_A);
            expect(events.disconnect).toHaveBeenCalledTimes(1);
            expect(events.stateChanged).toHaveBeenCalledWith(AdapterState.Disconnect);
            expect(events.connect).not.toHaveBeenCalled();
        });

        it('writes null rather than undefined for an empty array', () => {
            const { adapter, fire } = makeConnected(ADDR_A);
            fire([]);
            // `address[0]` used to leak `undefined` into the address field.
            expect(adapter.address).toBeNull();
            expect(adapter.address).not.toBeUndefined();
        });

        it('connects when an account appears while disconnected', () => {
            const { adapter, events, fire } = makeConnected(null);

            fire([ADDR_A]);

            expect(adapter.address).toBe(ADDR_A);
            expect(adapter.state).toBe(AdapterState.Connected);
            expect(adapter.connected).toBe(true);
            expect(events.accountsChanged).toHaveBeenCalledWith(ADDR_A, '');
            expect(events.connect).toHaveBeenCalledWith(ADDR_A);
            expect(events.disconnect).not.toHaveBeenCalled();
        });

        it('emits only accountsChanged when switching between accounts', () => {
            const { adapter, events, fire } = makeConnected(ADDR_A);

            fire([ADDR_B]);

            expect(adapter.address).toBe(ADDR_B);
            expect(adapter.state).toBe(AdapterState.Connected);
            expect(events.accountsChanged).toHaveBeenCalledWith(ADDR_B, ADDR_A);
            expect(events.connect).not.toHaveBeenCalled();
            expect(events.disconnect).not.toHaveBeenCalled();
            expect(events.stateChanged).not.toHaveBeenCalled();
        });

        it('stays quiet when the same account is reported again', () => {
            const { adapter, events, fire } = makeConnected(ADDR_A);

            fire([ADDR_A]);

            expect(adapter.address).toBe(ADDR_A);
            expect(adapter.state).toBe(AdapterState.Connected);
            expect(events.accountsChanged).not.toHaveBeenCalled();
            expect(events.connect).not.toHaveBeenCalled();
            expect(events.disconnect).not.toHaveBeenCalled();
        });

        it('accepts a bare string payload as well as an array', () => {
            const { adapter, events, fire } = makeConnected(null);

            fire(ADDR_A);

            expect(adapter.address).toBe(ADDR_A);
            expect(adapter.connected).toBe(true);
            expect(events.connect).toHaveBeenCalledWith(ADDR_A);
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
