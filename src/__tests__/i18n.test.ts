/**
 * Tests for i18n initialization and language bundle resolution.
 *
 * These tests reproduce the bug where getResourceBundle() is called with
 * i18n.language (which may be a full locale like "en-US") instead of
 * i18n.resolvedLanguage (which is normalized to a supported code like "en").
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import i18n from '../i18n';
import en from '../assets/text/data_english.json';
import de from '../assets/text/data_german.json';

describe('i18n initialization', () => {
    it('registers English bundle under "en"', () => {
        const bundle = i18n.getResourceBundle('en', 'translation');
        expect(bundle).toBeDefined();
        expect(bundle).toEqual(en);
    });

    it('registers German bundle under "de"', () => {
        const bundle = i18n.getResourceBundle('de', 'translation');
        expect(bundle).toBeDefined();
        expect(bundle).toEqual(de);
    });

    it('falls back to English when language is unknown', async () => {
        await i18n.changeLanguage('fr');
        expect(i18n.resolvedLanguage).toBe('en');
        await i18n.changeLanguage('en'); // restore
    });
});

describe('language resolution', () => {
    beforeEach(async () => {
        // Simulate browser environment where navigator.language is "en-US"
        await i18n.changeLanguage('en-US');
    });

    it('i18n.language is "en-US" (full locale from browser)', () => {
        expect(i18n.language).toBe('en-US');
    });

    it('getResourceBundle with i18n.language ("en-US") returns undefined — the bug', () => {
        // This is the bug: resources are registered under "en", not "en-US"
        const bundle = i18n.getResourceBundle(i18n.language, 'translation');
        expect(bundle).toBeUndefined();
    });

    it('i18n.resolvedLanguage is "en" (normalized supported code)', () => {
        expect(i18n.resolvedLanguage).toBe('en');
    });

    it('getResourceBundle with i18n.resolvedLanguage returns the English bundle — the fix', () => {
        const bundle = i18n.getResourceBundle(i18n.resolvedLanguage!, 'translation');
        expect(bundle).toBeDefined();
        expect((bundle as typeof en).basic_info.section_name.about).toBe('About');
    });

    afterEach(async () => {
        await i18n.changeLanguage('en');
    });
});

describe('language switching', () => {
    it('switches to German and resolves bundle correctly', async () => {
        await i18n.changeLanguage('de');
        expect(i18n.resolvedLanguage).toBe('de');
        const bundle = i18n.getResourceBundle(i18n.resolvedLanguage!, 'translation');
        expect(bundle).toBeDefined();
        expect((bundle as typeof de).basic_info.section_name.about).toBe('Über mich');
    });

    it('switches back to English and resolves bundle correctly', async () => {
        await i18n.changeLanguage('en');
        expect(i18n.resolvedLanguage).toBe('en');
        const bundle = i18n.getResourceBundle(i18n.resolvedLanguage!, 'translation');
        expect(bundle).toBeDefined();
        expect((bundle as typeof en).basic_info.section_name.about).toBe('About');
    });
});
