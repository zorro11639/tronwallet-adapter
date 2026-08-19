import {
    type CaipAccountId,
    type MultichainApiClient,
    type SessionData,
    type Transport,
    getDefaultTransport,
    getMultichainClient,
    isMetamaskInstalled,
} from '@metamask/multichain-api-client';
import type { TronAddress } from '@metamask/multichain-api-client/dist/types/scopes/tron.types.cjs';
import {
    AdapterState,
    isInBrowser,
    AddonAdapter,
    WalletConnectionError,
    WalletDisconnectedError,
    WalletNotFoundError,
    WalletReadyState,
    WalletSignMessageError,
    WalletSignTransactionError,
    WalletSwitchChainError,
} from '@tronweb3/tronwallet-abstract-adapter';
import type { AdapterName, Network, SignedTransaction, Transaction } from '@tronweb3/tronwallet-abstract-adapter';
import { Scope } from './types.js';
import {
    chainIdToScope,
    getAddressFromCaipAccountId,
    isAccountChangedEvent,
    scopeToChainId,
    scopeToNetworkType,
    isSessionChangedEvent,
    openMetaMaskApp,
} from './utils.js';
import type { BaseAdapterConfig } from '@tronweb3/tronwallet-abstract-adapter';

export interface MetaMaskAdapterConfig extends BaseAdapterConfig {
    /**
     * Set if open MetaMask app using DeepLink.
     * Default is true.
     */
    openAppWithDeeplink?: boolean;
}

export const MetaMaskAdapterName = 'MetaMask' as AdapterName<'MetaMask'>;

