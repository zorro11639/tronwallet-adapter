import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ledgerService } from '@ledgerhq/hw-app-eth';
import {
    createEthMock,
    createTransportMock,
    MOCK_ADDRESS,
    MOCK_PUBLIC_KEY,
    MOCK_R,
    MOCK_S,
    type EthMock,
    type TransportMock,
} from './mocks.js';

let ethMock: EthMock;
let transportMock: TransportMock;

vi.mock('@ledgerhq/hw-transport-webhid', () => ({
    default: {
        create: vi.fn(async () => transportMock),
    },
}));

vi.mock('@ledgerhq/hw-app-eth', () => ({
    // vitest 4 requires constructor mocks to be `function`/`class` so `new Eth()` works.
    default: vi.fn(function () {
        return ethMock;
    }),
    ledgerService: {
        resolveTransaction: vi.fn(async () => ({})),
    },
}));

vi.mock('../../src/Modal/openModal.js', () => ({
    openConnectingModal: vi.fn(() => () => undefined),
    openSelectAccountModal: vi.fn(async () => ({
        index: 0,
        path: "44'/60'/0'/0/0",
        address: MOCK_ADDRESS,
    })),
    openVerifyAddressModal: vi.fn(() => () => undefined),
}));

import { LedgerWallet } from '../../src/LedgerWallet.js';

