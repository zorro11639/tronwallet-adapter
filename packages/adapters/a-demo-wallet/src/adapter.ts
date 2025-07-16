import {
    Adapter,
    AdapterState,
    isInBrowser,
    WalletReadyState,
    WalletSignMessageError,
    WalletNotFoundError,
    WalletDisconnectedError,
    WalletConnectionError,
    WalletSignTransactionError,
    type Network,
    WalletGetNetworkError,
    NetworkType,
} from '@tronweb3/tronwallet-abstract-adapter';
import type {
    Transaction,
    SignedTransaction,
    AdapterName,
    BaseAdapterConfig,
} from '@tronweb3/tronwallet-abstract-adapter';
import { openDemoWallet, supportDemoWallet } from './utils.js';

declare global {
    interface Window {
        // Replace with your injected wallet object here
        walletobj?: {
            tron: {
                /**
                 * Get authroized address if wallet is connected.
                 * @returns address in base58 format
                 */
                getAddress: () => string;

                /**
                 * Get authroized address if wallet is connected.
                 */
                getAccount: () => string;
                /**
                 * Get chainId of current network
                 * @returns chainId
                 */
                getChainId: () => string;
                /**
                 * disconnect with wallet
                 */
                disconnect: () => void;
                /**
                 * Sign message
                 */
                signMessageV2: (message: string) => Promise<string>;
                /**
                 * Sign transaction
                 */
                signTransaction: (transaction: Transaction) => Promise<SignedTransaction>;
            };
        };
    }
}

export interface DemoWalletAdapterConfig extends BaseAdapterConfig {
    /**
     * Timeout in millisecond for checking if Demo Wallet exists.
     * Default is 2 * 1000ms
     */
    checkTimeout?: number;
    /**
     * Set whether open Bitget Wallet app using DeepLink if Deeplink is supported.
     * Default is true.
     */
    openAppWithDeeplink?: boolean;
}

export const DemoWalletWalletAdapterName = 'DemoWallet' as AdapterName<'DemoWallet'>;

const chainIdNetworkMap: Record<string, NetworkType> = {
    '0x2b6653dc': NetworkType.Mainnet,
    '0x94a9059e': NetworkType.Shasta,
    '0xcd8690dc': NetworkType.Nile,
};

export class DemoWalletAdapter extends Adapter {
    name = DemoWalletWalletAdapterName;
    url = '<DemoWallet website url>';
    icon = '<DemoWallet icon in Base64 string>';

    config: Required<DemoWalletAdapterConfig>;
    /**
     * Deprecated. Use readyState instead.
     */
    state: AdapterState = AdapterState.Loading;

    private _readyState: WalletReadyState = isInBrowser() ? WalletReadyState.Loading : WalletReadyState.NotFound;
    private _connecting: boolean;
    private _provider: any;
    private _address: string | null;

    constructor(config: DemoWalletAdapterConfig = {}) {
        super();
        const { checkTimeout = 2 * 1000, openUrlWhenWalletNotFound = true, openAppWithDeeplink = true } = config;
        if (typeof checkTimeout !== 'number') {
            throw new Error('[DemoWalletAdapter] config.checkTimeout should be a number');
        }
        this.config = {
            checkTimeout,
            openUrlWhenWalletNotFound,
            openAppWithDeeplink,
        };
        this._connecting = false;
        this._provider = null;
        this._address = null;

        if (!isInBrowser()) {
            // Only support browser environment.
            this._readyState = WalletReadyState.NotFound;
            return;
        }

        // Check whether wallet exists and if wallet is connected.
        this._checkWallet().then(() => {
            if (this.connected) {
                this.emit('connect', this.address || '');
                this._listenEvent();
            }
        });
    }

    get address() {
        return this._address;
    }

    get readyState() {
        return this._readyState;
    }

    get connecting() {
        return this._connecting;
    }

