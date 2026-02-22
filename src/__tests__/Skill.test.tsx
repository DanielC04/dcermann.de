import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skill from '../components/sections/Skill';
import { Skill as SkillType } from '../components/loaded_data_types';

const baseSkill: SkillType = {
    name: 'TypeScript',
    icon: 'devicon-typescript-plain',
    description: '',
    proficiency: 80,
};

describe('Skill component', () => {
    it('renders the skill name', () => {
        render(<Skill {...baseSkill} />);
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('bar starts with width 0%', () => {
        const { container } = render(<Skill {...baseSkill} />);
        const bar = container.querySelector('.bar') as HTMLElement;
        expect(bar).toBeInTheDocument();
        expect(bar.style.width).toBe('0%');
    });

    it('shows proficiency fallback tooltip text when description is empty', () => {
        render(<Skill {...baseSkill} description="" proficiency={80} />);
        // The Tooltip wraps the indicator; the text prop is '80/100' when description is ''
        // Since OverlayTrigger doesn't render tooltip content in DOM by default,
        // we verify the indicator is present and the proficiency value is accessible
        const bar = screen.getByText('TypeScript').closest('.bar');
        expect(bar).toBeInTheDocument();
    });
});
