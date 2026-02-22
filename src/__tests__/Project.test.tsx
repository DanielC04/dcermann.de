import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Project from '../components/sections/Project';
import { Project as ProjectData } from '../components/loaded_data_types';

const baseProject: ProjectData = {
    title: 'My Project',
    startDate: '2023',
    description: 'A cool project.',
    images: ['img.jpg'],
    url: 'https://example.com',
    technologies: [],
};

describe('Project component', () => {
    it('renders title and start year', () => {
        render(<Project {...baseProject} />);
        expect(screen.getByText('My Project')).toBeInTheDocument();
        expect(screen.getByText('2023')).toBeInTheDocument();
    });

    it('renders .tech-badges and individual badges when technologies is non-empty', () => {
        const props: ProjectData = {
            ...baseProject,
            technologies: [
                { class: 'devicon-react-original', name: 'React' },
                { class: 'devicon-typescript-plain', name: 'TypeScript' },
            ],
        };
        const { container } = render(<Project {...props} />);
        expect(container.querySelector('.tech-badges')).toBeInTheDocument();
        expect(container.querySelectorAll('.tech-badge')).toHaveLength(2);
    });

    it('does NOT render .tech-badges when technologies is empty', () => {
        const { container } = render(<Project {...baseProject} />);
        expect(container.querySelector('.tech-badges')).not.toBeInTheDocument();
    });

    it('renders a link with the correct href', () => {
        render(<Project {...baseProject} />);
        const links = screen.getAllByRole('link');
        expect(links.some(l => l.getAttribute('href') === 'https://example.com')).toBe(true);
    });
});
