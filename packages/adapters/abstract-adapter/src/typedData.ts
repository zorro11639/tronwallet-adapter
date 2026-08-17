import { WalletSignTypedDataError } from './errors.js';
import type { TypedData } from './types.js';

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Non-negative decimal integer, e.g. `1`, `728126428`. */
const DECIMAL_INTEGER = /^[0-9]+$/;
/** Non-negative hex integer, e.g. `0x2b6653dc`. `BigInt` accepts either prefix case. */
const HEX_INTEGER = /^0[xX][0-9a-fA-F]+$/;

/**
 * Convert a `domain.chainId` to the `number` wallets expect, refusing anything
 * that cannot survive the trip.
 *
 * EIP-712 declares `chainId` as `uint256`, but `Number()` maps that domain onto
 * IEEE-754 doubles and quietly accepts values that are not integers at all:
 * `Number('9007199254740993')` yields `9007199254740992`, and `'1.5'`, `'-1'`,
 * `'1e3'` and `''` all pass `Number.isFinite()`. Each of those makes the wallet
 * sign a domain that differs from what the caller supplied, so the signature no
 * longer corresponds to the original payload. Parsing through `BigInt` keeps the
 * value exact and lets the unrepresentable cases fail loudly instead.
 */
function toChainIdNumber(chainId: string | number | bigint): number {
    // Reject anything that is not an integer literal before converting. `Number()`
    // happily turns `'1.5'`, `'-1'`, `'1e3'` and `''` into finite numbers, none of
    // which is a uint256.
    if (typeof chainId === 'string') {
        const value = chainId.trim();
        if (!DECIMAL_INTEGER.test(value) && !HEX_INTEGER.test(value)) {
            throw new WalletSignTypedDataError(
                `Invalid domain.chainId: ${chainId}. Expected a non-negative decimal or 0x-prefixed hex integer.`
            );
        }
    }

    const parsed = Number(chainId);

    // Catches NaN, Infinity and fractions, which only a number/bigint input can
    // still be at this point — the string form was already gated by the regexes.
    if (!Number.isInteger(parsed)) {
        throw new WalletSignTypedDataError(`Invalid domain.chainId: ${chainId}. Expected a non-negative integer.`);
    }
    if (parsed < 0) {
        throw new WalletSignTypedDataError(`Invalid domain.chainId: ${chainId}. Expected a non-negative integer.`);
    }

    // With integrality established, `isSafeInteger` is an exact bound check rather
    // than an approximation: every integer up to MAX_SAFE_INTEGER converts
    // losslessly, and anything larger necessarily rounds to 2^53 or beyond, which is
    // never "safe". So a value that survives this equals what the caller supplied.
    if (!Number.isSafeInteger(parsed)) {
        throw new WalletSignTypedDataError(
            `domain.chainId ${chainId} exceeds Number.MAX_SAFE_INTEGER (${Number.MAX_SAFE_INTEGER}) and cannot be represented as a number without losing precision.`
        );
    }
    return parsed;
}

/**
 * Validate a TypedData payload and return a normalized copy safe to pass to wallets.
 *
 * Current normalization: convert `domain.chainId` to a number (some wallets,
 * e.g. TronLink, require a numeric chainId). `null`/`undefined` are left alone
 * because `chainId` is optional, as are values of other types — a `BigNumber`
 * instance is a legitimate `BigNumberish` and is passed through untouched.
 *
 * Throws {@link WalletSignTypedDataError} if the payload is not a valid TypedData
 * object, or if `domain.chainId` cannot be represented exactly as a number.
 */
export function normalizeAndValidateTypedData(typedData: TypedData): TypedData {
    if (!isPlainObject(typedData)) {
        throw new WalletSignTypedDataError('typedData must be an object.');
    }
    if (!isPlainObject(typedData.domain)) {
        throw new WalletSignTypedDataError('typedData.domain must be an object.');
    }
    if (!isPlainObject(typedData.types)) {
        throw new WalletSignTypedDataError('typedData.types must be an object.');
    }
    if (!isPlainObject(typedData.message)) {
        throw new WalletSignTypedDataError('typedData.message must be an object.');
    }

    const { chainId } = typedData.domain;
    if (typeof chainId === 'string' || typeof chainId === 'number' || typeof chainId === 'bigint') {
        const parsed = toChainIdNumber(chainId);
        if (parsed === chainId) {
            return typedData;
        }
        return {
            ...typedData,
            domain: { ...typedData.domain, chainId: parsed },
        };
    }

    return typedData;
}
