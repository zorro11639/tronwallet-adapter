import { WalletNotSelectedError } from '@tronweb3/tronwallet-abstract-adapter';
import type {
    Adapter,
    WalletError,
    AdapterName,
    Transaction,
    WalletReadyState,
} from '@tronweb3/tronwallet-abstract-adapter';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';
import type { FC, ReactNode } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Wallet } from './useWallet.js';
import { WalletContext } from './useWallet.js';
import { useLocalStorage } from './useLocalStorage.js';

export interface WalletProviderProps {
    children: ReactNode;
    adapters?: Adapter[];
    onError?: (error: WalletError) => void;
    onConnect?: (address: string) => unknown;
    onDisconnect?: () => unknown;
    onAccountsChanged?: (address: string, preAddr?: string) => unknown;
    onReadyStateChanged?: (state: WalletReadyState) => unknown;
    onChainChanged?: (chainData: unknown) => unknown;
    onAdapterChanged?: (adapter: Adapter | null) => unknown;
    localStorageKey?: string;
    autoConnect?: boolean;
    disableAutoConnectOnLoad?: boolean;
}

const initialState: {
    wallet: Wallet | null;
    address: string | null;
    connected: boolean;
    adapter: Adapter | null;
} = {
    wallet: null,
    address: null,
    connected: false,
    adapter: null,
};

