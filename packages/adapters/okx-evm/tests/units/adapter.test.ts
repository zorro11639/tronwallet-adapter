import { OkxWalletAdapter } from '../../src/adapter.js';
import { describe, it, expect } from 'vitest';

describe('OkxWalletAdapter', () => {
    it('base props should be valid', () => {
        const adapter = new OkxWalletAdapter();
        expect(adapter.name).toEqual('OKX Wallet');
        expect(adapter.url).toEqual('https://web3.okx.com/');
        expect(adapter.readyState).toEqual('Loading');
        expect(adapter.address).toEqual(null);
        expect(adapter.connected).toEqual(false);
    });
});
