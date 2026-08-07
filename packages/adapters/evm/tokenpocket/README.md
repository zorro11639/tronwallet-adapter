# `@tronweb3/tronwallet-adapter-tokenpocket-evm`

This package provides an adapter to enable DApps to connect to the [TokenPocket](https://tokenpocket.pro) on EVM-Compatible Chains.

## Demo

```typescript
import { TokenPocketEvmAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket-evm';

const adapter = new TokenPocketEvmAdapter();
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

-   `Constructor(config: TokenPocketEvmAdapterOptions)`

    ```typescript
    import { TokenPocketEvmAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket-evm';
    interface TokenPocketEvmAdapterOptions {
        /**
         * Set if open TokenPocket app when in mobile device.
         * Default is true.
         */
        useDeeplink?: boolean;
        /**
         * Set if open Wallet's website when wallet is not installed.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
    }

    // Default: open the TokenPocket app on mobile, and open the wallet website
    // when the wallet is not detected.
    const adapter = new TokenPocketEvmAdapter();
    // Stay on the current page on mobile instead of opening the TokenPocket app.
    const withoutDeeplink = new TokenPocketEvmAdapter({ useDeeplink: false });
    // Do not open the wallet website when the wallet is not detected.
    const withoutWebsite = new TokenPocketEvmAdapter({ openUrlWhenWalletNotFound: false });
    // Never navigate away; handle both cases in your own UI.
    const silent = new TokenPocketEvmAdapter({ useDeeplink: false, openUrlWhenWalletNotFound: false });
    ```

    **How the two options interact**

    `connect()` evaluates the deeplink first, so at most one of them takes effect per call:

    1. In a mobile browser outside the TokenPocket in-app browser, and when `useDeeplink` is not
       `false`, the adapter opens the TokenPocket app and `connect()` resolves with an empty string
       immediately. `openUrlWhenWalletNotFound` is never reached.
    2. Otherwise — on desktop, inside the TokenPocket in-app browser, or with `useDeeplink: false` —
       the adapter looks for the injected provider. If it is missing and `openUrlWhenWalletNotFound`
       is not `false`, the wallet website is opened in a new tab, and `WalletNotFoundError` is thrown
       either way.

    So `openUrlWhenWalletNotFound` only applies on the path where no deeplink was opened.

### Caveats

-   **Contract Deployment on TokenPocket iOS App**: The TokenPocket iOS App cannot sign transactions for deploying new contracts because it requires a `to` field to be present. However, passing a `to` field causes the wallet to process the transaction as a contract call rather than a contract deployment.

More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/evm/abstract-adapter/README.md).
