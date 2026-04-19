export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const siteInfo = {
  name: 'Daniel Cermann',
  tagline: 'Software Engineer in training :)',
  description: `I'm Daniel Cermann — 21 years old, Software Engineer and maker from Germany.
I enjoy everything from web development to solving challenging problems.
Currently studying IT-Systems Engineering at the Hasso Plattner Institute and
working as a student at Engie, where we help modernise the green energy market.`,
  social: [
    { name: 'GitHub',    url: 'https://github.com/DanielC04',                  icon: 'fab fa-github'   },
    { name: 'Instagram', url: 'https://www.instagram.com/dan_cmn',              icon: 'fab fa-instagram'},
    { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/daniel-cermann',    icon: 'fab fa-linkedin' },
  ] as SocialLink[],
};
