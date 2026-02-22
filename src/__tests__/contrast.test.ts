/**
 * WCAG AA contrast compliance tests.
 *
 * Color values are taken directly from src/scss/themes/theme-dark.scss and
 * theme-light.scss. If you change a theme color, update the constants here too.
 *
 * Pairs tested are those where one value is literally used as CSS `color` or as
 * a text-bearing background in the rendered page:
 *   - Primary text  (--text-color)      on every background tier
 *   - Dimmed text   (--text-color-dim)  on every background tier
 *   - Accent text   (--contrast-color)  on --background-color only
 *       → .years, .project-link, and skill-bar fill text (inverse pair)
 *
 * WCAG AA minimum: 4.5 : 1 for normal text.
 */
import { describe, it, expect } from 'vitest';

// ─── WCAG helpers ────────────────────────────────────────────────────────────

function relativeLuminance(hex: string): number {
    const n = parseInt(hex.replace('#', ''), 16);
    const linearize = (c: number) => {
        const v = c / 255;
        return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const r = linearize((n >> 16) & 0xff);
    const g = linearize((n >> 8) & 0xff);
    const b = linearize(n & 0xff);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg: string, bg: string): number {
    const l1 = Math.max(relativeLuminance(fg), relativeLuminance(bg));
    const l2 = Math.min(relativeLuminance(fg), relativeLuminance(bg));
    return (l1 + 0.05) / (l2 + 0.05);
}

const WCAG_AA = 4.5;

// ─── Theme color mirrors ──────────────────────────────────────────────────────
// Keep these in sync with src/scss/themes/theme-{dark,light}.scss

const dark = {
    bg:       '#061438',
    bg1:      '#19243f',
    bg2:      '#2c374e',
    text:     '#eef4ed',
    textDim:  '#c7c3c3',
    contrast: '#eb5f31',
} as const;

const light = {
    bg:       '#a3dfff',
    bg1:      '#93cbe9',
    bg2:      '#83b7d3',
    text:     '#051923',
    textDim:  '#0a1d27',
    contrast: '#993b13',   // darkened from #eb5f31 for AA compliance
} as const;

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('WCAG AA contrast compliance', () => {

    describe('dark theme — primary text (--text-color) on backgrounds', () => {
        it('on --background-color', () => {
            expect(contrastRatio(dark.text, dark.bg)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-1  (Skills section)', () => {
            expect(contrastRatio(dark.text, dark.bg1)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-2  (Projects / Experience sections)', () => {
            expect(contrastRatio(dark.text, dark.bg2)).toBeGreaterThanOrEqual(WCAG_AA);
        });
    });

    describe('dark theme — dimmed text (--text-color-dim) on backgrounds', () => {
        it('on --background-color', () => {
            expect(contrastRatio(dark.textDim, dark.bg)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-1', () => {
            expect(contrastRatio(dark.textDim, dark.bg1)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-2', () => {
            expect(contrastRatio(dark.textDim, dark.bg2)).toBeGreaterThanOrEqual(WCAG_AA);
        });
    });

    describe('dark theme — accent text (--contrast-color) on card background', () => {
        // .years and .project-link use --contrast-color on cards whose
        // background-color is --background-color.
        it('--contrast-color as text on --background-color  (.years, .project-link)', () => {
            expect(contrastRatio(dark.contrast, dark.bg)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        // Skill bar: --background-color is the text colour drawn on a
        // --contrast-color fill, so the inverse pair must also pass.
        it('--background-color text on --contrast-color fill  (skill bar)', () => {
            expect(contrastRatio(dark.bg, dark.contrast)).toBeGreaterThanOrEqual(WCAG_AA);
        });
    });

    describe('light theme — primary text (--text-color) on backgrounds', () => {
        it('on --background-color', () => {
            expect(contrastRatio(light.text, light.bg)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-1  (Skills section)', () => {
            expect(contrastRatio(light.text, light.bg1)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-2  (Projects / Experience sections)', () => {
            expect(contrastRatio(light.text, light.bg2)).toBeGreaterThanOrEqual(WCAG_AA);
        });
    });

    describe('light theme — dimmed text (--text-color-dim) on backgrounds', () => {
        it('on --background-color', () => {
            expect(contrastRatio(light.textDim, light.bg)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-1', () => {
            expect(contrastRatio(light.textDim, light.bg1)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('on --background-color-2', () => {
            expect(contrastRatio(light.textDim, light.bg2)).toBeGreaterThanOrEqual(WCAG_AA);
        });
    });

    describe('light theme — accent text (--contrast-color) on card background', () => {
        it('--contrast-color as text on --background-color  (.years, .project-link)', () => {
            expect(contrastRatio(light.contrast, light.bg)).toBeGreaterThanOrEqual(WCAG_AA);
        });
        it('--background-color text on --contrast-color fill  (skill bar)', () => {
            expect(contrastRatio(light.bg, light.contrast)).toBeGreaterThanOrEqual(WCAG_AA);
        });
    });
});
