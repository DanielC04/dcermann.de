#import "@preview/modern-cv:0.9.0": *
#import "@preview/fontawesome:0.6.0": fa-version
#fa-version("6")

#show: resume.with(
  font: ("Source Sans 3"), 
  author: (
    firstname: "Daniel",
    lastname: "Cermann",
    email: "daniel.cermann@gmx.de",
    homepage: "https://dcermann.de",
    phone: "(+49) 170 3029739",
    github: "DanielC04",
    linkedin: "daniel-cermann",
    positions: (),
    // positions: (
    //   "Software Engineer",
    //   "Developer",
    // ),
  ),
  keywords: ("AI Safety", "Software Engineer"),
  description: "CV of Daniel Cermann",
  profile-picture: none,
  date: datetime.today().display(),
  language: "en",
  colored-headers: true,
  show-footer: false,
  show-address-icon: true,
  paper-size: "a4",
)

#set text(
    size: 10pt
)

= Experience

#resume-entry(
  title: "Co-Founder, HPI AI Safety Initiative (HAIS)",
  location: "Potsdam, Germany",
  date: "07/2026 - now",
  description: "Student initiative at Hasso Plattner Institute · Part of the Pathfinder program since 08/2026",
  title-link: "https://hpi-ai-safety.de",
)

#resume-item[
- Co-founded a student group helping HPI students into AI safety careers
- Run a weekly reading circle, 3-4 large events per semester and joint conference visits
]

#resume-entry(
  title: "Technical AI Safety course",
  location: "Online",
  date: "07/2026",
  description: "BlueDot Impact",
)

#resume-entry(
  title: "Student research assistant",
  location: "Potsdam, Germany",
  date: "06/2026 - 08/2026",
  description: "Hasso Plattner Institute",
)

#resume-item[
- Multiple myeloma risk-factor project: improving the Pangea model on the _All of Us_ dataset
]

#resume-entry(
  title: "Bachelor project",
  location: "Berlin, Germany | New York, USA",
  date: "10/2025 - 09/2026",
  description: "Hasso Plattner @ Mount Sinai",
)

#resume-item[
- Built a visualization tool that predicts _Methicillin-resistant Staphylococcus aureus_ infection outcomes to support the implementation of countermeasures
- Collaborated with _Mount Sinai Hospital_, New York
]

#resume-entry(
  title: "Working student at Engie GEMS",
  location: "Berlin, Germany",
  date: "03/2024 - 12/2025",
  description: "Engie Global Energy Management & Sales",
)

#resume-item[
  - Lead engineer of Project _Delta_:
    - Book day-ahead bids 7/7 for 3rd party PPAs (Power Purchase Agreements); total daily volume > 1 GWh
    - Responsible for the Python implementation of business logic, deployment pipeline and azure infrastructure
  - Lead engineer of project _Contract Creation Tool - CCT_
    - Hundreds of legal contracts are generated automatically from word templates and questions about the marketed asset
]

#resume-entry(
  title: "Quantitative trading camp participant",
  location: "London, England",
  date: "04/2024",
  description: "Jane Street",
)



= Selected Projects

#resume-entry(
  title: "Bachelor thesis: Alignment in multi-agent settings",
  location: "Potsdam, Germany",
  date: "11/2026 - now",
  description: "Hasso Plattner Institute · Research group of Paul Röttger",
)

#resume-entry(
  title: "Beesupervisor",
  // location:  [#link("https://www.snexplores.org/article/device-count-honeybees-varroa-mite-parasite")],
  location: [#link("https://www.snexplores.org/article/device-count-honeybees-varroa-mite-parasite")[#text[Featured in Science News Explores]]],
  date: "05/2021 - 12/2023",
  description: "Developer and electrical engineer",
)

#resume-item[
- Built an optical detection system to identify the Varroa mite on bees and assist beekeepers in treatment
- Presented at _*International Science and Engineering Fair*_ in Dallas
  - Grand award: 3rd place in category 'Robotics and intelligent machines' and two special prizes
]


= Education

#resume-entry(
  title: "Universidad de Buenos Aires",
  location: "Buenos Aires, Argentina",
  date: "03/2025 - 08/2025",
  description: "Semester abroad",
)


#resume-entry(
  title: "Hasso Plattner Institute",
  location: "Potsdam, Germany",
  date: "10/2023 - now",
  description: "IT-Systems Engineering - B.S.",
)

#resume-entry(
  title: "STEM branch of Albert Schweitzer High School",
  location: "Erfurt, Germany",
  date: "09/2018 - 07/2022",
  description: "Grade: 1.0",
)
#resume-item[
  - Successful participation in math, informatics and physics competitions:
    - Three-time finalist in the national round of the *Math Olympiad*
    - *German Young Physicist's Tournament*: 3rd place in Germany
    - *Naboj* math competition: Best German team + 23rd worldwide
]

= Languages

German (native) · English (fluent, C2) · Spanish (fluent)
