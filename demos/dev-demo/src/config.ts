import type { WalletConnectAdapterConfig } from '@tronweb3/tronwallet-adapters';

export const walletconnectConfig: WalletConnectAdapterConfig = {
    network: 'Nile',
    options: {
        relayUrl: 'wss://relay.walletconnect.com',
        // example WC app project ID
        projectId: '5fc507d8fc7ae913fff0b8071c7df231',
        metadata: {
            name: 'Test DApp',
            description: 'JustLend WalletConnect',
            url: 'https://your-dapp-url.org/',
            icons: ['https://your-dapp-url.org/mainLogo.svg'],
        },
    },
    themeMode: 'dark',
    themeVariables: {
        // '--w3m-qr-color': 'yellow'
    },
};

export const CHAIN_ID = {
    Mainnet: '0x2b6653dc',
    Shasta: '0x94a9059e',
    Nile: '0xcd8690dc',
};

export const TRONSCAN_URL = {
    [CHAIN_ID.Mainnet]: 'https://tronscan.org/',
    [CHAIN_ID.Shasta]: 'https://shasta.tronscan.org/',
    [CHAIN_ID.Nile]: 'https://nile.tronscan.org/',
}