export class MetaMaskAdapter extends AddonAdapter {
    name = MetaMaskAdapterName;
    // @prettier-ignore
    icon =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIzIiBoZWlnaHQ9IjIzIiB4PSIzLjUiIHk9IjMuNSIgdmlld0JveD0iMCAwIDE0MS41MSAxMzYuNDIiPjxwYXRoIGZpbGw9IiNGRjVDMTYiIGQ9Im0xMzIuMjQgMTMxLjc1LTMwLjQ4LTkuMDctMjIuOTkgMTMuNzQtMTYuMDMtLjAxLTIzLTEzLjc0LTMwLjQ3IDkuMDhMMCAxMDAuNDdsOS4yNy0zNC43M0wwIDM2LjQgOS4yNyAwbDQ3LjYgMjguNDRoMjcuNzZMMTMyLjI0IDBsOS4yNyAzNi4zOC05LjI3IDI5LjM2IDkuMjcgMzQuNzItOS4yNyAzMS4zWiIvPjxwYXRoIGZpbGw9IiNGRjVDMTYiIGQ9Im05LjI3IDAgNDcuNjEgMjguNDZMNTQuOTggNDggOS4yOSAwWm0zMC40NyAxMDAuNDggMjAuOTUgMTUuOTUtMjAuOTUgNi4yNHYtMjIuMlpNNTkuMDEgNzQuMSA1NSA0OCAyOS4yMiA2NS43NWgtLjAybC4wOCAxOC4yNyAxMC40NS05LjkyaDE5LjI5Wk0xMzIuMjUgMGwtNDcuNiAyOC40Nkw4Ni41MSA0OGw0NS43Mi00OFptLTMwLjQ3IDEwMC40OC0yMC45NCAxNS45NSAyMC45NCA2LjI0di0yMi4yWm0xMC41My0zNC43M0w4Ni41MyA0OCA4Mi41IDc0LjFoMTkuMjdsMTAuNDYgOS45LjA3LTE4LjI2WiIvPjxwYXRoIGZpbGw9IiNFMzQ4MDciIGQ9Im0zOS43MyAxMjIuNjctMzAuNDYgOS4wOEwwIDEwMC40OGgzOS43M3YyMi4yWk01OS4wMiA3NC4xbDUuODIgMzcuNzEtOC4wNy0yMC45Ny0yNy40OS02LjgyIDEwLjQ2LTkuOTJINTlabTQyLjc2IDQ4LjU5IDMwLjQ3IDkuMDcgOS4yNy0zMS4yN2gtMzkuNzR6TTgyLjUgNzQuMDlsLTUuODIgMzcuNzEgOC4wNi0yMC45NyAyNy41LTYuODItMTAuNDctOS45MnoiLz48cGF0aCBmaWxsPSIjRkY4RDVEIiBkPSJtMCAxMDAuNDcgOS4yNy0zNC43M0gyOS4ybC4wNyAxOC4yNyAyNy41IDYuODIgOC4wNiAyMC45Ny00LjE1IDQuNjItMjAuOTQtMTUuOTZIMFptMTQxLjUgMC05LjI2LTM0LjczaC0xOS45M2wtLjA3IDE4LjI3LTI3LjUgNi44Mi04LjA2IDIwLjk3IDQuMTUgNC42MiAyMC45NC0xNS45NmgzOS43NFpNODQuNjQgMjguNDRINTYuODhsLTEuODkgMTkuNTQgOS44NCA2My44aDExLjg1bDkuODUtNjMuOC0xLjktMTkuNTRaIi8+PHBhdGggZmlsbD0iIzY2MTgwMCIgZD0iTTkuMjcgMCAwIDM2LjM4bDkuMjcgMjkuMzZIMjkuMkw1NC45OCA0OHptNDMuOTggODEuNjdoLTkuMDNsLTQuOTIgNC44MSAxNy40NyA0LjMzLTMuNTItOS4xNVpNMTMyLjI0IDBsOS4yNyAzNi4zOC05LjI3IDI5LjM2aC0xOS45M0w4Ni41MyA0OHpNODguMjcgODEuNjdoOS4wNGw0LjkyIDQuODItMTcuNDkgNC4zNCAzLjUzLTkuMTdabS05LjUgNDIuMyAyLjA2LTcuNTQtNC4xNS00LjYySDY0LjgybC00LjE0IDQuNjIgMi4wNSA3LjU0Ii8+PHBhdGggZmlsbD0iI0MwQzRDRCIgZD0iTTc4Ljc3IDEyMy45N3YxMi40NUg2Mi43NHYtMTIuNDVoMTYuMDJaIi8+PHBhdGggZmlsbD0iI0U3RUJGNiIgZD0ibTM5Ljc0IDEyMi42NiAyMyAxMy43NnYtMTIuNDZsLTIuMDUtNy41NHptNjIuMDMgMC0yMyAxMy43NnYtMTIuNDZsMi4wNi03LjU0eiIvPjwvc3ZnPjwvc3ZnPg==';
    url = 'https://metamask.io';

    private _config: MetaMaskAdapterConfig;
    private _readyState: WalletReadyState = WalletReadyState.NotFound;
    private _state: AdapterState = AdapterState.Disconnect;
    private _connecting = false;
    /** In-flight chain switch, used as the mutex for concurrent `switchChain()` calls. */
    private _switchChainPromise: Promise<void> | null = null;
    /** Target scope of the in-flight switch, so parallel callers can tell same from conflicting. */
    private _switchingToScope: Scope | undefined;
    private _address: string | null = null;
    private _scope: Scope | undefined;
    private _selectedAddressOnPageLoadPromise: Promise<string | undefined> | undefined;
    private _checkWalletPromise: Promise<void> | undefined;
    private _removeAccountsChangedListener: (() => void) | undefined;
    private _disposeInitialAddressListener: (() => void) | undefined;
    /**
     * Bumped on every disconnect. Async work captures it before awaiting and re-checks
     * afterwards, so a callback already in flight cannot apply its result to a connection
     * that has since been torn down.
     */
    private _connectionGeneration = 0;
    private _transport: Transport;
    private _client: MultichainApiClient;

