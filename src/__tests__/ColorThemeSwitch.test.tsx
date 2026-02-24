import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import ColorThemeSwitch from '../components/utils/ColorThemeSwitch';

// ---------------------------------------------------------------------------
// SCSS source loaded once for regression guards
// ---------------------------------------------------------------------------

const scss = readFileSync(
    resolve(__dirname, '../components/utils/ColorThemeSwitch.scss'),
    'utf-8'
);

/** Extract the content of the first CSS block whose selector matches `selectorRe`. */
function blockContent(selectorRe: RegExp): string {
    const re = new RegExp(selectorRe.source + '\\s*\\{([^}]*)\\}');
    return scss.match(re)?.[1] ?? '';
}

// ---------------------------------------------------------------------------
// SCSS alignment guard (regression against translateX(-50%) misalignment)
// ---------------------------------------------------------------------------

describe('ColorThemeSwitch SCSS — handler alignment', () => {
    it('handler unchecked transform does not contain the misaligning translateX(-50%)', () => {
        // The old animation used `rotate(-45deg) translateX(-50%)`. The rotation was
        // removed but translateX(-50%) was left behind, shifting the circle out of the pill.
        const block = blockContent(/\.toggle__handler/);
        expect(block).not.toBe('');                     // block must be found
        expect(block).not.toContain('translateX(-50%)');
    });

    it('handler checked transform does not contain stale rotate(0) or translateX(-50%)', () => {
        // Checked state: only a single translate3d should remain
        const block = blockContent(/input:checked\+\.toggle \.toggle__handler/);
        const transform = block.match(/transform\s*:\s*([^;]+)/)?.[1].trim() ?? '';
        expect(transform).not.toBe('');
        expect(transform).not.toContain('translateX(-50%)');
        expect(transform).not.toContain('rotate(0)');
        expect(transform).toMatch(/^translate3d\(/);
    });

    it('toggle width is 80px (slightly smaller than the original 90px)', () => {
        // Match `.toggle {` but not `.toggle__handler {`
        const block = blockContent(/\.toggle(?!__)/);
        const width = block.match(/width\s*:\s*([^;]+)/)?.[1].trim();
        expect(width).toBe('80px');
    });

    it('handler stays within the pill: left(3) + width(38) + translation ≤ toggle width(80)', () => {
        const block = blockContent(/input:checked\+\.toggle \.toggle__handler/);
        const translationRaw = block.match(/translate3d\(([^,]+),/)?.[1].trim() ?? '';
        const translation = parseFloat(translationRaw);
        // left: 3px  +  handler width: 38px  +  translation  +  right padding: 3px  ≤  80px
        expect(3 + 38 + translation + 3).toBeLessThanOrEqual(80);
    });
});

// ---------------------------------------------------------------------------
// Component structure & accessibility
// ---------------------------------------------------------------------------

describe('ColorThemeSwitch component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders the outer wrapper, toggle label, and handler', () => {
        const { container } = render(<ColorThemeSwitch />);
        expect(container.querySelector('.color-theme-switch')).toBeInTheDocument();
        expect(container.querySelector('.toggle')).toBeInTheDocument();
        expect(container.querySelector('.toggle__handler')).toBeInTheDocument();
    });

    it('handler is a descendant of the toggle label', () => {
        const { container } = render(<ColorThemeSwitch />);
        const toggle = container.querySelector('.toggle')!;
        const handler = container.querySelector('.toggle__handler')!;
        expect(toggle.contains(handler)).toBe(true);
    });

    it('checkbox input and label are properly associated via id/htmlFor', () => {
        const { container } = render(<ColorThemeSwitch />);
        const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const label = container.querySelector('label.toggle') as HTMLLabelElement;
        expect(input.id).toBe('dn');
        expect(label.htmlFor).toBe('dn');
    });

    it('defaults to unchecked (light theme) when localStorage is empty', () => {
        const { container } = render(<ColorThemeSwitch />);
        const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        expect(input.checked).toBe(false);
    });

    it('defaults to checked (dark theme) when localStorage has data-theme="dark"', () => {
        localStorage.setItem('data-theme', 'dark');
        const { container } = render(<ColorThemeSwitch />);
        const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        expect(input.checked).toBe(true);
    });

    it('clicking the label toggles the checked state', () => {
        const { container } = render(<ColorThemeSwitch />);
        const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const label = container.querySelector('label.toggle') as HTMLLabelElement;

        expect(input.checked).toBe(false);
        fireEvent.click(label);
        expect(input.checked).toBe(true);
        fireEvent.click(label);
        expect(input.checked).toBe(false);
    });

    it('toggling writes the new theme to localStorage', () => {
        const { container } = render(<ColorThemeSwitch />);
        const label = container.querySelector('label.toggle') as HTMLLabelElement;

        fireEvent.click(label);
        expect(localStorage.getItem('data-theme')).toBe('dark');
        fireEvent.click(label);
        expect(localStorage.getItem('data-theme')).toBe('light');
    });

    it('toggling sets data-theme on document.body', () => {
        const { container } = render(<ColorThemeSwitch />);
        const label = container.querySelector('label.toggle') as HTMLLabelElement;

        fireEvent.click(label);
        expect(document.body.getAttribute('data-theme')).toBe('dark');
        fireEvent.click(label);
        expect(document.body.getAttribute('data-theme')).toBe('light');
    });

    it('renders six star decorations and three craters inside the handler', () => {
        const { container } = render(<ColorThemeSwitch />);
        expect(container.querySelectorAll('.star')).toHaveLength(6);
        expect(container.querySelectorAll('.crater')).toHaveLength(3);
    });
});