    /**
     * Get network information used by Demo Wallet.
     * @returns {Network} Current network information.
     */
    async network(): Promise<Network> {
        try {
            await this._checkWallet();
            if (!this.address) throw new WalletDisconnectedError();
            try {
                const chainId = this._provider.getChainId();
                return {
                    networkType: chainIdNetworkMap[chainId] || NetworkType.Unknown,
                    chainId,
                    fullNode: '',
                    solidityNode: '',
                    eventServer: '',
                };
            } catch (e: any) {
                throw new WalletGetNetworkError(e?.message, e);
            }
        } catch (e: any) {
            this.emit('error', e);
            throw e;
        }
    }

    async connect(): Promise<void> {
        // Check if wallet is installed
        await this._checkWallet();

        // When the checking finished, if wallet is not installed and is in mobile browser, open wallet's website.
        if (this.config.openAppWithDeeplink === false) {
            return;
        }
        if (openDemoWallet()) {
            throw new WalletNotFoundError();
        }

        try {
            if (this.connected || this.connecting) return;
            await this._checkWallet();
            if (this.readyState === WalletReadyState.NotFound) {
                if (this.config.openUrlWhenWalletNotFound !== false && isInBrowser()) {
                    window.open(this.url, '_blank');
                }
                throw new WalletNotFoundError();
            }

            this._connecting = true;
            try {
                const address = await this._provider.getAccount();
                this._address = address;
                this.emit('connect', address);
                this._listenEvent();
            } catch (error: any) {
                throw new WalletConnectionError(error?.message, error);
            }
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        } finally {
            this._connecting = false;
        }
    }

    async disconnect(): Promise<void> {
        if (!this.address) {
            return;
        }
        await this._provider.disconnect();
        this._address = null;
        this.emit('disconnect');
    }

    async signMessage(message: string): Promise<string> {
        try {
            if (!this.address) throw new WalletDisconnectedError();
            try {
                return await this._provider.signMessageV2(message);
            } catch (error: any) {
                throw new WalletSignMessageError(error?.message, error);
            }
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        }
    }

    async signTransaction(transaction: Transaction): Promise<SignedTransaction> {
        try {
            if (!this.address) throw new WalletDisconnectedError();
            try {
                return await this._provider.signTransaction(transaction);
            } catch (error: any) {
                throw new WalletSignTransactionError(error?.message, error);
            }
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        }
    }

    private _checkPromise: Promise<boolean> | null = null;
    private async _checkWallet(): Promise<boolean> {
        // Return true if wallet is already found
        if (this.readyState === WalletReadyState.Found) {
            return true;
        }
        // Avoid multiple check
        if (this._checkPromise) {
            return this._checkPromise;
        }

        const interval = 100;
        const maxTimes = Math.floor(this.config.checkTimeout / interval);
        let times = 0;
        let timer: ReturnType<typeof setInterval>;

        this._checkPromise = new Promise((resolve) => {
            const check = () => {
                times++;
                const isSupport = supportDemoWallet();
                if (isSupport || times > maxTimes) {
                    timer && clearInterval(timer);
                    this._readyState = isSupport ? WalletReadyState.Found : WalletReadyState.NotFound;
                    // Update this._provider
                    if (isSupport) {
                        this._provider = window.walletobj!.tron;
                        // Check if wallet is already connected
                        this._address = this._provider.getAddress();
                    } else {
                        this._provider = null;
                        this._address = null;
                    }

                    this.emit('readyStateChanged', this.readyState);
                    resolve(isSupport);
                }
            };
            timer = setInterval(check, interval);
            check();
        });

        return this._checkPromise;
    }

    private _onAccountsChanged = (address: string[]) => {
        const preAddr = this.address || '';
        this._address = address[0];
        this.emit('accountsChanged', this.address || '', preAddr);
    };

    private _onChainChanged = (chainId: string) => {
        this.emit('chainChanged', chainId);
    };
    private _listenEvent() {
        this._stopListenEvent();
        this._provider.on('accountsChanged', this._onAccountsChanged);
    }
    private _stopListenEvent() {
        this._provider.removeListener('accountsChanged', this._onAccountsChanged);
        this._provider.removeListener('chainChanged', this._onChainChanged);
    }
}
