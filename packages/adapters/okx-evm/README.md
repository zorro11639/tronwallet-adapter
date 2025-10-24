# `@tronweb3/tronwallet-adapter-okxwallet-evm`

This package provides an adapter to enable Ethereum DApps to connect to the [OKX Wallet App and Extension Wallet](https://web3.okx.com/).

## Demo

```typescript
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet-evm';

const adapter = new OkxWalletAdapter();
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
    import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet-evm';
    const adapter = new OkxWalletAdapter();
    ```


More detailed API can be found in [Abstract Adapter](https://github.com/tronweb3/tronwallet-adapter/blob/main/packages/adapters/abstract-adapter-evm/README.md).
