import { isInBrowser, isInMobileBrowser } from '@tronweb3/tronwallet-abstract-adapter';

/**
 * Check if the wallet is installed.
 * @returns true if wallet is supported.
 */
export function supportDemoWallet() {
    // Check whether is in browser and injected wallet exists.
    // @ts-ignore
    return isInBrowser() && Boolean(window.demowallet);
}

/**
 * Open Wallet app on mobile device using deeplink.
 * @returns true if in mobile browser and wallet is not installed.
 */
export function openDemoWallet() {
    if (isInMobileBrowser() && !supportDemoWallet()) {
        window.location.href = `https://deeplink.demo/${encodeURIComponent(window.location.href)}`;
        return true;
    }
    return false;
}
