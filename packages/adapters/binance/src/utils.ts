import { isInBrowser, isInMobileBrowser } from '@tronweb3/tronwallet-abstract-adapter';

function getBinanceDeepLink(url: string, chainId = 1) {
    const base = 'bnc://app.binance.com/mp/app';
    const appId = 'yFK5FCqYprrXDiVFbhyRx7';
    const startPagePath = window.btoa('/pages/browser/index');
    const startPageQuery = window.btoa(`url=${url}&defaultChainId=${chainId}`);
    const deeplink = `${base}?appId=${appId}&startPagePath=${startPagePath}&startPageQuery=${startPageQuery}`;

    return {
        bnc: deeplink,
        http: `https://app.binance.com/en/download?_dp=${window.btoa(deeplink)}`,
    };
}

export function supportBinanceWallet() {
    return isInBrowser() && Boolean(window.isBinance);
}

export function openBinanceWallet() {
    if (isInMobileBrowser() && !supportBinanceWallet()) {
        // Use the universal-link variant (`.http`) rather than the `bnc://` custom scheme:
        // the custom scheme opens the Binance app but drops the embedded dApp URL on some mobile
        // browsers/OSes, so the app lands on its home instead of the dApp. The universal link
        // carries the URL reliably, and gracefully falls back to the download page when the
        // Binance app is not installed (the custom scheme just no-ops in that case).
        window.location.href = getBinanceDeepLink(window.location.href).http;
        return true;
    }
    return false;
}
