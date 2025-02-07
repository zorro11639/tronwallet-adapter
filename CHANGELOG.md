# Change Log

[toc]

## @tronweb3/tronwallet-abstract-adapter
### v1.0.0
> 2023-01-13

-  Defines an abstract class named Adapter with properties, methods, events and provides a set of error types and functions.

### v1.1.0
> 2023-01-19
- Add `switchChain` method:
  ```ts
    switchChain(_chainId: string): Promise<void>
  ```

### v1.1.1
> 2023-02-07

- Add `AdapterState.Loading` to indicate that it is checking wallet.

### v1.1.2
> 2023-02-22
- Update `connect()` method signature:
  ```diff
  - abstract connect(): Promise<void>;
  + connect(options?: Record<string, unknown>): Promise<void>
  ```
- Add `multiSign()` method:
  ```ts
    multiSign(...args: any[]): Promise<any> {
        return Promise.reject("The current wallet doesn't support multiSign.");
    }
  ```

### v1.1.3
> 2023-03-01
- Add `WalletReadyState` enum to indicate the wallet's state:
  ```ts
    /**
     * Wallet ready state.
     */
    export enum WalletReadyState {
        /**
        * Adapter will start to check if wallet exists after adapter instance is created.
        */
        Loading = 'Loading',
        /**
        * When checking ends and wallet is not found, readyState will be NotFound.
        */
        NotFound = 'NotFound',
        /**
        * When checking ends and wallet is found, readyState will be Found.
        */
        Found = 'Found',
    }
  ```
- Add `readyState` property indicate that wallet is avaliable or not after checking.
- Add `readyStateChanged(state: WalletReadyState)` event.
- Add `BaseAdapterConfig` for Adapter constractor parameters.
  ```ts
    export interface BaseAdapterConfig {
        /**
         * Set if open Wallet's website url when wallet is not installed.
        * Default is true.
        */
        openUrlWhenWalletNotFound?: boolean;
    }
  ```

### v1.1.4
> 2023-04-28

