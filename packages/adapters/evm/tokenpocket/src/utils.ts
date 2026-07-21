import type { EIP1193Provider } from '@tronweb3/abstract-adapter-evm';

export const TOKENPOCKET_RDNS = 'pro.tokenpocket';

export interface TokenPocketProvider extends EIP1193Provider {
    isTokenPocket?: boolean;
}

function isTokenPocketProvider(provider: EIP1193Provider | null | undefined): provider is TokenPocketProvider {
    return Boolean(provider && (provider as TokenPocketProvider).isTokenPocket);
}

export function getTokenPocketProvider(): TokenPocketProvider | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const context = window as Window & {
        ethereum?: TokenPocketProvider & { providers?: TokenPocketProvider[] };
        tokenpocket?: { ethereum?: TokenPocketProvider };
    };

    // Check window.tokenpocket.ethereum first
    if (isTokenPocketProvider(context.tokenpocket?.ethereum)) {
        return context.tokenpocket.ethereum;
    }

    // Fallback: check window.ethereum and its providers array
    const providers = [context.ethereum, ...(context.ethereum?.providers || [])].filter(
        Boolean
    ) as TokenPocketProvider[];
    return providers.find((provider) => isTokenPocketProvider(provider)) || null;
}

export function isTokenPocketMobileWebView(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    const context = window as Window & {
        ethereum?: TokenPocketProvider;
        tokenpocket?: { ethereum?: TokenPocketProvider };
    };
    return isTokenPocketProvider(context.ethereum) || isTokenPocketProvider(context.tokenpocket?.ethereum);
}

export function openTokenPocketWithDeeplink(): void {
    if (typeof window === 'undefined') {
        return;
    }
    const param = {
        action: 'link',
        actionType: 'dapp',
        dappUrl: window.location.href,
        protocol: 'TokenPocket',
        version: '2.0',
    };
    const encodedParam = encodeURIComponent(JSON.stringify(param));
    const link = `tpoutside://pull.activity?param=${encodedParam}`;
    window.location.href = link;
}
