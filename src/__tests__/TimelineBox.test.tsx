import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimelineBox from '../components/sections/Experience/TimelineBox';
import { Experience } from '../components/loaded_data_types';

const baseExperience: Experience = {
    title: 'Software Engineer',
    logo_path: '',
    years: '2022 – 2024',
    description: 'Built great things.',
    technologies: [],
};

describe('TimelineBox component', () => {
    it('renders title, years, and description', () => {
        render(<TimelineBox {...baseExperience} side="left" />);
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('2022 – 2024')).toBeInTheDocument();
        expect(screen.getByText('Built great things.')).toBeInTheDocument();
    });

    it('renders an img when logo_path is non-empty', () => {
        render(<TimelineBox {...baseExperience} logo_path="/logo.png" side="right" />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('does NOT render an img when logo_path is empty', () => {
        render(<TimelineBox {...baseExperience} logo_path="" side="left" />);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('root element has class reveal-left when side="left"', () => {
        const { container } = render(<TimelineBox {...baseExperience} side="left" />);
        expect(container.firstChild).toHaveClass('reveal-left');
    });

    it('root element has class reveal-right when side="right"', () => {
        const { container } = render(<TimelineBox {...baseExperience} side="right" />);
        expect(container.firstChild).toHaveClass('reveal-right');
    });
});
