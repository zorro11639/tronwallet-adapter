import { isInBrowser, isInMobileBrowser, type EIP1193Provider } from '@tronweb3/abstract-adapter-evm';

export const BINANCE_RDNS = 'com.binance.wallet';

function isInBinance() {
    try {
        return (window as Window & { ethereum?: { isBinance?: boolean } }).ethereum?.isBinance === true;
    } catch {
        return false;
    }
}

function isExtensionInstalled() {
    try {
        return (window as Window & { binancew3w?: { isExtension?: boolean } }).binancew3w?.isExtension === true;
    } catch {
        return false;
    }
}

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

export function supportBinanceEvm() {
    return isInBrowser() && (isExtensionInstalled() || isInBinance());
}

export function getBinanceEvmProvider(): null | EIP1193Provider {
    if (supportBinanceEvm()) {
        const context = window as Window & {
            ethereum?: EIP1193Provider & { providers?: EIP1193Provider[] };
            binancew3w?: { ethereum?: EIP1193Provider };
        };
        const providers = [
            context.binancew3w?.ethereum,
            context.ethereum,
            ...(context.ethereum?.providers || []),
        ].filter(Boolean) as EIP1193Provider[];

        return providers.find((provider) => (provider as any).isBinance) || null;
    }
    return null;
}

export function openBinanceWithDeeplink() {
    if (isInMobileBrowser() && !supportBinanceEvm()) {
        const link = getBinanceDeepLink(window.location.href, 14);
        window.open(link.bnc, '_blank');
    }
    return false;
}
