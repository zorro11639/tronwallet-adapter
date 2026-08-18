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