export const WalletProvider: FC<WalletProviderProps> = function ({
    children,
    adapters: adaptersPro = null,
    onError = (error) => console.error(error),
    onReadyStateChanged,
    onConnect,
    onDisconnect,
    onAccountsChanged,
    onChainChanged,
    onAdapterChanged,
    localStorageKey = 'tronAdapterName',
    autoConnect = true,
    disableAutoConnectOnLoad = false,
}) {
    const [name, setName] = useLocalStorage<AdapterName | null>(localStorageKey, null);
    const [{ wallet, connected, address, adapter }, setState] = useState(initialState);
    const [connecting, setConnecting] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const isConnecting = useRef(false);
    const isDisconnecting = useRef(false);
    /**
     * `connect()`/`disconnect()` are awaited, so every state write in their `finally`
     * happens on a later tick — by which time the provider may already be gone. React
     * warns about the update, and under a test runner the DOM is torn down first and the
     * update throws outright. The refs above are safe to write after unmount; the state
     * setters are not.
     */
    const isMounted = useRef(true);
    useEffect(function () {
        isMounted.current = true;
        return function () {
            isMounted.current = false;
        };
    }, []);

    // set default supported adapters
    const adapters = useMemo(() => {
        if (adaptersPro === null) {
            return [new TronLinkAdapter()];
        }
        return adaptersPro;
    }, [adaptersPro]);
    const [wallets, setWallets] = useState<Wallet[]>(() =>
        adapters.map((adapter) => ({
            adapter,
            state: adapter.state,
        }))
    );
    useEffect(
        function () {
            setWallets((prevWallets) =>
                adapters.map((adapter, index) => {
                    const wallet = prevWallets[index];
                    if (wallet && wallet.adapter === adapter && wallet.state === adapter.state) {
                        return wallet;
                    }
                    return {
                        adapter,
                        state: adapter.state,
                    };
                })
            );

            function handleStateChange(this: Adapter) {
                setWallets((prevWallets) => {
                    const index = prevWallets.findIndex((wallet) => wallet.adapter === this);
                    if (index === -1) {
                        return prevWallets;
                    }
                    return prevWallets.map((wallet, idx) => {
                        if (idx === index) {
                            return {
                                ...wallet,
                                state: wallet.adapter.state,
                            };
                        }
                        return wallet;
                    });
                });
            }
            adapters.forEach((adapter) => adapter.on('stateChanged', handleStateChange, adapter));
            return () => adapters.forEach((adapter) => adapter.off('stateChanged', handleStateChange, adapter));
        },
        [adapters]
    );

    // Set state when choosen wallet changes
    useEffect(
        function () {
            const wallet = name && wallets.find((item) => item.adapter.name === name);
            if (wallet) {
                setState({
                    wallet,
                    adapter: wallet.adapter,
                    connected: wallet.adapter.connected,
                    address: wallet.adapter.address,
                });
            } else {
                setState(initialState);
            }
        },
        [name, wallets]
    );

    const preAdapter = useRef<Adapter | null>(null);
    useEffect(
        function () {
            if (adapter !== preAdapter.current) {
                onAdapterChanged?.(adapter);
                preAdapter.current = adapter;
            }
        },
        [adapter, onAdapterChanged]
    );

    const handleConnect = useCallback(
        function (addr: string) {
            if (!adapter) {
                return setName(null);
            }
            setState((state) => ({
                ...state,
                connected: adapter.connected,
                address: adapter.address,
            }));
            onConnect?.(addr);
        },
        [adapter, setName, onConnect]
    );

    const handleError = useCallback(
        function (error: WalletError) {
            onError(error);
            return error;
        },
        [onError]
    );
    const handleAccountChange = useCallback(
        function (address: string, preAddr?: string) {
            // Adapters report "no account" as an empty string, while this state uses `null`
            // for it, so normalise before storing. The callback still gets the raw value.
            setState((state) => ({ ...state, address: address || null, connected: !!state.adapter?.connected }));
            onAccountsChanged?.(address, preAddr);
        },
        [onAccountsChanged]
    );
    const handleDisconnect = useCallback(
        function () {
            setState((state) => ({
                ...state,
                address: state.adapter?.address ?? null,
                connected: !!state.adapter?.connected,
            }));
            onDisconnect?.();
        },
        [onDisconnect]
    );
    const handleReadyStateChanged = useCallback(
        function (readyState: WalletReadyState) {
            onReadyStateChanged?.(readyState);
        },
        [onReadyStateChanged]
    );
    const handleChainChanged = useCallback(
        function (chainData: unknown) {
            onChainChanged?.(chainData);
        },
        [onChainChanged]
    );
    useEffect(
        function () {
            if (adapter) {
                adapter.on('connect', handleConnect);
                adapter.on('error', handleError);
                adapter.on('accountsChanged', handleAccountChange);
                adapter.on('chainChanged', handleChainChanged);
                adapter.on('readyStateChanged', handleReadyStateChanged);
                adapter.on('disconnect', handleDisconnect);
                return () => {
                    adapter.off('connect', handleConnect);
                    adapter.off('error', handleError);
                    adapter.off('accountsChanged', handleAccountChange);
                    adapter.off('chainChanged', handleChainChanged);
                    adapter.off('readyStateChanged', handleReadyStateChanged);
                    adapter.off('disconnect', handleDisconnect);
                };
            }
        },
        [
            adapter,
            handleConnect,
            handleError,
            handleAccountChange,
            handleChainChanged,
            handleReadyStateChanged,
            handleDisconnect,
        ]
    );
    // disconnect the previous when wallet changes
    useEffect(() => {
        return () => {
            // Cleanup cannot await, so the rejection has to be handled here or it surfaces as
            // an unhandled one. The listeners are already off by this point, so a failure means
            // the old adapter may still be connected with nothing watching it -- worth a warning
            // even though there is nothing left to retry against.
            adapter?.disconnect().catch((error) => {
                console.warn(`[${adapter.name}]: Failed to disconnect the previous wallet.`, error);
            });
        };
    }, [adapter]);

    const hasManuallySetName = useRef(false);
    // auto connect
    useEffect(
        function () {
            const canAutoConnect = autoConnect && (!disableAutoConnectOnLoad || hasManuallySetName.current);
            if (isConnecting.current || !canAutoConnect || !adapter) {
                return;
            }
            (async function connect() {
                isConnecting.current = true;
                setConnecting(true);
                try {
                    await adapter.connect();
                } catch {
                    // setName(null);
                } finally {
                    isConnecting.current = false;
                    if (isMounted.current) setConnecting(false);
                }
            })();
        },
        [isConnecting, autoConnect, adapter, setName, disableAutoConnectOnLoad]
    );
    const select = useCallback(
        (name: AdapterName) => {
            hasManuallySetName.current = true;
            setName(name);
        },
        [setName]
    );

    const connect = useCallback(
        async function () {
            if (isConnecting.current || isDisconnecting.current || connected) {
                return;
            }
            if (!adapter) throw handleError(new WalletNotSelectedError());
            isConnecting.current = true;
            setConnecting(true);
            try {
                await adapter.connect();
            } catch (error: unknown) {
                setName(null);
                throw error;
            } finally {
                isConnecting.current = false;
                if (isMounted.current) setConnecting(false);
            }
        },
        [isConnecting, isDisconnecting, adapter, connected, handleError, setName]
    );

    const disconnect = useCallback(
        async function () {
            if (isDisconnecting.current) return;
            if (!adapter) return setName(null);

            isDisconnecting.current = true;
            setDisconnecting(true);
            try {
                await adapter.disconnect();
                setName(null);
            } catch (error: any) {
                setName(null);
                throw error;
            } finally {
                isDisconnecting.current = false;
                if (isMounted.current) setDisconnecting(false);
            }
        },
        [adapter, isDisconnecting, setName]
    );

    const signTransaction = useCallback(
        async function (transaction: Transaction) {
            if (!adapter) throw handleError(new WalletNotSelectedError());
            return await adapter.signTransaction(transaction);
        },
        [adapter, handleError]
    );

    const signMessage = useCallback(
        async function (message: string) {
            if (!adapter) throw handleError(new WalletNotSelectedError());
            return await adapter.signMessage(message);
        },
        [adapter, handleError]
    );

    return (
        <WalletContext.Provider
            value={{
                disableAutoConnectOnLoad,
                autoConnect,
                wallets,
                wallet,
                address,
                connecting,
                connected,
                disconnecting,

                select,
                connect,
                disconnect,
                signTransaction,
                signMessage,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
