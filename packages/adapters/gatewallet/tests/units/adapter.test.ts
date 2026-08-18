import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import { GateWalletAdapter } from '../../src/index.js';
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
describe('GateWalletAdapter', function () {
    describe('#adapter()', function () {
        test('constructor', () => {
            const adapter = new GateWalletAdapter();
            expect(adapter.name).toEqual('Gate Wallet');
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

describe('#connect() empty-account regression', function () {
    const ADDRESS = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';

    /** Desktop extension path: isInGateApp() is false under the default test UA. */
    function makeAdapter(accounts: unknown) {
        const adapter = new GateWalletAdapter();
        (adapter as any)._readyState = WalletReadyState.Found;
        (adapter as any)._updateWallet = vi.fn().mockResolvedValue(undefined);
        (adapter as any)._wallet = {
            request: vi.fn().mockResolvedValue(accounts),
            tronWeb: { defaultAddress: {} },
            on: vi.fn(),
            removeListener: vi.fn(),
        };
        adapter.on('error', () => {});
        return adapter;
    }

    /**
     * The empty-address guard used to be gated on `isInGateApp()`, so the browser
     * extension path could reach Connected with `res[0] === undefined`.
     */
    test.each([
        ['an empty array', []],
        ['an array holding an empty string', ['']],
        ['an array holding null', [null]],
    ])('rejects on the extension path when the wallet returns %s', async (_label, accounts) => {
        const adapter = makeAdapter(accounts);
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        await expect(adapter.connect()).rejects.toBeInstanceOf(WalletConnectionError);
        expect(adapter.address).toBeNull();
        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(adapter.connected).toBe(false);
        expect(onConnect).not.toHaveBeenCalled();
    });

    test('connects when the extension returns a real address', async () => {
        const adapter = makeAdapter([ADDRESS]);
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        await adapter.connect();

        expect(adapter.address).toBe(ADDRESS);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(onConnect).toHaveBeenCalledWith(ADDRESS);
    });
});

describe('#accountsChanged stale-timer regression', function () {
    const ADDR_A = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';
    const STALE = 'TVj7RNVHy6thbM7BWdSe9G6gXwKhjhdNZS';

    function makeConnected() {
        const adapter = new GateWalletAdapter();
        (adapter as any)._wallet = {
            tronWeb: { defaultAddress: { base58: ADDR_A } },
            on: vi.fn(),
            off: vi.fn(),
        };
        (adapter as any)._address = ADDR_A;
        (adapter as any)._state = AdapterState.Connected;
        adapter.on('error', () => {});
        return adapter;
    }

    /**
     * `onGateAccountChange` deferred its state update by 200ms without keeping the
     * timer, so `disconnect()` detached the provider listener but could not stop
     * work already queued — it then rewrote the address and went back to Connected.
     */
    test('does not resurrect state after disconnect', async () => {
        const adapter = makeConnected();

        (adapter as any).onGateAccountChange([STALE]);
        await adapter.disconnect();

        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(adapter.address).toBeNull();

        await vi.advanceTimersByTimeAsync(1000);

        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(adapter.address).toBeNull();
        expect(adapter.connected).toBe(false);
    });

    test('does not emit connect for an event cancelled by disconnect', async () => {
        const adapter = makeConnected();
        const onConnect = vi.fn();
        const onAccountsChanged = vi.fn();
        adapter.on('connect', onConnect);
        adapter.on('accountsChanged', onAccountsChanged);

        (adapter as any).onGateAccountChange([STALE]);
        await adapter.disconnect();
        await vi.advanceTimersByTimeAsync(1000);

        expect(onConnect).not.toHaveBeenCalled();
        expect(onAccountsChanged).not.toHaveBeenCalled();
    });

    /** A disconnect landing during the awaited security check must also be honoured. */
    test('abandons an in-flight callback when disconnect lands during checkSecurity', async () => {
        const adapter = makeConnected();
        let releaseSecurity: () => void = () => {};
        vi.spyOn(adapter as any, 'checkSecurity').mockImplementation(
            () => new Promise<void>((resolve) => (releaseSecurity = resolve))
        );

        (adapter as any).onGateAccountChange([STALE]);
        await vi.advanceTimersByTimeAsync(200);

        await adapter.disconnect();
        releaseSecurity();
        await vi.advanceTimersByTimeAsync(0);

        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(adapter.address).toBeNull();
    });

    test('still applies an account change during a live session', async () => {
        const adapter = makeConnected();
        const onAccountsChanged = vi.fn();
        adapter.on('accountsChanged', onAccountsChanged);

        (adapter as any).onGateAccountChange([STALE]);
        await vi.advanceTimersByTimeAsync(1000);

        expect(adapter.address).toBe(STALE);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(onAccountsChanged).toHaveBeenCalledWith(STALE, ADDR_A);
    });
});
