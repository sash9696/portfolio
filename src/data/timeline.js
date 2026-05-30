/** @typedef {{ id: string, title: string, org: string, date: string, description: string }} TimelineItem */

/** @type {TimelineItem[]} */
export const timeline = [
  {
    id: 't1',
    title: 'Senior Software Engineer',
    org: 'Rakuten',
    date: '2025 — Present',
    description:
      'Cloud BU GUI team — CNP, ObjectStore, and BMM. GA releases; Vue 3 migration on CNP (~17s→<250ms on large clusters); greenfield S3-compatible OST UI (~78% Vitest coverage); BMM imports, virtual kubectl console, Express runtime config.',
  },
  {
    id: 't2',
    title: 'Senior Software Engineer',
    org: 'Groundzero Softwares',
    date: '2022 — 2025',
    description:
      'Led product revamp, microfrontends, and testing (RTL + Playwright). −47% bundle size, +30% load speed, led 3 developers and 5 interns.',
  },
  {
    id: 't3',
    title: 'Front End Educator',
    org: 'Relevel · Unacademy',
    date: '2021 — 2022',
    description: 'Live coding and frontend curriculum for 1,000+ students; coordinated SMEs and course content.',
  },
  {
    id: 't4',
    title: 'Solutions Engineer',
    org: 'ICICI Bank',
    date: '2019 — 2021',
    description: 'UAT with vendors and PMs; CMS API testing for a banking product used by millions.',
  },
  {
    id: 't5',
    title: 'Freelance Web Developer',
    org: 'Independent',
    date: '2018 — 2019',
    description: 'Client websites — features, bug fixes, performance, and API integrations.',
  },
]
