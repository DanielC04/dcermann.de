export interface Technology {
  icon: string;
  name: string;
}

export interface Project {
  title: string;
  description: string;
  startDate: string;
  image: string;
  url: string;
  technologies: Technology[];
}

export const projects: Project[] = [
  {
    title: 'Fluid Simulation',
    description:
      'A real-time fluid simulation running in the browser, built with Three.js and WebGL shaders. Implements the Navier–Stokes equations for incompressible flow.',
    startDate: '2023',
    image: '/images/projects/fluid_simulation.png',
    url: 'https://fluid.dcermann.de',
    technologies: [
      { icon: 'devicon-opengl-plain',     name: 'OpenGL'     },
      { icon: 'devicon-typescript-plain', name: 'TypeScript' },
      { icon: 'devicon-threejs-original', name: 'Three.js'   },
    ],
  },
  {
    title: 'BeeSupervisor',
    description:
      'Varroa mites are parasites that kill ~20% of bee colonies each year. With two friends I built a monitoring solution: two cameras film the hive entrance and an AI determines the infection rate so the beekeeper can initiate treatment in time.',
    startDate: '2020',
    image: '/images/projects/beesupervisor.jpg',
    url: 'https://www.snexplores.org/article/device-count-honeybees-varroa-mite-parasite',
    technologies: [
      { icon: 'devicon-python-plain',     name: 'Python'             },
      { icon: 'devicon-cplusplus-plain',  name: 'C++'               },
      { icon: 'devicon-raspberrypi-plain',name: 'Raspberry Pi'       },
      { icon: 'devicon-opengl-plain',     name: 'OpenGL'             },
      { icon: 'devicon-embeddedc-plain',  name: 'Embedded / EE'      },
    ],
  },
  {
    title: 'GYPT — German Young Physicist Tournament',
    description:
      'For the GYPT 2021 I wrote a physical simulation in React + Three.js and used this website to visualise the practical experiments I conducted.',
    startDate: '2021',
    image: '/images/projects/gypt.jpg',
    url: 'https://gypt.dcermann.de',
    technologies: [
      { icon: 'devicon-javascript-plain', name: 'JavaScript' },
      { icon: 'devicon-threejs-original', name: 'Three.js'   },
    ],
  },
  {
    title: 'Convex Hulls',
    description:
      'A webapp that finds the convex hull of a given set of points. It visualises multiple algorithms — Jarvis March, Graham Scan and Chan\'s Algorithm — side by side.',
    startDate: '2019',
    image: '/images/projects/convexhulls.jpg',
    url: 'https://convexhulls.dcermann.de',
    technologies: [
      { icon: 'devicon-react-original',   name: 'React'      },
      { icon: 'devicon-javascript-plain', name: 'JavaScript' },
    ],
  },
  {
    title: 'Mega-Tic-Tac-Toe',
    description:
      'A cool extension of classical Tic-Tac-Toe: each of the nine fields contains a smaller board. Win the small board to claim the big square. It\'s hard to explain but very mind-blowing 🤯',
    startDate: '2020',
    image: '/images/projects/tictactoe.jpg',
    url: 'https://tictactoe.dcermann.de',
    technologies: [
      { icon: 'devicon-react-plain',      name: 'React'      },
      { icon: 'devicon-typescript-plain', name: 'TypeScript' },
      { icon: 'devicon-sass-plain',       name: 'SASS'       },
    ],
  },
  {
    title: 'Mensch ärgere dich nicht — Simulation',
    description:
      'For the Bundeswettbewerb Informatik 2021 I coded and visualised a simulation of "Mensch ärgere dich nicht". Each player designs a custom dice; after hundreds of simulated games the best one is determined.',
    startDate: '2021',
    image: '/images/projects/gameSimulation.jpg',
    url: 'https://bwinf2021.dcermann.de',
    technologies: [
      { icon: 'devicon-react-plain',      name: 'React'      },
      { icon: 'devicon-typescript-plain', name: 'TypeScript' },
      { icon: 'devicon-sass-plain',       name: 'SASS'       },
    ],
  },
];