describe('LedgerWallet', () => {
    let wallet: LedgerWallet;

    beforeEach(() => {
        ethMock = createEthMock();
        transportMock = createTransportMock();
        wallet = new LedgerWallet();
    });

    describe('constructor', () => {
        it('accepts an empty config', () => {
            expect(() => new LedgerWallet()).not.toThrow();
        });

        it('throws when accountNumber is not an integer', () => {
            expect(() => new LedgerWallet({ accountNumber: 1.5 })).toThrow(/accountNumber/);
        });

        it.each(['beforeConnect', 'selectAccount', 'getDerivationPath'] as const)(
            'throws when %s is not a function',
            (key) => {
                expect(() => new LedgerWallet({ [key]: 'not-a-function' as any })).toThrow(new RegExp(key));
            }
        );
    });

    describe('connect', () => {
        it('fast-path sets selected account when options.account provided', async () => {
            await wallet.connect({ account: { index: 3, address: MOCK_ADDRESS } });
            expect(wallet.address).toBe(MOCK_ADDRESS);
        });

        it('runs full discovery flow without options', async () => {
            await wallet.connect();
            expect(wallet.address).toBe(MOCK_ADDRESS);
            expect(ethMock.getAddress).toHaveBeenCalled();
        });
    });

    describe('disconnect', () => {
        it('clears the selected address', async () => {
            await wallet.connect({ account: { index: 0, address: MOCK_ADDRESS } });
            wallet.disconnect();
            expect(wallet.address).toBe('');
        });
    });

    describe('signPersonalMessage', () => {
        it('returns a 0x-prefixed hex signature', async () => {
            const sig = await wallet.signPersonalMessage('Hello, Ledger!');
            expect(sig).toBe(`0x${MOCK_R}${MOCK_S}1b`);
            expect(sig).toMatch(/^0x[a-f0-9]{130}$/);
        });

        it('hex-encodes the message before passing to Eth', async () => {
            await wallet.signPersonalMessage('abc');
            expect(ethMock.signPersonalMessage).toHaveBeenCalledWith(
                expect.any(String),
                Buffer.from('abc').toString('hex')
            );
        });

        it('handles empty messages', async () => {
            const sig = await wallet.signPersonalMessage('');
            expect(sig).toMatch(/^0x[a-f0-9]+$/);
        });
    });

    describe('signTransaction', () => {
        it('returns a {v, r, s} signature with v as a number', async () => {
            const sig = await wallet.signTransaction('0xf86c01...');
            expect(sig).toEqual({ v: 0x1b, r: MOCK_R, s: MOCK_S });
        });

        it('forwards the raw tx hex and a resolution to Eth.signTransaction', async () => {
            await wallet.signTransaction('0xdeadbeef');
            // Third arg is the resolution resolved from ledgerService so the
            // device can display the tx details instead of blind signing.
            expect(ethMock.signTransaction).toHaveBeenCalledWith(expect.any(String), '0xdeadbeef', expect.anything());
        });

        it('falls back to blind signing when transaction resolution fails', async () => {
            (ledgerService.resolveTransaction as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('CAL down'));
            const sig = await wallet.signTransaction('0xdeadbeef');
            // Signing still succeeds; resolution is passed as null (blind sign).
            expect(sig).toEqual({ v: 0x1b, r: MOCK_R, s: MOCK_S });
            expect(ethMock.signTransaction).toHaveBeenCalledWith(expect.any(String), '0xdeadbeef', null);
        });
    });

    describe('signTypedData', () => {
        const baseTypedData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                ],
                Person: [
                    { name: 'name', type: 'string' },
                    { name: 'wallet', type: 'address' },
                ],
            },
            primaryType: 'Person',
            domain: { name: 'Ether Mail', chainId: 1 },
            message: { name: 'Bob', wallet: MOCK_ADDRESS },
        };

        it('returns a 0x-prefixed hex signature', async () => {
            const sig = await wallet.signTypedData(baseTypedData);
            expect(sig).toBe(`0x${MOCK_R}${MOCK_S}1c`);
            expect(sig).toMatch(/^0x[a-f0-9]{130}$/);
        });

        it('auto-adds an EIP712Domain entry when missing from types', async () => {
            await wallet.signTypedData({
                types: { Person: [{ name: 'name', type: 'string' }] },
                primaryType: 'Person',
                domain: { name: 'X' },
                message: { name: 'Alice' },
            });
            const [, passedTypedData] = ethMock.signEIP712Message.mock.calls[0];
            expect((passedTypedData as any).types.EIP712Domain).toBeDefined();
            expect((passedTypedData as any).types.EIP712Domain).toEqual(
                expect.arrayContaining([{ name: 'name', type: 'string' }])
            );
        });

        it('preserves user-supplied EIP712Domain entries', async () => {
            await wallet.signTypedData(baseTypedData);
            const [, passedTypedData] = ethMock.signEIP712Message.mock.calls[0];
            expect((passedTypedData as any).types.EIP712Domain).toEqual(baseTypedData.types.EIP712Domain);
        });

        it('falls back to signEIP712HashedMessage when the device returns INS_NOT_SUPPORTED', async () => {
            const err: any = new Error('Ledger device: INS_NOT_SUPPORTED (0x6d00)');
            err.statusCode = 0x6d00;
            ethMock.signEIP712Message.mockRejectedValueOnce(err);

            const sig = await wallet.signTypedData(baseTypedData);

            // The fallback signs the host-computed domain separator + struct hash.
            expect(ethMock.signEIP712HashedMessage).toHaveBeenCalledTimes(1);
            const [, domainSeparator, hashStruct] = ethMock.signEIP712HashedMessage.mock.calls[0];
            // Both hashes are 32-byte hex WITHOUT the 0x prefix.
            expect(domainSeparator).toMatch(/^[a-f0-9]{64}$/);
            expect(hashStruct).toMatch(/^[a-f0-9]{64}$/);
            expect(sig).toBe(`0x${MOCK_R}${MOCK_S}1c`);
        });

        it('does not fall back for unrelated signing errors', async () => {
            ethMock.signEIP712Message.mockRejectedValueOnce(new Error('User rejected'));
            await expect(wallet.signTypedData(baseTypedData)).rejects.toThrow('User rejected');
            expect(ethMock.signEIP712HashedMessage).not.toHaveBeenCalled();
        });
    });

    describe('getAccounts', () => {
        it('returns Account objects across the requested range', async () => {
            const accounts = await wallet.getAccounts(0, 3);
            expect(accounts).toHaveLength(3);
            accounts.forEach((acc, i) => {
                expect(acc.index).toBe(i);
                expect(acc.address).toBe(MOCK_ADDRESS);
                expect(acc.path).toBe(`44'/60'/${i}'/0/0`);
            });
        });

        it('throws when from is negative', async () => {
            await expect(wallet.getAccounts(-1, 2)).rejects.toThrow(/from cannot be smaller/);
        });

        it('throws when from >= to', async () => {
            await expect(wallet.getAccounts(3, 3)).rejects.toThrow(/from cannot be bigger/);
        });
    });

    describe('getAddress', () => {
        it('returns publicKey and address for the requested index', async () => {
            const result = await wallet.getAddress(0);
            expect(result.address).toBe(MOCK_ADDRESS);
            expect(result.publicKey).toBe(MOCK_PUBLIC_KEY);
        });

        it('passes the display flag through to Eth.getAddress', async () => {
            await wallet.getAddress(2, true);
            expect(ethMock.getAddress).toHaveBeenCalledWith(`44'/60'/2'/0/0`, true);
        });

        it('uses a custom derivation path when configured', async () => {
            const customWallet = new LedgerWallet({
                getDerivationPath: (i) => `m/custom/${i}`,
            });
            await customWallet.getAddress(5);
            expect(ethMock.getAddress).toHaveBeenCalledWith('m/custom/5', false);
        });
    });
});
