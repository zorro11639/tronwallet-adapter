import EventEmitter from 'eventemitter3';
import type { WalletError } from './errors.js';
import type { SignedTransaction, Transaction } from './types.js';
import type { UniversalProviderOpts } from '@walletconnect/universal-provider';
import { UniversalProvider } from '@walletconnect/universal-provider';

export { EventEmitter };

export interface AdapterEvents {
    connect(address: string): void;
    disconnect(): void;
    error(error: WalletError): void;
    readyStateChanged(state: WalletReadyState): void;
    stateChanged(state: AdapterState): void;
    accountsChanged(address: string, preAddr: string): void;
    chainChanged(chainData: unknown): void;
}

export type AdapterName<T extends string = string> = T & { __brand__: 'AdapterName' };

export interface AdapterProps<Name extends string = string> {
    name: AdapterName<Name>;
    url: string;
    icon: string;
    readyState: WalletReadyState;
    state: AdapterState;
    address: string | null;
    connecting: boolean;
    connected: boolean;

    connect(options?: Record<string, unknown>): Promise<void>;
    disconnect(): Promise<void>;
    signMessage(message: string, privateKey?: string): Promise<string>;
    signTransaction(transaction: Transaction, privateKey?: string): Promise<SignedTransaction>;
    switchChain(chainId: string): Promise<void>;
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
/**
 * Adapter state
 */
export enum AdapterState {
    /**
     * If adapter is checking the wallet, the state is Loading.
     */
    Loading = 'Loading',
    /**
     * If wallet is not installed, the state is NotFound.
     */
    NotFound = 'NotFound',
    /**
     * If wallet is installed but is not connected to current Dapp, the state is Disconnected.
     */
    Disconnect = 'Disconnected',
    /**
     * Wallet is connected to current Dapp.
     */
    Connected = 'Connected',
}
export interface BaseAdapterConfig {
    /**
     * Set if open Wallet's website url when wallet is not installed.
     * Default is true.
     */
    openUrlWhenWalletNotFound?: boolean;

    useWalletConnectWhenWalletNotFound?: boolean;
    customQrCode?: boolean;
    onDisplayUri?: (uri: string) => void;
}

export abstract class Adapter<Name extends string = string>
    extends EventEmitter<AdapterEvents>
    implements AdapterProps
{
    abstract name: AdapterName<Name>;
    abstract url: string;
    abstract icon: string;
    abstract readyState: WalletReadyState;
    abstract state: AdapterState;
    abstract address: string | null;
    abstract connecting: boolean;

    get connected() {
        return this.state === AdapterState.Connected;
    }

    abstract connect(options?: Record<string, unknown>): Promise<void>;
    /**
     * Some wallets such as TronLink don't support disconnect() method.
     */
    disconnect(): Promise<void> {
        console.info("The current adapter doesn't support disconnect by DApp.");
        return Promise.resolve();
    }
    abstract signMessage(message: string, privateKey?: string): Promise<string>;
    abstract signTransaction(transaction: Transaction, privateKey?: string): Promise<SignedTransaction>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    multiSign(...args: any[]): Promise<any> {
        return Promise.reject("The current wallet doesn't support multiSign.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    switchChain(_chainId: string): Promise<void> {
        return Promise.reject("The current wallet doesn't support switch chain.");
    }

    protected WalletConnectAdapter: any;
    protected isConnectedWithWc = false;
    protected wcWallet: Adapter | null = null;
    protected getWcWallet(config: unknown): Adapter {
        if (!this.WalletConnectAdapter) {
            throw new Error('[AbstractAdapter] WalletConnectAdapter is not provided.');
        }
        if (!config || typeof config !== 'object') {
            throw new Error('[AbstractAdapter] WalletConnectAdapterConfig is not provided.');
        }
        if (!this.wcWallet) {
            this.wcWallet = new this.WalletConnectAdapter(config) as Adapter;
        }
        return this.wcWallet;
    }

    protected isConnectedWithCustomWc = false;
    protected walletConnectProvider: InstanceType<typeof UniversalProvider> | null = null;
    protected async connectByWalletConnect(
        options: UniversalProviderOpts,
        optionalNamespaces: any,
        onDisplayUri?: (uri: string) => void
    ) {
        if (!this.walletConnectProvider) {
            this.walletConnectProvider = await UniversalProvider.init(options);
        }
        this.walletConnectProvider.on('display_uri', onDisplayUri);
        const session = await this.walletConnectProvider.connect({
            pairingTopic: undefined,
            optionalNamespaces,
        });
        const address = extractAddressFromSession(session);
        return address;
    }
}

function extractAddressFromSession(session: any): string {
    const accounts = Object.values(session.namespaces).flatMap((namespace: any) => namespace.accounts);

    const account = accounts[0];
    if (!account) {
        throw new Error(' No accounts found in session');
    }

    // Account format: chainId:namespace:address (e.g., "tron:0x2b6653dc:Txxxxxxxxxxxxxxx")
    const address = account.split(':')[2];
    if (!address) {
        throw new Error(`Invalid account format: ${account}`);
    }

    return address;
}
