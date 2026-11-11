export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const siteInfo = {
  name: 'Daniel Cermann',
  tagline: 'Software engineer working towards AI safety',
  description: `I'm Daniel, studying IT-Systems Engineering at the Hasso Plattner Institute. I want to help make advanced AI systems safe and trustworthy. I completed BlueDot Impact's Technical AI Safety course, co-founded the HPI AI Safety Initiative, and read my way through the alignment and interpretability literature (see my reading list). Before that I spent two years as lead engineer on energy-trading software at Engie.`,
  social: [
    { name: 'GitHub',    url: 'https://github.com/DanielC04',                  icon: 'fab fa-github'   },
    { name: 'Instagram', url: 'https://www.instagram.com/dan_cmn',              icon: 'fab fa-instagram'},
    { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/daniel-cermann',    icon: 'fab fa-linkedin' },
  ] as SocialLink[],
};
