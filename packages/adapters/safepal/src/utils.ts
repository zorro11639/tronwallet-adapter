import { isInBrowser, isInMobileBrowser } from '@tronweb3/tronwallet-abstract-adapter';

/**
 * Detect a SafePal provider this adapter can actually work with.
 *
 * **Mobile app only.** The PC browser extension injects
 * `window.safepalTronProvider` + `window.tronWeb` and is deliberately *not*
 * detected here, because its `signTransaction()` throws — a wallet that connects
 * but cannot sign is worse than one reported as unavailable. Leaving it
 * undetected makes the adapter report `NotFound` on desktop, so `connect()`
 * surfaces `WalletNotFoundError` and the wallet-select UI lists SafePal as not
 * installed instead of offering a dead end.
 *
 * To restore extension support once SafePal fixes signing, add the extension
 * clause back:
 *
 * ```ts
 * !!((window.safepalTronProvider && window.tronWeb) || window.safepalwallet?.tron)
 * ```
 *
 * The extension code paths in `adapter.ts` (`_connect()`'s non-mobile branch and
 * `_updateWallet()`'s `else` branch) are kept intact for exactly that reason —
 * they are unreachable while this gate is mobile-only.
 */
export function supportSafepalWallet() {
    return (
        isInBrowser() &&
        // Mobile in-app browser injects window.safepalwallet.tron
        !!window.safepalwallet?.tron
    );
}

export function openSafepalWallet() {
    if (isInMobileBrowser() && !supportSafepalWallet()) {
        const { origin, pathname, search, hash } = window.location;
        const url = origin + pathname + search + hash;
        location.href = `https://link.safepal.io/wallet/openurl?url=${encodeURIComponent(url)}`;
        return true;
    }
    return false;
}