- Add exported `NetworkType` and `Network` types.
  ```ts
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

### v1.1.5
> 2023-04-14

- Add `WalletGetNetworkError` for errors when getting network infomation.

### v1.1.6
> 2023-11-15

- Support `umd` format bundled files.

### v1.1.7
> 2024-09-24

- Remove `tronweb` from `devDependencies`.

### v1.1.8
> 2024-10-25

- Use types from `tronweb@v6`, this change requires `tronweb@v6` installed.
  ```ts
    import { TronWeb } from 'tronweb';
    export { TronWeb };
    export type { Transaction, SignedTransaction } from 'tronweb/lib/esm/types/Transaction';
  ```



## @tronweb3/tronwallet-adapter-tronlink
### v1.0.0
> 2023-01-13

-  Support TronLink App and Extension wallet.

### v1.1.0
> 2023-01-16

- Support new protocol of TronLink Extension: `window.tron`.

### v1.1.1
> 2023-02-06

- Add polling detection for TronLink Extension in case of wallet initialization delayed.


### v1.1.2
> 2023-02-20

- Support multiSign for TronLink.

### v1.1.3
> 2023-03-01

- Support custom check timeout. Developers can set `config.checkTimeout` in milliseconds for TronLink wallet to be considered unavailable if it is not detected within that period. Default is `30 * 1000`.
  ```js
    const adapter = new TronLinkAdapter({ checkTimeout: 3000 });
  ```
- Support to customize whether open app by DeepLink in mobile browser. Default is `true`.
  ```js
    const adapter = new TronLinkAdapter({ openTronLinkAppOnMobile: false });
  ```
- Support to customize whether open wallet's website when wallet is not found.
  ```js
    const adapter = new TronLinkAdapter({ openUrlWhenWalletNotFound: false });
  ```

### v1.1.4
> 2023-03-23

- Add `network` method for TronLinkAdapter to get current network information.
- Fix error that `accountsChanged` event is not emitted when disconnect/connect on TronLink extension.

### v1.1.5
> 2023-05-05

- Optimize wallet detection logic in TronLinkApp.

### v1.1.6
> 2023-06-20

- Update `@tronweb3/tronwallet-abstract-adapter` dependency.

### v1.1.7
> 2023-08-08

- Fix the issue that adapter is disconnected when first connecting to the wallet [#24](https://github.com/tronprotocol/tronwallet-adapter/issues/24).

### v1.1.8
> 2023-09-19

- Support `window.tronLink` detection on mobile device.

### v1.1.9
> 2023-11-15

- Fix an issue that adapter is disconnect immediately after calling `connect()`.
- Provide files in `umd` format to support usage with vanilla js.

### v1.1.10
> 2024-09-24

- Update `@tronweb3/tronwallet-abstract-adapter` dependency that remove `tronweb` devDependency.

### v1.1.11
> 2024-10-25

- Update `@tronweb3/tronwallet-abstract-adapter` dependency that to use types from TronWeb v6 for `Transaction` and `SignedTransaction`. **TronWeb v6 is required to be installed**.


## @tronweb3/tronwallet-adapter-bitkeep
### v1.0.0
> 2023-05-06

-  Support Bitget wallet.

### v1.0.1
> 2023-06-25

- Use `window.bitkeep.tronLink` instead of `window.tronLink`.
- Support deeplink on mobile device.

### v1.1.0
> 2023-11-16

- Update adapter name and icon to new BitGet wallet.

### v1.1.1
> 2024-03-21

- Fix issue that sometimes extension wallet is connected but cannot get address.

### v1.1.2
> 2024-09-24

- Update dependency `@tronweb3/tronwallet-abstract-adapter` to remove redundant dependencies.

### v1.1.3
> 2024-10-25

- Use types from TronWeb v6 for `Transaction` and `SignedTransaction`.

## @tronweb3/tronwallet-adapter-gatewallet
### v1.0.0
> 2024-09-30

-  Support Gate.io app wallet.

### v1.0.1
> 2024-10-25

-  Update GateWalletAdapter icon.

### v1.0.2
> 2025-01-26

-  Support Gate extension wallet.

## @tronweb3/tronwallet-adapter-imtoken
### v1.0.0
> 2024-09-24

-  Support imToken app wallet.

### v1.0.1
> 2024-10-25

- Use types from TronWeb v6 for `Transaction` and `SignedTransaction`.

## @tronweb3/tronwallet-adapter-bybit
### v1.0.0
> 2024-11-01

-  Support Bybit app and extension wallet.


## @tronweb3/tronwallet-adapter-okxwallet
### v1.0.0
> 2023-05-06

-  Support Okx app and extension wallet.

### v1.0.1
> 2023-06-25

-  Update @tronweb3/tronwallet-abstract-adapter dependency.

### v1.0.2
> 2023-11-16

-  Provide umd format files.

### v1.0.3
> 2024-03-21

-  Update Deeplink connect protocol.

### v1.0.4
> 2024-09-24

- Update dependency `@tronweb3/tronwallet-abstract-adapter` to remove redundant dependencies.

### v1.0.5
> 2024-10-25

- Use types from TronWeb v6 for `Transaction` and `SignedTransaction`.

## @tronweb3/tronwallet-adapter-tokenpocket
### v1.0.0
> 2023-05-06

-  Support TokenPocket app wallet.

### v1.0.1
> 2023-06-25

-  Update @tronweb3/tronwallet-abstract-adapter dependency.

### v1.0.2
> 2023-11-16

-  Provide umd format files.

### v1.0.3
> 2024-03-21

- Restrict wallet connection in mobile App as TokenPocket extension doesn't support TRON network at the moment.

### v1.0.4
> 2024-09-24

- Update dependency `@tronweb3/tronwallet-abstract-adapter` to remove redundant dependencies.

### v1.0.5
> 2024-10-25

- Use types from TronWeb v6 for `Transaction` and `SignedTransaction`.
- Update the way to connect wallet.

## @tronweb3/tronwallet-adapter-walletconnect

### v1.0.0
> 2023-01-13

- Support walletconnect wallet.

### v1.0.1
> 2023-03-01

- Add `readyState` property and `readyStateChanged` event to indicate that wallet is avaliable or not after checking.

### v1.0.2
> 2023-04-28

- Update `@tronweb3/tronwallet-abstract-adapter` dependency.

### v1.0.3
> 2023-05-06
- Update `@tronweb3/tronwallet-abstract-adapter` dependency.

### v1.0.4
> 2023-06-25

- Add `web3ModalConfig` config to support customizing QRCode modal.

### v1.0.5
> 2023-11-16

- Provide umd format files.

### v1.0.6
> 2024-03-21

- Remove redundancy dependency.

### v2.0.0
> 2024-07-16

- Update `@tronweb3/walletconnect-tron` to v3.0.0.

### v2.0.1
> 2024-09-24

- Update dependency `@tronweb3/tronwallet-abstract-adapter` to remove redundant dependencies.

### v2.0.2
> 2024-10-25

- Use types from TronWeb v6 for `Transaction` and `SignedTransaction`.

## @tronweb3/tronwallet-adapter-ledger
### v1.0.0
> 2023-01-19
- Support Ledger wallet.

### v1.1.1
> 2023-02-07

- Update connecting process of LedgerAdapter: select account first and following operations will use the selected account.

### v1.1.2
> 2023-02-22

- Add `beforeConnect` and `selectAccount` for LedgerAdapter to support customized connection flow.
- Add `getDerivationPath()` for LedgerAdapter to support customized address path.

### v1.1.3
> 2023-02-25

- Support to sign a transaction with too many bytes in LedgerAdapter.

### v1.1.4
> 2023-03-01

- Add `readyState` property and `readyStateChanged` event to indicate that wallet is avaliable or not after checking.

### v1.1.5
> 2023-04-28

- Update `@tronweb3/tronwallet-abstract-adapter` dependency.

### v1.1.6
> 2023-05-06

- Update `@tronweb3/tronwallet-abstract-adapter` dependency.

### v1.1.7
> 2023-06-25

- Update `@tronweb3/tronwallet-abstract-adapter` dependency.

### v1.1.8
> 2023-11-16

- Provide umd format files.

### v1.1.9
> 2024-09-24

- Update dependency `@tronweb3/tronwallet-abstract-adapter` to remove redundant dependencies.

### v1.1.10
> 2024-10-25

- Use types from TronWeb v6 for `Transaction` and `SignedTransaction`.

## @tronweb3/tronwallet-adapter-foxwallet
### v1.0.0
> 2024-10-25

-  Support Foxwallet app wallet.



