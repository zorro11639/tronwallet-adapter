# `@tronweb3/tronwallet-adapter-bybit`

This package provides an adapter to enable TRON DApps to connect to the [Bybit Wallet extension](https://chromewebstore.google.com/detail/bybit-wallet/pdliaogehgdbhbnmkklieghmmjkpigpa).

## Demo

```typescript
import { BybitWalletAdapter } from '@tronweb3/tronwallet-adapter-bybit';

const adapter = new BybitWalletAdapter();
// connect to Bybit
await adapter.connect();

// then you can get address
console.log(adapter.address);

// create a send TRX transaction
const unSignedTransaction = await window.bybitWallet.tronLink.tronWeb.transactionBuilder.sendTrx(
    targetAddress,
    100,
    adapter.address
);
// using adapter to sign the transaction
const signedTransaction = await adapter.signTransaction(unSignedTransaction);
// broadcast the transaction
await window.bybitWallet.tronLink.tronWeb.trx.sendRawTransaction(signedTransaction);
```

## Documentation

### API

-   `Constructor(config: BybitWalletAdapterConfig)`

```typescript
interface BybitWalletAdapterConfig {
    /**
     * Set if open Wallet's website when wallet is not installed.
     * Default is true.
     */
    openUrlWhenWalletNotFound?: boolean;
    /**
     * Timeout in millisecond for checking if TokenPocket wallet is supported.
     * Default is 2 * 1000ms
     * Must be a finite number between 0 and 600000 (10 minutes);
     * anything else throws at construction.
     */
    checkTimeout?: number;
    /**
     * Set if open Bybit Wallet app using DeepLink on mobile device.
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

When it is on and the dApp runs in a mobile browser outside the Bybit app, the adapter opens the wallet through Bybit's deeplink service. The **entire current page URL — including its query string and hash — is passed to that service** as the `by_web_link` parameter of `https://app.bybit.com/inapp`. If the app is not installed, or the universal link does not resolve to it, the browser requests that HTTPS address, so the URL reaches Bybit's servers.

Because of that:

-   **Do not put sensitive values in the page URL** — access tokens, OAuth codes, session IDs, one-time credentials, and anything else that grants access. This is good practice regardless of this adapter (URLs end up in browser history, `Referer` headers and server logs), but the deeplink sends the URL somewhere it would otherwise never go.
-   **URL-encoding is not encryption.** `encodeURIComponent` only makes the value safe to carry inside a URL; the original text is trivially recoverable.
-   **If the URL can contain sensitive data, act before connecting.** Either strip it — move the value out of the URL, or clear it with `history.replaceState()` once it has been consumed — or turn the deeplink off:

    ```typescript
    const adapter = new BybitWalletAdapter({ openAppWithDeeplink: false });
    ```

    With `openAppWithDeeplink: false` the adapter never hands the URL to the deeplink service. The trade-off is that a mobile user without the wallet's in-app browser is no longer prompted to open the app, so guide them there yourself.

### Security Check

`BybitWalletAdapter` supports an optional `securityOptions` field for detecting wallet risks before `connect()`. When enabled, the adapter fetches a remote risk configuration and calls `onRiskDetected` if the wallet is flagged.

```typescript
const adapter = new BybitWalletAdapter({
    securityOptions: {
        enabled: true,
        configUrls: ['https://your-server.com/security-config.json'],
        onRiskDetected: async ({ risks }) => {
            // Throw to block the connection, or log a warning
            throw new Error(`Wallet risk detected: ${risks[0].title}`);
        },
    },
});
```

For the full `SecurityOptions` API reference, see [walletadapter.org/docs](https://walletadapter.org/docs/index.html).

### Caveats

-   The Bybit Wallet extension doesn't support `multiSign()` and `switchChain()` and will throw an error when they are called.
-   The extension only supports these events: `accountsChanged`, `connect`, `disconnect`.
-   Keyless Wallet doesn't support Dapp connection.
-   The deeplink only opens the Bybit app — it does not navigate to a dApp browser or load the current page. It also cannot open the App Store when the app is not installed.

For more information about tronwallet adapters, please refer to [`@tronweb3/tronwallet-adapters`](https://github.com/tronweb3/tronwallet-adapter/tree/main/packages/adapters/adapters)
