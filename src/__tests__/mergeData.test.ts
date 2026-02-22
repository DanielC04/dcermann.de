/**
 * Tests for the mergeData utility.
 * Verifies that translatable text is combined correctly with shared metadata.
 */
import { describe, it, expect } from 'vitest';
import { mergeData } from '../mergeData';
import { LangTranslations, SharedData } from '../components/loaded_data_types';

const sharedData: SharedData = {
    basic_info: {
        name: 'Test User',
        titles: ['title1'],
        social: [],
        image: 'img.jpg',
    },
    projects: [
        { startDate: '2020', images: ['img.jpg'], url: 'https://example.com', technologies: [{ class: 'icon', name: 'React' }] },
    ],
    skills: [
        { data: [{ icon: 'flag-de', proficiency: 100 }] },
    ],
    experience: [
        { logo_path: '/logo.jpg', years: '2021 - 2022', technologies: [] },
    ],
};

const langData: LangTranslations = {
    basic_info: {
        description_header: 'Hi',
        description: 'I am {{AGE}} years old.',
        section_name: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', experience: 'Experience', contact: 'Contact' },
    },
    projects: [
        { title: 'My Project', description: 'A cool project.' },
    ],
    skills: [
        { name: 'Languages', data: [{ name: 'German', description: 'Native' }] },
    ],
    experience: [
        { title: 'My Job', description: 'A great job.' },
    ],
};

describe('mergeData', () => {
    it('preserves basic_info from lang translations', () => {
        const result = mergeData(langData, sharedData);
        expect(result.basic_info).toEqual(langData.basic_info);
    });

    it('merges project text with shared project metadata', () => {
        const result = mergeData(langData, sharedData);
        const proj = result.projects[0];
        expect(proj.title).toBe('My Project');
        expect(proj.description).toBe('A cool project.');
        expect(proj.startDate).toBe('2020');
        expect(proj.url).toBe('https://example.com');
        expect(proj.technologies).toEqual([{ class: 'icon', name: 'React' }]);
    });

    it('merges skill text with shared skill metadata', () => {
        const result = mergeData(langData, sharedData);
        const cat = result.skills[0];
        expect(cat.name).toBe('Languages');
        expect(cat.data[0].name).toBe('German');
        expect(cat.data[0].description).toBe('Native');
        expect(cat.data[0].icon).toBe('flag-de');
        expect(cat.data[0].proficiency).toBe(100);
    });

    it('merges experience text with shared experience metadata', () => {
        const result = mergeData(langData, sharedData);
        const exp = result.experience[0];
        expect(exp.title).toBe('My Job');
        expect(exp.description).toBe('A great job.');
        expect(exp.logo_path).toBe('/logo.jpg');
        expect(exp.years).toBe('2021 - 2022');
    });

    it('preserves {{AGE}} placeholder without i18next interpolation', () => {
        const result = mergeData(langData, sharedData);
        // i18next should not process {{AGE}} since we use getResourceBundle, not t()
        expect(result.basic_info.description).toContain('{{AGE}}');
    });
});
