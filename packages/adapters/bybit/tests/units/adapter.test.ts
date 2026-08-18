import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import { BybitWalletAdapter } from '../../src/index.js';
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
describe('BybitWalletAdapter', function () {
    describe('#adapter()', function () {
        test('constructor', () => {
            const adapter = new BybitWalletAdapter();
            expect(adapter.name).toEqual('Bybit Wallet');
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
        const adapter = new BybitWalletAdapter();
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
