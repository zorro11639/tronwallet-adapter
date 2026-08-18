import { describe, it, expect, vi } from 'vitest';
import { AdapterState } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletConnectAdapter } from '../../src/adapter.js';

const ADDR_A = 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa';
const ADDR_B = 'TVj7RNVHy6thbM7BWdSe9G6gXwKhjhdNZS';

/** Stand-in for walletconnect-tron's wallet, so the lazy import inside connect() never runs. */
function makeWallet(address: string = ADDR_A) {
    const handlers: Record<string, (...args: any[]) => void> = {};
    return {
        connect: vi.fn(async () => ({ address })),
        disconnect: vi.fn(async () => undefined),
        signMessage: vi.fn(),
        signTransaction: vi.fn(),
        checkConnectStatus: vi.fn(async () => ({ address: ADDR_A })),
        on: vi.fn((event: string, handler: any) => (handlers[event] = handler)),
        off: vi.fn(),
        /** Fire an event the way the underlying wallet would. */
        fire: (event: string, ...args: any[]) => handlers[event]?.(...args),
    };
}

function makeAdapter(wallet: ReturnType<typeof makeWallet>) {
    const adapter = new WalletConnectAdapter({ network: 'Nile', options: { projectId: 'test' } } as any);
    (adapter as any)._wallet = wallet;
    adapter.on('error', () => {});
    return adapter;
}

/** Subscribe the way a dapp would, so we can assert what it actually learns. */
function spyEvents(adapter: WalletConnectAdapter) {
    const events = {
        connect: vi.fn(),
        disconnect: vi.fn(),
        accountsChanged: vi.fn(),
        stateChanged: vi.fn(),
    };
    Object.entries(events).forEach(([name, fn]) => adapter.on(name as any, fn));
    return events;
}

async function connected() {
    const wallet = makeWallet();
    const adapter = makeAdapter(wallet);
    await adapter.connect();
    return { wallet, adapter, events: spyEvents(adapter) };
}

describe('WalletConnectAdapter', () => {
    it('rejects an empty connect address and closes the session', async () => {
        const wallet = makeWallet('');
        const adapter = makeAdapter(wallet);
        const events = spyEvents(adapter);

        await expect(adapter.connect()).rejects.toThrow(/Request connect error/);

        expect(adapter.address).toBeNull();
        expect(adapter.connected).toBe(false);
        expect(events.connect).not.toHaveBeenCalled();
        // Left open, the next connect() would silently reuse this half-open session.
        expect(wallet.disconnect).toHaveBeenCalledTimes(1);
        expect(wallet.on).not.toHaveBeenCalled();
    });

    it('connects with a real address', async () => {
        const wallet = makeWallet();
        const adapter = makeAdapter(wallet);
        const events = spyEvents(adapter);

        await adapter.connect();

        expect(adapter.address).toBe(ADDR_A);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(adapter.connected).toBe(true);
        expect(events.connect).toHaveBeenCalledWith(ADDR_A);
    });

    it('disconnects fully on an empty account list', async () => {
        const { wallet, adapter, events } = await connected();

        wallet.fire('accountsChanged', []);

        expect(adapter.address).toBeNull();
        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(adapter.connected).toBe(false);
        expect(events.disconnect).toHaveBeenCalledTimes(1);
        expect(events.stateChanged).toHaveBeenCalledWith(AdapterState.Disconnect);
        expect(events.accountsChanged).toHaveBeenCalledWith('', ADDR_A);
    });

    it('blocks signing once the accounts went empty', async () => {
        const { wallet, adapter } = await connected();

        wallet.fire('accountsChanged', []);

        await expect(adapter.signMessage('hello')).rejects.toBeTruthy();
    });

    it('stays connected when switching accounts', async () => {
        const { wallet, adapter, events } = await connected();

        wallet.fire('accountsChanged', [ADDR_B]);

        expect(adapter.address).toBe(ADDR_B);
        expect(adapter.state).toBe(AdapterState.Connected);
        expect(events.accountsChanged).toHaveBeenCalledWith(ADDR_B, ADDR_A);
        expect(events.disconnect).not.toHaveBeenCalled();
    });

    it('notifies subscribers when the status probe fails', async () => {
        const { wallet, adapter, events } = await connected();
        wallet.checkConnectStatus.mockRejectedValue(new Error('session expired'));

        await expect(adapter.getConnectionStatus()).resolves.toEqual({ address: '' });

        expect(adapter.address).toBeNull();
        expect(adapter.state).toBe(AdapterState.Disconnect);
        expect(events.disconnect).toHaveBeenCalledTimes(1);
        expect(events.stateChanged).toHaveBeenCalledWith(AdapterState.Disconnect);
    });
});
