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
    const { origin, pathname, search, hash } = window.location;
    const url = origin + pathname + search + hash;
    const params = {
        url,
    };
    const encodedParams = encodeURIComponent(JSON.stringify(params));
    const link = `tpdapp://open?params=${encodedParams}`;
    window.location.href = link;
}
