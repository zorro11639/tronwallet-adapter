import { isInBrowser, isInMobileBrowser, type EIP1193Provider } from '@tronweb3/abstract-adapter-evm';

declare global {
    interface Window {
        tokenpocket?: {
            ethereum: EIP1193Provider;
        };
    }
}
export function supportTokenPocketEvm() {
    return isInBrowser() && !!window.tokenpocket?.ethereum;
}
export function getTokenPocketEvmProvider(): null | EIP1193Provider {
    if (supportTokenPocketEvm()) {
        return window.tokenpocket?.ethereum || null;
    }
    return null;
}

export function openTokenPocketWithDeeplink() {
    if (!supportTokenPocketEvm() && isInMobileBrowser()) {
        const { origin, pathname, search, hash } = window.location;
        const url = origin + pathname + search + hash;
        const params = {
            chain: 'Ethereum',
            url,
            source: '',
        };
        window.location.href = `tpdapp://open?params=${encodeURIComponent(JSON.stringify(params))}`;
        return true;
    }
    return false;
}
