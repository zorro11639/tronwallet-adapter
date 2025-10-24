import { hasOKXInjectedProvider } from '@okxconnect/core';
import { isInBrowser, isInMobileBrowser, type EIP1193Provider } from '@tronweb3/abstract-adapter-evm';
import { OkxEIP1193ProvderMobile } from './OkxEIP1193Provider.js';

export function supportOkxWallet() {
    return (
        (isInMobileBrowser() && !!hasOKXInjectedProvider()) ||
        (isInBrowser() && typeof window.okxwallet !== 'undefined')
    );
}
export function getOkxWalletProvider(): null | EIP1193Provider {
    if (supportOkxWallet()) {
        if (isInMobileBrowser()) {
            return new OkxEIP1193ProvderMobile();
        }
        return window.okxwallet as EIP1193Provider;
    }
    return null;
}

export function isInOKApp() {
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        return /OKApp/i.test(window.navigator.userAgent);
    }
    return false;
}
export function openOkxWallet() {
    if (!isInOKApp() && isInMobileBrowser()) {
        window.location.href = 'okx://wallet/dapp/url?dappUrl=' + encodeURIComponent(window.location.href);
        return true;
    }
    return false;
}
