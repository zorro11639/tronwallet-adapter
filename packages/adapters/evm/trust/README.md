# `@tronweb3/tronwallet-adapter-trust-evm`

This package provides an adapter to enable DApps to connect to the [Trust Wallet](https://trustwallet.com/browser-extension).

## Demo

```typescript
import { TrustEvmAdapter } from '@tronweb3/tronwallet-adapter-trust-evm';

const adapter = new TrustEvmAdapter();
await adapter.connect();

console.log(adapter.address);

const transaction = {
    value: '0x' + Number(0.01 * Math.pow(10, 18)).toString(16),
    to: 'your target address',
    from: adapter.address,
};
await adapter.sendTransaction(transaction);
```

## Documentation

### API

-   `Constructor(config: TrustEvmAdapterOptions)`

    ```typescript
    import { TrustEvmAdapter } from '@tronweb3/tronwallet-adapter-trust-evm';

    interface TrustEvmAdapterOptions {
        /**
         * Set if open Trust Wallet app when in mobile device.
         * Default is true.
         */
        useDeeplink?: boolean;
        /**
         * Set if open Wallet's website when wallet is not installed.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
    }

    // Default: open the Trust Wallet app on mobile, and open the wallet website
    // when the wallet is not detected.
    const trustWalletEvmAdapter = new TrustEvmAdapter();
    // Stay on the current page on mobile instead of opening the Trust Wallet app.
    const withoutDeeplink = new TrustEvmAdapter({ useDeeplink: false });
    // Do not open the wallet website when the wallet is not detected.
    const withoutWebsite = new TrustEvmAdapter({ openUrlWhenWalletNotFound: false });
    // Never navigate away; handle both cases in your own UI.
    const silent = new TrustEvmAdapter({ useDeeplink: false, openUrlWhenWalletNotFound: false });
    ```

    **How the two options interact**

    `connect()` evaluates the deeplink first, so at most one of them takes effect per call:

    1. In a mobile browser outside the Trust Wallet in-app browser, and when `useDeeplink` is not
       `false`, the adapter opens the Trust Wallet app and `connect()` resolves with an empty string
       immediately. `openUrlWhenWalletNotFound` is never reached.
    2. Otherwise — on desktop, inside the Trust Wallet in-app browser, or with `useDeeplink: false` —
       the adapter looks for the injected provider. If it is missing and `openUrlWhenWalletNotFound`
       is not `false`, the wallet website is opened in a new tab, and `WalletNotFoundError` is thrown
       either way.

    So `openUrlWhenWalletNotFound` only applies on the path where no deeplink was opened.

The adapter discovers the Trust Wallet extension using `EIP-6963` and supports the standard EVM wallet methods exposed by the shared abstract adapter.

More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/evm/abstract-adapter/README.md).
