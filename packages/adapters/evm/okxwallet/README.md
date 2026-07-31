# `@tronweb3/tronwallet-adapter-okxwallet-evm`

This package provides an adapter to enable DApps to connect to the [OKX Wallet](https://www.okx.com/web3) on EVM-Compatible Chains.

## Demo

```typescript
import { OkxWalletEvmAdapter } from '@tronweb3/tronwallet-adapter-okxwallet-evm';

const adapter = new OkxWalletEvmAdapter();
// connect
await adapter.connect();

// then you can get address
console.log(adapter.address);

// just use the sendTransaction method to send a transfer transaction.
const transaction = {
    value: '0x' + Number(0.01 * Math.pow(10, 18)).toString(16), // 0.01 is 0.01ETH
    to: 'your target address',
    from: adapter.address,
};
await adapter.sendTransaction(transaction);
```

## Documentation

### API

-   `Constructor(config: OkxWalletEvmAdapterOptions)`

    ```typescript
    import { OkxWalletEvmAdapter } from '@tronweb3/tronwallet-adapter-okxwallet-evm';
    interface OkxWalletEvmAdapterOptions {
        /**
         * Set if open OKX Wallet app when in mobile device.
         * Default is true.
         */
        useDeeplink?: boolean;
        /**
         * Set if open Wallet's website when wallet is not installed.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
    }

    // Default: open the OKX Wallet app on mobile, and open the wallet website
    // when the wallet is not detected.
    const okxWalletAdapter = new OkxWalletEvmAdapter();
    // Stay on the current page on mobile instead of opening the OKX Wallet app.
    const withoutDeeplink = new OkxWalletEvmAdapter({ useDeeplink: false });
    // Do not open the wallet website when the wallet is not detected.
    const withoutWebsite = new OkxWalletEvmAdapter({ openUrlWhenWalletNotFound: false });
    // Never navigate away; handle both cases in your own UI.
    const silent = new OkxWalletEvmAdapter({ useDeeplink: false, openUrlWhenWalletNotFound: false });
    ```

    **How the two options interact**

    `connect()` evaluates the deeplink first, so at most one of them takes effect per call:

    1. In a mobile browser outside the OKX Wallet in-app browser, and when `useDeeplink` is not
       `false`, the adapter opens the OKX Wallet app and `connect()` resolves with an empty string
       immediately. `openUrlWhenWalletNotFound` is never reached.
    2. Otherwise — on desktop, inside the OKX Wallet in-app browser, or with `useDeeplink: false` —
       the adapter looks for the injected provider. If it is missing and `openUrlWhenWalletNotFound`
       is not `false`, the wallet website is opened in a new tab, and `WalletNotFoundError` is thrown
       either way.

    So `openUrlWhenWalletNotFound` only applies on the path where no deeplink was opened.

More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/evm/abstract-adapter/README.md).
