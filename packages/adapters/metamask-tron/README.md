# `@tronweb3/tronwallet-adapter-metamask-tron`

This package provides an adapter to enable TRON DApps to connect to the [MetaMask Wallet](https://metamask.io/download).

## Demo

```typescript
import { MetaMaskAdapter } from '@tronweb3/tronwallet-adapter-metamask-tron';

const config = {
    openAppWithDeeplink: true, // open MetaMask app when wallet not found on mobile devices
    openUrlWhenWalletNotFound: true, // open MetaMask website when wallet not found
};
const adapter = new MetaMaskAdapter(config);
// connect to wallet
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

### API

-   `Constructor(config?: MetaMaskAdapterConfig)`

    ```typescript
    interface MetaMaskAdapterConfig {
        /**
         * Set if open MetaMask app using DeepLink.
         * Default is true.
         */
        openAppWithDeeplink?: boolean;
        /**
         * Set if open MetaMask website when wallet is not found.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
    }
    ```

    **Example:**

    ```typescript
    import { MetaMaskAdapter } from '@tronweb3/tronwallet-adapter-metamask-tron';

    const adapter = new MetaMaskAdapter({
        openAppWithDeeplink: true, // open MetaMask app when wallet not found on mobile devices
        openUrlWhenWalletNotFound: true, // open MetaMask website when wallet not found
    });
    ```

### Deeplink and URL privacy

`openAppWithDeeplink` is **enabled by default**.

When it is on and the dApp runs in a mobile browser outside the MetaMask in-app browser, the adapter opens the wallet through MetaMask's deeplink service. The **entire current page URL — including its query string and hash — becomes the path of `https://link.metamask.io/dapp/`** (only the `https://` scheme is stripped). If the app is not installed, or the universal link does not resolve to it, the browser requests that HTTPS address, so the URL reaches MetaMask's servers.

Because of that:

-   **Do not put sensitive values in the page URL** — access tokens, OAuth codes, session IDs, one-time credentials, and anything else that grants access. This is good practice regardless of this adapter (URLs end up in browser history, `Referer` headers and server logs), but the deeplink sends the URL somewhere it would otherwise never go.
-   **Putting the URL in a path instead of a query parameter changes nothing.** It is still sent to the deeplink host in full, and still appears in that host's request logs.
-   **If the URL can contain sensitive data, act before connecting.** Either strip it — move the value out of the URL, or clear it with `history.replaceState()` once it has been consumed — or turn the deeplink off:

    ```typescript
    const adapter = new MetaMaskAdapter({ openAppWithDeeplink: false });
    ```

    With `openAppWithDeeplink: false` the adapter never hands the URL to the deeplink service. The trade-off is that a mobile user without the wallet's in-app browser is no longer prompted to open the app, so guide them there yourself.

### Security Check

`MetaMaskAdapter` supports an optional `securityOptions` field for detecting wallet risks before `connect()`. When enabled, the adapter fetches a remote risk configuration and calls `onRiskDetected` if the wallet is flagged.

```typescript
const adapter = new MetaMaskAdapter({
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

-   `multiSign` is not supported yet.
-   Only wallet imported by mnemonic can be used on TRON network.

For more information about tronwallet adapters, please refer to [`@tronweb3/tronwallet-adapters`](https://github.com/tronweb3/tronwallet-adapter/tree/main/packages/adapters/adapters)
