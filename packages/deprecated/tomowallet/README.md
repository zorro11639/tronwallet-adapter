# `@tronweb3/tronwallet-adapter-tomowallet`

> [!WARNING]
> **This adapter has been removed from active support and from `@tronweb3/tronwallet-adapters` as of v1.3.1.**
>
> - **Reason:** TomoWallet login is no longer available, so the adapter can no longer complete a `connect()`. This meets the removal policy, and the TomoWallet adapter has been retired from the supported wallet set.
> - **Last published standalone version:** `@tronweb3/tronwallet-adapter-tomowallet@1.1.0`. Note: this is simply the last version that shipped, **not** a working fallback — the wallet itself can no longer log in, so no version of this adapter functions.
> - **npm status:** the package is marked **deprecated** and is **no longer maintained**.
>
> **Migration:** switch to another supported TRON wallet adapter (see below). New and existing integrations should **remove** this adapter entirely — there is no usable version to pin to.

---

## Status

This package is **deprecated and unmaintained**. It has been dropped from the aggregated `@tronweb3/tronwallet-adapters` bundle starting in **v1.3.1**. No further fixes, features, or compatibility updates will be published.

If your codebase still imports or registers the TomoWallet adapter, **remove it**. It will not function against current TomoWallet builds and only adds dead weight and a broken wallet option to your UI.

## What to do

### 1. Remove the adapter from your code

Delete any import, instantiation, or registration of `TomoWalletAdapter`.

```diff
- import { TomoWalletAdapter } from '@tronweb3/tronwallet-adapter-tomowallet';
```

```diff
  const adapters = [
    new TronLinkAdapter(),
    new WalletConnectAdapter(/* ... */),
    new LedgerAdapter(),
-   new TomoWalletAdapter(),
  ];
```

If you installed the standalone package directly, uninstall it:

```bash
npm remove @tronweb3/tronwallet-adapter-tomowallet
# or
pnpm remove @tronweb3/tronwallet-adapter-tomowallet
```

Users of the aggregate `@tronweb3/tronwallet-adapters` don't need to run this — the transitive dependency was removed in v1.3.1 and will drop out automatically on the next `npm install` / `pnpm install`.

### 2. Migrate to a supported adapter

Use one of the maintained TRON wallet adapters instead, for example:

- `@tronweb3/tronwallet-adapter-tronlink` — TronLink
- `@tronweb3/tronwallet-adapter-walletconnect` — WalletConnect
- `@tronweb3/tronwallet-adapter-ledger` — Ledger
- `@tronweb3/tronwallet-adapter-okxwallet` — OKX Wallet
- `@tronweb3/tronwallet-adapter-bitkeep` — Bitget Wallet

See the up-to-date list in the [`@tronweb3/tronwallet-adapters`](https://github.com/tronweb3/tronwallet-adapter) repository.

> [!NOTE]
> There is no "pin to an old version" escape hatch here. Because TomoWallet can no longer log in, every published version of this adapter is non-functional. `1.1.0` is the last version that exists on npm, not a version that still works. Don't keep it around as a fallback — remove it.

## Why it was removed

TomoWallet stopped working, which triggers the adapter removal policy for wallets that are no longer functional. Rather than ship a broken wallet option that fails at connect/sign time and confuses users, the adapter was retired from the supported set and the package was deprecated on npm.
