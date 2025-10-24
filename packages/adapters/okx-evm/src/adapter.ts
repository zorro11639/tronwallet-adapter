import type { AdapterName, EIP1193Provider, TypedData } from '@tronweb3/abstract-adapter-evm';
import {
    Adapter,
    WalletReadyState,
    WalletNotFoundError,
    WalletConnectionError,
    isInMobileBrowser,
    WalletDisconnectedError,
} from '@tronweb3/abstract-adapter-evm';
import { getOkxWalletProvider, openOkxWallet, supportOkxWallet } from './utils.js';

export interface OkxWalletAdapterOptions {
    useDeeplink?: boolean;
}
export const OkxWalletAdapterName = 'OKX Wallet' as AdapterName<'OKX Wallet'>;
export class OkxWalletAdapter extends Adapter {
    name = OkxWalletAdapterName;
    url = 'https://web3.okx.com/';
    icon =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTIzLjU1ODMgMTUuODk2NUgxNi40NDc0QzE2LjE0NTMgMTUuODk2NSAxNS45MDA0IDE2LjE0MTQgMTUuOTAwNCAxNi40NDM1VjIzLjU1NDRDMTUuOTAwNCAyMy44NTY1IDE2LjE0NTMgMjQuMTAxNCAxNi40NDc0IDI0LjEwMTRIMjMuNTU4M0MyMy44NjA0IDI0LjEwMTQgMjQuMTA1MyAyMy44NTY1IDI0LjEwNTMgMjMuNTU0NFYxNi40NDM1QzI0LjEwNTMgMTYuMTQxNCAyMy44NjA0IDE1Ljg5NjUgMjMuNTU4MyAxNS44OTY1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2LjQ0NzQgMTYuMzk2NUgyMy41NTgzQzIzLjU4NDIgMTYuMzk2NSAyMy42MDUzIDE2LjQxNzUgMjMuNjA1MyAxNi40NDM1VjIzLjU1NDRDMjMuNjA1MyAyMy41ODAzIDIzLjU4NDIgMjMuNjAxNCAyMy41NTgzIDIzLjYwMTRIMTYuNDQ3NEMxNi40MjE0IDIzLjYwMTQgMTYuNDAwNCAyMy41ODAzIDE2LjQwMDQgMjMuNTU0NFYxNi40NDM1QzE2LjQwMDQgMTYuNDE3NSAxNi40MjE0IDE2LjM5NjUgMTYuNDQ3NCAxNi4zOTY1WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiLz4KPHBhdGggZD0iTTE1LjM1MDMgNy42OTE0MUg4LjIzOTM3QzcuOTM3MjggNy42OTE0MSA3LjY5MjM4IDcuOTM2MyA3LjY5MjM4IDguMjM4NFYxNS4zNDkzQzcuNjkyMzggMTUuNjUxNCA3LjkzNzI4IDE1Ljg5NjMgOC4yMzkzNyAxNS44OTYzSDE1LjM1MDNDMTUuNjUyMyAxNS44OTYzIDE1Ljg5NzIgMTUuNjUxNCAxNS44OTcyIDE1LjM0OTNWOC4yMzg0QzE1Ljg5NzIgNy45MzYzIDE1LjY1MjMgNy42OTE0MSAxNS4zNTAzIDcuNjkxNDFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNOC4yMzkzNyA4LjE5MTQxSDE1LjM1MDNDMTUuMzc2MiA4LjE5MTQxIDE1LjM5NzIgOC4yMTI0NSAxNS4zOTcyIDguMjM4NFYxNS4zNDkzQzE1LjM5NzIgMTUuMzc1MiAxNS4zNzYyIDE1LjM5NjMgMTUuMzUwMyAxNS4zOTYzSDguMjM5MzdDOC4yMTM0MiAxNS4zOTYzIDguMTkyMzggMTUuMzc1MiA4LjE5MjM4IDE1LjM0OTNWOC4yMzg0QzguMTkyMzggOC4yMTI0NCA4LjIxMzQyIDguMTkxNDEgOC4yMzkzNyA4LjE5MTQxWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiLz4KPHBhdGggZD0iTTMxLjc2MDQgNy42OTE0MUgyNC42NDk1QzI0LjM0NzQgNy42OTE0MSAyNC4xMDI1IDcuOTM2MyAyNC4xMDI1IDguMjM4NFYxNS4zNDkzQzI0LjEwMjUgMTUuNjUxNCAyNC4zNDc0IDE1Ljg5NjMgMjQuNjQ5NSAxNS44OTYzSDMxLjc2MDRDMzIuMDYyNSAxNS44OTYzIDMyLjMwNzQgMTUuNjUxNCAzMi4zMDc0IDE1LjM0OTNWOC4yMzg0QzMyLjMwNzQgNy45MzYzIDMyLjA2MjUgNy42OTE0MSAzMS43NjA0IDcuNjkxNDFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjQuNjQ5NSA4LjE5MTQxSDMxLjc2MDRDMzEuNzg2NCA4LjE5MTQxIDMxLjgwNzQgOC4yMTI0NSAzMS44MDc0IDguMjM4NFYxNS4zNDkzQzMxLjgwNzQgMTUuMzc1MiAzMS43ODY0IDE1LjM5NjMgMzEuNzYwNCAxNS4zOTYzSDI0LjY0OTVDMjQuNjIzNiAxNS4zOTYzIDI0LjYwMjUgMTUuMzc1MiAyNC42MDI1IDE1LjM0OTNWOC4yMzg0QzI0LjYwMjUgOC4yMTI0NCAyNC42MjM2IDguMTkxNDEgMjQuNjQ5NSA4LjE5MTQxWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiLz4KPHBhdGggZD0iTTE1LjM1MDMgMjQuMDk5Nkg4LjIzOTM3QzcuOTM3MjggMjQuMDk5NiA3LjY5MjM4IDI0LjM0NDUgNy42OTIzOCAyNC42NDY2VjMxLjc1NzVDNy42OTIzOCAzMi4wNTk2IDcuOTM3MjggMzIuMzA0NSA4LjIzOTM3IDMyLjMwNDVIMTUuMzUwM0MxNS42NTI0IDMyLjMwNDUgMTUuODk3MyAzMi4wNTk2IDE1Ljg5NzMgMzEuNzU3NVYyNC42NDY2QzE1Ljg5NzMgMjQuMzQ0NSAxNS42NTI0IDI0LjA5OTYgMTUuMzUwMyAyNC4wOTk2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTguMjM5MzcgMjQuNTk5NkgxNS4zNTAzQzE1LjM3NjIgMjQuNTk5NiAxNS4zOTczIDI0LjYyMDYgMTUuMzk3MyAyNC42NDY2VjMxLjc1NzVDMTUuMzk3MyAzMS43ODM0IDE1LjM3NjIgMzEuODA0NSAxNS4zNTAzIDMxLjgwNDVIOC4yMzkzN0M4LjIxMzQyIDMxLjgwNDUgOC4xOTIzOCAzMS43ODM0IDguMTkyMzggMzEuNzU3NVYyNC42NDY2QzguMTkyMzggMjQuNjIwNiA4LjIxMzQyIDI0LjU5OTYgOC4yMzkzNyAyNC41OTk2WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiLz4KPHBhdGggZD0iTTMxLjc2MDQgMjQuMDk5NkgyNC42NDk1QzI0LjM0NzQgMjQuMDk5NiAyNC4xMDI1IDI0LjM0NDUgMjQuMTAyNSAyNC42NDY2VjMxLjc1NzVDMjQuMTAyNSAzMi4wNTk2IDI0LjM0NzQgMzIuMzA0NSAyNC42NDk1IDMyLjMwNDVIMzEuNzYwNEMzMi4wNjI1IDMyLjMwNDUgMzIuMzA3NCAzMi4wNTk2IDMyLjMwNzQgMzEuNzU3NVYyNC42NDY2QzMyLjMwNzQgMjQuMzQ0NSAzMi4wNjI1IDI0LjA5OTYgMzEuNzYwNCAyNC4wOTk2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI0LjY0OTUgMjQuNTk5NkgzMS43NjA0QzMxLjc4NjQgMjQuNTk5NiAzMS44MDc0IDI0LjYyMDYgMzEuODA3NCAyNC42NDY2VjMxLjc1NzVDMzEuODA3NCAzMS43ODM0IDMxLjc4NjQgMzEuODA0NSAzMS43NjA0IDMxLjgwNDVIMjQuNjQ5NUMyNC42MjM2IDMxLjgwNDUgMjQuNjAyNSAzMS43ODM0IDI0LjYwMjUgMzEuNzU3NVYyNC42NDY2QzI0LjYwMjUgMjQuNjIwNiAyNC42MjM2IDI0LjU5OTYgMjQuNjQ5NSAyNC41OTk2WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiLz4KPC9zdmc+Cg==';
    readyState = WalletReadyState.Loading;
    address: string | null = null;
    connecting = false;
    options: OkxWalletAdapterOptions;

