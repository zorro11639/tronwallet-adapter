# Package Latest Version

## TRON

- [@tronweb3/tronwallet-abstract-adapter@1.2.0](https://www.npmjs.com/package/@tronweb3/tronwallet-abstract-adapter)
- [@tronweb3/tronwallet-adapters@1.3.2](https://www.npmjs.com/package/@tronweb3/tronwallet-adapters)
- [@tronweb3/tronwallet-adapter-backpack@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-backpack)
- [@tronweb3/tronwallet-adapter-binance@1.1.1](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-binance)
- [@tronweb3/tronwallet-adapter-bitkeep@1.2.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-bitkeep)
- [@tronweb3/tronwallet-adapter-bybit@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-bybit)
- [@tronweb3/tronwallet-adapter-foxwallet@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-foxwallet)
- [@tronweb3/tronwallet-adapter-gatewallet@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-gatewallet)
- [@tronweb3/tronwallet-adapter-guarda@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-guarda)
- [@tronweb3/tronwallet-adapter-imtoken@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-imtoken)
- [@tronweb3/tronwallet-adapter-ledger@1.1.14](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-ledger)
- [@tronweb3/tronwallet-adapter-metamask-tron@1.1.1](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-metamask-tron)
- [@tronweb3/tronwallet-adapter-okxwallet@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-okxwallet)
- [@tronweb3/tronwallet-adapter-onekey@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-onekey)
- [@tronweb3/tronwallet-adapter-tokenpocket@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-tokenpocket)
- [@tronweb3/tronwallet-adapter-tronlink@1.2.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-tronlink)
- [@tronweb3/tronwallet-adapter-trust@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-trust)
- [@tronweb3/tronwallet-adapter-walletconnect@3.0.5](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-walletconnect)
- [@tronweb3/tronwallet-adapter-react-hooks@1.1.12](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-react-hooks)
- [@tronweb3/tronwallet-adapter-react-ui@1.2.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-react-ui)
- [@tronweb3/tronwallet-adapter-vue-hooks@1.0.4](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-vue-hooks)
- [@tronweb3/tronwallet-adapter-vue-ui@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-vue-ui)

## EVM

- [@tronweb3/abstract-adapter-evm@1.1.1](https://www.npmjs.com/package/@tronweb3/abstract-adapter-evm)
- [@tronweb3/tronwallet-adapter-binance-evm@1.2.1](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-binance-evm)
- [@tronweb3/tronwallet-adapter-ledger-evm@1.0.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-ledger-evm)
- [@tronweb3/tronwallet-adapter-metamask-evm@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-metamask-evm)
- [@tronweb3/tronwallet-adapter-okxwallet-evm@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-okxwallet-evm)
- [@tronweb3/tronwallet-adapter-tokenpocket-evm@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-tokenpocket-evm)
- [@tronweb3/tronwallet-adapter-tronlink-evm@1.2.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-tronlink-evm)
- [@tronweb3/tronwallet-adapter-trust-evm@1.1.0](https://www.npmjs.com/package/@tronweb3/tronwallet-adapter-trust-evm)

# Features & Improvements

- `@tronweb3/tronwallet-adapter-tokenpocket-evm`
  - Added `TokenPocketEvmAdapter` supporting **TokenPocket** wallet extension and mobile app on EVM-compatible chains.
  - Supports EIP-6963 provider detection (`pro.tokenpocket`) and injected provider fallbacks (`window.tokenpocket.ethereum`).
  - Supports account connection, message signing (`personal_sign`), typed data signing (`eth_signTypedData_v4`), transaction execution (`sendTransaction`), and network switching (`switchChain`).
  - Mobile deeplink support (`tpdapp://open`) for seamless connection on mobile devices.
  - Documented known iOS App contract deployment limitation in README.

- `@tronweb3/tronwallet-adapters`
  - Exported the new `TokenPocketEvmAdapter` and `TokenPocketEvmAdapterName`.

- `@tronweb3/tronwallet-adapter-metamask-tron`
  - Refactored session management to handle `wallet_sessionChanged` events properly.

- Dev Demo (`demos/dev-demo`)
  - Integrated TokenPocket EVM adapter into EVM demo page.
  - Displayed inline results and error logs for `signMessage` and `signTypedData`.
  - Supported custom contract bytecode input and optional `to` address selection (`none` vs `0x0...0`) in deploy contract section.
  - Rendered raw response payload output for contract read/trigger operations.
