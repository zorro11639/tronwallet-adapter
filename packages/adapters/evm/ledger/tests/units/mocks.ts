/**
 * Shared mock factories for Ledger transport, Eth app, and Modal openers.
 *
 * Tests apply these via `vi.mock(...)` at module scope so `LedgerWallet`'s
 * internal `TransportWebHID.create()` / `new Eth(transport)` calls resolve
 * to deterministic fakes instead of touching real WebHID.
 */
import { vi } from 'vitest';

export const MOCK_ADDRESS = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
export const MOCK_PUBLIC_KEY = '039a8f691a1b60d0e7fca8c41a36fa99e6e3dc4dcf8d66c4c8e4c8c8e4c8c8c8c';
export const MOCK_R = 'e41d3d574051f4b7f44e99d74bb66e5f7a0f5e5f7a0f5e5f7a0f5e5f7a0f5e5f';
export const MOCK_S = '51e41d3d574051f4b7f44e99d74bb66e5f7a0f5e5f7a0f5e5f7a0f5e5f7a0f5e';

export function createTransportMock() {
    const close = vi.fn().mockResolvedValue(undefined);
    return { close };
}

export function createEthMock() {
    const getAddress = vi.fn(async (path: string, _display = false) => ({
        publicKey: MOCK_PUBLIC_KEY,
        address: MOCK_ADDRESS,
        chainCode: undefined,
        _path: path,
    }));
    const signPersonalMessage = vi.fn(async (_path: string, _hex: string) => ({
        v: 27,
        r: MOCK_R,
        s: MOCK_S,
    }));
    const signTransaction = vi.fn(async (_path: string, _rawTxHex: string) => ({
        v: '1b',
        r: MOCK_R,
        s: MOCK_S,
    }));
    const signEIP712Message = vi.fn(async (_path: string, _typedData: unknown) => ({
        v: 28,
        r: MOCK_R,
        s: MOCK_S,
    }));
    const signEIP712HashedMessage = vi.fn(async (_path: string, _domainSeparator: string, _hashStruct: string) => ({
        v: 28,
        r: MOCK_R,
        s: MOCK_S,
    }));
    return { getAddress, signPersonalMessage, signTransaction, signEIP712Message, signEIP712HashedMessage };
}

export type EthMock = ReturnType<typeof createEthMock>;
export type TransportMock = ReturnType<typeof createTransportMock>;
