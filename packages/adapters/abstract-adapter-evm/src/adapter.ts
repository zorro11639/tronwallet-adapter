import EventEmitter from 'eventemitter3';
import type { EIP1193Provider, ProviderEvents } from './eip1193-provider.js';
import { WalletDisconnectedError } from './errors.js';

export { EventEmitter };

export interface EIP712Domain {
    name?: string;
    version?: string;
    chainId?: number;
    verifyingContract?: string;
    salt?: string;
}
export interface TypedData {
    domain: EIP712Domain;
    primaryType: string;
    types: {
        [k: string]: { name: string; type: string }[];
    };
    message: Record<string, unknown>;
}

export interface Chain {
    chainId: `0x${string}`;
    chainName: string;
    nativeCurrency: {
        /**
         * The name of the currency.
         */
        name: string;
        /**
         * The symbol of the currency, as a 2-6 character string.
         */
        symbol: string;
        /**
         * The number of decimals of the currency. Currently only accepts 18
         */
        decimals: 18;
    };
    rpcUrls: [string];
    blockExplorerUrls?: [string];
    iconUrls?: string[];
}

export interface Asset {
    type: 'ERC20' | 'ERC721' | 'ERC1155';
    options: {
        address: `0x${string}`;
        symbol?: string;
        decimals?: number;
        image?: string;
        tokenId?: string;
    };
}
export interface AdapterEvents extends ProviderEvents {
    /**
     * Emitted when wallet's readyState changes.
     * The initial readyState is Loading.
     * If the wallet is ready, it will be Found.
     * If the wallet is unavaliable after checking for a while, it will be NotFound.
     * @param readyState
     */
    readyStateChanged(readyState: WalletReadyState): void;
}

export type AdapterName<T extends string = string> = T & { __brand__: 'AdapterName' };

export interface AdapterProps<Name extends string = string> {
    name: AdapterName<Name>;
    url: string;
    icon: string;
    readyState: WalletReadyState;
    address: string | null;
    connecting: boolean;
    connected: boolean;

    connect(options?: Record<string, unknown>): Promise<string>;
    getProvider(): Promise<EIP1193Provider | null>;
    signMessage(params: { message: string; address?: string }): Promise<string>;
    signTypedData(params: { typedData: TypedData; address?: string }): Promise<string>;
    sendTransaction(transaction: any): Promise<string>;

    /**
     * Wallet api
     */
    switchChain(chainId: `0x${string}`): Promise<null>;
    addChain(chainInfo: Chain): Promise<null>;
    watchAsset(assetInfo: Asset): Promise<boolean>;
}
/**
 * Wallet ready state.
 */
export enum WalletReadyState {
    /**
     * Adapter will start to check if wallet exists after adapter instance is created.
     */
    Loading = 'Loading',
    /**
     * When checking ends and wallet is not found, readyState will be NotFound.
     */
    NotFound = 'NotFound',
    /**
     * When checking ends and wallet is found, readyState will be Found.
     */
    Found = 'Found',
}

