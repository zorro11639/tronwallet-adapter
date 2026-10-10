import { isInMobileBrowser } from '@tronweb3/tronwallet-abstract-adapter';

export function supportTrust() {
    return typeof window !== 'undefined' && !!(window.trustwallet && window.trustwallet.tronLink);
}

export const isTrustApp = function () {
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        return /Trust/i.test(window.navigator.userAgent);
    }
    return false;
};
/**
 * Detect if running inside the Trust Wallet mobile app (iOS or Android).
 * The Trust Wallet app injects `window.trustwallet.tronLink` into its in-app
 * browser/WebView, so the same `supportTrust()` check covers both the browser
 * extension and the mobile app.
 */
export function isInTrustApp() {
    return isInMobileBrowser() && (isTrustApp() || supportTrust());
}
export function openTrustWallet() {
    if (!isInTrustApp() && isInMobileBrowser()) {
        window.location.href = 'https://link.trustwallet.com/open_url?url=' + encodeURIComponent(window.location.href);
        return true;
    }

    return false;
}
