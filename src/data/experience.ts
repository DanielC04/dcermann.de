export interface ExperienceItem {
  title: string;
  description: string;
  years: string;
  logo: string;
}

export const experiences: ExperienceItem[] = [
  {
    title: 'Bachelor Thesis @ HPI',
    description:
      'Bachelor thesis on alignment in multi-agent settings in the research group of Paul Röttger at the Hasso Plattner Institute.',
    years: 'Nov 2026 – present',
    logo: '/images/logos/logo_hpi.png',
  },
  {
    title: 'Co-Founder @ HPI AI Safety Initiative',
    description:
      'Co-founded HAIS, a student group at HPI helping students into AI safety careers: a weekly reading circle, 3–4 large events per semester and joint conference visits. Part of the Pathfinder program since August 2026.',
    years: 'Jul 2026 – present',
    logo: '/images/logos/hais_logo.png',
  },
  {
    title: 'BlueDot Impact Technical AI Safety course',
    description:
      'Completed BlueDot Impact\'s Technical AI Safety course.',
    years: 'Jul 2026',
    logo: '/images/logos/bluedot_logo.png',
  },
  {
    title: 'Student Research Assistant @ HPI',
    description:
      'Multiple myeloma risk-factor project: worked on improving the Pangea model on the All of Us dataset.',
    years: 'Jun 2026 – Aug 2026',
    logo: '/images/logos/logo_hpi.png',
  },
  {
    title: 'Working student @ Engie',
    description:
      'Lead engineer on two projects at Engie GEMS: a 7/7 electricity booking tool processing multiple gigawatt-hours daily, and a system that automates PPA contract generation for the legal team.',
    years: 'Mar 2024 – Dec 2025',
    logo: '/images/logos/engie_logo.jpg',
  },
  {
    title: "Bachelor's @ Hasso-Plattner-Institute",
    description:
      "IT-Systems Engineering at HPI: mathematics, theory of computation and operating systems, plus practical software projects.",
    years: 'Oct 2023 – present',
    logo: '/images/logos/logo_hpi.png',
  },
  {
    title: 'ISEF',
    description:
      "Presented 'BeeSupervisor' with two teammates at the International Science and Engineering Fair in Dallas. Third-place Grand Award in Robotics and Intelligent Machines, plus two special awards.",
    years: 'May 2023',
    logo: '/images/logos/isef_logo.jpg',
  },
  {
    title: '🇦🇷 Volunteer Year Argentina',
    description:
      "One-year volunteer placement at the Refugio San Eugenio in Buenos Aires, working in projects for children and teenagers.",
    years: 'Sep 2022 – Aug 2023',
    logo: '',
  },
];
