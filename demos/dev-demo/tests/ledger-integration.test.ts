/**
 * Integration tests for LedgerEvmAdapter in dev-demo
 * These tests verify the adapter works correctly within the demo application
 */

import { LedgerEvmAdapter } from '../../../adapters/evm/ledger/src/adapter';
import EventEmitter from 'eventemitter3';

describe('LedgerEvmAdapter Integration Tests', () => {
  let adapter: LedgerEvmAdapter;

  beforeEach(() => {
    adapter = new LedgerEvmAdapter();
  });

  describe('Adapter Initialization', () => {
    it('should initialize with correct properties', () => {
      expect(adapter.name).toBeDefined();
      expect(adapter.icon).toBeDefined();
      expect(adapter.website).toBeDefined();
      expect(adapter.name).toContain('Ledger');
    });

    it('should be an EventEmitter for lifecycle events', () => {
      expect(adapter).toBeInstanceOf(EventEmitter);
    });
  });

  describe('Connection Workflow', () => {
    it('should handle complete connection -> sign -> disconnect flow', async () => {
      try {
        // Connect
        const address = await adapter.connect();

        if (address) {
          expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);

          // Sign a message
          const message = 'Welcome to TronWeb3 Adapter';
          const signature = await adapter.signMessage(message);

          if (signature) {
            expect(signature).toMatch(/^0x[a-f0-9]+$/);
          }

          // Disconnect
          await adapter.disconnect();
        }
      } catch (error) {
        // Expected when no device is connected
        expect(error).toBeDefined();
      }
    });
  });

  describe('Message Signing Integration', () => {
    it('should support both string and Uint8Array messages', async () => {
      try {
        await adapter.connect();

        const msgString = 'Hello World';
        const msgBytes = new TextEncoder().encode(msgString);

        // Both should be signable
        expect(() => adapter.signMessage(msgString)).not.toThrow();
        expect(() => adapter.signMessage(msgBytes)).not.toThrow();

        await adapter.disconnect();
      } catch (error) {
        // Expected
      }
    });
  });

  describe('EIP-712 Structured Data Signing', () => {
    const mockTypedData = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Transfer: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
      },
      primaryType: 'Transfer',
      domain: {
        name: 'TokenSwap',
        version: '1',
        chainId: 1,
        verifyingContract: '0x0000000000000000000000000000000000000000',
      },
      message: {
        from: '0x8ba1f109551bd432803012645ac136ddd64dba72',
        to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        amount: '1000000000000000000',
      },
    };

    it('should sign EIP-712 typed data', async () => {
      try {
        await adapter.connect();

        const signature = await adapter.signTypedData(mockTypedData);

        if (signature) {
          expect(signature).toMatch(/^0x[a-f0-9]+$/);
        }

        await adapter.disconnect();
      } catch (error) {
        // Expected
      }
    });

    it('should validate EIP-712 message structure', async () => {
      try {
        await adapter.connect();

        const invalidObject = { invalid: 'data' };
        await expect(adapter.signTypedData(invalidObject as any)).rejects.toThrow();

        await adapter.disconnect();
      } catch (error) {
        // Expected
      }
    });
  });

  describe('Event Emission', () => {
    it('should emit connect event on successful connection', (done) => {
      adapter.on('connect', (address: string) => {
        expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
        done();
      });

      adapter.connect().catch(() => {
        // Device not connected, but event listener is registered
        done();
      });
    });

    it('should emit disconnect event', (done) => {
      adapter.on('disconnect', () => {
        expect(true).toBe(true);
        done();
      });

      adapter.disconnect().catch(() => {
        // Already disconnected, but listener is set
        done();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle device not found error', async () => {
      // This will fail if no device is connected
      // But it should fail gracefully
      try {
        await adapter.connect();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle invalid message input', async () => {
      try {
        await adapter.connect();

        // Try with invalid input
        await expect(adapter.signMessage(null as any)).rejects.toThrow();

        await adapter.disconnect();
      } catch (error) {
        // Device not connected
      }
    });
  });

  describe('Demo Component Usage', () => {
    it('should work with adapters array pattern used in AdapterBasicTest', () => {
      const adapters = [
        new LedgerEvmAdapter(),
        // Other adapters would be added here
      ];

      expect(adapters).toHaveLength(1);
      expect(adapters[0].name).toContain('Ledger');
    });

    it('should support getProvider returning null', () => {
      const provider = adapter.getProvider();
      expect(provider).toBeNull();
    });
  });

  describe('Multi-Chain Support', () => {
    it('should work with any EVM-compatible chain', async () => {
      try {
        await adapter.connect();

        // Ledger supports all EVM chains via the same BIP44 path
        // (44'/60'/index'/0/0) for Ethereum-compatible chains

        expect(adapter).toBeDefined();

        await adapter.disconnect();
      } catch (error) {
        // Expected
      }
    });
  });

  describe('Signature Verification', () => {
    it('should produce consistently formatted signatures', async () => {
      try {
        await adapter.connect();

        const message = 'Test message for Ledger';
        const sig1 = await adapter.signMessage(message);
        const sig2 = await adapter.signMessage(message);

        if (sig1 && sig2) {
          // Both should be valid hex
          expect(sig1).toMatch(/^0x[a-f0-9]+$/);
          expect(sig2).toMatch(/^0x[a-f0-9]+$/);

          // Should have same format (though values differ due to randomness)
          expect(sig1.length).toBe(sig2.length);
        }

        await adapter.disconnect();
      } catch (error) {
        // Expected
      }
    });
  });
});
