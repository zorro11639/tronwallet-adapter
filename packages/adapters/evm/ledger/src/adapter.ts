import {
    Adapter,
    WalletReadyState,
    WalletNotFoundError,
    WalletConnectionError,
    WalletDisconnectedError,
    WalletSignTransactionError,
    WalletSignMessageError,
    WalletError,
} from '@tronweb3/abstract-adapter-evm';
import { isInBrowser } from '@tronweb3/abstract-adapter-evm';
import type { LedgerUtils, LedgerWalletConfig } from './LedgerWallet.js';
import { LedgerWallet } from './LedgerWallet.js';
import { METADATA } from './metadata.js';
import { FeeMarketEIP1559Transaction, LegacyTransaction } from '@ethereumjs/tx';
import { Common } from '@ethereumjs/common';
import { RLP } from '@ethereumjs/rlp';
import { bytesToHex, hexToBytes } from '@ethereumjs/util';

export type LedgerAdapterConfig = LedgerWalletConfig;

/**
 * Configuration options for {@link LedgerEvmAdapter}.
 *
 * Alias of {@link LedgerAdapterConfig}. To change the derivation path, pass
 * `getDerivationPath` (e.g. `(index) => \`44'/60'/${index}'/0/0\``) rather than a
 * fixed `path` - addresses are derived per account index.
 */
export type LedgerEvmAdapterOptions = LedgerAdapterConfig;

const isSupportedLedger = () => !!(globalThis.navigator && (globalThis.navigator as any).hid);

export class LedgerEvmAdapter extends Adapter {
    name = METADATA.name;
    icon = METADATA.icon;
    url = METADATA.url;
    readyState: WalletReadyState = WalletReadyState.Loading;
    address: string | null = null;
    connecting = false;
    private config;
    private _chainId: `0x${string}` = '0x1';

    private _wallet: LedgerWallet;
    constructor(config: LedgerAdapterConfig = {}) {
        super();
        this.connecting = false;
        this.address = null;
        this.config = config;
        this._wallet = new LedgerWallet(config);
        if (isSupportedLedger()) {
            this.readyState = WalletReadyState.Found;
        } else {
            this.readyState = WalletReadyState.NotFound;
        }
    }

    get connected(): boolean {
        return !!this.address;
    }

    get ledgerUtils(): LedgerUtils {
        return {
            getAccounts: this._wallet.getAccounts,
            getAddress: this._wallet.getAddress,
        };
    }

    async getProvider(): Promise<any> {
        // For Ledger EVM adapter, we don't provide a standard EIP1193 provider
        // The signing operations are handled through the adapter methods
        return null;
    }

    async connect(): Promise<string> {
        try {
            if (this.connected || this.connecting) {
                return this.address || '';
            }
            if (this.readyState === WalletReadyState.NotFound) {
                if (this.config.openUrlWhenWalletNotFound !== false && isInBrowser()) {
                    window.open(this.url, '_blank');
                }
                throw new WalletNotFoundError();
            }
            this.connecting = true;
            try {
                await this._wallet.connect();
            } catch (e: any) {
                throw new WalletConnectionError(`${e.message}.`);
            }
            this.address = this._wallet.address;
            this.connecting = false;
            this.emit('connect', { chainId: this._chainId });
            return this.address || '';
        } catch (error: any) {
            this.connecting = false;
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (!this.connected) {
            return;
        }
        this._wallet.disconnect();
        this.address = null;
        const error: any = new Error('Wallet disconnected');
        error.code = 4900;
        this.emit('disconnect', error);
    }

    async signMessage({ message }: { message: string; address?: string }): Promise<string> {
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }
        try {
            return await this._wallet.signPersonalMessage(message);
        } catch (error: any) {
            throw new WalletSignMessageError(error?.message, error);
        }
    }

