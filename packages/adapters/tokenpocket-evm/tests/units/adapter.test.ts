import { TokenPocketAdapter } from '../../src/adapter.js';
import { describe, it, expect } from 'vitest';

describe('TokenPocketAdapter', () => {
    it('base props should be valid', () => {
        const adapter = new TokenPocketAdapter();
        expect(adapter.name).toEqual('TokenPocket');
        expect(adapter.url).toEqual('https://tokenpocket.pro/');
        expect(adapter.readyState).toEqual('Loading');
        expect(adapter.address).toEqual(null);
        expect(adapter.connected).toEqual(false);
    });
});
