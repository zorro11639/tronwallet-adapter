import { WalletNotSelectedError } from '@tronweb3/tronwallet-abstract-adapter';
import type {
    Transaction,
    Adapter,
    AdapterName,
    WalletError,
    WalletReadyState,
} from '@tronweb3/tronwallet-abstract-adapter';
import {
    computed,
    defineComponent,
    markRaw,
    onUnmounted,
    provide,
    reactive,
    readonly,
    ref,
    shallowReadonly,
    watch,
} from 'vue';
import type { Ref, PropType, UnwrapRef } from 'vue';
import { useLocalStorage } from './useLocalStorage.js';
import type { Wallet } from './useWallet.js';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';

export interface WalletProviderProps {
    adapters?: Adapter[];
    localStorageKey?: string;
    autoConnect?: boolean;
    disableAutoConnectOnLoad?: boolean;
}

interface State {
    wallet: Wallet | null;
    address: string | null;
    connected: boolean;
    adapter?: Adapter;
}
const initialState: State = {
    wallet: null,
    address: null,
    connected: false,
    adapter: undefined,
};
function useRef<T>(initialValue: T | (() => T)): [Ref<T>, (v: T) => void] {
    const v = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    const state = ref<T>(v);
    const setState = (v: T) => {
        state.value = v as UnwrapRef<T>;
    };
    return [state as Ref<T>, setState];
}

