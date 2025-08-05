import type { ReactNode } from 'react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { utils } from 'tronweb';

// import './App.css';
import { MetaMaskAdapter } from '@tronweb3/tronwallet-adapter-metamask';
import type { Adapter } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletReadyState } from '@tronweb3/abstract-adapter-evm';
import { Box, Button, Typography, Select, MenuItem, Alert, FormControl, TextField } from '@mui/material';
import { tronWeb } from './tronweb';
const receiver = 'TMDKznuDWaZwfZHcM61FVFstyYNmK6Njk1';
const log = function (...args: any) {
    console.log('Adapter:', ...args);
};
export function MetamaskAdapterDemo() {
    const [account, setAccount] = useState('');
    const [readyState, setReadyState] = useState(WalletReadyState.Loading);
    const [chainId, setChainId] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [signMessage, setSignMessage] = useState('Hello, Adapter');
    const [signedMessage, setSignedMessage] = useState('');
    const adapter = useMemo(
        () =>
            new MetaMaskAdapter({}),
        []
    );

    useEffect(() => {
        setAccount(adapter.address || '');
        setReadyState(adapter.readyState);

        adapter.on('readyStateChanged', () => {
            log('readyState: ', adapter.readyState);
            setReadyState(adapter.readyState);
        });
        adapter.on('accountsChanged', async (data) => {
            log('accountsChanged: current', data);
            setAccount(data[0]);
            if (data[0]) {
                const provider = await adapter.getProvider();
                if (provider) {
                    const chainId = await provider.request({
                        method: 'eth_chainId',
                    });
                    setChainId(chainId as any);
                }
            }
        });

        return () => {
            adapter.removeAllListeners();
        };
    }, [adapter]);

    async function onConnect() {
        try {
            await adapter.connect();
            log('connect success');
        } catch (e) {
            log('connect error: ', e);
        }
    }
    async function onSignTransaction() {
        const transaction = {
            value: '0x' + Number(0.01 * Math.pow(10, 18)).toString(16), // 0.01 is 0.01ETH
            to: '0x18B0FDE2FEA85E960677C2a41b80e7557AdcbAE0',
            from: adapter.address,
        };
        log('sendTransaction: ', transaction);
        await adapter.sendTransaction(transaction);
        log('send successfully.');
        setOpen(true);
    }

    const onSignMessage = useCallback(
        async function () {
            const res = await adapter.signMessage({ message: signMessage });
            log('sign message successfully: ', res);
            setSignedMessage(res);
        },
        [adapter, signMessage, setSignedMessage]
    );
    const onVerifyMessage = useCallback(async function() {
        const utf8Message = utils.ethersUtils.toUtf8Bytes(signMessage);
        const hashedMessage = utils.ethersUtils.keccak256(utils.ethersUtils.concat([utils.ethersUtils.toUtf8Bytes('\x19Ethereum Signed Message:\n'), utils.ethersUtils.toUtf8Bytes(String(utf8Message.length)), utf8Message]))
        // debugger;
        const address = utils.crypto.ecRecover(hashedMessage, signedMessage.slice(2))
        log('Signature is valid: ', address.slice(2).toLowerCase() === account.slice(2).toLowerCase());
    }, [signMessage, signedMessage, account]);
    return (
        <Box sx={{ width: '100%', maxWidth: 900 }}>
            <h1>Metamask Demo</h1>
            <Typography variant="h6" gutterBottom>
                Your account address:
            </Typography>
            <Detail>{account}</Detail>

            <Typography variant="h6" gutterBottom>
                Current network you choose: {chainId}
            </Typography>

            <Typography variant="h6" gutterBottom>
                ReadyState: {readyState}
            </Typography>
            <Typography variant="h6" gutterBottom>
                <TextField label="Message to sign" size="small" value={signMessage} onChange={(e) => setSignMessage(e.target.value)} />
            </Typography>
            <Detail>
                <Button variant="contained"  onClick={onConnect}>
                    Connect
                </Button>
                <Button variant="contained" onClick={onSignMessage}>
                    Sign Message
                </Button>
                <Button variant="contained" onClick={onVerifyMessage}>
                    Verify Message
                </Button>
                <Button variant="contained" onClick={onSignTransaction}>
                    Transfer
                </Button>
            </Detail>
            <Typography>
                signedMessage: {signedMessage}
            </Typography>
            {open && (
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', marginTop: 1 }}>
                    Success! You can confirm your transfer on{' '}
                    <a target="_blank" rel="noreferrer" href={`https://etherscan.io/address/${adapter.address}`}>
                        EtherScan
                    </a>
                </Alert>
            )}
        </Box>
    );
}

export function Detail(props: { children: ReactNode }) {
    return <div style={{ margin: 15 }}>{props.children}</div>;
}
