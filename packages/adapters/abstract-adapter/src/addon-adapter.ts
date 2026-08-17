import type { BaseAdapterConfig } from './adapter.js';
import { Adapter } from './adapter.js';
import { WalletNotFoundError } from './errors.js';
import type { SecurityOptions } from './security.js';
import { defaultSecurityOptions, fetchJsonWithCache, validateSecurityOptions } from './security.js';
import { WalletReadyState } from './types.js';
import { isInBrowser, validateCheckTimeout } from './utils.js';

/**
 * Class to provide security check for wallets.
 */
export abstract class AddonAdapter extends Adapter {
    protected commonConfig: Required<BaseAdapterConfig> = {
        checkTimeout: 2 * 1000,
        openAppWithDeeplink: true,
        openUrlWhenWalletNotFound: true,
        securityOptions: defaultSecurityOptions,
    };
    constructor(params?: BaseAdapterConfig) {
        super();
        // Drop explicit `undefined`s before merging: spreading them would overwrite
        // the defaults with `undefined` and make `Required<BaseAdapterConfig>` a lie,
        // which matters because callers routinely spread optional config objects.
        const overrides = Object.fromEntries(
            Object.entries(params ?? {}).filter(([, value]) => value !== undefined)
        ) as BaseAdapterConfig;
        this.commonConfig = {
            ...this.commonConfig,
            ...overrides,
        };
        validateCheckTimeout(this.commonConfig.checkTimeout);
        validateSecurityOptions(this.commonConfig.securityOptions);
    }

    /**
     * Update the security options at runtime. The given options are merged into
     * the existing config, validated, and the cached security check result is
     * cleared so the next connect runs a fresh check with the new configuration.
     */
    updateSecurityOptions(securityOptions: SecurityOptions): void {
        const merged: SecurityOptions = {
            ...this.commonConfig.securityOptions,
            ...securityOptions,
        };
        validateSecurityOptions(merged);
        this.commonConfig.securityOptions = merged;
        this._securityCheckCache = null;
    }

    /**
     * Run the pre-connect pipeline (wallet discovery, deeplink/url fallback,
     * security check).
     *
     * @returns `true` when the caller should continue with the actual connect
     * flow, `false` when the adapter is already connected/connecting and the
     * caller should bail out. Throws `WalletNotFoundError` when the wallet
     * cannot be found.
     */
    protected async _beforeConnect(): Promise<boolean> {
        if (this.connected || this.connecting) return false;
        await this._checkWallet();
        if (this.readyState === WalletReadyState.NotFound) {
            if (
                isInBrowser() &&
                !this._openAppByDeepLinkIfNeed() &&
                this.commonConfig.openUrlWhenWalletNotFound !== false
            ) {
                window.open(this.url, '_blank');
            }
            throw new WalletNotFoundError();
        }
        await this.checkSecurity();
        return true;
    }
    private _securityCheckCache: { promise: Promise<void>; settledAt: number | null } | null = null;
    private static readonly SECURITY_CHECK_CACHE_TTL = 5 * 1000;
    /**
     * Fetch remote config and do risk check.
     * In-flight calls share the same promise (so `onRiskDetected` fires at most
     * once even on a slow network). After the promise settles, the result is
     * cached for SECURITY_CHECK_CACHE_TTL; the next call after that window
     * runs a fresh check.
     */
    protected async checkSecurity(): Promise<void> {
        if (!this.commonConfig.securityOptions.enabled) return;
        const cache = this._securityCheckCache;
        if (
            cache &&
            (cache.settledAt === null || Date.now() - cache.settledAt < AddonAdapter.SECURITY_CHECK_CACHE_TTL)
        ) {
            return cache.promise;
        }
        const promise = (async () => {
            const result = await fetchJsonWithCache(this.commonConfig.securityOptions);
            const risks = result.wallets[this.name];
            if (risks && risks.length > 0) {
                const callback =
                    this.commonConfig.securityOptions.onRiskDetected || defaultSecurityOptions.onRiskDetected;
                await callback({ risks });
            }
        })();
        const entry: { promise: Promise<void>; settledAt: number | null } = { promise, settledAt: null };
        this._securityCheckCache = entry;
        // The `.finally` chain returns a new promise that mirrors `promise`'s rejection.
        // Attach a noop `.catch` to avoid an unhandled rejection on that chain — the
        // original `promise` is still surfaced to callers via the return below.
        promise
            .finally(() => {
                if (this._securityCheckCache === entry) {
                    entry.settledAt = Date.now();
                }
            })
            .catch(() => {});
        return promise;
    }
    /**
     * Check if wallet exists and update readyState.
     * @returns true if wallet exists, false otherwise.

     */
    protected abstract _checkWallet(): Promise<boolean>;
    /**
     * Open wallet's app by deep link.
     * @returns true if do the open action, false otherwise.
     */
    protected abstract _openAppByDeepLinkIfNeed(): boolean;
}
