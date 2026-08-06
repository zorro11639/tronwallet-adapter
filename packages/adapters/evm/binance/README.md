# `@tronweb3/tronwallet-adapter-binance-evm`

This package provides an adapter to enable DApps to connect to the [Binance Wallet App](https://www.binance.com/en/binancewallet).

## Demo

```typescript
import { BinanceEvmAdapter } from '@tronweb3/tronwallet-adapter-binance-evm';

const adapter = new BinanceEvmAdapter();
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

-   `Constructor(config: BinanceEvmAdapterOptions)`

    ```typescript
    import { BinanceEvmAdapter } from '@tronweb3/tronwallet-adapter-binance-evm';
    interface BinanceEvmAdapterOptions {
        /**
         * Set if open Binance Wallet app when in mobile device.
         * Default is true.
         */
        useDeeplink?: boolean;
        /**
         * Set if open Wallet's website when wallet is not installed.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
    }

    // Default: open the Binance Wallet app on mobile, and open the wallet website
    // when the wallet is not detected.
    const adapter = new BinanceEvmAdapter();
    // Stay on the current page on mobile instead of opening the Binance Wallet app.
    const withoutDeeplink = new BinanceEvmAdapter({ useDeeplink: false });
    // Do not open the wallet website when the wallet is not detected.
    const withoutWebsite = new BinanceEvmAdapter({ openUrlWhenWalletNotFound: false });
    // Never navigate away; handle both cases in your own UI.
    const silent = new BinanceEvmAdapter({ useDeeplink: false, openUrlWhenWalletNotFound: false });
    ```

    **How the two options interact**

    `connect()` evaluates the deeplink first, so at most one of them takes effect per call:

    1. In a mobile browser where neither the Binance Wallet extension nor the Binance in-app
       browser is detected, and when `useDeeplink` is not `false`, the adapter opens the Binance
       Wallet app and `connect()` resolves with an empty string immediately.
       `openUrlWhenWalletNotFound` is never reached.
    2. Otherwise — on desktop, inside the Binance Wallet in-app browser, or with
       `useDeeplink: false` — the adapter looks for the injected provider. If it is missing and
       `openUrlWhenWalletNotFound` is not `false`, the wallet website is opened in a new tab, and
       `WalletNotFoundError` is thrown either way.

    So `openUrlWhenWalletNotFound` only applies on the path where no deeplink was opened.

### Caveat

-   Currently Binance wallet app does not support `addChain()`.

More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/evm/abstract-adapter/README.md).
