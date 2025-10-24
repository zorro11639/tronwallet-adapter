import type { RequestParams } from '@okxconnect/core';
import { Eip155Provider } from '@okxconnect/core';
import type { EIP1193Provider, ProviderEvents } from '@tronweb3/abstract-adapter-evm';

export class OkxEIP1193ProvderMobile implements EIP1193Provider {
    provider: Eip155Provider;
    constructor() {
        this.provider = new Eip155Provider();
    }
    on<TEvent extends keyof ProviderEvents>(event: TEvent, listener: ProviderEvents[TEvent]): this {
        if (event === 'accountsChanged') {
            this.provider.addAccountChangedListener(listener as any);
            return this;
        }
        console.error('[OkxEIP1193ProviderMobile] Only support `accountsChanged` event.');
        return this;
    }
    removeListener<TEvent extends keyof ProviderEvents>(event: TEvent, listener: ProviderEvents[TEvent]): this {
        this.provider.removeListener();
        return this;
    }
    removeAllListeners(event?: string | symbol): this {
        this.provider.removeListener();
        return this;
    }
    request<P = unknown[], T = unknown>(params: { method: string; params?: P }): Promise<T> {
        return this.provider.send(params as RequestParams);
    }
}
