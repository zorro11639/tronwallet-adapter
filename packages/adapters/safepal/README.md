# `@tronweb3/tronwallet-adapter-safepal`

This package provides an adapter to enable TRON DApps to connect to the [SafePal Wallet](https://safepal.com/),
both the **PC browser extension** and the **mobile app** (through its in-app dApp browser).

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

### Deeplink and URL privacy

`openAppWithDeeplink` is **enabled by default**.

When it is on and the dApp runs in a mobile browser where SafePal is not detected, the adapter opens the wallet through SafePal's deeplink service. The **entire current page URL — including its query string and hash — is passed to that service** as a parameter of `https://link.safepal.io/wallet/openurl`. If the app is not installed, or the universal link does not resolve to it, the browser requests that HTTPS address, so the URL reaches SafePal's servers.

Because of that:

-   **Do not put sensitive values in the page URL** — access tokens, OAuth codes, session IDs, one-time credentials, and anything else that grants access. This is good practice regardless of this adapter (URLs end up in browser history, `Referer` headers and server logs), but the deeplink sends the URL somewhere it would otherwise never go.
-   **URL-encoding is not encryption.** `encodeURIComponent` only makes the value safe to carry inside a URL; the original text is trivially recoverable.
-   **If the URL can contain sensitive data, act before connecting.** Either strip it — move the value out of the URL, or clear it with `history.replaceState()` once it has been consumed — or turn the deeplink off:

    ```typescript
    const adapter = new SafepalAdapter({ openAppWithDeeplink: false });
    ```

    With `openAppWithDeeplink: false` the adapter never hands the URL to the deeplink service. The trade-off is that a mobile user without SafePal's in-app browser is no longer prompted to open the app, so guide them there yourself.

### Caveats

-   **Auto-reconnect after page refresh is not supported.** The user must manually reconnect on each page load.
-   **Switching the active account reloads the page.** SafePal reloads the dApp itself when the user selects a different account in the wallet, so the adapter never emits `accountsChanged` — the new account is picked up by the fresh page load instead. Any unsaved dApp state is lost, so do not rely on an `accountsChanged` listener to follow account changes with this wallet.
-   **Switching networks (`switchChain()`) is not supported.** Network changes must be made directly inside the SafePal wallet.
-   **`signTypedData()` is not supported** by SafePal wallet.
-   **`multiSign()` is not supported** by SafePal App and Extension.
-   **Deeplink only opens the SafePal app** — it does not navigate directly to the dApp browser or load the current page URL automatically.

For more information about tronwallet adapters, please refer to [`@tronweb3/tronwallet-adapters`](https://github.com/tronweb3/tronwallet-adapter/tree/main/packages/adapters/adapters)
