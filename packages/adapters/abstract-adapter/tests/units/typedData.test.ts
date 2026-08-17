import { describe, it, expect } from 'vitest';
import { normalizeAndValidateTypedData } from '../../src/typedData.js';
import { WalletSignTypedDataError } from '../../src/errors.js';
import type { TypedData } from '../../src/types.js';

const TYPES = {
    Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
    ],
};
const MESSAGE = { name: 'Bob', wallet: 'TKcEU8ekq2ZoFzLSGFYCUY6aocJBX9X3Fa' };

function makeTypedData(chainId?: unknown): TypedData {
    return {
        domain: { name: 'Test', version: '1', chainId } as any,
        types: TYPES,
        message: MESSAGE,
    };
}

function chainIdOf(typedData: TypedData) {
    return typedData.domain.chainId;
}

describe('normalizeAndValidateTypedData', () => {
    describe('payload shape', () => {
        it.each([
            ['typedData', null, /typedData must be an object/],
            ['typedData', 'not an object', /typedData must be an object/],
            ['typedData', [], /typedData must be an object/],
        ])('should throw when %s is %s', (_label, value, message) => {
            expect(() => normalizeAndValidateTypedData(value as any)).toThrow(message);
        });

        it.each([
            ['domain', { types: TYPES, message: MESSAGE }, /typedData\.domain must be an object/],
            ['types', { domain: {}, message: MESSAGE }, /typedData\.types must be an object/],
            ['message', { domain: {}, types: TYPES }, /typedData\.message must be an object/],
        ])('should throw when %s is missing', (_label, payload, message) => {
            expect(() => normalizeAndValidateTypedData(payload as any)).toThrow(message);
        });
    });

    describe('valid decimal string chainId', () => {
        it.each([
            ['0', 0],
            ['1', 1],
            ['728126428', 728126428],
            // MAX_SAFE_INTEGER itself is still exactly representable
            ['9007199254740991', 9007199254740991],
            // surrounding whitespace is tolerated
            ['  1  ', 1],
        ])('should convert %j to the number %i', (input, expected) => {
            const result = normalizeAndValidateTypedData(makeTypedData(input));
            expect(chainIdOf(result)).toBe(expected);
            expect(typeof chainIdOf(result)).toBe('number');
        });
    });

    describe('valid hex string chainId', () => {
        it.each([
            ['0x0', 0],
            ['0x1', 1],
            ['0x2b6653dc', 728126428],
            ['0X2B6653DC', 728126428],
            ['0x1fffffffffffff', 9007199254740991],
        ])('should convert %j to the number %i', (input, expected) => {
            const result = normalizeAndValidateTypedData(makeTypedData(input));
            expect(chainIdOf(result)).toBe(expected);
        });
    });

    /**
     * The core defect: `Number('9007199254740993')` silently yields
     * `9007199254740992`, so the wallet signs a domain the caller never supplied.
     * Values beyond the safe-integer range must be rejected, not rounded.
     */
    describe('chainId beyond Number.MAX_SAFE_INTEGER', () => {
        it.each([
            ['9007199254740993', '9007199254740993'],
            ['a full uint256', '115792089237316195423570985008687907853269984665640564039457584007913129639935'],
            ['hex above the safe range', '0x20000000000001'],
        ])('should throw rather than round %s', (_label, input) => {
            // Guard the premise: the old Number() path really was lossy here.
            expect(String(Number(input))).not.toBe(BigInt(input).toString());

            expect(() => normalizeAndValidateTypedData(makeTypedData(input))).toThrow(WalletSignTypedDataError);
            expect(() => normalizeAndValidateTypedData(makeTypedData(input))).toThrow(
                /exceeds Number\.MAX_SAFE_INTEGER/
            );
        });

        /**
         * 2^53 round-trips through Number exactly, but it is still not a *safe*
         * integer — it and 2^53+1 collapse onto the same double — so the boundary
         * has to sit at MAX_SAFE_INTEGER rather than at the first lossy value.
         */
        it('should reject 2^53 even though it is exactly representable', () => {
            expect(String(Number('0x20000000000000'))).toBe(BigInt('0x20000000000000').toString());

            expect(() => normalizeAndValidateTypedData(makeTypedData('0x20000000000000'))).toThrow(
                /exceeds Number\.MAX_SAFE_INTEGER/
            );
        });

        it('should throw for a bigint above the safe range', () => {
            expect(() => normalizeAndValidateTypedData(makeTypedData(BigInt('9007199254740993')))).toThrow(
                /exceeds Number\.MAX_SAFE_INTEGER/
            );
        });
    });

    /**
     * `Number.isFinite()` accepted all of these, so they reached the wallet as a
     * chainId that is not a uint256 at all.
     */
    describe('malformed string chainId', () => {
        it.each([
            ['a fraction', '1.5'],
            ['a negative', '-1'],
            ['a negative fraction', '-1.5'],
            ['scientific notation', '1e3'],
            ['an empty string', ''],
            ['whitespace only', '   '],
            ['a hex prefix with no digits', '0x'],
            ['a non-numeric string', 'mainnet'],
            ['a trailing unit', '1n'],
            ['an inner separator', '1_000'],
            ['Infinity', 'Infinity'],
            ['a leading plus', '+1'],
        ])('should throw for %s', (_label, input) => {
            expect(() => normalizeAndValidateTypedData(makeTypedData(input))).toThrow(WalletSignTypedDataError);
            expect(() => normalizeAndValidateTypedData(makeTypedData(input))).toThrow(/Invalid domain\.chainId/);
        });
    });

    /**
     * A numeric chainId used to skip normalization altogether, so the same
     * non-integer and negative values slipped through on that path.
     */
    describe('numeric chainId', () => {
        it.each([
            ['a fraction', 1.5],
            ['a negative', -1],
            ['NaN', NaN],
            ['Infinity', Infinity],
        ])('should throw for %s', (_label, input) => {
            expect(() => normalizeAndValidateTypedData(makeTypedData(input))).toThrow(/Invalid domain\.chainId/);
        });

        it('should throw for a number past the safe range', () => {
            expect(() => normalizeAndValidateTypedData(makeTypedData(2 ** 60))).toThrow(
                /exceeds Number\.MAX_SAFE_INTEGER/
            );
        });

        it('should accept a valid number unchanged', () => {
            const input = makeTypedData(728126428);
            const result = normalizeAndValidateTypedData(input);
            expect(chainIdOf(result)).toBe(728126428);
            // nothing to normalize, so the original object is returned as-is
            expect(result).toBe(input);
        });
    });

    describe('bigint chainId', () => {
        it('should convert a safe bigint to a number', () => {
            const result = normalizeAndValidateTypedData(makeTypedData(BigInt(728126428)));
            expect(chainIdOf(result)).toBe(728126428);
            expect(typeof chainIdOf(result)).toBe('number');
        });

        it('should throw for a negative bigint', () => {
            expect(() => normalizeAndValidateTypedData(makeTypedData(BigInt(-1)))).toThrow(/Invalid domain\.chainId/);
        });
    });

    describe('absent chainId', () => {
        it.each([
            ['undefined', undefined],
            ['null', null],
        ])('should pass through when chainId is %s', (_label, input) => {
            const typedData = makeTypedData(input);
            const result = normalizeAndValidateTypedData(typedData);
            expect(result).toBe(typedData);
            expect(chainIdOf(result)).toBe(input);
        });
    });

    describe('normalization is non-destructive', () => {
        it('should not mutate the caller payload', () => {
            const typedData = makeTypedData('728126428');
            const result = normalizeAndValidateTypedData(typedData);

            expect(chainIdOf(typedData)).toBe('728126428');
            expect(chainIdOf(result)).toBe(728126428);
            expect(result.domain).not.toBe(typedData.domain);
        });

        it('should preserve the other domain fields, types and message', () => {
            const result = normalizeAndValidateTypedData(makeTypedData('1'));

            expect(result.domain.name).toBe('Test');
            expect(result.domain.version).toBe('1');
            expect(result.types).toEqual(TYPES);
            expect(result.message).toEqual(MESSAGE);
        });
    });
});
