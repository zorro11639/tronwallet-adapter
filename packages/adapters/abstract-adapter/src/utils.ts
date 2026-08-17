/**
 * Upper bound for `config.checkTimeout`, in milliseconds.
 *
 * Wallet detection polls on a fixed interval and gives up after
 * `checkTimeout / interval` ticks. An unbounded value makes that loop
 * indistinguishable from one that never stops, so it is capped. Ten minutes is
 * far beyond any realistic detection window.
 */
export const MAX_CHECK_TIMEOUT = 10 * 60 * 1000;

/**
 * Validate `config.checkTimeout` and throw when it cannot produce a terminating
 * detection loop.
 *
 * `typeof value === 'number'` is not enough on its own: `NaN` and `Infinity` are
 * numbers, and adapters derive their polling bound from
 * `Math.floor(checkTimeout / interval)`. With `NaN` that bound is `NaN`, so
 * `times > maxTimes` is never true — the interval is never cleared and the
 * detection promise never settles, hanging `connect()` for the life of the page.
 * TypeScript cannot prevent this because adapters are also constructed from
 * plain JavaScript, JSON config and `as any`.
 *
 * @param value the raw value taken from the adapter config
 * @param prefix prefix used in the thrown message, e.g. `[TronLinkAdapter]`
 */
export function validateCheckTimeout(value: unknown, prefix = '[WalletAdapter]'): void {
    if (typeof value !== 'number') {
        throw new Error(`${prefix} config.checkTimeout should be a number`);
    }
    if (!Number.isFinite(value) || value < 0 || value > MAX_CHECK_TIMEOUT) {
        throw new Error(
            `${prefix} config.checkTimeout should be a finite number between 0 and ${MAX_CHECK_TIMEOUT}, but got ${value}`
        );
    }
}

/**
 * check simply if current environment is browser or not
 * @returns boolean
 */
export function isInBrowser() {
    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';
}

/**
 *
 * @param {Function} check funcion to check if wallet is installed. return true if wallet is detected.
 * @returns
 */
export function checkAdapterState(check: () => boolean): void {
    if (!isInBrowser()) return;

    const disposers: (() => void)[] = [];

    function dispose() {
        for (const dispose of disposers) {
            dispose();
        }
    }
    function checkAndDispose() {
        if (check()) {
            dispose();
        }
    }

    const interval = setInterval(checkAndDispose, 500);
    disposers.push(() => clearInterval(interval));

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndDispose, { once: true });
        disposers.push(() => document.removeEventListener('DOMContentLoaded', checkAndDispose));
    }

    if (document.readyState !== 'complete') {
        window.addEventListener('load', checkAndDispose, { once: true });
        disposers.push(() => window.removeEventListener('load', checkAndDispose));
    }
    checkAndDispose();
    // stop all task after 1min
    setTimeout(dispose, 60 * 1000);
}

/**
 * Simplily detect mobile device
 */
export function isInMobileBrowser() {
    return (
        typeof navigator !== 'undefined' &&
        navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)
    );
}