    /**
     * Creates an instance of MetaMaskAdapter.
     * @param config - Configuration options for the adapter.
     */
    constructor(config: MetaMaskAdapterConfig = { openAppWithDeeplink: true }) {
        super(config);
        this._config = {
            ...this.commonConfig,
            ...config,
        };
        this._transport = getDefaultTransport();
        this._client = getMultichainClient({ transport: this._transport });
        this._checkWalletPromise = this._doCheckWallet();
        this._selectedAddressOnPageLoadPromise = this.getInitialSelectedAddress();
        // Auto-restore session on page refresh
        this._checkWalletPromise.then(() => {
            if (this._readyState === WalletReadyState.Found) {
                this.tryRestoringSession()
                    .then(async () => {
                        if (this.address) {
                            try {
                                await this.checkSecurity();
                            } catch {
                                this.setAddress(null);
                                this.setState(AdapterState.Disconnect);
                                return;
                            }
                            this.startListeners();
                            this.setState(AdapterState.Connected);
                            this.emit('connect', this.address);
                        }
                    })
                    .catch((error) => {
                        console.warn('Failed to auto-restore session:', error);
                    });
            }
        });
    }

    /** Gets the current connected address. */
    get address() {
        return this._address;
    }

    /** Gets the current state of the adapter. */
    get state() {
        return this._state;
    }

    /** Gets the ready state of the wallet. */
    get readyState() {
        return this._readyState;
    }

    /** Gets whether the adapter is currently connecting. */
    get connecting() {
        return this._connecting;
    }

