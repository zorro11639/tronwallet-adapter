import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Adapter, AdapterState, WalletReadyState } from '@tronweb3/tronwallet-abstract-adapter';
import type { AdapterName } from '@tronweb3/tronwallet-abstract-adapter';
import { defineComponent, h, nextTick } from 'vue';
import { WalletProvider } from '../../src/WalletProvider.js';
import { useWallet } from '../../src/useWallet.js';

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

/** Adapter that mimics how the real ones report a disconnect triggered from the wallet UI. */
class ConnectableAdapter extends FakeAdapter {
    declare state: AdapterState;
    declare connected: boolean;

    connect = vi.fn(async () => {
        this.address = '1';
        this.connected = true;
        this.state = AdapterState.Connected;
        this.emit('connect', '1');
        this.emit('stateChanged', this.state);
        return undefined;
    });

    /** The wallet is disconnected outside the dapp. `setState()` emits `stateChanged`. */
    disconnectExternally({ withAccountsChanged = false } = {}) {
        this.address = null;
        this.connected = false;
        this.state = AdapterState.Disconnect;
        this.emit('stateChanged', this.state);
        if (withAccountsChanged) {
            // TronLink reports the removed account as an empty string.
            this.emit('accountsChanged', '', '1');
        }
        this.emit('disconnect');
    }
}

describe('WalletProvider state on external disconnect', () => {
    let seen: ReturnType<typeof useWallet>;

    const Probe = defineComponent({
        setup() {
            seen = useWallet();
            return () => 'probe';
        },
    });

    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('tronAdapterName', JSON.stringify('Fake'));
    });

    async function mountConnected() {
        const adapter = new ConnectableAdapter();
        mount(WalletProvider, {
            props: { adapters: [adapter], autoConnect: false },
            slots: { default: () => h(Probe) },
        });
        await nextTick();
        await adapter.connect();
        await nextTick();
        return adapter;
    }

    test('should report connected state after connecting', async () => {
        await mountConnected();
        expect(seen.connected.value).toBe(true);
        expect(seen.address.value).toEqual('1');
    });

    test('should clear connected and address when the wallet disconnects', async () => {
        const adapter = await mountConnected();

        adapter.disconnectExternally();
        await nextTick();

        expect(seen.connected.value).toBe(false);
        expect(seen.address.value).toBeNull();
    });

    test('should store null rather than an empty string when the account is removed', async () => {
        const adapter = await mountConnected();

        adapter.disconnectExternally({ withAccountsChanged: true });
        await nextTick();

        expect(seen.connected.value).toBe(false);
        expect(seen.address.value).toBeNull();
    });
});