export abstract class Adapter<Name extends string = string>
    extends EventEmitter<AdapterEvents>
    implements AdapterProps
{
    abstract name: AdapterName<Name>;
    abstract url: string;
    abstract icon: string;
    abstract readyState: WalletReadyState;
    abstract address: string | null;
    connecting = false;

    protected eip6963Info = {
        support: false,
        name: '',
    };

    get connected() {
        return !!this.address;
    }

    abstract connect(options?: Record<string, unknown>): Promise<string>;
    protected getInjectedProvider(): EIP1193Provider | null {
        return window.ethereum || null;
    }
    async network(): Promise<string> {
        const provider = await this.prepareProvider();
        return provider.request({
            method: 'eth_chainId',
            params: [],
        });
    }
    async signMessage({ message, address }: { message: string; address?: string }): Promise<string> {
        const provider = await this.prepareProvider();
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }
        return provider.request({
            method: 'personal_sign',
            params: [message, address || this.address],
        });
    }
    async signTypedData(params: { typedData: TypedData; address?: string }): Promise<string> {
        const provider = await this.prepareProvider();
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }
        return provider.request({
            method: 'eth_signTypedData_v4',
            params: [params.address || this.address, params.typedData],
        });
    }
    async sendTransaction(transaction: any): Promise<string> {
        const provider = await this.prepareProvider();
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }
        return provider.request({
            method: 'eth_sendTransaction',
            params: [transaction],
        });
    }
    async addChain(chainInfo: Chain): Promise<null> {
        const provider = await this.prepareProvider();
        return provider.request({
            method: 'wallet_addEthereumChain',
            params: [chainInfo],
        });
    }
    async switchChain(chainId: `0x${string}`): Promise<null> {
        const provider = await this.prepareProvider();
        return provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
        });
    }
    async watchAsset(asset: Asset): Promise<boolean> {
        const provider = await this.prepareProvider();
        return provider.request({
            method: 'wallet_watchAsset',
            params: asset,
        });
    }

    protected getProviderPromise: Promise<EIP1193Provider | null> | null = null;
    async getProvider(): Promise<EIP1193Provider | null> {
        if (this.getProviderPromise !== null) {
            return this.getProviderPromise;
        }
        this.getProviderPromise = new Promise((resolve) => {
            let handled = false;
            if (this.eip6963Info.support) {
                // Timeout fallback
                const timeout = setTimeout(() => {
                    if (handled) return;
                    handled = true;
                    window.removeEventListener('eip6963:announceProvider', eip6963Handler as EventListener);
                    const provider = this.getInjectedProvider();
                    if (provider) {
                        resolve(provider);
                    } else {
                        console.error(`[${this.name}]: Unable to detect EIP6963 provider`);
                        resolve(null);
                    }
                }, 3000);
                // EIP-6963 event handler
                const eip6963Handler = (
                    event: CustomEvent<{
                        info: { uuid: string; name: string; icon: string; rdns: string };
                        provider: EIP1193Provider;
                    }>
                ) => {
                    if (handled) return;
                    if (event.detail?.info?.name === this.eip6963Info.name) {
                        handled = true;
                        window.removeEventListener('eip6963:announceProvider', eip6963Handler as EventListener);
                        const provider = (event as CustomEvent).detail.provider as EIP1193Provider;
                        resolve(provider);
                        clearTimeout(timeout);
                    }
                };
                window.addEventListener('eip6963:announceProvider', eip6963Handler as EventListener);
                window.dispatchEvent(new Event('eip6963:requestProvider'));

                return;
            }

            const provider = this.getInjectedProvider();
            if (provider) {
                return resolve(provider);
            }
            const handleEthereum = () => {
                if (handled) {
                    return;
                }
                handled = true;
                const provider = this.getInjectedProvider();
                if (provider) {
                    resolve(provider);
                } else {
                    console.error(`[${this.name}]: Unable to detect EIP6963 provider`);
                    resolve(null);
                }
            };
            const interval = setInterval(() => {
                if (handled) {
                    clearInterval(interval);
                    return;
                }
                const provider = this.getInjectedProvider();
                if (provider) {
                    handleEthereum();
                    clearTimeout(timeout);
                    clearInterval(interval);
                }
            }, 100);
            const timeout = setTimeout(() => {
                clearInterval(interval);
                handleEthereum();
            }, 3000);
        });
        return this.getProviderPromise;
    }
    protected listenEvents(provider: EIP1193Provider) {
        provider.on('connect', (connectInfo) => {
            this.emit('connect', connectInfo);
        });
        provider.on('disconnect', (error) => {
            this.emit('disconnect', error);
        });
        provider.on('accountsChanged', this.onAccountsChanged);
        provider.on('chainChanged', this.onChainChanged);
    }
    protected onAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
            this.address = null;
        } else {
            this.address = accounts[0];
        }
        this.emit('accountsChanged', accounts);
    };
    protected onChainChanged = (chainId: string) => {
        this.emit('chainChanged', chainId);
    };

    protected async prepareProvider() {
        return (await this.getProvider()) as EIP1193Provider;
    }
    protected async autoConnect(provider: EIP1193Provider) {
        const accounts = await provider.request<undefined, string[]>({ method: 'eth_accounts' });

        this.address = accounts?.[0] || null;
        if (this.address) {
            this.emit('accountsChanged', accounts);
        }
    }
}
