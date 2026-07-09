# `@tronweb3/tronwallet-adapter-ledger-evm`

This package provides an adapter for the Ledger Hardware Wallet on EVM-compatible chains.

## Demo

```typescript
import { LedgerEvmAdapter } from '@tronweb3/tronwallet-adapter-ledger-evm';
import { ethers } from 'ethers';

const adapter = new LedgerEvmAdapter({
    // Initial total accounts to get once connection is created
    accountNumber: 5,
    // Custom derivation path for address
    getDerivationPath(index) {
        return `44'/60'/${index}'/0/0`;
    },
});
// connect (shows account selection modal)
await adapter.connect();

// then you can get the address
console.log(adapter.address);

// create a transaction with your provider
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
const unSignedTransaction = {
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    value: ethers.parseEther('0.001').toString(),
    nonce: await provider.getTransactionCount(adapter.address!, 'pending'),
    gasLimit: '21000',
    gasPrice: (await provider.getFeeData()).gasPrice!.toString(),
    chainId: 1,
};
// using adapter to sign the transaction
const signedTransaction = await adapter.signTransaction(unSignedTransaction);
// broadcast the transaction with your provider
await provider.broadcastTransaction(signedTransaction);
```

## Documentation

### API

-   `Constructor(config: LedgerAdapterConfig)`

    ```typescript
    interface LedgerAdapterConfig {
        /**
         * Set if open Wallet's website when wallet is not installed.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
        /**
         * Initial total accounts to get once connection is created, default is 1
         */
        accountNumber?: number;

        /**
         * Hook function to call before connecting to ledger and getting accounts.
         * By default, a modal will popup to remind the user to prepare the ledger and enter the Ethereum app.
         * You can specify a function to disable this modal.
         */
        beforeConnect?: () => Promise<unknown> | unknown;

        /**
         * Hook function to call after connecting to ledger and getting initial accounts.
         * The function should return the selected account including the index of the account.
         * Following operations such as `signMessage` will use the selected account.
         */
        selectAccount?: (params: { accounts: Account[]; ledgerUtils: LedgerUtils }) => Promise<Account>;

        /**
         * Function to get the derivation BIP44 path by index.
         * Default is `44'/60'/${index}'/0/0`
         */
        getDerivationPath?: (index: number) => string;
    }
    interface Account {
        /**
         * The index to get the BIP44 path.
         */
        index: number;
        /**
         * The BIP44 path to derive the address.
         */
        path: string;
        /**
         * The derived address.
         */
        address: string;
    }
    interface LedgerUtils {
        /**
         * Get accounts from ledger by index. `from` is included and `to` is excluded.
         * User can use the function to load more accounts.
         */
        getAccounts: (from: number, to: number) => Promise<Account[]>;
        /**
         * Request to get an address with specified index using getDerivationPath(index) to get the BIP44 path.
         * If `display` is true, will request the user to approve on the ledger.
         * The promise will resolve if the user approves and reject if the user cancels the operation.
         */
        getAddress: (index: number, display: boolean) => Promise<{ publicKey: string; address: string }>;
    }
    ```

-   Property: `ledgerUtils`
    `ledgerUtils` on LedgerEvmAdapter is used to get useful functions to interact with the Ledger directly. `ledgerUtils` is defined in the section above.

    -   `getAccounts(from: number, to: number)` is a wrapped function to get multiple accounts by index range from the ledger.
        For example:

        ```typescript
        const adapter = new LedgerEvmAdapter();
        // get 5 accounts from ledger
        const accounts = await adapter.ledgerUtils.getAccounts(0, 5);
        // [{ address: string, index: 0, path: "44'/60'/0'/0/0" }, ...]
        ```

    -   `getAddress(index: number, display: boolean)` is a raw function to request an address from the ledger.
        If `display` is true, will request the user to approve on the ledger.
        For example, the following code will request the user to approve on the Ledger to confirm connecting their ledger.

        ```typescript
        const adapter = new LedgerEvmAdapter();
        const result = await adapter.ledgerUtils.getAddress(0, true);
        // { address: 'some address', publicKey: 'publicKey for address' }
        ```

### Methods

-   `signTransaction(transaction)`

    Sign a transaction via the Ledger wallet and return the signed raw transaction (`0x...` format).

    ```typescript
    async signTransaction(transaction: {
        to: string;
        value?: string;
        data?: string;
        nonce: number;                    // Required
        gasLimit: string;                 // Required
        gasPrice?: string;                // For legacy transactions
        maxFeePerGas?: string;            // For EIP-1559
        maxPriorityFeePerGas?: string;    // For EIP-1559
        chainId: number;                  // Required
    }): Promise<string>
    ```

    Both legacy and EIP-1559 transactions are supported. Provide `gasPrice` for legacy transactions, or `maxFeePerGas` / `maxPriorityFeePerGas` for EIP-1559.

-   `signMessage(params)`

    Sign a personal message.

    ```typescript
    async signMessage(params: { message: string; address?: string }): Promise<string>
    ```

-   `signTypedData(params)`

    Sign EIP-712 typed data.

    ```typescript
    async signTypedData(params: { typedData: TypedData; address?: string }): Promise<string>
    ```

### Transaction Broadcasting

**The Ledger adapter only signs transactions. It does NOT broadcast them**, following the same design as the TRON Ledger adapter:

-   Adapter handles: hardware communication + signing
-   Your dApp handles: network access + broadcasting

Use your dApp's existing provider to broadcast the signed raw transaction:

```typescript
// ethers.js
await provider.broadcastTransaction(signedTx);

// web3.js
await web3.eth.sendSignedTransaction(signedTx);

// viem
await client.sendRawTransaction({ serializedTransaction: signedTx });
```

### Caveats

-   `multiSign()` is not supported.
-   WebHID is required for direct Ledger connection. It is supported on Chrome / Edge / Brave (desktop) but **not** on Firefox or mobile browsers. For mobile users, recommend using Ledger Live + WalletConnect.

For more information about tronwallet adapters, please refer to [`@tronweb3/tronwallet-adapters`](https://github.com/tronweb3/tronwallet-adapter/tree/main/packages/adapters/adapters)
