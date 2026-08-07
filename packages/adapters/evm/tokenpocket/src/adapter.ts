import type { EIP1193Provider, TypedData, Transaction } from '@tronweb3/abstract-adapter-evm';
import {
    Adapter,
    WalletReadyState,
    WalletNotFoundError,
    WalletConnectionError,
    WalletDisconnectedError,
    isInMobileBrowser,
    isInBrowser,
} from '@tronweb3/abstract-adapter-evm';
import { METADATA } from './metadata.js';
import {
    getTokenPocketProvider,
    isTokenPocketMobileWebView,
    TOKENPOCKET_RDNS,
    openTokenPocketWithDeeplink,
} from './utils.js';

export interface TokenPocketEvmAdapterOptions {
    /**
     * Set if open TokenPocket app when in mobile device.
     * Default is true.
     */
    useDeeplink?: boolean;
    /**
     * Set if open Wallet's website when wallet is not installed.
     * Default is true.
     */
    openUrlWhenWalletNotFound?: boolean;
}

export class TokenPocketEvmAdapter extends Adapter {
    name = METADATA.name;
    url = METADATA.url;
    icon = METADATA.icon;
    readyState = WalletReadyState.Loading;
    address: string | null = null;
    connecting = false;
    options: TokenPocketEvmAdapterOptions;

    constructor(options: TokenPocketEvmAdapterOptions = { useDeeplink: true }) {
        super();
        this.options = options;
        this.eip6963Info.support = true;
        this.eip6963Info.name = 'TokenPocket';
        this.eip6963Info.rdns = TOKENPOCKET_RDNS;

        void this.getProvider().then((provider) => {
            if (provider) {
                this.readyState = WalletReadyState.Found;
                this.listenEvents(provider);
                void this.autoConnect(provider);
            } else {
                this.readyState = WalletReadyState.NotFound;
            }
            this.emit('readyStateChanged', this.readyState);
        });
    }

    async connect() {
        if (this.options.useDeeplink !== false) {
            if (isInMobileBrowser() && !isTokenPocketMobileWebView()) {
                openTokenPocketWithDeeplink();
                return '';
            }
        }
        this.connecting = true;

        try {
            const provider = await this.getProvider();
            if (!provider) {
                if (this.options.openUrlWhenWalletNotFound !== false && isInBrowser()) {
                    window.open(this.url, '_blank');
                }
                throw new WalletNotFoundError();
            }
            const accounts = await provider.request<undefined, string[]>({ method: 'eth_requestAccounts' });
            if (!accounts.length) {
                throw new WalletConnectionError('No accounts is available.');
            }
            this.address = accounts[0];
            return this.address as string;
        } finally {
            this.connecting = false;
        }
    }

    async signTypedData({
        typedData,
        address = this.address as string,
    }: {
        typedData: TypedData;
        address?: string;
    }): Promise<string> {
        const provider = await this.prepareProvider();
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }
        return provider.request<[string, string], string>({
            method: 'eth_signTypedData_v4',
            params: [address, typeof typedData === 'string' ? typedData : JSON.stringify(typedData)],
        });
    }

    async sendTransaction(transaction: Transaction): Promise<string> {
        const res = (await super.sendTransaction(transaction)) as unknown;
        if (res && typeof res === 'object' && 'code' in res && 'message' in res) {
            // In Extension, when the fee is insufficient, it returns an error object instead of throwing an error.
            const err = res as { code: number; message: string };
            const error = new Error(err.message);
            (error as any).code = err.code;
            throw error;
        }
        return res as string;
    }

    protected getInjectedProvider(): EIP1193Provider | null {
        return getTokenPocketProvider();
    }
}
