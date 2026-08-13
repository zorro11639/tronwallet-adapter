import { isInBrowser, isInMobileBrowser } from '@tronweb3/tronwallet-abstract-adapter';

export function supportSafepalWallet() {
    return (
        isInBrowser() &&
        // PC browser extension injects window.safepalTronProvider + window.tronWeb
        // Mobile in-app browser injects window.safepalwallet.tron
        !!((window.safepalTronProvider && window.tronWeb) || window.safepalwallet?.tron)
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
