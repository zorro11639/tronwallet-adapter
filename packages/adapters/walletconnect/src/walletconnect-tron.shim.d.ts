// Type-only stand-in for `@tronweb3/walletconnect-tron`, wired up via tsconfig `paths`.
//
// Why: importing the real package's types (even a dynamic `import()` is enough) drags its heavy
// upstream type graph (`@reown/appkit` -> viem -> ox, ...) into type-checking, which fails to
// compile under this repo's classic `moduleResolution: "node"` (ox ships `.ts` sources that need
// an ES2020+ target). We never use those types — adapter.ts models the slice it needs locally and
// casts the lazily-imported module — so we redirect `tsc` to this light declaration. Runtime and
// bundlers ignore tsconfig `paths` and still load the real package.
export const WalletConnectWallet: unknown;
export const WalletConnectChainID: unknown;
