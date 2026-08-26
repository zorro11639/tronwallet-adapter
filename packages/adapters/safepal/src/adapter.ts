import {
    AddonAdapter,
    AdapterState,
    isInBrowser,
    WalletReadyState,
    WalletSignMessageError,
    WalletNotFoundError,
    WalletDisconnectedError,
    WalletSignTransactionError,
    WalletConnectionError,
    WalletGetNetworkError,
    isInMobileBrowser,
    assertConnectAddress,
} from '@tronweb3/tronwallet-abstract-adapter';
import { getNetworkInfoByTronWeb } from '@tronweb3/tronwallet-adapter-tronlink';
import type { Tron, TronLinkWallet } from '@tronweb3/tronwallet-adapter-tronlink';
import type {
    Transaction,
    SignedTransaction,
    AdapterName,
    BaseAdapterConfig,
    Network,
    TronWeb,
} from '@tronweb3/tronwallet-abstract-adapter';
import { openSafepalWallet, supportSafepalWallet } from './utils.js';

declare global {
    interface Window {
        safepalwallet: {
            tron: Tron;
            tronLink: TronLinkWallet;
            tronWeb: TronWeb;
        };
        // PC browser extension provider (https://devdocs.safepal.com/Connect-wallet/Web/tron.html)
        safepalTronProvider: Tron;
    }
}

export type SafepalAdapterConfig = BaseAdapterConfig;

type SafepalWallet = {
    tronWeb: TronWeb;
    tron: TronLinkWallet;
};

export const SafepalWalletAdapterName = 'SafePal' as AdapterName<'SafePal'>;

export class SafepalAdapter extends AddonAdapter {
    name = SafepalWalletAdapterName;
    url = 'https://safepal.com';
    icon =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAP1BMVEUAAABKIe9MIO9LIO9KIe5KIO9KIe9KIO5JIO1KIu1KIO1KIe////+kkPfo4/1hPfFgPfGZgvaOdPWDZvRVL/CpQHckAAAAC3RSTlMA7yC/oDDfgJCQkAOmnXUAAADnSURBVEjHlZbtjoJAEAR7BwTvmvUO9f2f1USNk81MRrp+VxFY9gsvbJ0aC9r0Y3Bs5gHmT3JqPMRy0nyyPQtbeJhmAGYKzIBRwvBLiRUTJSY0SjQw4X7tI//8kAV/l22k04HoE6JPiD4h+oToE8HfWYLwfNZg9EOQvpL7Mag+et+SoBrWWxaUP64nQT01ehLUk6/nwXYLgRdpsIfAiyy4VAuoc8B9D0rcPxbs7sfAB8oJPiH6hOgTok+IPiH4YQH1keudCfJmrG/3KyXO8pGlH4ow4bMX0w/2Z7EIvnY5cez87fqzvvUH/qNgaUlN588AAAAASUVORK5CYII=';
    config: Required<SafepalAdapterConfig>;
    private _readyState: WalletReadyState = WalletReadyState.Loading;
    private _state: AdapterState = AdapterState.Loading;
    private _connecting: boolean;
    private _wallet: SafepalWallet | null;
    private _address: string | null;
    /**
     * Whether the most recent security check passed. Gates the mobile
     * auto-reconnect path so a wallet that failed the security check cannot
     * silently reconnect.
     */
    private _securityPassed = false;

    constructor(config: SafepalAdapterConfig = {}) {
        super(config);
        this.config = {
            ...this.commonConfig,
        };
        this._connecting = false;
        this._wallet = null;
        this._address = null;

        if (!isInBrowser()) {
            this._readyState = WalletReadyState.NotFound;
            this.setState(AdapterState.NotFound);
            return;
        }
        if (isInMobileBrowser() && supportSafepalWallet()) {
            // Mobile in-app browser: auto-reconnect is supported
            this._readyState = WalletReadyState.Found;
            this._updateWallet().then(() => {
                if (this.connected) {
                    this.emit('connect', this.address || '');
                }
            });
        } else {
            // PC extension or wallet not yet injected: detect only, no auto-reconnect
            this._checkWallet();
        }
    }

    get address() {
        return this._address;
    }

    get state() {
        return this._state;
    }
    get readyState() {
        return this._readyState;
    }

    get connecting() {
        return this._connecting;
    }

