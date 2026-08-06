import Trx from '@ledgerhq/hw-app-trx';
import type Transport from '@ledgerhq/hw-transport';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import type { BaseAdapterConfig, SignedTransaction, Transaction } from '@tronweb3/tronwallet-abstract-adapter';
import { openConnectingModal, openSelectAccountModal, openVerifyAddressModal } from './Modal/openModal.js';

function isFunction(fn: unknown) {
    return typeof fn === 'function';
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
     * Default is `44'/195'/${index}'/0/0`
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
    private app: Trx | null = null;
    private transport: Transport | null = null;
    /**
     * Ledger can not handle concurrent requests, so every device operation is
     * chained onto this promise. A rejected operation is contained here, so a
     * failure can never leave the chain blocked.
     */
    private queue: Promise<unknown> = Promise.resolve();
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
            const accounts = await this.getAccounts(0, accountNumber);
            // Close the "connecting" modal before opening the account picker so the
            // two modals never overlap. Null it out so the finally-block fallback
            // (which only fires on the error path) does not close it a second time.
            closeConnectingModal?.();
            closeConnectingModal = null;
            const selectedAccount = await selectAccount!({
                accounts,
                ledgerUtils,
            });

            this.selectedIndex = selectedAccount.index;
            this._address = selectedAccount.address;
        } finally {
            // On the error path (getAccounts threw before the success close above)
            // the connecting modal is still open — close it here so it does not
            // linger on screen. The transport is owned by the queued operations,
            // each of which cleans up in its own finally block.
            closeConnectingModal?.();
        }
    }
    disconnect() {
        this.selectedIndex = 0;
        this._address = '';
    }
    async signPersonalMessage(message: string) {
        return this._withApp((app, path) => {
            const hex = Buffer.from(message).toString('hex');
            return app.signPersonalMessage(path, hex);
        });
    }
    async signTransaction(transaction: Transaction | SignedTransaction): Promise<SignedTransaction> {
        const signedResponse = await this._withApp((app, path) =>
            app.signTransaction(path, transaction.raw_data_hex, [])
        );
        return this._mergeSignature(transaction, signedResponse);
    }
    async signTransactionHash(transaction: Transaction | SignedTransaction): Promise<SignedTransaction> {
        const signedResponse = await this._withApp((app, path) => app.signTransactionHash(path, transaction.txID));
        return this._mergeSignature(transaction, signedResponse);
    }

    private async _withApp<T>(action: (app: Trx, path: string) => Promise<T>): Promise<T> {
        return this.enqueue(async () => {
            const index = this.selectedIndex;
            const path = this.getPathForIndex(index);
            try {
                await this.makeApp();
                // this.app is guaranteed to be non-null here by makeApp
                return await action(this.app!, path);
            } finally {
                await this.cleanUp();
            }
        });
    }

    private _mergeSignature(transaction: Transaction | SignedTransaction, signedResponse: string): SignedTransaction {
        const originalSignature = (transaction as SignedTransaction).signature;
        const signature = Array.isArray(originalSignature)
            ? originalSignature.includes(signedResponse)
                ? originalSignature
                : [...originalSignature, signedResponse]
            : [signedResponse];
        return {
            ...transaction,
            signature,
        } as SignedTransaction;
    }

    getAccounts = async (from: number, to: number): Promise<Account[]> => {
        if (from < 0) {
            throw new Error('getAccount parameter error: from cannot be smaller than 0.');
        }
        if (from >= to) {
            throw new Error('getAccount parameter error: from cannot be bigger than to.');
        }
        return this.enqueue(async () => {
            try {
                await this.makeApp();
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
                await this.cleanUp();
            }
        });
    };

    public getAddress = async (index: number, display = false): Promise<{ publicKey: string; address: string }> => {
        return this.enqueue(async () => {
            const path = this.getPathForIndex(index);
            try {
                await this.makeApp();
                return await this.app!.getAddress(path, display);
            } finally {
                await this.cleanUp();
            }
        });
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

    /**
     * Queue a device operation. Waiting is done by chaining onto the previous
     * operation instead of polling, so a caller can never wait forever on a
     * state flag that was never reset.
     */
    private enqueue<T>(action: () => Promise<T>): Promise<T> {
        const result = this.queue.then(action);
        this.queue = result.catch(() => undefined);
        return result;
    }

    private getPathForIndex(index: number) {
        return this.config.getDerivationPath ? this.config.getDerivationPath(index) : `44'/195'/${index}'/0/0`;
    }
    private async makeApp() {
        if (this.transport && this.app) {
            return;
        }
        this.transport = await TransportWebHID.create();
        this.app = new Trx(this.transport);
    }

    private async cleanUp() {
        const transport = this.transport;
        this.app = null;
        this.transport = null;
        try {
            await transport?.close();
        } catch {
            // The transport may already be gone (device unplugged, permission
            // revoked). References are dropped above, so the next operation
            // creates a fresh transport either way.
        }
    }
}