    async signTypedData({
        typedData,
    }: {
        account?: string;
        typedData: {
            domain?: {
                chainId?: number;
                name?: string;
                verifyingContract?: string;
                version?: string;
            };
            types: {
                [key: string]: Array<{ name: string; type: string }>;
            };
            primaryType: string;
            message: Record<string, any>;
        };
    }): Promise<string> {
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }
        try {
            return await this._wallet.signTypedData(typedData);
        } catch (error: any) {
            throw new WalletSignMessageError(error?.message, error);
        }
    }

    async network(): Promise<string> {
        return this._chainId;
    }

    /**
     * Select the adapter's current chain (local state only).
     *
     * Unlike injected-wallet adapters (where `switchChain` triggers
     * `wallet_switchEthereumChain` on the wallet), a Ledger device is
     * chain-agnostic. This call therefore only updates the value returned by
     * `network()` and emits a `chainChanged` event — it does NOT talk to the
     * device and does NOT constrain signing.
     *
     * The chain a transaction is signed for is determined solely by
     * `transaction.chainId` passed to {@link signTransaction}; you do not need
     * to call `switchChain` before signing, and signing for a chain different
     * from the one set here is allowed by design.
     *
     * @param chainId - 0x-prefixed hex chain id, e.g. `'0x1'`. (Note: this is
     *   the hex form, whereas {@link signTransaction} takes `chainId` as a
     *   decimal `number`, e.g. `1`.) Input validity is the caller's
     *   responsibility — an invalid value is stored as-is but has no effect on
     *   signing.
     */
    async switchChain(chainId: `0x${string}`): Promise<null> {
        this._chainId = chainId;
        this.emit('chainChanged', chainId);
        return null;
    }

    /**
     * Sign a transaction with Ledger hardware wallet.
     * Returns a signed raw transaction that can be broadcast by the dApp.
     *
     * @param transaction - Transaction parameters
     * @returns Signed raw transaction in hex format (0x...)
     *
     * @example
     * ```typescript
     * const signedTx = await adapter.signTransaction({
     *     to: '0x...',
     *     value: '0x...',
     *     data: '0x',
     *     nonce: 0,
     *     gasLimit: '0x5208',
     *     gasPrice: '0x...',
     *     chainId: 1
     * });
     *
     * // Broadcast with your provider
     * const txHash = await provider.request({
     *     method: 'eth_sendRawTransaction',
     *     params: [signedTx]
     * });
     * ```
     */
    async signTransaction(transaction: {
        to: string;
        value?: string;
        data?: string;
        nonce: number;
        gasLimit: string;
        gasPrice?: string;
        maxFeePerGas?: string;
        maxPriorityFeePerGas?: string;
        /**
         * Target chain id as a decimal number, e.g. `1` for Ethereum mainnet.
         * This is the source of truth for the signing chain (EIP-155 / EIP-1559);
         * it does not need to match {@link switchChain} (which takes the hex form).
         */
        chainId: number;
        type?: number;
    }): Promise<string> {
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }

        try {
            // Determine transaction type
            const isEIP1559 = transaction.maxFeePerGas !== undefined && transaction.maxPriorityFeePerGas !== undefined;

            // chainId must be carried by a Common instance so that the unsigned
            // message is serialized with EIP-155 replay protection (legacy txs)
            // and the correct chainId field (EIP-1559 txs).
            const common = Common.custom({ chainId: transaction.chainId });

            // Prepare transaction data
            const txData = {
                nonce: BigInt(transaction.nonce),
                to: transaction.to as `0x${string}`,
                value: transaction.value ? BigInt(transaction.value) : BigInt(0),
                data: (transaction.data || '0x') as `0x${string}`,
                gasLimit: BigInt(transaction.gasLimit),
            };

            let unsignedTx: FeeMarketEIP1559Transaction | LegacyTransaction;
            let serializedTx: Uint8Array;

            if (isEIP1559) {
                unsignedTx = FeeMarketEIP1559Transaction.fromTxData(
                    {
                        ...txData,
                        maxFeePerGas: BigInt(transaction.maxFeePerGas as string),
                        maxPriorityFeePerGas: BigInt(transaction.maxPriorityFeePerGas as string),
                        chainId: BigInt(transaction.chainId),
                    },
                    { common }
                );
                // Typed txs return the full serialized unsigned message.
                serializedTx = unsignedTx.getMessageToSign();
            } else {
                unsignedTx = LegacyTransaction.fromTxData(
                    {
                        ...txData,
                        gasPrice: BigInt(transaction.gasPrice || '0x0'),
                    },
                    { common }
                );
                // Legacy txs return the message as a field array (with the
                // EIP-155 chainId placeholder appended) which still needs RLP encoding.
                serializedTx = RLP.encode(unsignedTx.getMessageToSign());
            }

            // Sign with Ledger. hw-app-eth expects raw hex WITHOUT the 0x prefix.
            const signature = await this._wallet.signTransaction(bytesToHex(serializedTx).slice(2));

            // Ledger already returns the final v (parity for typed txs,
            // EIP-155 adjusted for legacy txs), so no conversion is needed.
            const signedTx = unsignedTx.addSignature(
                BigInt(signature.v),
                hexToBytes('0x' + signature.r),
                hexToBytes('0x' + signature.s)
            );

            // Return serialized signed transaction
            return bytesToHex(signedTx.serialize());
        } catch (error: any) {
            throw new WalletSignTransactionError(`Transaction signing failed: ${error?.message}`, error);
        }
    }

    async sendTransaction(): Promise<string> {
        throw new WalletError(
            '[LedgerEvm] Ledger hardware wallet does not support direct transaction broadcasting.\n\n' +
                'Use signTransaction() to get the signed transaction, then broadcast it with your provider:\n\n' +
                '  const signedTx = await adapter.signTransaction({\n' +
                '    to: "0x...",\n' +
                '    value: "0x...",\n' +
                '    nonce: 0,\n' +
                '    gasLimit: "0x5208",\n' +
                '    gasPrice: "0x...",\n' +
                '    chainId: 1\n' +
                '  });\n\n' +
                '  const txHash = await provider.request({\n' +
                '    method: "eth_sendRawTransaction",\n' +
                '    params: [signedTx]\n' +
                '  });'
        );
    }
}
