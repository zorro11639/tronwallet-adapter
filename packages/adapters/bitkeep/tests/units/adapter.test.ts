import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { BitKeepAdapter } from '../../src/adapter.js';
import { AdapterState, WalletReadyState, WalletConnectionError } from '@tronweb3/tronwallet-abstract-adapter';

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

describe('BitKeepAdapter', () => {
    test('should be defined', () => {
        expect(BitKeepAdapter).not.toBeNull();
    });
    test('#constructor() should work fine', () => {
        const adapter = new BitKeepAdapter();
        expect(adapter.name).toEqual('Bitget Wallet');
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

describe('#connect() empty-account regression', () => {
    const ADDRESS = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';

    afterEach(() => {
        delete (window as any).bitkeep;
    });

    function makeAdapter(defaultAddress: unknown) {
        const adapter = new BitKeepAdapter();
        (adapter as any)._readyState = WalletReadyState.Found;
        (adapter as any)._wallet = {
            tron: { request: vi.fn().mockResolvedValue({ code: 200 }) },
            tronWeb: { defaultAddress },
        };
        adapter.on('error', () => {});
        return adapter;
    }

    /**
     * `tron_requestAccounts` answering with code 200 does not mean an address is
     * available yet; the adapter used to fall back to `''` and go Connected anyway.
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

    test('still accepts the window.bitkeep fallback address', async () => {
        const adapter = makeAdapter({});
        (window as any).bitkeep = { tronWeb: { defaultAddress: { base58: ADDRESS } } };

        await adapter.connect();

        expect(adapter.address).toBe(ADDRESS);
        expect(adapter.connected).toBe(true);
    });

    test('connects when a real address is available', async () => {
        const adapter = makeAdapter({ base58: ADDRESS });
        const onConnect = vi.fn();
        adapter.on('connect', onConnect);

        await adapter.connect();

        expect(adapter.address).toBe(ADDRESS);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(onConnect).toHaveBeenCalledWith(ADDRESS);
    });
});
