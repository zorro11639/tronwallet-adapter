# `@tronweb3/tronwallet-adapter-bitkeep`

This package provides an adapter to enable TRON DApps to connect to the [Bitget(Former BitKeep) Wallet extension and App](https://www.bitget.com/).

## Demo

```typescript
import { BitKeepAdapter } from '@tronweb3/tronwallet-adapter-bitkeep';
import TronWeb from 'tronweb';
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { 'TRON-PRO-API-KEY': 'your api key' },
});

const adapter = new BitKeepAdapter();
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

-   `Constructor(config: BitKeepConfig)`

    ```typescript
    interface BitKeepConfig {
        /**
         * Set if open Wallet's website when wallet is not installed.
         * Default is true.
         */
        openUrlWhenWalletNotFound?: boolean;
        /**
         * Timeout in millisecond for checking if BitKeep wallet is supported.
         * Default is 2 * 1000ms
         * Must be a finite number between 0 and 600000 (10 minutes);
         * anything else throws at construction.
         */
        checkTimeout?: number;
        /**
         * Set if open BitKeep app using DeepLink.
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

When it is on and the dApp runs in a mobile browser where Bitget Wallet is not detected, the adapter opens the wallet through Bitget's deeplink service. The **entire current page URL — including its query string and hash — is passed to that service** as the `url` parameter of `https://bkcode.vip`. If the app is not installed, or the universal link does not resolve to it, the browser requests that HTTPS address, so the URL reaches that service. Note that `bkcode.vip` is not a Bitget-branded domain, which is worth knowing when reviewing where your dApp's URLs are sent.

Because of that:

-   **Do not put sensitive values in the page URL** — access tokens, OAuth codes, session IDs, one-time credentials, and anything else that grants access. This is good practice regardless of this adapter (URLs end up in browser history, `Referer` headers and server logs), but the deeplink sends the URL somewhere it would otherwise never go.
-   **URL-encoding is not encryption.** `encodeURIComponent` only makes the value safe to carry inside a URL; the original text is trivially recoverable.
-   **If the URL can contain sensitive data, act before connecting.** Either strip it — move the value out of the URL, or clear it with `history.replaceState()` once it has been consumed — or turn the deeplink off:

    ```typescript
    const adapter = new BitKeepAdapter({ openAppWithDeeplink: false });
    ```

    With `openAppWithDeeplink: false` the adapter never hands the URL to the deeplink service. The trade-off is that a mobile user without the wallet's in-app browser is no longer prompted to open the app, so guide them there yourself.

### Security Check

`BitKeepAdapter` supports an optional `securityOptions` field for detecting wallet risks before `connect()`. When enabled, the adapter fetches a remote risk configuration and calls `onRiskDetected` if the wallet is flagged.

```typescript
const adapter = new BitKeepAdapter({
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

-   `multiSign()` and `switchChain()` are not supported in BitKeep App and Extension and will throw error when call them.
-   BitKeep App and Extension will reload current page so there is no need to listen `accountsChanged` event.

For more information about tronwallet adapters, please refer to [`@tronweb3/tronwallet-adapters`](https://github.com/tronweb3/tronwallet-adapter/tree/main/packages/adapters/adapters)
