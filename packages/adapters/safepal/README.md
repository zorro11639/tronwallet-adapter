# `@tronweb3/tronwallet-adapter-safepal`

This package provides an adapter to enable TRON DApps to connect to the [SafePal Wallet App](https://safepal.com/).

> ### ⚠️ Mobile app only
>
> This adapter supports the **SafePal mobile app** (its in-app dApp browser). The **PC browser
> extension is not supported**, because its `signTransaction()` throws — connecting to a wallet
> that cannot sign is worse than reporting it unavailable.
>
> On desktop the adapter therefore reports `readyState: NotFound` even when the extension is
> installed, and `connect()` rejects with `WalletNotFoundError`. Extension support will be
> restored once SafePal fixes signing.

## Demo

```typescript
import { SafepalAdapter } from '@tronweb3/tronwallet-adapter-safepal';
import TronWeb from 'tronweb';
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { 'TRON-PRO-API-KEY': 'your api key' },
});

const adapter = new SafepalAdapter();
// connect
await adapter.connect();

// then you can get address
console.log(adapter.address);

// create a send TRX transaction
const unSignedTransaction = await tronWeb.transactionBuilder.sendTrx(targetAddress, 100, adapter.address);
// using adapter to sign the transaction
const signedTransaction = await adapter.signTransaction(unSignedTransaction);
// broadcast the transaction
await tronWeb.trx.sendRawTransaction(signedTransaction);
```

## Documentation

-   `Constructor(config: SafepalConfig)`

    ```typescript
    interface SafepalConfig {
        /**
         * Set if open Wallet's website when wallet is not installed.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
        /**
         * Timeout in millisecond for checking if Safepal wallet is supported.
         * Default is 2 * 1000ms
         * Must be a finite number between 0 and 600000 (10 minutes);
         * anything else throws at construction.
         */
        checkTimeout?: number;
        /**
         * Set if open Safepal app using DeepLink.
         * Default is true.
         */
        openAppWithDeeplink?: boolean;
    }
    ```

-   `network()` method is supported to get current network information. The type of returned value is `Network` as follows:

    ```typescript
    export enum NetworkType {
        Mainnet = 'Mainnet',
        Shasta = 'Shasta',
        Nile = 'Nile',
        /**
         * When use custom node
         */
        Unknown = 'Unknown',
    }

    export type Network = {
        networkType: NetworkType;
        chainId: string;
        fullNode: string;
        solidityNode: string;
        eventServer: string;
    };
    ```

### Caveats

-   **Auto-reconnect after page refresh is not supported.** The user must manually reconnect on each page load.
-   **Switching networks (`switchChain()`) is not supported.** Network changes must be made directly inside the SafePal wallet.
-   **`signTypedData()` is not supported** by SafePal wallet.
-   **`multiSign()` is not supported** by the SafePal App.
-   **Deeplink only opens the SafePal app** — it does not navigate directly to the dApp browser or load the current page URL automatically.
-   **The PC browser extension is not supported.** Its `signTransaction()` throws, so the adapter
    does not detect it at all: on desktop `readyState` stays `NotFound` and `connect()` rejects with
    `WalletNotFoundError`, even when the extension is installed. Use the SafePal mobile app.

For more information about tronwallet adapters, please refer to [`@tronweb3/tronwallet-adapters`](https://github.com/tronweb3/tronwallet-adapter/tree/main/packages/adapters/adapters)
