export interface Risk {
    title: string;
    noticeType: 1 | 2 | 3;
    ext?: string;
    ios?: string;
    and?: string;
}
export interface RiskConfig {
    v: string;
    ts: number;
    wallets: {
        [walletName: string]: Risk[];
    };
}
export interface SecurityCheckResult {
    risks: Risk[];
}
export interface SecurityOptions {
    /**
     * Remote config JSON URL(s)
     */
    configUrls?: string[];
    /**
     * Enable security check (default: false)
     */
    enabled?: boolean;
    /**
     * Custom callback when a risk is detected
     */
    onRiskDetected?: (result: SecurityCheckResult) => Promise<void>;
    /**
     * Request timeout in milliseconds (default: 2000)
     */
    timeout?: number;
    /**
     * Number of retries when the config fetch fails (default: 0)
     */
    retries?: number;
    /**
     * Custom fallback handler for config fetch errors
     */
    onConfigFallback?: () => RiskConfig | Promise<RiskConfig>;
    /**
     * Cache duration in milliseconds (default: 10 * 60 * 1000)
     */
    cacheTTL?: number;
}

export const defaultSecurityOptions = {
    onRiskDetected: async (result: SecurityCheckResult) => {
        console.log(`[WalletAdapter] Risk detected:`, result);
    },
    configUrls: [],
    enabled: false,
    timeout: 2000,
    retries: 0,
    cacheTTL: 10 * 60 * 1000,
};

/** A config fetch that takes longer than this is never worth waiting for. */
const MAX_SECURITY_TIMEOUT = 60 * 1000;
/** `retries` multiplies the time `connect()` can block, so it is capped. */
const MAX_SECURITY_RETRIES = 10;

function assertFiniteNumber(value: unknown, field: string, min: number, max: number): void {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) {
        throw new Error(
            `[WalletAdapter] config.securityOptions.${field} should be a finite number between ${min} and ${max}, but got ${String(
                value
            )}`
        );
    }
}

function parseAbsoluteUrl(url: string): URL | null {
    try {
        return new URL(url);
    } catch {
        // Not absolute — a relative path, which `fetch` resolves against the page.
        return null;
    }
}

function validateConfigUrls(configUrls: unknown): void {
    if (!Array.isArray(configUrls)) {
        throw new Error(
            `[WalletAdapter] config.securityOptions.configUrls should be an array of URLs, but got ${typeof configUrls}`
        );
    }
    for (const url of configUrls) {
        if (typeof url !== 'string' || url.trim() === '') {
            throw new Error(
                `[WalletAdapter] config.securityOptions.configUrls should only contain non-empty URL strings, but got ${String(
                    url
                )}`
            );
        }
        // Relative paths are legitimate — they resolve against the page and `new URL`
        // rejects them — so only values that parse as an absolute URL are checked,
        // and then only for the scheme `fetch` can actually retrieve.
        const parsed = parseAbsoluteUrl(url);
        if (parsed && parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            throw new Error(
                `[WalletAdapter] config.securityOptions.configUrls only supports http(s) URLs, but got ${url}`
            );
        }
    }
}

/**
 * Validate `config.securityOptions` at construction time.
 *
 * Every field here is consumed much later, inside `connect()` — a `configUrls`
 * string instead of an array only fails when `fetchJsonWithCache` calls `.map`
 * on it, and a `NaN` timeout or a negative `retries` silently changes the fetch
 * behaviour rather than reporting anything. Failing fast in the constructor puts
 * the error where the caller can act on it.
 */
export function validateSecurityOptions(securityOptions: SecurityOptions): void {
    const { enabled, configUrls, timeout, retries, cacheTTL, onRiskDetected, onConfigFallback } = securityOptions;

    if (configUrls !== undefined) {
        validateConfigUrls(configUrls);
    }
    if (enabled && (!configUrls || configUrls.length === 0)) {
        throw new Error(
            `[WalletAdapter] config.securityOptions.configUrls is required when securityOptions.enabled is true`
        );
    }
    if (timeout !== undefined) {
        assertFiniteNumber(timeout, 'timeout', 1, MAX_SECURITY_TIMEOUT);
    }
    if (cacheTTL !== undefined) {
        // No upper bound: caching the risk config for a long time is a valid choice.
        assertFiniteNumber(cacheTTL, 'cacheTTL', 0, Number.MAX_SAFE_INTEGER);
    }
    if (retries !== undefined && (!Number.isInteger(retries) || retries < 0 || retries > MAX_SECURITY_RETRIES)) {
        throw new Error(
            `[WalletAdapter] config.securityOptions.retries should be an integer between 0 and ${MAX_SECURITY_RETRIES}, but got ${String(
                retries
            )}`
        );
    }
    if (onRiskDetected !== undefined && typeof onRiskDetected !== 'function') {
        throw new Error(
            `[WalletAdapter] config.securityOptions.onRiskDetected should be a function, but got ${typeof onRiskDetected}`
        );
    }
    if (onConfigFallback !== undefined && typeof onConfigFallback !== 'function') {
        throw new Error(
            `[WalletAdapter] config.securityOptions.onConfigFallback should be a function, but got ${typeof onConfigFallback}`
        );
    }
}

