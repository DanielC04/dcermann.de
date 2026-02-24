import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act, waitFor } from '@testing-library/react';
import App from '../App';

// Suppress SCSS imports from non-lazy components loaded by App
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: {
            getResourceBundle: () => undefined,
            resolvedLanguage: 'en',
        },
    }),
    initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

// Mock lazy sections so they render synchronously via Suspense (no async import needed)
vi.mock('../components/sections/Home', () => ({
    default: () => (
        <section id="home">
            <span data-testid="type-animation">HeaderTitleTypeAnimation</span>
        </section>
    ),
}));
vi.mock('../components/sections/About/About', () => ({ default: () => null }));
vi.mock('../components/sections/Projects', () => ({ default: () => null }));
vi.mock('../components/sections/Skills', () => ({ default: () => null }));
vi.mock('../components/sections/Experience/Experience', () => ({ default: () => null }));
vi.mock('../components/sections/Contact', () => ({ default: () => null }));
vi.mock('../components/utils/Sidebar', () => ({ default: () => null }));
vi.mock('../components/utils/Footer', () => ({ default: () => null }));
vi.mock('../components/utils/LanguageSwitch', () => ({
    default: () => <div className="language-container" />,
}));
vi.mock('../components/utils/CustomCursor', () => ({ default: () => null }));

// Helpers for mocking scroll position
function setScrollY(value: number) {
    Object.defineProperty(window, 'scrollY', { value, configurable: true, writable: true });
}

async function scroll(y: number) {
    await act(async () => {
        setScrollY(y);
        window.dispatchEvent(new Event('scroll'));
    });
}

describe('ColorThemeSwitch dock — hero position (below HeaderTitleTypeAnimation)', () => {
    beforeEach(() => {
        setScrollY(0);
        // jsdom default innerHeight is 768; threshold is 768 * 0.5 = 384
        Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true, writable: true });
    });

    afterEach(() => {
        setScrollY(0);
    });

    it('renders .theme-switch-dock containing the day/night toggle', async () => {
        const { container } = render(<App />);
        await act(async () => {});
        expect(container.querySelector('.theme-switch-dock')).toBeInTheDocument();
        expect(container.querySelector('.theme-switch-dock .color-theme-switch')).toBeInTheDocument();
    });

    it('toggle has no docked class when scrollY = 0 (hero / below HeaderTitleTypeAnimation)', async () => {
        const { container } = render(<App />);
        await act(async () => {});
        expect(container.querySelector('.theme-switch-dock')).not.toHaveClass('docked');
    });

    it('.theme-switch-dock precedes #home in the DOM (fixed overlay above hero content)', async () => {
        const { container } = render(<App />);
        // Lazy Home resolves asynchronously — poll until it appears
        await waitFor(() => expect(container.querySelector('#home')).toBeInTheDocument());
        const dock = container.querySelector('.theme-switch-dock')!;
        const home = container.querySelector('#home')!;
        // DOCUMENT_POSITION_FOLLOWING means `home` comes after `dock` in document order
        expect(dock.compareDocumentPosition(home) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
});

describe('ColorThemeSwitch dock — docked position (left of language selectors)', () => {
    beforeEach(() => {
        setScrollY(0);
        Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true, writable: true });
    });

    afterEach(() => {
        setScrollY(0);
    });

    it('adds docked class after scrolling past 50 % viewport height', async () => {
        const { container } = render(<App />);
        await act(async () => {});
        await scroll(400); // 400 > 768 * 0.5 = 384 → inHero becomes false
        expect(container.querySelector('.theme-switch-dock')).toHaveClass('docked');
    });

    it('docked dock co-exists with .language-container in the DOM', async () => {
        const { container } = render(<App />);
        await act(async () => {});
        await scroll(400);
        expect(container.querySelector('.theme-switch-dock.docked')).toBeInTheDocument();
        expect(container.querySelector('.language-container')).toBeInTheDocument();
    });

    it('removes docked class when scrolling back above 50 % viewport height', async () => {
        // Render with page already scrolled past threshold
        setScrollY(400);
        const { container } = render(<App />);
        await act(async () => {});
        expect(container.querySelector('.theme-switch-dock')).toHaveClass('docked');

        // Scroll back to top
        await scroll(0);
        expect(container.querySelector('.theme-switch-dock')).not.toHaveClass('docked');
    });
});