    /**
     * Connects to the MetaMask wallet.
     * @returns A promise that resolves when connected.
     */
    protected async _connect(): Promise<void> {
        // Captured before every await, `_beforeConnect()` included, so a disconnect() raised at
        // any point of the attempt is noticed once the wallet finally answers.
        const generation = this._connectionGeneration;
        try {
            if (!(await this._beforeConnect())) return;
            this._connecting = true;
            try {
                // Try restoring session
                await this.tryRestoringSession();
                // Otherwise create a session on Mainnet by default
                if (!this.address) {
                    await this.createSession(Scope.MAINNET);
                }
                if (this._connectionGeneration !== generation) {
                    // The caller disconnected midway. Drop anything the awaited steps managed
                    // to set and stop short of reporting a connection.
                    this.setAddress(null);
                    this.setScope(undefined, false);
                    return;
                }
                // In case user didn't select any Tron scope/account, return
                if (!this.address) {
                    return;
                }
                this.startListeners();

                this.setState(AdapterState.Connected);
                this.emit('connect', this.address);
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

    /**
     * Disconnects from the MetaMask wallet.
     * @returns A promise that resolves when disconnected.
     */
    async disconnect(): Promise<void> {
        // Bumped before the state check on purpose. While connect() is waiting on the wallet
        // the state is still Disconnect, and that attempt has to be cancelled too -- otherwise
        // approving the prompt afterwards would connect a wallet the caller already dropped.
        // It also invalidates callbacks that are mid-await, so they cannot restore
        // address/scope after the teardown below.
        this._connectionGeneration++;

        if (this.state !== AdapterState.Connected) {
            return;
        }

        this.stopListeners();

        this.setAddress(null);
        this.setScope(undefined, false);
        this.setState(AdapterState.Disconnect);
        this.emit('disconnect');

        await this._client.revokeSession({ scopes: [Scope.MAINNET, Scope.NILE, Scope.SHASTA] });
    }

    /**
     * Asserts the adapter is fully connected before a signing method reaches the wallet.
     *
     * State, scope and address are checked together on purpose. `updateSession()` clears the
     * address without clearing the scope when a session has no usable account, and an
     * aborted `connect()` leaves the state disconnected, so checking the scope alone lets a
     * null address through to the SDK.
     * @returns The scope and address to sign with.
     */
    private requireConnected(): { scope: Scope; address: TronAddress } {
        if (this._state !== AdapterState.Connected || !this._scope || !this._address) {
            throw new WalletDisconnectedError('Wallet not connected');
        }
        return { scope: this._scope, address: this._address as TronAddress };
    }

    /**
     * Signs a transaction using the MetaMask wallet.
     * @param transaction - The transaction to sign.
     * @returns A promise that resolves to the signed transaction.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signTransaction(transaction: Transaction): Promise<SignedTransaction> {
        const { scope, address } = this.requireConnected();
        try {
            const contractType = transaction.raw_data.contract[0]?.type;
            if (!contractType) {
                throw new WalletSignTransactionError('Transaction contract type is required');
            }

            const result = await this._client.invokeMethod({
                scope,
                request: {
                    method: 'signTransaction',
                    params: {
                        address,
                        transaction: {
                            rawDataHex: transaction.raw_data_hex,
                            type: contractType,
                        },
                    },
                },
            });

            return {
                ...transaction,
                signature: [result.signature],
            };
        } catch (error: any) {
            if (error instanceof Error || (typeof error === 'object' && error.message)) {
                throw new WalletSignTransactionError(error.message, error);
            }
            if (typeof error === 'string') {
                throw new WalletSignTransactionError(error, new Error(error));
            }
            throw new WalletSignTransactionError('Unknown error', error);
        }
    }

    /**
     * Signs a message using the MetaMask wallet.
     * @param message - The message to sign.
     * @returns A promise that resolves to the signature.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signMessage(message: string): Promise<string> {
        const { scope, address } = this.requireConnected();
        try {
            const base64Message = Buffer.from(message).toString('base64');
            const result = await this._client.invokeMethod({
                scope,
                request: {
                    method: 'signMessage',
                    params: { message: base64Message, address },
                },
            });
            return result.signature;
        } catch (error: any) {
            if (error instanceof Error || (typeof error === 'object' && error.message)) {
                throw new WalletSignMessageError(error.message, error);
            }
            if (typeof error === 'string') {
                throw new WalletSignMessageError(error, new Error(error));
            }
            throw new WalletSignMessageError('Unknown error', error);
        }
    }

    /**
     * Switches the chain for the MetaMask wallet.
     *
     * During the initial connection process by TronWallet, this method can be called multiple
     * times in parallel, and calling createSession() concurrently fails. Parallel calls for the
     * same chain therefore share the in-flight switch and settle with its result, so a redundant
     * caller observes the real outcome instead of a silent no-op. A call for a different chain
     * while one is in flight is rejected.
     * @param chainId - The chain ID to switch to.
     */
    async switchChain(chainId: string): Promise<void> {
        if (!this._scope) {
            throw new WalletDisconnectedError('Wallet not connected');
        }
        const newScope = chainIdToScope(chainId);

        if (this._switchChainPromise) {
            if (this._switchingToScope === newScope) {
                return this._switchChainPromise;
            }
            throw new WalletSwitchChainError('Already switching to a different chain');
        }

        this._switchingToScope = newScope;
        // The promise is the mutex; `finally` releases it on both success and failure, so a
        // throw from any step cannot leave later calls permanently blocked.
        this._switchChainPromise = this._doSwitchChain(chainId, newScope).finally(() => {
            this._switchChainPromise = null;
            this._switchingToScope = undefined;
        });
        return this._switchChainPromise;
    }

    /**
     * Performs the chain switch itself. Callers go through {@link switchChain}, which
     * serialises concurrent calls.
     * @param chainId - The chain ID to switch to, used for the chainChanged event.
     * @param newScope - The scope resolved from `chainId`.
     */
    private async _doSwitchChain(chainId: string, newScope: Scope): Promise<void> {
        if (newScope === this._scope) {
            // Still emit event to reconciliate divergent states between dapp and adapter
            this.emit('chainChanged', { chainId });
            return;
        }

        let session = await this._client.getSession();
        let isChainInSession = session?.sessionScopes[newScope]?.accounts?.includes(`${newScope}:${this._address}`);
        if (!isChainInSession) {
            // Create session for the new scope
            await this.createSession(newScope, this.address ? [this.address] : undefined);
            session = await this._client.getSession();
            isChainInSession = session?.sessionScopes[newScope]?.accounts?.includes(`${newScope}:${this._address}`);
            if (!isChainInSession) {
                throw new WalletSwitchChainError('Failed to switch chain');
            }
        }

        this.setScope(newScope);
    }

    /**
     * Get network information used by MetaMask.
     * @returns {Network} Current network information.
     */
    async network(): Promise<Network> {
        try {
            if (this.state !== AdapterState.Connected || !this._scope) {
                throw new WalletDisconnectedError('Wallet not connected');
            }

            const chainId = scopeToChainId(this._scope);
            const networkType = scopeToNetworkType(this._scope);

            return {
                networkType,
                chainId,
                fullNode: '',
                solidityNode: '',
                eventServer: '',
            };
        } catch (e: any) {
            this.emit('error', e);
            throw e;
        }
    }

    /**
     * Subscribes to accountChanged notifications and waits for the first one carrying an
     * address, giving up after `timeoutMs`.
     *
     * The subscription starts immediately so notifications arriving during any subsequent
     * awaited work are not missed. `dispose()` is idempotent and tears down both the
     * subscription and the timer; it also settles the promise with `undefined`, so callers
     * awaiting it can never hang. Call it on every path, including errors.
     * @param timeoutMs - How long to wait for a notification before giving up.
     */
    private waitForSelectedAddress(timeoutMs = 2000): {
        promise: Promise<string | undefined>;
        dispose: () => void;
    } {
        let dispose!: () => void;

        const promise = new Promise<string | undefined>((resolve) => {
            let removeNotification: (() => void) | undefined;
            let timer: ReturnType<typeof setTimeout> | undefined;

            const settle = (address?: string) => {
                if (timer !== undefined) {
                    clearTimeout(timer);
                    timer = undefined;
                }
                removeNotification?.();
                removeNotification = undefined;
                resolve(address);
            };

            removeNotification = this._client.onNotification((data: any) => {
                if (!isAccountChangedEvent(data)) {
                    return;
                }
                const address = data?.params?.notification?.params?.[0];
                if (address) {
                    settle(address);
                }
            });
            timer = setTimeout(() => settle(undefined), timeoutMs);

            dispose = () => settle(undefined);
        });

        return { promise, dispose };
    }

    /**
     * Listen for up to 2 seconds to the accountsChanged event emitted on page load.
     * @returns If any, the initial selected address.
     */
    protected getInitialSelectedAddress(): Promise<string | undefined> {
        const { promise, dispose } = this.waitForSelectedAddress();
        // Tracked so disconnecting inside the 2s window tears the subscription down early.
        this._disposeInitialAddressListener = dispose;
        return promise.finally(() => {
            this._disposeInitialAddressListener = undefined;
        });
    }

    /**
     * Checks if the MetaMask wallet is available in the browser.
     * By default, the _readyState is set to Found to avoid issues on page reloads.
     * But if the wallet is not actually available, we need to update the _readyState accordingly.
     * Average time for wallet to be available is around 50ms.
     * @returns A promise that resolves when the wallet check is complete.
     */
    private async _doCheckWallet(): Promise<void> {
        if (this._readyState === WalletReadyState.Loading) {
            return;
        }
        this._readyState = WalletReadyState.Loading;
        this.emit('readyStateChanged', this.readyState);
        const metamaskInstalled = await isMetamaskInstalled();
        if (metamaskInstalled) {
            this._readyState = WalletReadyState.Found;
            this.emit('readyStateChanged', this.readyState);
            return;
        }
        this._readyState = WalletReadyState.NotFound;
        this.emit('readyStateChanged', this.readyState);
    }

    protected async _checkWallet(): Promise<boolean> {
        if (!this._checkWalletPromise) {
            this._checkWalletPromise = this._doCheckWallet();
        }
        await this._checkWalletPromise;
        return this._readyState === WalletReadyState.Found;
    }

    protected async _beforeConnect(): Promise<boolean> {
        if (this.connected || this.connecting) {
            return false;
        }
        await this._checkWalletPromise;
        if (this._readyState !== WalletReadyState.Found) {
            if (isInBrowser() && !this._openAppByDeepLinkIfNeed() && this._config.openUrlWhenWalletNotFound !== false) {
                window.open(this.url, '_blank');
            }
            throw new WalletNotFoundError('Wallet not found or not ready');
        }
        await this.checkSecurity();
        return true;
    }

    /**
     * Tries to restore an existing session.
     * @returns A promise that resolves when the session is restored or not.
     */
    private async tryRestoringSession(): Promise<void> {
        try {
            const generation = this._connectionGeneration;
            const existingSession = await this._client.getSession();
            if (!existingSession) {
                return;
            }
            // Get the address from accountChanged emitted on page load, if any
            const address = await this._selectedAddressOnPageLoadPromise;
            if (this._connectionGeneration !== generation) {
                return;
            }
            const scope = this.restoreScope();
            this.updateSession(existingSession, scope, address);
        } catch (error) {
            console.warn(`Error restoring session`, error);
        }
    }

    /**
     * Creates a session for the specified scope.
     * @param scope - The TronScope to create the session for.
     * @param addresses - Optional list of addresses to include in the session.
     */
    private async createSession(scope: Scope, addresses?: string[]): Promise<void> {
        // If there are multiple accounts, wait for the first accountChanged event to know
        // which one to use. Subscribe before createSession() so a notification arriving
        // during the call is not missed.
        const { promise: waitForAccountChanged, dispose } = this.waitForSelectedAddress();
        const generation = this._connectionGeneration;

        try {
            const session = await this._client.createSession({
                optionalScopes: {
                    [scope]: {
                        accounts: (addresses ? addresses.map((addr) => `${scope}:${addr}`) : []) as CaipAccountId[],
                        methods: [],
                        notifications: [],
                    },
                },
                sessionProperties: {
                    tron_accountChanged_notifications: true,
                },
            });

            // Wait for the accountChanged event to know which one to use, timeout after 2000ms
            const selectedAddress = await waitForAccountChanged;
            if (this._connectionGeneration !== generation) {
                return;
            }

            this.updateSession(session, undefined, selectedAddress);
        } finally {
            dispose();
        }
    }

    /**
     * Updates the session and the address to connect to.
     * This method handles the logic for selecting the appropriate Tron network scope
     * and address to connect to based on the following priority:
     * 1. First tries to find an available scope in order: previously selected scope > mainnet > shasta > nile
     * 2. For address selection:
     *    - First tries to use the selectedAddress param, most likely coming from
     *      the accountsChanged event
     *    - Falls back to the previously saved address if it exists in the scope
     *    - Finally defaults to the first address in the scope
     *
     * @param session - The session data containing available scopes and accounts
     * @param selectedAddress - The address that was selected by the user, if any
     */
    private updateSession(session: SessionData, selectedScope?: Scope, selectedAddress?: string) {
        const currentScope = this._scope;

        const scope = this.selectScopeFromSessionWithPriority(session, selectedScope);

        // If no scope is available, don't disconnect so that we can create/update a new session
        if (!scope) {
            this.setAddress(null);
            return;
        }
        const scopeAccounts = session?.sessionScopes[scope]?.accounts;
        // In case the Tron scope is available but without any accounts
        // Could happen if the user already created a session using ethereum injected provider for example or the SDK
        // Don't disconnect so that we can create/update a new session
        if (!scopeAccounts?.[0]) {
            this.setAddress(null);
            return;
        }
        let addressToConnect;
        // Try to use selectedAddress
        if (selectedAddress && scopeAccounts.includes(`${scope}:${selectedAddress}`)) {
            addressToConnect = selectedAddress;
        }
        // Otherwise try to use the previously saved address in this._address
        else if (this._address && scopeAccounts.includes(`${scope}:${this._address}`)) {
            addressToConnect = this._address;
        }
        // Otherwise select first address
        else {
            addressToConnect = getAddressFromCaipAccountId(scopeAccounts[0]);
        }
        // Update the address and scope
        this.setAddress(addressToConnect);
        this.setScope(scope, currentScope !== scope);
    }

    /**
     * Starts listening to the accountsChanged event.
     * @param handler Optional custom handler for the event.
     */
    private startListeners(handler?: (data: any) => void) {
        this._removeAccountsChangedListener = this._client.onNotification(handler ?? this.handleEvents.bind(this));
    }

    /**
     * Stops listening to the accountsChanged event.
     */
    private stopListeners() {
        this._removeAccountsChangedListener?.();
        this._removeAccountsChangedListener = undefined;
        this._disposeInitialAddressListener?.();
        this._disposeInitialAddressListener = undefined;
    }

    /**
     * Handles the accountsChanged event.
     * @param data - The event data
     */
    private async handleEvents(data: any) {
        if (isAccountChangedEvent(data)) {
            const newAddressSelected = data?.params?.notification?.params?.[0];
            if (!newAddressSelected) {
                // Disconnect if no address selected
                await this.disconnect();
                return;
            }
            const generation = this._connectionGeneration;
            const session = await this._client.getSession();
            if (!session || this._connectionGeneration !== generation) {
                return;
            }
            this.updateSession(session, this._scope, newAddressSelected);
        } else if (isSessionChangedEvent(data)) {
            const session = data?.params;
            if (!session) {
                return;
            }
            const scope = this.selectScopeFromSessionWithPriority(session);

            if (!scope) {
                // Disconnect if no scope selected
                await this.disconnect();
                return;
            }
            const isAccountsEmpty = !(session?.sessionScopes?.[scope]?.accounts?.length > 0);
            if (isAccountsEmpty) {
                // Disconnect if no address selected
                await this.disconnect();
                return;
            }
            this.updateSession(session, scope);
        }
    }

    /**
     * Sets the current address.
     * Emits an accountsChanged event if the address changes.
     * @param address - The address to set, or null if disconnected.
     */
    private setAddress(address: string | null) {
        if (this._address === address) {
            return;
        }

        if (address) {
            this.emit('accountsChanged', address, this._address || '');
        }

        this._address = address;
    }

    /**
     * Sets the adapter state and emits a state change event if necessary.
     * @param state - The new adapter state.
     */
    private setState(state: AdapterState) {
        const preState = this.state;
        if (state !== preState) {
            this._state = state;
            this.emit('stateChanged', state);
        }
    }

    /**
     * Sets the current scope.
     * @param scope - The new scope.
     */
    private setScope(scope?: Scope, emitChainChanged = true) {
        if (this._scope === scope) {
            return;
        }
        localStorage.setItem('metamaskAdapterScope', scope ?? '');
        this._scope = scope;

        if (!this._scope) {
            return;
        }

        if (emitChainChanged) {
            const newChainId = scopeToChainId(this._scope);
            this.emit('chainChanged', { chainId: newChainId });
        }
    }

    /**
     * Restores the scope from local storage.
     * @returns The restored scope, or undefined if not found.
     */
    private restoreScope(): Scope | undefined {
        const scope = localStorage.getItem('metamaskAdapterScope');
        return scope ? (scope as Scope) : undefined;
    }

    /**
     * Selects the scope from the session with priority order: mainnet > shasta > nile
     * @param session - The session data containing available scopes
     * @returns The selected scope, or undefined if no scope is available
     */
    private selectScopeFromSessionWithPriority(session: SessionData, selectedScope?: Scope): Scope | undefined {
        const sessionScopes = new Set(Object.keys(session?.sessionScopes ?? {}));
        const scopePriorityOrder = (selectedScope ? [selectedScope] : []).concat([
            Scope.MAINNET,
            Scope.SHASTA,
            Scope.NILE,
        ]);

        return scopePriorityOrder.find((scope) => sessionScopes.has(scope));
    }
    protected _openAppByDeepLinkIfNeed(): boolean {
        if (this._config.openAppWithDeeplink === false) {
            return false;
        }
        return openMetaMaskApp();
    }
}
