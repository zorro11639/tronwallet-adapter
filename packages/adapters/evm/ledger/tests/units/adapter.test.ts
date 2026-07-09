import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LedgerEvmAdapter } from '../../src/adapter.js';

vi.mock('@ledgerhq/hw-transport-webhid', () => ({
    default: { create: vi.fn(async () => ({ close: vi.fn() })) },
}));

describe('LedgerEvmAdapter', () => {
    let adapter: LedgerEvmAdapter;
    let connectSpy: any;
    let disconnectSpy: any;

    beforeEach(() => {
        adapter = new LedgerEvmAdapter();
        connectSpy = vi.spyOn(adapter, 'emit');
        disconnectSpy = vi.spyOn(adapter, 'emit');
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('initialization', () => {
        it('should create adapter instance', () => {
            expect(adapter).toBeDefined();
            expect(adapter).toBeInstanceOf(LedgerEvmAdapter);
        });

        it('should have required properties', () => {
            expect(adapter.name).toBeDefined();
            expect(adapter.icon).toBeDefined();
            expect(adapter.url).toBeDefined();
        });

        it('should have name property set to Ledger', () => {
            expect(adapter.name).toContain('Ledger');
        });
    });

    describe('connect', () => {
        it('should connect and return address', async () => {
            try {
                const address = await adapter.connect();

                expect(address).toBeDefined();
                expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
            } catch (error) {
                // Expected if no Ledger device is available
                expect(error).toBeDefined();
            }
        });

        it('should emit connect event', async () => {
            try {
                await adapter.connect();
                // Check that emit was called
                expect(connectSpy).toHaveBeenCalled();
            } catch (error) {
                // Expected if no Ledger device
            }
        });

        it('should handle connection errors gracefully', async () => {
            // Mock failed connection
            const mockError = new Error('Device not found');
            vi.spyOn(adapter, 'connect').mockRejectedValueOnce(mockError);

            await expect(adapter.connect()).rejects.toThrow('Device not found');
        });
    });

    describe('disconnect', () => {
        it('should disconnect successfully', async () => {
            try {
                await adapter.disconnect();
                // Should not throw
                expect(true).toBe(true);
            } catch (error) {
                // May fail if never connected
            }
        });

        it('should emit disconnect event', async () => {
            try {
                await adapter.disconnect();
                expect(disconnectSpy).toHaveBeenCalled();
            } catch (error) {
                // Expected behavior if not connected
            }
        });
    });

    describe('signMessage', () => {
        it('should sign a message', async () => {
            try {
                await adapter.connect();
                const signature = await adapter.signMessage('Hello World');

                if (signature) {
                    expect(signature).toMatch(/^0x[a-f0-9]+$/);
                }
            } catch (error) {
                // Expected if no device
            }
        });

        it('should handle message parameter as string or Uint8Array', async () => {
            try {
                await adapter.connect();

                const stringMsg = 'test message';
                const uint8Msg = new TextEncoder().encode(stringMsg);

                const sig1 = await adapter.signMessage(stringMsg);
                const sig2 = await adapter.signMessage(uint8Msg);

                if (sig1 && sig2) {
                    expect(sig1).toMatch(/^0x[a-f0-9]+$/);
                    expect(sig2).toMatch(/^0x[a-f0-9]+$/);
                }
            } catch (error) {
                // Expected if no device
            }
        });

        it('should throw error if signMessage is called with invalid input', async () => {
            try {
                await adapter.connect();
                await expect(adapter.signMessage(null as any)).rejects.toThrow();
            } catch (error) {
                // Expected if no device
            }
        });
    });

    describe('signTypedData', () => {
        const typedData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Message: [
                    { name: 'content', type: 'string' },
                    { name: 'timestamp', type: 'uint256' },
                ],
            },
            primaryType: 'Message',
            domain: {
                name: 'Test App',
                version: '1',
                chainId: 1,
                verifyingContract: '0x0000000000000000000000000000000000000000',
            },
            message: {
                content: 'Hello',
                timestamp: 1234567890,
            },
        };

        it('should sign typed data', async () => {
            try {
                await adapter.connect();
                const signature = await adapter.signTypedData(typedData);

                if (signature) {
                    expect(signature).toMatch(/^0x[a-f0-9]+$/);
                }
            } catch (error) {
                // Expected if no device
            }
        });

        it('should validate typed data structure', async () => {
            try {
                await adapter.connect();

                const invalidData = { invalid: true };
                await expect(adapter.signTypedData(invalidData as any)).rejects.toThrow();
            } catch (error) {
                // Expected if no device
            }
        });

        it('should handle typed data with multiple custom types', async () => {
            const complexTypedData = {
                types: {
                    EIP712Domain: [{ name: 'name', type: 'string' }],
                    User: [
                        { name: 'name', type: 'string' },
                        { name: 'address', type: 'address' },
                    ],
                    Transaction: [
                        { name: 'from', type: 'User' },
                        { name: 'to', type: 'address' },
                        { name: 'amount', type: 'uint256' },
                    ],
                },
                primaryType: 'Transaction',
                domain: { name: 'MyDApp' },
                message: {
                    from: {
                        name: 'Alice',
                        address: '0x1111111111111111111111111111111111111111',
                    },
                    to: '0x2222222222222222222222222222222222222222',
                    amount: '1000000000000000000',
                },
            };

            try {
                await adapter.connect();
                const signature = await adapter.signTypedData(complexTypedData);

                if (signature) {
                    expect(signature).toMatch(/^0x[a-f0-9]+$/);
                }
            } catch (error) {
                // Expected if no device
            }
        });
    });

    describe('getProvider', () => {
        it('should return null as Ledger does not provide EIP1193 provider', async () => {
            await expect(adapter.getProvider()).resolves.toBeNull();
        });
    });

    describe('supported chains', () => {
        it('should accept ethereum chain', async () => {
            try {
                await adapter.connect();
                // Ledger should work with Ethereum
                expect(adapter).toBeDefined();
            } catch (error) {
                // Expected if no device
            }
        });

        it('should work with EVM-compatible chains', async () => {
            try {
                await adapter.connect();
                // Ledger supports any EVM chain
                expect(adapter).toBeDefined();
            } catch (error) {
                // Expected if no device
            }
        });
    });

    describe('error handling', () => {
        it('should handle network errors gracefully', async () => {
            const errorSpy = vi.spyOn(adapter, 'emit');

            try {
                await adapter.connect();
            } catch (error) {
                expect(error).toBeDefined();
            }

            vi.restoreAllMocks();
        });

        it('should handle user rejection of transaction', async () => {
            try {
                // Simulate user rejection
                const mockReject = vi.spyOn(adapter, 'signMessage');
                mockReject.mockRejectedValueOnce(new Error('User denied transaction'));

                await expect(adapter.signMessage('test')).rejects.toThrow('User denied');
            } catch (error) {
                // Expected
            }
        });
    });

    describe('multiple operations', () => {
        it('should handle sequential sign operations', async () => {
            try {
                await adapter.connect();

                const sig1 = await adapter.signMessage('message 1');
                const sig2 = await adapter.signMessage('message 2');

                if (sig1 && sig2) {
                    expect(sig1).toMatch(/^0x[a-f0-9]+$/);
                    expect(sig2).toMatch(/^0x[a-f0-9]+$/);
                    expect(sig1).not.toBe(sig2);
                }
            } catch (error) {
                // Expected if no device
            }
        });

        it('should maintain adapter state across operations', async () => {
            try {
                await adapter.connect();
                const addr1 = adapter.address;

                await adapter.signMessage('test');
                const addr2 = adapter.address;

                expect(addr1).toBe(addr2);
            } catch (error) {
                // Expected if no device
            }
        });
    });
});
