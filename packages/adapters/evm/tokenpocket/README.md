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
    }
    const adapter = new TokenPocketEvmAdapter({ useDeeplink: false });
    ```

### Caveats

- **Contract Deployment on TokenPocket iOS App**: The TokenPocket iOS App cannot sign transactions for deploying new contracts because it requires a `to` field to be present. However, passing a `to` field causes the wallet to process the transaction as a contract call rather than a contract deployment.

More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/evm/abstract-adapter/README.md).
