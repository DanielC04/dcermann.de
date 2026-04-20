export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const siteInfo = {
  name: 'Daniel Cermann',
  tagline: 'Software Engineer in training :)',
  description: `I'm Daniel, studying IT-Systems Engineering at the Hasso Plattner Institute. I like hard problems and building software to solve them. This is where I document what I'm working on and thinking about.`,
  social: [
    { name: 'GitHub',    url: 'https://github.com/DanielC04',                  icon: 'fab fa-github'   },
    { name: 'Instagram', url: 'https://www.instagram.com/dan_cmn',              icon: 'fab fa-instagram'},
    { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/daniel-cermann',    icon: 'fab fa-linkedin' },
  ] as SocialLink[],
};