    /**
     * Get network information.
     * @returns {Network} Current network information.
     */
    async network(): Promise<Network> {
        try {
            await this._checkWallet();
            if (this.state !== AdapterState.Connected) throw new WalletDisconnectedError();
            const wallet = this._wallet;
            if (!wallet || !wallet.tronWeb) throw new WalletDisconnectedError();
            try {
                return await getNetworkInfoByTronWeb(wallet.tronWeb);
            } catch (e: any) {
                throw new WalletGetNetworkError(e?.message, e);
            }
        } catch (e: any) {
            this.emit('error', e);
            throw e;
        }
    }

    protected async _connect(): Promise<void> {
        try {
            if (!(await this._beforeConnect())) return;
            this._securityPassed = true;
            const wallet = this._wallet;
            // PC extension: the account request has to be made explicitly. In the mobile
            // in-app browser the wallet is already authorised, so there is nothing to ask for.
            if (!isInMobileBrowser()) {
                if (!wallet) return;
                this._connecting = true;
                try {
                    await wallet.tron.request({ method: 'tron_requestAccounts' });
                } catch (e: any) {
                    throw new WalletConnectionError(e.message, e);
                }
            }
            // A resolved `tron_requestAccounts` does not guarantee an address: the user may
            // have rejected the prompt, or the provider may not have populated `tronWeb`
            // yet. Entering `Connected` with an empty address would let later signing calls
            // pass the state guard and then fail inside the wallet.
            const address = assertConnectAddress(wallet?.tronWeb?.defaultAddress?.base58);
            this.setAddress(address);
            this.setState(AdapterState.Connected);
            this.emit('connect', this.address || '');
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        } finally {
            this._connecting = false;
        }
    }

    async disconnect(): Promise<void> {
        if (this.state !== AdapterState.Connected) {
            return;
        }
        this._securityPassed = false;
        this.setAddress(null);
        this.setState(AdapterState.Disconnect);
        this.emit('disconnect');
    }

    private async _checkAndSign<T>(
        action: (wallet: SafepalWallet) => Promise<T>,
        ErrorConstructor: typeof WalletSignTransactionError | typeof WalletSignMessageError
    ): Promise<T> {
        try {
            const wallet = await this.checkAndGetWallet();
            try {
                return await action(wallet);
            } catch (error: any) {
                if (error instanceof Error || (typeof error === 'object' && error?.message)) {
                    throw new ErrorConstructor(error.message, error);
                } else if (typeof error === 'string') {
                    throw new ErrorConstructor(error, new Error(error));
                } else {
                    throw new ErrorConstructor('Unknown error', error);
                }
            }
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        }
    }

    async signTransaction(transaction: Transaction): Promise<SignedTransaction> {
        return this._checkAndSign((wallet) => wallet.tronWeb.trx.sign(transaction), WalletSignTransactionError);
    }

    async signMessage(message: string): Promise<string> {
        return this._checkAndSign(async (wallet) => wallet.tronWeb.trx.signMessageV2(message), WalletSignMessageError);
    }

    private async checkAndGetWallet(): Promise<SafepalWallet> {
        this.checkIfOpenApp();
        await this._checkWallet();
        if (!this.connected) throw new WalletDisconnectedError();
        const wallet = this._wallet;
        if (!wallet || !wallet.tronWeb) throw new WalletDisconnectedError();
        return wallet;
    }

    private checkReadyInterval: ReturnType<typeof setInterval> | null = null;
    private checkForWalletReady() {
        if (this.checkReadyInterval) {
            return;
        }
        let times = 0;
        const maxTimes = Math.floor(this.config.checkTimeout / 200);
        const check = async () => {
            if (this._wallet && (this._wallet.tronWeb as any)?.ready) {
                this.checkReadyInterval && clearInterval(this.checkReadyInterval);
                this.checkReadyInterval = null;
                // _updateWallet runs the security check internally for the mobile path
                await this._updateWallet();
                if (this.connected) {
                    this.emit('connect', this.address || '');
                }
            } else if (times > maxTimes) {
                this.checkReadyInterval && clearInterval(this.checkReadyInterval);
                this.checkReadyInterval = null;
            } else {
                times++;
            }
        };
        this.checkReadyInterval = setInterval(check, 200);
    }

