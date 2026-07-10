/**
 * Tests for LedgerEvmAdapter.signTransaction.
 *
 * Verifies the unsigned payload handed to the Ledger device (no 0x prefix,
 * EIP-155 chainId for legacy txs, typed envelope for EIP-1559 txs) and that
 * the returned raw transaction deserializes back to the original fields.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FeeMarketEIP1559Transaction, LegacyTransaction } from '@ethereumjs/tx';
import { Common } from '@ethereumjs/common';
import { RLP } from '@ethereumjs/rlp';
import { bytesToBigInt, hexToBytes } from '@ethereumjs/util';
import { WalletDisconnectedError, WalletSignTransactionError } from '@tronweb3/abstract-adapter-evm';
import { createEthMock, createTransportMock, MOCK_ADDRESS, MOCK_R, MOCK_S, type EthMock } from './mocks.js';

let ethMock: EthMock;

vi.mock('@ledgerhq/hw-transport-webhid', () => ({
    default: {
        create: vi.fn(async () => createTransportMock()),
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

import { LedgerEvmAdapter } from '../../src/adapter.js';

const LEGACY_TX = {
    to: '0x28ee52a8f3d6e5d15f8b131996950d7f296c7952',
    value: '0x2386f26fc10000',
    nonce: 1,
    gasLimit: '0x5208',
    gasPrice: '0x4e3b29200',
    chainId: 1,
};

const EIP1559_TX = {
    to: '0x28ee52a8f3d6e5d15f8b131996950d7f296c7952',
    value: '0x2386f26fc10000',
    nonce: 1,
    gasLimit: '0x5208',
    maxFeePerGas: '0x4e3b29200',
    maxPriorityFeePerGas: '0x3b9aca00',
    chainId: 137,
};

describe('LedgerEvmAdapter.signTransaction', () => {
    let adapter: LedgerEvmAdapter;

    beforeEach(async () => {
        // WebHID is not available in the test environment; the adapter only
        // checks its presence to decide readyState.
        Object.defineProperty(globalThis.navigator, 'hid', { value: {}, configurable: true });
        ethMock = createEthMock();
        adapter = new LedgerEvmAdapter();
        await adapter.connect();
    });

    it('throws WalletDisconnectedError when not connected', async () => {
        await adapter.disconnect();
        await expect(adapter.signTransaction(LEGACY_TX)).rejects.toThrow(WalletDisconnectedError);
    });

    it('wraps device errors in WalletSignTransactionError', async () => {
        ethMock.signTransaction.mockRejectedValueOnce(new Error('denied by user'));
        await expect(adapter.signTransaction(LEGACY_TX)).rejects.toThrow(WalletSignTransactionError);
    });

    describe('legacy transactions', () => {
        beforeEach(() => {
            // v = chainId * 2 + 35 = 37 (0x25) for chainId 1, parity 0
            ethMock.signTransaction.mockResolvedValue({ v: '25', r: MOCK_R, s: MOCK_S });
        });

        it('sends an RLP-encoded EIP-155 payload without 0x prefix to the device', async () => {
            await adapter.signTransaction(LEGACY_TX);

            const rawTxHex = ethMock.signTransaction.mock.calls[0][1];
            expect(rawTxHex).not.toMatch(/^0x/);

            const fields = RLP.decode(hexToBytes(`0x${rawTxHex}`)) as Uint8Array[];
            // nonce, gasPrice, gasLimit, to, value, data + EIP-155 (chainId, 0, 0)
            expect(fields).toHaveLength(9);
            expect(bytesToBigInt(fields[6])).toBe(BigInt(LEGACY_TX.chainId));
            expect(fields[7]).toHaveLength(0);
            expect(fields[8]).toHaveLength(0);
        });

        it('returns a raw transaction that deserializes with the original fields', async () => {
            const signedRaw = await adapter.signTransaction(LEGACY_TX);

            const common = Common.custom({ chainId: LEGACY_TX.chainId });
            const parsed = LegacyTransaction.fromSerializedTx(hexToBytes(signedRaw as `0x${string}`), { common });

            expect(parsed.to?.toString()).toBe(LEGACY_TX.to);
            expect(parsed.value).toBe(BigInt(LEGACY_TX.value));
            expect(parsed.nonce).toBe(BigInt(LEGACY_TX.nonce));
            expect(parsed.gasPrice).toBe(BigInt(LEGACY_TX.gasPrice));
            expect(parsed.v).toBe(37n);
            expect(parsed.r).toBe(bytesToBigInt(hexToBytes(`0x${MOCK_R}`)));
            expect(parsed.s).toBe(bytesToBigInt(hexToBytes(`0x${MOCK_S}`)));
        });
    });

    describe('EIP-1559 transactions', () => {
        beforeEach(() => {
            // Typed transactions get the parity bit back from the device
            ethMock.signTransaction.mockResolvedValue({ v: '00', r: MOCK_R, s: MOCK_S });
        });

        it('sends the typed unsigned message without 0x prefix to the device', async () => {
            await adapter.signTransaction(EIP1559_TX);

            const rawTxHex = ethMock.signTransaction.mock.calls[0][1];
            expect(rawTxHex).not.toMatch(/^0x/);
            // Type-2 envelope
            expect(rawTxHex.startsWith('02')).toBe(true);

            const unsigned = FeeMarketEIP1559Transaction.fromSerializedTx(hexToBytes(`0x${rawTxHex}`), {
                common: Common.custom({ chainId: EIP1559_TX.chainId }),
            });
            expect(unsigned.chainId).toBe(BigInt(EIP1559_TX.chainId));
            expect(unsigned.isSigned()).toBe(false);
        });

        it('returns a raw transaction that deserializes with the original fields', async () => {
            const signedRaw = await adapter.signTransaction(EIP1559_TX);

            expect(signedRaw.startsWith('0x02')).toBe(true);
            const common = Common.custom({ chainId: EIP1559_TX.chainId });
            const parsed = FeeMarketEIP1559Transaction.fromSerializedTx(hexToBytes(signedRaw as `0x${string}`), {
                common,
            });

            expect(parsed.to?.toString()).toBe(EIP1559_TX.to);
            expect(parsed.value).toBe(BigInt(EIP1559_TX.value));
            expect(parsed.chainId).toBe(BigInt(EIP1559_TX.chainId));
            expect(parsed.maxFeePerGas).toBe(BigInt(EIP1559_TX.maxFeePerGas));
            expect(parsed.maxPriorityFeePerGas).toBe(BigInt(EIP1559_TX.maxPriorityFeePerGas));
            expect(parsed.v).toBe(0n);
        });
    });
});
