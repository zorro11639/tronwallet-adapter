/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Eth, { ledgerService } from '@ledgerhq/hw-app-eth';
import { _TypedDataEncoder } from '@ethersproject/hash';
import type Transport from '@ledgerhq/hw-transport';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

export interface BaseAdapterConfig {
    /**
     * Wallet adapter will open the wallet URL when the wallet is not found.
     * Defaults to true
     */
    openUrlWhenWalletNotFound?: boolean;
}

import { openConnectingModal, openSelectAccountModal, openVerifyAddressModal } from './Modal/openModal.js';

async function wait(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
function isFunction(fn: unknown) {
    return typeof fn === 'function';
}

// 0x6d00 = INS_NOT_SUPPORTED: the device/app can't handle full EIP-712 signing.
function isEIP712NotSupported(error: any): boolean {
    if (!error) return false;
    if (error.statusCode === 0x6d00) return true;
    const msg = String(error.message || '');
    return msg.includes('0x6d00') || msg.includes('INS_NOT_SUPPORTED');
}

export type SelectAccount = (params: { accounts: Account[]; ledgerUtils: LedgerUtils }) => Promise<Account>;

export interface LedgerWalletConfig extends BaseAdapterConfig {
    /**
     * Initial total accounts to get once connection is created, default is 1
     */
    accountNumber?: number;
    /**
     * Hook function to call before connecting to ledger and geting accounts.
     * By default, a modal will popup to reminder user to prepare the ledger and enter Tron app.
     * You can specify a function to disable this modal.
     */
    beforeConnect?: () => Promise<unknown> | unknown;
    /**
     * Hook function to call after connecting to ledger and geting initial accounts.
     * The function should return the selected account including the index of account.
     * Following operations such as `signMessage` will use the selected account.
     */
    selectAccount?: SelectAccount;

    /**
     * Function to get derivate BIP44 path by index.
     * Default is `44'/60'/${index}'/0/0`
     */
    getDerivationPath?: (index: number) => string;
}
/**
 * getAccounts from Ledger
 */
export type GetAccounts = (from: number, to: number) => Promise<Account[]>;

export type Account = {
    /**
     * The index to get BIP44 path.
     */
    index: number;
    /**
     * The BIP44 path to derivate address.
     */
    path: string;
    /**
     * The derivated address.
     */
    address: string;
};
export interface LedgerUtils {
    /**
     * Get accounts from ledger by index. `from` is included and `to` is excluded.
     * User can use the function to load more accounts.
     */
    getAccounts: GetAccounts;
    /**
     * Request to get an address with specified index using getDerivationPath(index) to get BIP44 path.
     * If `display` is true, will request user to approve on ledger.
     * The promise will resove if user approve and reject if user cancel the operation.
     */
    getAddress: (index: number, display: boolean) => Promise<{ publicKey: string; address: string }>;
}

const defaultSelectAccount: SelectAccount = async function ({ accounts, ledgerUtils }) {
    const account = await openSelectAccountModal({
        accounts,
        getAccounts: ledgerUtils.getAccounts,
    });
    const closeConfirm = openVerifyAddressModal(account.address);
    try {
        await ledgerUtils.getAddress(account.index, true);
    } finally {
        closeConfirm?.();
    }

    return account;
};
export class LedgerWallet {
    private accounts: Account[];
    private app: Eth | null = null;
    private transport: Transport | null = null;
    private fetchState: 'Initial' | 'Fetching' | 'Finished' = 'Initial';
    private selectedIndex = 0;
    private config: LedgerWalletConfig;

    private _address = '';
    constructor(config: LedgerWalletConfig = {}) {
        this.accounts = [];
        const { accountNumber = 1 } = config;
        (['beforeConnect', 'selectAccount', 'getDerivationPath'] as (keyof LedgerWalletConfig)[]).forEach((func) => {
            if (config[func] && !isFunction(config[func])) {
                throw new Error(`[Ledger]: ${func} must be a function!`);
            }
        });

        if (accountNumber && !Number.isInteger(+accountNumber)) {
            throw new Error('[Ledger]: accountNumber must be an integer!');
        }
        this.config = {
            ...config,
            accountNumber,
        };
    }

    get address() {
        return this._address;
    }

    async connect(options?: { account: Omit<Account, 'path'> }) {
        if (options?.account && typeof options.account === 'object') {
            const account = options.account;
            this.selectedIndex = +account.index;
            this._address = account.address;
            if (account.index === undefined || account.address === undefined) {
                console.warn(
                    '[LedgerWallet] account parameter passed to connect() should have valid index and address property'
                );
            }
            return;
        }
        const ledgerUtils = {
            getAccounts: this.getAccounts,
            getAddress: this.getAddress,
        };
        this.accounts = [];
        this._address = '';
        this.selectedIndex = 0;
        const { accountNumber = 1, beforeConnect, selectAccount = defaultSelectAccount } = this.config;

        let closeConnectingModal: (() => void) | null = null;
        try {
            if (beforeConnect) {
                await beforeConnect();
            } else {
                closeConnectingModal = openConnectingModal();
            }
            await this.makeApp();

            const firstAccount = await this.getAccount(0);
            this.accounts[0] = firstAccount;

            await this.cleanUp();
            if (accountNumber > 1) {
                await this.getAccounts(1, accountNumber);
            }
            // Close the "connecting" modal before opening the account picker so the
            // two modals never overlap. Null it out so the finally-block fallback
            // (which only fires on the error path) does not close it a second time.
            closeConnectingModal?.();
            closeConnectingModal = null;
            const accounts = this.accounts.slice(0, accountNumber);
            const selectedAccount = await selectAccount!({
                accounts,
                ledgerUtils,
            });

            this.selectedIndex = selectedAccount.index;
            this._address = selectedAccount.address;
        } finally {
            // On the error path (makeApp/getAccount/getAccounts threw before the
            // success close above) the connecting modal is still open — close it here
            // so it does not linger on screen.
            closeConnectingModal?.();
            await this.cleanUp();
        }
    }

    disconnect() {
        this.selectedIndex = 0;
        this._address = '';
    }

    async signPersonalMessage(message: string): Promise<string> {
        await this.waitForIdle();
        try {
            const index = this.selectedIndex;
            await this.makeApp();
            const path = this.getPathForIndex(index);
            const hex = Buffer.from(message).toString('hex');
            const sig = await this.app!.signPersonalMessage(path, hex);
            // Convert signature components to hex string format
            // Format: 0x + r + s + v
            const v = typeof sig.v === 'string' ? sig.v : sig.v.toString(16);
            return '0x' + sig.r + sig.s + (v.startsWith('0x') ? v.slice(2) : v);
        } finally {
            await this.cleanUp();
        }
    }

    async signTransaction(transactionData: string): Promise<{ v: number; r: string; s: string }> {
        await this.waitForIdle();
        try {
            const index = this.selectedIndex;
            const path = this.getPathForIndex(index);
            await this.makeApp();
            // Resolve the transaction so the device can display its details
            // (recipient, amount, known contracts/tokens) instead of falling
            // back to blind signing. hw-app-eth deprecated the 2-arg call and
            // will eventually require this `resolution` parameter.
            // resolveTransaction may hit Ledger's metadata service; if that
            // fails we fall back to blind signing rather than blocking the user.
            let resolution = undefined;
            try {
                resolution = await ledgerService.resolveTransaction(transactionData, {}, {});
            } catch {
                resolution = null;
            }
            // For EVM, we sign the raw transaction data (RLP encoded)
            const sig = await this.app!.signTransaction(path, transactionData, resolution);
            // Ledger returns v as string, convert to number
            return {
                v: typeof sig.v === 'string' ? parseInt(sig.v, 16) : sig.v,
                r: sig.r,
                s: sig.s,
            };
        } finally {
            await this.cleanUp();
        }
    }

    async signTypedData(typedData: {
        domain?: {
            chainId?: number;
            name?: string;
            verifyingContract?: string;
            version?: string;
            salt?: string;
        };
        types: {
            [key: string]: Array<{ name: string; type: string }>;
        };
        primaryType: string;
        message: Record<string, any>;
    }): Promise<string> {
        await this.waitForIdle();
        try {
            const index = this.selectedIndex;
            await this.makeApp();
            const path = this.getPathForIndex(index);

            // Ensure types includes EIP712Domain definition if not present
            const types: Record<string, Array<{ name: string; type: string }>> = { ...typedData.types };
            if (!types.EIP712Domain) {
                types.EIP712Domain = [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                    { name: 'salt', type: 'bytes32' },
                ];
            }

            // Normalize typedData with domain defaults
            const normalizedTypedData = {
                domain: typedData.domain || {},
                types,
                primaryType: typedData.primaryType,
                message: typedData.message,
            } as any;

            let sig: { v: number | string; r: string; s: string };
            try {
                // Full EIP-712 signing: the device displays the message fields.
                sig = await this.app!.signEIP712Message(path, normalizedTypedData);
            } catch (e: any) {
                // Older devices/apps (e.g. Nano S) don't support full EIP-712 and
                // return INS_NOT_SUPPORTED (0x6d00). Ledger's documented fallback
                // is signEIP712HashedMessage, which signs the host-computed
                // domain separator and struct hash (blind signing).
                if (!isEIP712NotSupported(e)) {
                    throw e;
                }
                // hashDomain/hashStruct must NOT receive the EIP712Domain entry.
                const structTypes = { ...types };
                delete structTypes.EIP712Domain;
                const domainSeparator = _TypedDataEncoder.hashDomain(normalizedTypedData.domain);
                const hashStruct = _TypedDataEncoder.hashStruct(typedData.primaryType, structTypes, typedData.message);
                // hw-app-eth expects the hashes as hex WITHOUT the 0x prefix.
                sig = await this.app!.signEIP712HashedMessage(path, domainSeparator.slice(2), hashStruct.slice(2));
            }
            // Convert signature components to hex string format
            // Format: 0x + r + s + v
            const v = typeof sig.v === 'string' ? sig.v : sig.v.toString(16);
            return '0x' + sig.r + sig.s + (v.startsWith('0x') ? v.slice(2) : v);
        } finally {
            await this.cleanUp();
        }
    }

    getAccounts = async (from: number, to: number): Promise<Account[]> => {
        if (from < 0) {
            throw new Error('getAccount parameter error: from cannot be smaller than 0.');
        }
        if (from >= to) {
            throw new Error('getAccount parameter error: from cannot be bigger than to.');
        }
        if (this.fetchState === 'Fetching') {
            await wait(500);
            return this.getAccounts(from, to);
        }
        this.fetchState = 'Fetching';

        // ledger can not get address concurrently.
        await this.makeApp();
        try {
            const obj: Record<string, Account> = {};
            for (let i = from; i < to; i++) {
                const account = await this.getAccount(i);
                obj[account.index] = account;
            }
            Object.keys(obj).forEach((key) => {
                this.accounts[+key] = obj[key];
            });
            return this.accounts.slice(from, to);
        } finally {
            this.fetchState = 'Initial';
            await this.cleanUp();
        }
    };

    public getAddress = async (index: number, display = false): Promise<{ publicKey: string; address: string }> => {
        try {
            const path = this.getPathForIndex(index);
            await this.makeApp();
            return await this.app!.getAddress(path, display);
        } finally {
            await this.cleanUp();
        }
    };

    private async getAccount(index: number) {
        const path = this.getPathForIndex(index);
        const { address } = await this.app!.getAddress(path);
        return {
            path,
            address,
            index,
        };
    }

    private async waitForIdle() {
        if (this.fetchState === 'Fetching') {
            await wait(300);
            await this.waitForIdle();
        }
    }
    private getPathForIndex(index: number) {
        return this.config.getDerivationPath ? this.config.getDerivationPath(index) : `44'/60'/${index}'/0/0`;
    }
    private async makeApp() {
        if (this.transport && this.app) {
            return;
        }
        this.transport = await TransportWebHID.create();
        this.app = new Eth(this.transport);
    }

    private async cleanUp() {
        this.app = null as unknown as Eth;
        await this.transport?.close();
        this.transport = null as unknown as Transport;
    }
}
