# web3ModalConfig

```ts
export interface MobileWallet {
    id: string;
    name: string;
    links: {
        native: string;
        universal?: string;
    };
}
export interface DesktopWallet {
    id: string;
    name: string;
    links: {
        native: string;
        universal?: string;
    };
}
export interface ConfigCtrlState {
    projectId: string;
    chains?: string[];
    mobileWallets?: MobileWallet[];
    desktopWallets?: DesktopWallet[];
    walletImages?: Record<string, string>;
    enableAuthMode?: boolean;
    enableExplorer?: boolean;
    explorerRecommendedWalletIds?: string[] | 'NONE';
    explorerExcludedWalletIds?: string[] | 'ALL';
    termsOfServiceUrl?: string;
    privacyPolicyUrl?: string;
}
```


## appKit Config
```ts
type options = {
   /**
     * Adapter array to be used by the AppKit.
     * @default []
     */
    adapters?: ChainAdapter[];
    /**
     * This is only used for the @walletconnect/ethereum-provider package. We need this to determine which screens should be shown.
     * @default false
     */
    basic?: boolean;
    /**
     * Show or hide the wallets in the modal. This is available with the email and socials features
     * @default true
     */
    showWallets?: boolean;
    /**
     * Sign In With Ethereum configuration object.
     * @default undefined
     * @see https://docs.reown.com/appkit/react/core/siwe#configure-your-siwe-client
     */
    siweConfig?: AppKitSIWEClient;
    /**
     * Theme mode configuration flag. By default themeMode option will be set to user system settings.
     * @default `system`
     * @type `dark` | `light`
     * @see https://docs.reown.com/appkit/react/core/theming
     */
    themeMode?: ThemeMode;
    /**
     * Theme variable configuration object.
     * @default undefined
     * @see https://docs.reown.com/appkit/react/core/theming#themevariables
     */
    themeVariables?: ThemeVariables;
    /**
     * Allow users to switch to an unsupported chain.
     * @see https://docs.reown.com/appkit/react/core/options#allowunsupportedchain
     */
    allowUnsupportedChain?: boolean;
    /**
     * You can set the desired caipnetworks for the app:
     * @see https://docs.reown.com/appkit/react/core/options#defaultchain
     */
    networks: [AppKitNetwork, ...AppKitNetwork[]];
    /**
     * You can set a desired caipnetwork for the initial connection:
     * @see https://docs.reown.com/appkit/react/core/options#defaultchain
     */
    defaultNetwork?: AppKitNetwork;
    /**
     * Add or override the modal's network images.
     * @see https://docs.reown.com/appkit/react/core/options#chainimages
     */
    chainImages?: Record<number | string, string>;
    /**
     * Set or override the images of any connector. The key of each property must match the id of the connector.
     * @see https://docs.reown.com/appkit/react/core/options#connectorimages
     */
    connectorImages?: Record<string, string>;
    /**
     * Determines which wallet options to display in Coinbase Wallet SDK.
     * @property options
     *   - `all`: Show both smart wallet and EOA options.
     *   - `smartWalletOnly`: Show only smart wallet options.
     *   - `eoaOnly`: Show only EOA options.
     * @see https://www.smartwallet.dev/sdk/v3-to-v4-changes#parameters
     */
    coinbasePreference?: 'all' | 'smartWalletOnly' | 'eoaOnly';
    /**
     * Enable analytics to get more insights on your users activity within your Reown Cloud's dashboard.
     * @default false
     * @see https://cloud.walletconnect.com/
     */
    metadata?: Metadata;
    /**
     * UniversalProvider instance to be used by AppKit.
     * AppKit will generate its own instance by default in none provided
     * @default undefined
     */
    universalProvider?: UniversalProvider;
    /**
     * The default account type used for each chain namespace.
     * @default "{ bip122: 'payment', eip155: 'smartAccount', polkadot: 'eoa', solana: 'eoa' }"
     */
    defaultAccountTypes?: Partial<OptionsControllerState['defaultAccountTypes']>;


    /**
     * A boolean that allows you to add or remove the "All Wallets" button on the modal
     * @default 'SHOW'
     * @see https://docs.reown.com/appkit/react/core/options#allwallets
     */
    allWallets?: 'SHOW' | 'HIDE' | 'ONLY_MOBILE';
    /**
     * The project ID for the AppKit. You can find or create your project ID in the Cloud.
     * @see https://cloud.walletconnect.com/
     */
    projectId: ProjectId;
    /**
     * A map of CAIP network ID and custom RPC URLs to be used by the AppKit.
     * @default {}
     * @see https://docs.reown.com/appkit/react/core/options#customrpcurls
     */
    customRpcUrls?: Record<CaipNetworkId, CustomRpcUrl[]>;
    /**
     * Array of wallet ids to be shown in the modal's connection view with priority. These wallets will also show up first in `All Wallets` view
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#featuredwalletids
     */
    featuredWalletIds?: string[];
    /**
     * Array of wallet ids to be shown (order is respected). Unlike `featuredWalletIds`, these wallets will be the only ones shown in `All Wallets` view and as recommended wallets.
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#includewalletids
     */
    includeWalletIds?: string[];
    /**
     * Array of wallet ids to be excluded from the wallet list in the modal.
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#excludewalletids
     */
    excludeWalletIds?: string[];
    /**
     * Array of tokens to show the user's balance of. Each key represents the chain id of the token's blockchain
     * @default {}
     * @see https://docs.reown.com/appkit/react/core/options#tokens
     */
    tokens?: Tokens;
    /**
     * Add custom wallets to the modal. CustomWallets is an array of objects, where each object contains specific information of a custom wallet.
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#customwallets
     *
     */
    customWallets?: CustomWallet[];
    /**
     * You can add an url for the terms and conditions link.
     * @default undefined
     */
    termsConditionsUrl?: string;
    /**
     * You can add an url for the privacy policy link.
     * @default undefined
     */
    privacyPolicyUrl?: string;
    /**
     * Set of fields that related to your project which will be used to populate the metadata of the modal.
     * @default {}
     */
    metadata?: Metadata;
    /**
     * Enable or disable the appending the AppKit to the DOM. Created for specific use cases like WebGL.
     * @default false
     */
    disableAppend?: boolean;
    /**
     * Enable or disable the all the wallet options (injected, Coinbase, QR, etc.). This is useful if you want to use only email and socials.
     * @default true
     */
    enableWallets?: boolean;
    /**
     * Enable or disable the EIP6963 feature.
     * @default false
     */
    enableEIP6963?: boolean;
    /**
     * Enable or disable the Coinbase wallet.
     * @default true
     */
    enableCoinbase?: boolean;
    /**
     * Enable or disable the Injected wallet.
     * @default true
     */
    enableInjected?: boolean;
    /**
     * Enable or disable automatic reconnection on initialization.
     * @default true
     */
    enableReconnect?: boolean;
    /**
     * Enable or disable the WalletConnect QR code.
     * @default true
     */
    enableWalletConnect?: boolean;
    /**
     * Enable or disable the wallet guide footer in AppKit if you have email or social login configured.
     * @default true
     */
    enableWalletGuide?: boolean;
    /**
     * Enable or disable logs from email/social login.
     * @default true
     */
    enableAuthLogger?: boolean;
    /**
     * Enable or disable Universal Links to open the wallets as default option instead of Deep Links.
     * @default true
     */
    experimental_preferUniversalLinks?: boolean;
    /**
     * Enable or disable debug mode. This is useful if you want to see UI alerts when debugging.
     * @default true
     */
    debug?: boolean;
    /**
     * Features configuration object.
     * @default { swaps: true, onramp: true, email: true, socials: ['google', 'x', 'discord', 'farcaster', 'github', 'apple', 'facebook'], history: true, analytics: true, allWallets: true }
     * @see https://docs.reown.com/appkit/react/core/options#features
     */
    features?: Features;
    /**
     * @experimental - This feature is not production ready.
     * Enable Sign In With X (SIWX) feature.
     * @default undefined
     */
    siwx?: SIWXConfig;
    /**
     * Renders the AppKit to DOM instead of the default modal.
     * @default false
     */
    enableEmbedded?: boolean;
    /**
     * Allow users to switch to an unsupported chain.
     * @default false
     */
    allowUnsupportedChain?: boolean;
    /**
     * Default account types for each namespace.
     * @default "{ bip122: 'payment', eip155: 'smartAccount', polkadot: 'eoa', solana: 'eoa' }"
     */
    defaultAccountTypes: PreferredAccountTypes;
    /**
     * Allows users to indicate if they want to handle the WC connection themselves.
     * @default false
     * @see https://docs.reown.com/appkit/react/core/options#manualwccontrol
     */
    manualWCControl?: boolean;
    /**
     * Custom Universal Provider configuration to override the default one.
     * If `methods` is provided, it will override the default methods.
     * If `chains` is provided, it will override the default chains.
     * If `events` is provided, it will override the default events.
     * If `rpcMap` is provided, it will override the default rpcMap.
     * If `defaultChain` is provided, it will override the default defaultChain.
     * @default undefined
     */
    universalProviderConfigOverride?: {
        methods?: Record<string, string[]>;
        chains?: Record<string, string[]>;
        events?: Record<string, string[]>;
        rpcMap?: Record<string, string>;
        defaultChain?: string;
    };
    /**
     * Enable or disable the network switching functionality in the modal.
     * @default true
     */
    enableNetworkSwitch?: boolean;
}
```