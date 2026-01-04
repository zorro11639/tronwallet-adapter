import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AdapterSelect from './components/AdapterSelect';
import ConnectionState from './components/ConnectionState';
import { Button, Typography } from '@mui/material';
import LinkIcon from './components/ConnectedIcon';
import LinkOffIcon from './components/DisconnectedIcon';
import { useWallet } from './components/WalletProvider';
import SignUsage from './components/SignUsage';
import SwitchChain from './components/SwitchChain';
import BgImg from './images/bg.png';
import { UniversalProvider } from '@walletconnect/universal-provider';
import { walletConnectConfig } from './config';
import QRCode from 'qrcode';

function extractAddressFromSession(session: any): string {
  const accounts = Object.values(session.namespaces).flatMap((namespace: any) => namespace.accounts);

  const account = accounts[0];
  if (!account) {
    throw new Error('[WalletConnectWallet] No accounts found in session');
  }

  // Account format: chainId:namespace:address (e.g., "tron:0x2b6653dc:Txxxxxxxxxxxxxxx")
  const address = account.split(':')[2];
  if (!address) {
    throw new Error(`[WalletConnectWallet] Invalid account format: ${account}`);
  }

  return address;
}

const Container = styled('div')({
  height: '100vh',
  boxSizing: 'border-box',
  margin: '0',
  paddingTop: '100px',
  display: 'flex',
  flexDirection: 'column',
  background: `url(${BgImg}) no-repeat center bottom/100% 100%`,
  '@media (max-width: 780px)': {
    paddingTop: '50px',
    height: 'unset',
  },
});
const Title = styled(Typography)({
  fontFamily: 'Wix Madefor Display, sans-serif',
  fontSize: '40px',
  fontWeight: 800,
  marginBottom: '20px',
  textAlign: 'center',
  color: 'rgba(7, 9, 76, 1)',
});

const MainContent = styled('div')({
  width: '100%',
  maxWidth: '1200px',
  margin: '20px auto',
  display: 'flex',

  '@media (max-width: 780px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const BasicInfoWrap = styled('div')(({ width = '610px', marginLeft = '0px' }: { width?: string; marginLeft?: string | number }) => ({
  width,
  marginLeft,
  flex: '1 0 auto',
  '@media (max-width: 780px)': {
    width: '100%',
  },
}));

const ConnectButton = styled(Button)({
  width: '100%',
  lineHeight: '60px',
  textAlign: 'center',
  backgroundColor: '#000000',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 700,
  padding: 0,
  transition: 'background-color 0.5s ease',
  marginLeft: 0,
  backdropFilter: 'blur(30px)',
  boxShadow: '0px 30px 30px -20px rgba(0, 0, 0, 0.40)',
  '&:hover': {
    backgroundColor: '#07094c',
  },
  '&.Mui-disabled': {
    color: '#fff',
  },
});
const AdapterBasicUsage: React.FC = () => {
  const { connectionState, connect, disconnect } = useWallet();

  const [url, setUrl] = useState('');
  async function handleConnect() {
    const provider = await UniversalProvider.init({
      projectId: walletConnectConfig.options.projectId,
      metadata: walletConnectConfig.options.metadata,
      relayUrl: walletConnectConfig.options.relayUrl,
    });
    provider.on('display_uri', (uri: string) => {
      console.log('display_uri', uri);
      QRCode.toDataURL(uri)
        .then((_url: string) => {
          console.log(_url);
          setUrl(_url);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
    const session = await provider.connect({
      pairingTopic: undefined,
      optionalNamespaces: {
        tron: {
          chains: ['tron:0x2b6653dc'],
          methods: ['tron_signTransaction', 'tron_signMessage'],
          events: [],
        },
      },
    });
    const address = extractAddressFromSession(session);
    console.log(address);
  }
  return (
    <Container>
      <Title>Adapter Basic Use Case</Title>
      <MainContent>
        <BasicInfoWrap>
          <AdapterSelect />
          <ConnectionState />
          <ConnectButton onClick={connectionState.connected ? disconnect : connect} disabled={connectionState.connecting}>
            {connectionState.connected ? <LinkOffIcon /> : <LinkIcon />}
            <span style={{ marginLeft: '10px' }}>{connectionState.connected ? 'Disconnect' : 'Connect'}</span>
          </ConnectButton>
        </BasicInfoWrap>
        <SignUsage />
        <SwitchChain />
      </MainContent>
      {/* <div>
        <button onClick={handleConnect}>ConnectWithWalletConnect</button>
        <img src={url} alt="" width={200} height={200} />
      </div> */}
    </Container>
  );
};

export default AdapterBasicUsage;
