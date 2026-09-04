import { vi, describe, it, test, expect, beforeEach, afterEach } from 'vitest';
import { OkxWalletAdapter } from '../../src/index.js';
import { AdapterState, WalletReadyState, WalletConnectionError } from '@tronweb3/tronwallet-abstract-adapter';

window.open = vi.fn();
beforeEach(function () {
    vi.useFakeTimers();
    window.tronLink = undefined;
    window.tron = undefined;
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
describe('OkxWalletAdapter', function () {
    describe('#adapter()', function () {
        test('constructor', () => {
            const adapter = new OkxWalletAdapter();
            expect(adapter.name).toEqual('OKX Wallet');
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
});

describe('#connect() empty-account regression', () => {
    const ADDRESS = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';

    function makeAdapter(defaultAddress: unknown) {
        const adapter = new OkxWalletAdapter();
        (adapter as any)._readyState = WalletReadyState.Found;
        (adapter as any)._wallet = {
            request: vi.fn().mockResolvedValue({ code: 200 }),
            tronWeb: { defaultAddress },
            on: vi.fn(),
            removeListener: vi.fn(),
        };
        adapter.on('error', () => {});
        return adapter;
    }

    /**
     * A success code from the account request does not mean an address is
     * available yet. Going to Connected here leaves `connected === true` with no
     * address, and emits `connect('')` to the dapp.
     */
    test.each([
        ['base58 is missing', {}],
        ['base58 is an empty string', { base58: '' }],
        ['base58 is false', { base58: false }],
        ['defaultAddress is undefined', undefined],
    ])('rejects when %s', async (_label, defaultAddress) => {
        const adapter = makeAdapter(defaultAddress);
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        await expect(adapter.connect()).rejects.toBeInstanceOf(WalletConnectionError);
        expect(adapter.address).toBeNull();
        expect(adapter.state).not.toBe(AdapterState.Connected);
        expect(adapter.connected).toBe(false);
        expect(onConnect).not.toHaveBeenCalled();
    });

    test('connects when a real address is available', async () => {
        const adapter = makeAdapter({ base58: ADDRESS });
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        await adapter.connect();

        expect(adapter.address).toBe(ADDRESS);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(adapter.connected).toBe(true);
        expect(onConnect).toHaveBeenCalledWith(ADDRESS);
    });
});

describe('#accountsChanged stale-timer regression', function () {
    const ADDR_A = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';
    const STALE = 'TVj7RNVHy6thbM7BWdSe9G6gXwKhjhdNZS';

    function makeConnected() {
        const adapter = new OkxWalletAdapter();
        (adapter as any)._wallet = { ready: true, tronWeb: { defaultAddress: { base58: ADDR_A } } };
        (adapter as any)._address = ADDR_A;
        (adapter as any)._state = AdapterState.Connected;
        adapter.on('error', () => {});
        (adapter as any)._listenEvent();
        return adapter;
    }

    function fireAccountsChanged(address: string) {
        window.dispatchEvent(
            new MessageEvent('message', {
                origin: window.location.origin,
                data: { message: { action: 'accountsChanged', data: { address } } },
            })
        );
    }

    /**
     * The handler deferred its state update by 200ms without keeping the timer, so
     * `disconnect()` removed the listener but could not stop work already queued.
     * The callback then rewrote the address and flipped the adapter back to
     * Connected after the disconnect had settled.
     */
    it('does not resurrect state after disconnect', async () => {
        vi.useFakeTimers();
        try {
            const adapter = makeConnected();
            fireAccountsChanged(STALE);
            await adapter.disconnect();

            expect(adapter.state).toBe(AdapterState.Disconnect);
            expect(adapter.address).toBeNull();

            await vi.advanceTimersByTimeAsync(1000);

            expect(adapter.state).toBe(AdapterState.Disconnect);
            expect(adapter.address).toBeNull();
            expect(adapter.connected).toBe(false);
        } finally {
            vi.useRealTimers();
        }
    });

    it('does not emit connect for an event cancelled by disconnect', async () => {
        vi.useFakeTimers();
        try {
            const adapter = makeConnected();
            const onConnect = vi.fn();
            const onAccountsChanged = vi.fn();
            adapter.on('connect', onConnect);
            adapter.on('accountsChanged', onAccountsChanged);

            fireAccountsChanged(STALE);
            await adapter.disconnect();
            await vi.advanceTimersByTimeAsync(1000);

            expect(onConnect).not.toHaveBeenCalled();
            expect(onAccountsChanged).not.toHaveBeenCalled();
        } finally {
            vi.useRealTimers();
        }
    });

    /**
     * The callback awaits `checkSecurity()`, so a disconnect landing during that
     * await must also be honoured — clearing the timer alone cannot cover it.
     */
    it('abandons an in-flight callback when disconnect lands during checkSecurity', async () => {
        vi.useFakeTimers();
        try {
            const adapter = makeConnected();
            let releaseSecurity: () => void = () => {};
            vi.spyOn(adapter as any, 'checkSecurity').mockImplementation(
                () => new Promise<void>((resolve) => (releaseSecurity = resolve))
            );

            fireAccountsChanged(STALE);
            // let the timer fire so the callback is parked on checkSecurity()
            await vi.advanceTimersByTimeAsync(200);

            await adapter.disconnect();
            releaseSecurity();
            await vi.advanceTimersByTimeAsync(0);

            expect(adapter.state).toBe(AdapterState.Disconnect);
            expect(adapter.address).toBeNull();
        } finally {
            vi.useRealTimers();
        }
    });

    /**
     * An empty account is a disconnection. Reporting Connected with an empty address
     * left `connected === true` with nothing to sign with, and the emit block then
     * fired `disconnect` against a state that still said Connected.
     */
    it('disconnects instead of connecting to an empty address', async () => {
        vi.useFakeTimers();
        try {
            const adapter = makeConnected();
            const onConnect = vi.fn();
            const onDisconnect = vi.fn();
            const onAccountsChanged = vi.fn();
            adapter.on('connect', onConnect);
            adapter.on('disconnect', onDisconnect);
            adapter.on('accountsChanged', onAccountsChanged);

            fireAccountsChanged('');
            await vi.advanceTimersByTimeAsync(1000);

            expect(adapter.address).toBeNull();
            expect(adapter.state).toBe(AdapterState.Disconnect);
            expect(adapter.connected).toBe(false);
            expect(onAccountsChanged).toHaveBeenCalledWith('', ADDR_A);
            expect(onDisconnect).toHaveBeenCalledTimes(1);
            expect(onConnect).not.toHaveBeenCalled();
        } finally {
            vi.useRealTimers();
        }
    });

    it('still applies an account change during a live session', async () => {
        vi.useFakeTimers();
        try {
            const adapter = makeConnected();
            const onAccountsChanged = vi.fn();
            adapter.on('accountsChanged', onAccountsChanged);

            fireAccountsChanged(STALE);
            await vi.advanceTimersByTimeAsync(1000);

            expect(adapter.address).toBe(STALE);
            expect(adapter.state).toBe(AdapterState.Connected);
            expect(onAccountsChanged).toHaveBeenCalledWith(STALE, ADDR_A);
        } finally {
            vi.useRealTimers();
        }
    });
});

describe('#connect message stale-session regression', function () {
    const ADDR_A = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';
    const ADDR_B = 'TVj7RNVHy6thbM7BWdSe9G6gXwKhjhdNZS';

    function makeConnected(base58: unknown = ADDR_A) {
        const adapter = new OkxWalletAdapter();
        (adapter as any)._wallet = { ready: true, tronWeb: { defaultAddress: { base58 } } };
        (adapter as any)._address = ADDR_A;
        (adapter as any)._state = AdapterState.Connected;
        adapter.on('error', () => {});
        (adapter as any)._listenEvent();
        return adapter;
    }

    function fireConnect() {
        window.dispatchEvent(
            new MessageEvent('message', {
                origin: window.location.origin,
                data: { message: { action: 'connect' } },
            })
        );
    }

    function parkSecurity(adapter: unknown) {
        let release: () => void = () => {};
        let reject: (reason?: unknown) => void = () => {};
        vi.spyOn(adapter as any, 'checkSecurity').mockImplementation(
            () =>
                new Promise<void>((resolve, rej) => {
                    release = resolve;
                    reject = rej;
                })
        );
        return {
            release: () => release(),
            reject: () => reject(new Error('blocked')),
        };
    }

    /**
     * The handler awaits `checkSecurity()` before writing state. A `disconnect()`
     * landing during that await used to be ignored, so the handler wrote the
     * address back and flipped the adapter to Connected after the disconnect.
     */
    it('does not resurrect state when disconnect lands during checkSecurity', async () => {
        const adapter = makeConnected();
        const security = parkSecurity(adapter);
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        fireConnect();
        await adapter.disconnect();

        security.release();
        await vi.advanceTimersByTimeAsync(0);

        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(adapter.address).toBeNull();
        expect(adapter.connected).toBe(false);
        expect(onConnect).not.toHaveBeenCalled();
    });

    /**
     * The failure path tears state down unconditionally, so a stale rejection
     * must not disconnect a session that has already been re-established.
     */
    it('does not tear down a newer session when a stale checkSecurity rejects', async () => {
        const adapter = makeConnected();
        const security = parkSecurity(adapter);

        fireConnect();
        await adapter.disconnect();
        // a fresh session starts before the stale check settles
        (adapter as any)._address = ADDR_B;
        (adapter as any)._state = AdapterState.Connected;
        (adapter as any)._listenEvent();

        security.reject();
        await vi.advanceTimersByTimeAsync(0);

        expect(adapter.state).toBe(AdapterState.Connected);
        expect(adapter.address).toBe(ADDR_B);
    });

    it('ignores a connect message that yields no address', async () => {
        const adapter = makeConnected(null);
        (adapter as any)._address = null;
        (adapter as any)._state = AdapterState.Disconnect;
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        fireConnect();
        await vi.advanceTimersByTimeAsync(0);

        expect(adapter.address).toBeNull();
        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(onConnect).not.toHaveBeenCalled();
    });

    it('still connects during a live session', async () => {
        const adapter = makeConnected();
        (adapter as any)._address = null;
        (adapter as any)._state = AdapterState.Disconnect;
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        fireConnect();
        await vi.advanceTimersByTimeAsync(0);

        expect(adapter.address).toBe(ADDR_A);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(onConnect).toHaveBeenCalledWith(ADDR_A);
    });
});
