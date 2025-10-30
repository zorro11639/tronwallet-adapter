# `@tronweb3/tronwallet-adapter-tokenpocket-evm`

This package provides an adapter to enable Ethereum DApps to connect to the [TokenPocket App and Extension Wallet](https://tokenpocket.pro/).

## Demo

```typescript
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket-evm';

const adapter = new TokenPocketAdapter();
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

-   `Constructor()`

    ```typescript
    import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket-evm';
    const adapter = new TokenPocketAdapter();
    ```

### Caveat
- Currently TokenPocket wallet app does not support `addChain()`.

More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/abstract-adapter-evm/README.md).
