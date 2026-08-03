import React, { act } from 'react';
import { render } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';

import { WalletSelectModal } from '../../src/Modal/WalletSelectModal.js';
import { Providers } from './TestProviders.js';
import { MockTronLink } from './MockTronLink.js';

/** Matches the fade-out duration in WalletSelectModal. */
const FADE_OUT_MS = 200;

beforeEach(() => {
    localStorage.clear();
    (window as any).tronLink = new MockTronLink();
    (window as any).tronWeb = (window as any).tronLink.tronWeb;
    vi.clearAllMocks();
});

afterEach(() => {
    vi.useRealTimers();
});

function renderModal() {
    // `rerender` re-applies the wrapper itself, so callers pass the bare element.
    const utils = render(<WalletSelectModal visible={true} onClose={() => undefined} />, { wrapper: Providers });
    return {
        ...utils,
        isVisible: () => !!utils.queryByTestId('wallet-select-modal'),
        setVisible: async (visible: boolean) => {
            await act(async () => {
                utils.rerender(<WalletSelectModal visible={visible} onClose={() => undefined} />);
            });
        },
        advance: async (ms: number) => {
            await act(async () => {
                await vi.advanceTimersByTimeAsync(ms);
            });
        },
    };
}

describe('WalletSelectModal', () => {
    test('should stay open when reopened during the fade-out', async () => {
        vi.useFakeTimers();
        const modal = renderModal();
        expect(modal.isVisible()).toBe(true);

        await modal.setVisible(false);
        await modal.advance(FADE_OUT_MS / 2);
        // Still fading out, so the node is expected to be around.
        expect(modal.isVisible()).toBe(true);

        await modal.setVisible(true);
        expect(modal.isVisible()).toBe(true);

        // The timer scheduled by the earlier close must not hide the reopened modal.
        await modal.advance(FADE_OUT_MS * 2);
        expect(modal.isVisible()).toBe(true);
    });

    test('should hide only after the fade-out completes', async () => {
        vi.useFakeTimers();
        const modal = renderModal();

        await modal.setVisible(false);
        expect(modal.isVisible()).toBe(true);

        await modal.advance(FADE_OUT_MS - 1);
        expect(modal.isVisible()).toBe(true);

        await modal.advance(2);
        expect(modal.isVisible()).toBe(false);
    });

    test('should not render a stray class while fading out', async () => {
        vi.useFakeTimers();
        const modal = renderModal();
        const classesOf = () =>
            (modal.queryByTestId('wallet-select-modal')?.className ?? '').split(/\s+/).filter(Boolean);

        expect(classesOf()).toContain('adapter-modal-fade-in');
        expect(classesOf()).not.toContain('false');

        await modal.setVisible(false);
        // Still mounted for the fade-out, and `fadeIn && '...'` used to stringify to "false".
        expect(classesOf()).not.toContain('adapter-modal-fade-in');
        expect(classesOf()).not.toContain('false');
    });

    test('should clear the fade-out timer on unmount', async () => {
        vi.useFakeTimers();
        // Other providers in the tree schedule their own timers, so track this one by id
        // instead of counting.
        const setSpy = vi.spyOn(globalThis, 'setTimeout');
        const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
        const modal = renderModal();

        await modal.setVisible(false);

        const fadeOutIndex = setSpy.mock.calls.findIndex((call) => call[1] === FADE_OUT_MS);
        expect(fadeOutIndex).toBeGreaterThanOrEqual(0);
        const fadeOutTimerId = setSpy.mock.results[fadeOutIndex].value;

        await act(async () => {
            modal.unmount();
        });

        expect(clearSpy).toHaveBeenCalledWith(fadeOutTimerId);
    });
});