    constructor(options: OkxWalletAdapterOptions = { useDeeplink: true }) {
        super();
        this.options = options;
        this.eip6963Info = {
            support: true,
            name: 'OKX Wallet',
        };
        this.getProvider().then((res) => {
            if (res) {
                this.readyState = WalletReadyState.Found;
                this.listenEvents(res);
                this.autoConnect(res);
            } else {
                this.readyState = WalletReadyState.NotFound;
            }
            this.emit('readyStateChanged', this.readyState);
        });
    }

    protected getInjectedProvider = getOkxWalletProvider;
    async connect() {
        if (this.options.useDeeplink !== false) {
            if (isInMobileBrowser() && !supportOkxWallet()) {
                openOkxWallet();
                throw new WalletNotFoundError('OKX Wallet is not found.');
            }
        }
        this.connecting = true;

        const provider = await this.getProvider();
        if (!provider) {
            throw new WalletNotFoundError();
        }
        let accounts: string[] = [];
        try {
            accounts = await provider.request<undefined, string[]>({ method: 'eth_requestAccounts' });
        } catch (e: any) {
            throw new WalletConnectionError('Connection error: ' + e?.message, e);
        }
        if (!accounts.length) {
            throw new WalletConnectionError('No accounts is avaliable.');
        }
        this.address = accounts[0];
        this.connecting = false;
        this.emit('accountsChanged', accounts);
        return this.address as string;
    }
    async signTypedData(params: { typedData: TypedData; address?: string }): Promise<string> {
        const provider = await this.prepareProvider();
        if (!this.connected) {
            throw new WalletDisconnectedError();
        }
        return provider.request({
            method: 'eth_signTypedData_v4',
            // Use JSON.stringify to wrap typedData or it will have a display issue when signing.
            params: [params.address || this.address, JSON.stringify(params.typedData)],
        });
    }
}
