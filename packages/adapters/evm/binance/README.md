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
    const adapter = new BinanceEvmAdapter({ useDeeplink: false });
    ```

### Caveat

-   Currently Binance wallet app does not support `addChain()`.

More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/evm/abstract-adapter/README.md).
