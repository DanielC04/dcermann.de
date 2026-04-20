export interface ExperienceItem {
  title: string;
  description: string;
  years: string;
  logo: string;
}

export const experiences: ExperienceItem[] = [
  {
    title: 'Working student @ Engie',
    description:
      'At Engie GEMS I worked as Lead-Engineer on two large projects: a 7/7 electricity booking tool processing multiple gigawatt-hours daily, and a system for automated PPA contract generation for the Legal team.',
    years: 'Mar 2024 – Dec 2025',
    logo: '/images/logos/engie_logo.jpg',
  },
  {
    title: "Bachelor's @ Hasso-Plattner-Institute",
    description:
      "Currently studying IT-Systems Engineering at HPI — learning fundamentals in maths, theory of computation and operating systems, as well as hands-on problem-solving.",
    years: 'Oct 2023 – present',
    logo: '/images/logos/logo_hpi.png',
  },
  {
    title: 'ISEF',
    description:
      "With two close friends I flew to Dallas to present 'BeeSupervisor' at the International Science and Engineering Fair. We won a third-place grand award in 'Robotics and Intelligent Machines' plus two special awards 🥳🎊",
    years: 'May 2023',
    logo: '/images/logos/isef_logo.jpg',
  },
  {
    title: 'Volunteer Year — Argentina 🇦🇷',
    description:
      "I spent a year helping in projects for children and teenagers in Buenos Aires. At the 'Refugio San Eugenio' I learned a lot about life, difficult social situations, and quite a few Spanish swear words 😉",
    years: 'Sep 2022 – Aug 2023',
    logo: '',
  },
];
