import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Adapter, AdapterState, WalletReadyState } from '@tronweb3/tronwallet-abstract-adapter';
import type { AdapterName } from '@tronweb3/tronwallet-abstract-adapter';
import { nextTick } from 'vue';
import { WalletProvider } from '../../src/WalletProvider.js';

const ADAPTER_EVENTS = [
    'stateChanged',
    'connect',
    'error',
    'accountsChanged',
    'chainChanged',
    'readyStateChanged',
    'disconnect',
] as const;

class FakeAdapter extends Adapter {
    name: AdapterName;
    url = 'https://example.com';
    icon = '';
    readyState = WalletReadyState.Found;
    state = AdapterState.Disconnect;
    address: string | null = null;
    connecting = false;
    connected = false;

    constructor(name = 'Fake') {
        super();
        this.name = name as AdapterName;
    }

    connect = vi.fn(async () => undefined);
    disconnect = vi.fn(async () => undefined);
    async signMessage() {
        return '';
    }
    async signTransaction(transaction: any) {
        return transaction;
    }

    /** Total listeners this provider may have attached. */
    listenerTotal() {
        return ADAPTER_EVENTS.reduce((sum, event) => sum + this.listenerCount(event as any), 0);
    }
}

function mountProvider(adapters: Adapter[]) {
    return mount(WalletProvider, { props: { adapters, autoConnect: false } });
}

describe('WalletProvider listener lifecycle', () => {
    beforeEach(() => {
        localStorage.clear();
        // Select the adapter so `state.adapter` is populated and its listeners are attached.
        localStorage.setItem('tronAdapterName', JSON.stringify('Fake'));
    });

    test('should remove every adapter listener on unmount', async () => {
        const adapter = new FakeAdapter();
        const wrapper = mountProvider([adapter]);
        await nextTick();

        expect(adapter.listenerTotal()).toBeGreaterThan(0);

        wrapper.unmount();
        await nextTick();

        expect(adapter.listenerTotal()).toBe(0);
    });

    test('should not accumulate listeners across mount/unmount cycles', async () => {
        const adapter = new FakeAdapter();

        for (let i = 0; i < 5; i++) {
            const wrapper = mountProvider([adapter]);
            await nextTick();
            wrapper.unmount();
            await nextTick();
        }

        expect(adapter.listenerTotal()).toBe(0);
    });

    test('should not disconnect the wallet on unmount', async () => {
        const adapter = new FakeAdapter();
        const wrapper = mountProvider([adapter]);
        await nextTick();

        wrapper.unmount();
        await nextTick();

        // Unmounting a provider must not log the user out; disconnecting stays tied to
        // the selected adapter changing.
        expect(adapter.disconnect).not.toHaveBeenCalled();
    });

    test('should attach the stateChanged listener once per adapter', async () => {
        const first = new FakeAdapter('Fake');
        const second = new FakeAdapter('Other');
        const wrapper = mountProvider([first, second]);
        await nextTick();

        expect(first.listenerCount('stateChanged' as any)).toBe(1);
        expect(second.listenerCount('stateChanged' as any)).toBe(1);

        wrapper.unmount();
        await nextTick();

        expect(first.listenerTotal()).toBe(0);
        expect(second.listenerTotal()).toBe(0);
    });
});
