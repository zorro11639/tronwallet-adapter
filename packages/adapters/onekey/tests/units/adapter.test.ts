import { OneKeyAdapter } from '../../src/index.js';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

window.open = vi.fn();
beforeEach(function () {
    vi.useFakeTimers();
    global.document = window.document;
    global.navigator = window.navigator;
    window.tronLink = undefined;
    window.tron = undefined;
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        })
    );
});
afterEach(function () {
    vi.unstubAllGlobals();
});

describe('OneKeyAdapter', function () {
    describe('#adapter()', function () {
        test('constructor', () => {
            const adapter = new OneKeyAdapter();
            expect(adapter.name).toEqual('OneKey');
            expect(adapter).toHaveProperty('icon');
            expect(adapter).toHaveProperty('url');
            expect(adapter).toHaveProperty('readyState');
            expect(adapter).toHaveProperty('address');
            expect(adapter).toHaveProperty('connecting');
            expect(adapter).toHaveProperty('connected');

            expect(adapter).toHaveProperty('connect');
            expect(adapter).toHaveProperty('disconnect');
            expect(adapter).toHaveProperty('signMessage');
            expect(adapter).toHaveProperty('signTransaction');

            expect(adapter).toHaveProperty('on');
            expect(adapter).toHaveProperty('off');
        });

        /**
         * Callers routinely build their config by spreading their own optional values, so
         * `{ checkTimeout: undefined }` is a normal thing to receive. It has to fall back to
         * the default: the raw value would reach `_checkWallet()`, make its polling bound
         * `NaN`, and leave the detection interval running forever so `connect()` never
         * settles.
         */
        test('falls back to the default checkTimeout when it is explicitly undefined', async () => {
            const adapter = new OneKeyAdapter({ checkTimeout: undefined });
            adapter.on('error', () => {});

            expect(typeof (adapter as any).config.checkTimeout).toBe('number');
            expect(Number.isNaN((adapter as any).config.checkTimeout)).toBe(false);

            // Detection must terminate rather than poll forever.
            const detection = (adapter as any)._checkWallet();
            await vi.advanceTimersByTimeAsync((adapter as any).config.checkTimeout + 500);
            await expect(detection).resolves.toBe(false);
        });
    });
});