export const WalletProvider = defineComponent({
    props: {
        adapters: {
            type: Array as PropType<Adapter[]>,
            default: () => [new TronLinkAdapter()],
        },
        localStorageKey: {
            type: String,
            default: 'tronAdapterName',
        },
        autoConnect: {
            type: Boolean,
            default: true,
        },
        disableAutoConnectOnLoad: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['error', 'connect', 'disconnect', 'accountsChanged', 'readyStateChanged', 'chainChanged', 'adapterChanged'],
    setup(props, { emit, slots }) {
        const localStorageKey = computed(() => props.localStorageKey);
        const [name, setName] = useLocalStorage<AdapterName | null>(localStorageKey, null);
        const state = reactive({ ...initialState });
        const setState = (v: Partial<State>) => {
            Object.assign(state, v);
        };

        const [connecting, setConnecting] = useRef<boolean>(() => false);
        const [disconnecting, setDisconnecting] = useRef(false);
        let isConnecting = false;
        let isDisconnecting = false;

        const [wallets, setWallets] = useRef(
            props.adapters.map((adapter) => ({
                adapter,
                state: adapter.state,
            }))
        );

        function handleStateChange(this: Adapter) {
            const index = props.adapters.findIndex((adapter) => adapter === this);
            if (index === -1) {
                return;
            }
            setWallets(
                props.adapters.map((adapter) => ({
                    adapter,
                    state: adapter.state,
                }))
            );
        }

        // Adapters are usually created by the host app and outlive this component, so every
        // listener attached below must be removed again. `onCleanup` only covers the source
        // changing -- in Vue 3.4 it does not run when the watcher is stopped -- so the current
        // remover is also kept here and invoked from `onUnmounted`.
        let removeStateChangedListeners: (() => void) | undefined;
        let removeAdapterListeners: (() => void) | undefined;

        watch(
            () => props.adapters,
            (adapters, preAdapters, onCleanup) => {
                adapters.forEach((adapter) => adapter.on('stateChanged', handleStateChange, adapter));
                const remove = () => {
                    adapters.forEach((adapter) => adapter.off('stateChanged', handleStateChange, adapter));
                };
                removeStateChangedListeners = remove;
                onCleanup(remove);
                setWallets(
                    adapters.map((adapter) => ({
                        adapter,
                        state: adapter.state,
                    }))
                );
            },
            {
                immediate: true,
            }
        );

        watch(
            name,
            (name) => {
                const adapter = name && props.adapters.find((adapter) => adapter.name === name);
                if (adapter) {
                    setState({
                        wallet: {
                            adapter,
                            state: adapter.state,
                        },
                        adapter,
                        connected: adapter.connected,
                        address: adapter.address,
                    });
                } else {
                    setState(initialState);
                }
            },
            {
                immediate: true,
            }
        );

        const handleConnect = (addr: string) => {
            if (!state.adapter) {
                return setName(null);
            }
            setState({ connected: state.adapter.connected, address: state.adapter.address });
            emit('connect', addr);
        };
        const handleError = (error: WalletError) => {
            emit('error', error);
            return error;
        };
        const handleAccountChange = (address: string, preAddr: string) => {
            // Adapters report "no account" as an empty string, while this state uses `null` for
            // it. Read `connected` back from the adapter too: not every adapter emits
            // `stateChanged` alongside this event, and that is the only other thing that would
            // refresh it. The event keeps the raw value.
            setState({ address: address || null, connected: !!state.adapter?.connected });
            emit('accountsChanged', address, preAddr);
        };
        const handleDisconnect = () => {
            // Same reasoning: an adapter may emit only `disconnect`, so sync from it directly
            // instead of relying on a `stateChanged` that may never arrive.
            setState({ address: state.adapter?.address ?? null, connected: !!state.adapter?.connected });
            emit('disconnect');
        };
        const handleReadyStateChanged = (readyState: WalletReadyState) => {
            emit('readyStateChanged', readyState);
        };
        const handleChainChanged = (chainData: unknown) => {
            emit('chainChanged', chainData);
        };

        watch(
            () => state.adapter,
            (adapter, preAdapter, onCleanup) => {
                // Disconnecting stays tied to the selection changing, deliberately outside
                // `onCleanup`, so unmounting the provider does not disconnect the user's wallet.
                if (preAdapter) {
                    preAdapter.disconnect();
                }
                if (adapter) {
                    adapter.on('connect', handleConnect);
                    adapter.on('error', handleError);
                    adapter.on('accountsChanged', handleAccountChange);
                    adapter.on('chainChanged', handleChainChanged);
                    adapter.on('readyStateChanged', handleReadyStateChanged);
                    adapter.on('disconnect', handleDisconnect);
                    const remove = () => {
                        adapter.off('connect', handleConnect);
                        adapter.off('error', handleError);
                        adapter.off('accountsChanged', handleAccountChange);
                        adapter.off('chainChanged', handleChainChanged);
                        adapter.off('readyStateChanged', handleReadyStateChanged);
                        adapter.off('disconnect', handleDisconnect);
                    };
                    removeAdapterListeners = remove;
                    onCleanup(remove);
                } else {
                    removeAdapterListeners = undefined;
                }
                if (adapter !== preAdapter) {
                    emit('adapterChanged', adapter);
                }
            },
            {
                immediate: true,
            }
        );

        onUnmounted(() => {
            removeStateChangedListeners?.();
            removeStateChangedListeners = undefined;
            removeAdapterListeners?.();
            removeAdapterListeners = undefined;
        });

        const hasManuallySetName = ref(false);
        watch(
            [() => props.autoConnect, () => props.disableAutoConnectOnLoad, () => state.adapter],
            () => {
                const canAutoConnect =
                    props.autoConnect && (!props.disableAutoConnectOnLoad || hasManuallySetName.value);
                if (isConnecting || !canAutoConnect || !state.adapter) {
                    return;
                }
                (async function connect() {
                    isConnecting = true;
                    setConnecting(true);
                    try {
                        await state.adapter?.connect();
                    } catch {
                        // setName(null);
                    } finally {
                        setConnecting(false);
                        isConnecting = false;
                    }
                })();
            },
            {
                immediate: true,
            }
        );
        watch(wallets, (wallets) => {
            const wallet = wallets.find((item) => item.adapter.name === name.value);
            if (wallet) {
                const { adapter } = wallet;
                setState({
                    wallet: {
                        adapter: adapter,
                        state: adapter.state,
                    },
                    connected: adapter.connected,
                    address: adapter.address,
                    adapter: adapter,
                });
            }
        });

        const select = markRaw((name: AdapterName) => {
            hasManuallySetName.value = true;
            setName(name);
            setConnecting(false);
            setDisconnecting(false);
            isConnecting = false;
            isDisconnecting = false;
        });
        const connect = markRaw(async () => {
            if (isConnecting || isDisconnecting || state.connected) {
                return;
            }
            if (!state.adapter) throw handleError(new WalletNotSelectedError());
            isConnecting = true;
            setConnecting(true);
            try {
                await state.adapter.connect();
            } catch (error: unknown) {
                setName(null);
                throw error;
            } finally {
                setConnecting(false);
                isConnecting = false;
            }
        });

        const disconnect = markRaw(async () => {
            if (disconnecting.value) {
                return;
            }
            if (!state.adapter) {
                return setName(null);
            }
            isDisconnecting = true;
            setDisconnecting(true);
            try {
                await state.adapter.disconnect();
            } finally {
                setName(null);
                setDisconnecting(false);
                isDisconnecting = false;
            }
        });

        const signTransaction = markRaw(async (transaction: Transaction) => {
            if (!state.adapter) throw handleError(new WalletNotSelectedError());
            return await state.adapter.signTransaction(transaction);
        });

        const signMessage = markRaw(async (message: string) => {
            if (!state.adapter) throw handleError(new WalletNotSelectedError());
            return await state.adapter.signMessage(message);
        });

        const disableAutoConnectOnLoad = computed(() => props.disableAutoConnectOnLoad);
        const autoConnect = computed(() => props.autoConnect);
        const wallet = computed(() => state.wallet);
        const provided = shallowReadonly({
            disableAutoConnectOnLoad,
            autoConnect,
            wallets: readonly(wallets),
            wallet,
            address: computed(() => state.address),
            connecting: readonly(connecting),
            connected: computed(() => state.connected),
            disconnecting: readonly(disconnecting),

            select,
            connect,
            disconnect,
            signTransaction,
            signMessage,
        });
        provide('TronWalletContext', provided);

        return () => (slots.default ? slots.default() : '');
    },
});