function isValidRisk(risk: any): boolean {
    return (
        !!risk &&
        typeof risk === 'object' &&
        typeof risk.title === 'string' &&
        risk.title.length > 0 &&
        (risk.noticeType === 1 || risk.noticeType === 2 || risk.noticeType === 3)
    );
}

function sanitizeRisk(risk: any): Risk {
    const clean: Risk = { title: risk.title, noticeType: risk.noticeType };
    if (typeof risk.ext === 'string') clean.ext = risk.ext;
    if (typeof risk.ios === 'string') clean.ios = risk.ios;
    if (typeof risk.and === 'string') clean.and = risk.and;
    return clean;
}

/**
 * Defensively coerce an arbitrary remote payload into a well-formed RiskConfig.
 *
 * The config comes from a remote URL, so a bad release (or a tampered response)
 * must never break the connect flow. Anything malformed is dropped with a
 * warning rather than thrown: `wallets` must be a record whose values are
 * arrays, and each risk must have a non-empty string `title` and a `noticeType`
 * of 1/2/3. Invalid entries are discarded so downstream merging/consumption
 * only ever sees clean `Risk[]`.
 */
function normalizeRiskConfig(data: any): RiskConfig {
    const source = data && typeof data === 'object' ? data : {};
    const wallets: Record<string, Risk[]> = {};

    if (source.wallets && typeof source.wallets === 'object') {
        for (const [walletName, rawRisks] of Object.entries(source.wallets)) {
            if (!Array.isArray(rawRisks)) {
                console.warn(
                    `[WalletAdapter] Ignoring malformed risks for "${walletName}": expected an array, got ${typeof rawRisks}.`
                );
                continue;
            }
            const validRisks: Risk[] = [];
            for (const risk of rawRisks) {
                if (isValidRisk(risk)) {
                    validRisks.push(sanitizeRisk(risk));
                } else {
                    console.warn(`[WalletAdapter] Dropping malformed risk entry for "${walletName}":`, risk);
                }
            }
            if (validRisks.length > 0) {
                wallets[walletName] = validRisks;
            }
        }
    }

    return {
        v: typeof source.v === 'string' ? source.v : '',
        ts: typeof source.ts === 'number' ? source.ts : 0,
        wallets,
    };
}

const _jsonCache: Record<string, { data: RiskConfig; timestamp: number }> = {};
export function clearCache() {
    Object.keys(_jsonCache).forEach((key) => {
        Reflect.deleteProperty(_jsonCache, key);
    });
}

export async function fetchJsonWithCache(
    options: Omit<SecurityOptions, 'enabled' | 'onRiskDetected'>
): Promise<RiskConfig> {
    const {
        configUrls = defaultSecurityOptions.configUrls,
        timeout = defaultSecurityOptions.timeout,
        retries = defaultSecurityOptions.retries,
        onConfigFallback,
        cacheTTL = defaultSecurityOptions.cacheTTL,
    } = options;

    const now = Date.now();

    async function fetchOneUrl(url: string): Promise<RiskConfig | null> {
        const cache = _jsonCache[url];
        if (cache && now - cache.timestamp < cacheTTL) {
            return cache.data;
        }

        async function fetchWithTimeout(): Promise<RiskConfig> {
            return new Promise((resolve, reject) => {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), timeout);
                fetch(url, { signal: controller.signal })
                    .then((resp) => {
                        clearTimeout(timer);
                        if (!resp.ok) reject(new Error('Fetch failed with code: ' + resp.status));
                        else resp.json().then((data) => resolve(normalizeRiskConfig(data)), reject);
                    })
                    .catch((err) => {
                        clearTimeout(timer);
                        reject(err);
                    });
            });
        }

        for (let i = 0; i <= retries; i++) {
            try {
                const data = await fetchWithTimeout();
                _jsonCache[url] = { data, timestamp: Date.now() };
                return data;
            } catch (e) {
                console.warn(`[WalletAdapter] Fetch attempt ${i + 1} for ${url} failed:`, e);
                // continue to next retry
            }
        }

        // All retries failed — let the outer caller decide (onConfigFallback or safe empty config)
        return null;
    }

    const results = await Promise.all(configUrls.map(fetchOneUrl));
    const configs = results.filter((r): r is RiskConfig => r !== null);

    if (configs.length > 0) {
        return configs.reduce<RiskConfig>(
            (merged, config) => {
                if (config.ts > merged.ts) {
                    merged.v = config.v;
                    merged.ts = config.ts;
                }
                // Pass every risk from every source through to the DApp without
                // deduplication. Conflict resolution (highest severity wins, source
                // weighting, etc.) is the DApp's responsibility — the adapter just
                // delivers the union.
                for (const [wallet, risks] of Object.entries(config.wallets)) {
                    merged.wallets[wallet] = [...(merged.wallets[wallet] ?? []), ...risks];
                }
                return merged;
            },
            { v: '', ts: 0, wallets: {} }
        );
    }

    // All URLs failed with no cache — call custom fallback or default to safe (allow connection)
    if (onConfigFallback) {
        return normalizeRiskConfig(await onConfigFallback());
    }
    return { v: '', ts: 0, wallets: {} };
}
