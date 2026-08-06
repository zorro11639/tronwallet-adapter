import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, test, expect, beforeEach } from 'vitest';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';
import { WalletSelectModal } from '../../src/index.js';
import { MockTronLink } from './MockTronLink.js';
import { NoAutoConnectProviders } from './TestProviders.js';

function mountModal(visible: boolean) {
    return mount(NoAutoConnectProviders, {
        props: { adapters: [new TronLinkAdapter({ checkTimeout: 0 })] },
        slots: { default: () => h(WalletSelectModal, { visible }) },
    });
}

function modalEl() {
    return document.querySelector('[data-testid="wallet-select-modal"]') as HTMLElement | null;
}

beforeEach(() => {
    localStorage.clear();
    (window as any).tronLink = new MockTronLink();
    (window as any).tronWeb = (window as any).tronLink.tronWeb;
    document.body.replaceChildren();
});

describe('WalletSelectModal', () => {
    test('should not render a stray class when closed', () => {
        mountModal(false);
        const classes = modalEl()?.className.split(/\s+/).filter(Boolean) ?? [];

        expect(classes).toContain('adapter-modal');
        expect(classes).not.toContain('adapter-modal-fade-in');
        // `visible && '...'` used to stringify to the literal "false".
        expect(classes).not.toContain('false');
    });

    test('should apply the fade-in class when visible', () => {
        mountModal(true);
        const classes = modalEl()?.className.split(/\s+/).filter(Boolean) ?? [];

        expect(classes).toContain('adapter-modal');
        expect(classes).toContain('adapter-modal-fade-in');
        expect(classes).not.toContain('false');
    });
});