    private _checkPromise: Promise<boolean> | null = null;
    /**
     * Detection polls for the full `checkTimeout` only once. Later attempts re-check a
     * single time, so retrying is free when the wallet is genuinely absent.
     */
    private _hasRunInitialDetection = false;
    /**
     * check if wallet exists by interval, the promise only resolve when wallet detected or timeout
     * @returns if wallet exists
     */
    protected _checkWallet(): Promise<boolean> {
        if (this.readyState === WalletReadyState.Found) {
            return Promise.resolve(true);
        }
        if (this._checkPromise) {
            return this._checkPromise;
        }
        const interval = 100;
        const maxTimes = this._hasRunInitialDetection ? 0 : Math.floor(this.config.checkTimeout / interval);
        this._hasRunInitialDetection = true;
        let times = 0,
            timer: ReturnType<typeof setInterval>;
        const detection = new Promise<boolean>((resolve) => {
            const check = () => {
                times++;
                const isSupport = supportSafepalWallet();
                if (isSupport || times > maxTimes) {
                    timer && clearInterval(timer);
                    this._readyState = isSupport ? WalletReadyState.Found : WalletReadyState.NotFound;
                    this._updateWallet();
                    this.emit('readyStateChanged', this.readyState);
                    resolve(isSupport);
                }
            };
            timer = setInterval(check, interval);
            check();
        });
        this._checkPromise = detection;
        // Never cache a failed detection. The extension may inject late, be switched on at
        // runtime, or a mobile WebView may still be initialising — in all of those cases the
        // next call has to look again instead of replaying the old negative answer.
        void detection.then((found) => {
            if (!found && this._checkPromise === detection) {
                this._checkPromise = null;
            }
        });
        return detection;
    }

    private checkIfOpenApp() {
        if (this.config.openAppWithDeeplink === false) {
            return;
        }
        if (openSafepalWallet()) {
            throw new WalletNotFoundError();
        }
    }

    protected _openAppByDeepLinkIfNeed(): boolean {
        if (this.config.openAppWithDeeplink === false) {
            return false;
        }
        return openSafepalWallet();
    }

    private _updateWallet = async () => {
        if (supportSafepalWallet()) {
            if (isInMobileBrowser()) {
                // Mobile in-app browser: auto-reconnect supported, run security check
                const tron = window.safepalwallet.tron as unknown as TronLinkWallet;
                this._wallet = { tron, tronWeb: tron?.tronWeb };
                const tronWebReady = (this._wallet.tronWeb as any)?.ready;
                if (tronWebReady) {
                    try {
                        await this.checkSecurity();
                        this._securityPassed = true;
                    } catch {
                        this._securityPassed = false;
                        this.setAddress(null);
                        this.setState(AdapterState.Disconnect);
                        return;
                    }
                    const address = this._wallet.tronWeb.defaultAddress?.base58 || null;
                    this.setAddress(address);
                    this.setState(address ? AdapterState.Connected : AdapterState.Disconnect);
                    if (!address) {
                        this.checkForWalletReady();
                    }
                } else {
                    this.setAddress(null);
                    this.setState(AdapterState.Disconnect);
                    this.checkForWalletReady();
                }
            } else {
                // PC browser extension: no auto-reconnect.
                // Use defaultAddress.base58 to reflect connection state within the session,
                // but the constructor never emits 'connect' for this path.
                const tron = window.safepalTronProvider as unknown as TronLinkWallet;
                this._wallet = { tron, tronWeb: tron?.tronWeb };
                const address = this._wallet.tronWeb?.defaultAddress?.base58 || null;
                if (!address) {
                    this._securityPassed = false;
                    this.setAddress(null);
                    this.setState(AdapterState.Disconnect);
                    return;
                }
                // The extension keeps its authorisation across a page reload, so this path
                // reaches `Connected` without going through `connect()` — and therefore
                // without `_beforeConnect()`'s security check. Run it here as well, or
                // `securityOptions` would be bypassed on every desktop refresh. The result
                // is cached briefly, so the check that follows in `connect()` is not a
                // second network round trip.
                try {
                    await this.checkSecurity();
                    this._securityPassed = true;
                } catch {
                    this._securityPassed = false;
                    this.setAddress(null);
                    this.setState(AdapterState.Disconnect);
                    return;
                }
                this.setAddress(address);
                this.setState(AdapterState.Connected);
            }
        } else {
            this._wallet = null;
            this.setAddress(null);
            this.setState(AdapterState.NotFound);
        }
    };

    private setAddress(address: string | null) {
        this._address = address;
    }

    private setState(state: AdapterState) {
        const preState = this.state;
        if (state !== preState) {
            this._state = state;
            this.emit('stateChanged', state);
        }
    }
}
