export interface Skill {
  name: string;
  description: string;
  icon: string;
  proficiency: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages I speak',
    skills: [
      { name: 'German',  description: 'Native Language',        icon: '🇩🇪', proficiency: 100 },
      { name: 'English', description: 'C2 Level (CAE)',         icon: '🇬🇧', proficiency: 90  },
      { name: 'Spanish', description: 'One year in Argentina',  icon: '🇪🇸', proficiency: 85  },
    ],
  },
  {
    name: 'Programming languages',
    skills: [
      { name: 'Python',      description: '', icon: 'devicon-python-plain',     proficiency: 90 },
      { name: 'TypeScript',  description: '', icon: 'devicon-typescript-plain', proficiency: 80 },
      { name: 'Golang',      description: '', icon: 'devicon-go-plain',         proficiency: 70 },
      { name: 'C++',         description: '', icon: 'devicon-cplusplus-plain',  proficiency: 60 },
      { name: 'PHP',         description: '', icon: 'devicon-php-plain',        proficiency: 60 },
      { name: 'Java',        description: '', icon: 'devicon-java-plain',       proficiency: 50 },
      { name: 'HTML/CSS/JS', description: '', icon: 'devicon-html5-plain',      proficiency: 90 },
    ],
  },
  {
    name: 'Frameworks & libraries',
    skills: [
      { name: 'React',       description: '', icon: 'devicon-react-plain',       proficiency: 80 },
      { name: 'Tailwind CSS',description: '', icon: 'devicon-tailwindcss-plain', proficiency: 70 },
      { name: 'Three.js',    description: '', icon: 'devicon-threejs-original',  proficiency: 40 },
    ],
  },
  {
    name: 'Tools & basics',
    skills: [
      { name: 'vim/neovim',description: '',             icon: 'devicon-vim-plain',   proficiency: 70 },
      { name: 'LaTeX',     description: '',             icon: 'devicon-latex-plain', proficiency: 70 },
      { name: '3D-Design', description: 'Fusion 360',  icon: 'fas fa-cube',         proficiency: 60 },
      { name: 'bash',      description: '',             icon: 'devicon-bash-plain',  proficiency: 60 },
      { name: 'git',       description: '',             icon: 'devicon-git-plain',   proficiency: 50 },
    ],
  },
  {
    name: "Things I want to learn",
    skills: [
      { name: 'Svelte',         description: "It's sooo cool",      icon: 'devicon-svelte-plain', proficiency: 100 },
      { name: 'Rust',           description: 'Sounds sooo cool',    icon: 'devicon-rust-plain',   proficiency: 100 },
      { name: 'TDD',            description: '',                    icon: 'devicon-scrum-plain',  proficiency: 100 },
      { name: 'Cyber Security', description: 'Whitehat only ;)',    icon: 'fas fa-shield-alt',    proficiency: 100 },
    ],
  },
];
