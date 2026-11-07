export const PROFILE = {
  name: 'Waheeda Gillani',
  role: 'Product Designer',
  email: 'waheedagillani728@gmail.com',
  linkedin: 'https://www.linkedin.com/in/waheeda-gillani-b8093430b',
  github: 'https://github.com/waheeda129',
  hometown: 'Bagh, Azad Kashmir',
};

export const MAILTO = `mailto:${PROFILE.email}?subject=Hello%20Waheeda`;

/** Timeline for the Experience card, oldest first. */
export const TIMELINE = [
  {title: 'BS Computer Science, COMSATS', years: '2023 – 2027'},
  {title: 'Founding team at Mapalz', years: '2024 – now'},
  {title: 'UI/UX Designer at TAMx', years: '2025 – now'},
  {title: 'Co-founder & COO, SaleForgers', years: '2026 – now'},
  {title: 'Shipped StockFlow', years: '2026'},
  {title: 'Shipped FaceAttend', years: '2026'},
];

export const STEPS = [
  {
    title: 'Discovery call',
    body: 'We start with a free 30-minute call so I can learn how your team works today and where people get stuck.',
  },
  {
    title: 'Scope & flows',
    body: 'Together we turn that into goals, a written scope and the key user flows, so everyone knows what we are building.',
  },
  {
    title: 'Design & test',
    body: 'I design and prototype in weekly cycles and test with real users, so feedback lands while it is still cheap to change.',
  },
  {
    title: 'Handoff & support',
    body: 'Your team gets organised Figma files, specs and a walkthrough, plus a month of support after launch.',
  },
];

export type Role = {
  id: string;
  company: string;
  role: string;
  years: string;
  place: string;
  url: string;
  urlLabel: string;
  logo: string;
  logoBg: string;
  about: string;
  did: string[];
  shots?: {src: string; alt: string; caption: string}[];
};

export const ROLES: Role[] = [
  {
    id: 'saleforgers',
    company: 'SaleForgers',
    role: 'Co-founder & COO',
    years: 'Oct 2026 – now',
    place: 'Islamabad',
    url: 'https://saleforgers.com',
    urlLabel: 'saleforgers.com',
    logo: '/assets/saleforgers-mark.webp',
    logoBg: '#E4EEE7',
    about:
      'SaleForgers builds custom software, practical AI and automation for e-commerce brands and growing businesses that have outgrown spreadsheets and disconnected tools.',
    did: [
      'Run delivery and day-to-day operations, from the first discovery call to launch and support.',
      'Turn discovery notes into a written scope and screen flows the engineering team builds from.',
      'Shipped StockFlow, an inventory and operations system, and FaceAttend, a facial attendance and school management system, with the team.',
    ],
  },
  {
    id: 'mapalz',
    company: 'Mapalz',
    role: 'Founding team',
    years: '2024 – now',
    place: 'Pakistan',
    url: 'https://mapalz.com',
    urlLabel: 'mapalz.com',
    logo: '/assets/mapalz-mark.webp',
    logoBg: '#FDEEE3',
    about:
      'Mapalz is one commerce platform that connects wholesalers, sellers, retailers and customers, so stock, orders and payments move through a single system.',
    did: [
      'Joined the founding team and shaped the product experience across the wholesaler hub, seller storefronts and customer portal.',
      'Designed dashboard flows for inventory, multi-channel orders and stock sync.',
      'Kept the three roles consistent so a seller and a wholesaler read the same screens the same way.',
    ],
    shots: [
      {src: '/assets/mapalz-seller.webp', alt: 'Mapalz seller dashboard with sales, orders and a multi-channel inventory table', caption: 'Seller dashboard'},
      {src: '/assets/mapalz-wholesaler.webp', alt: 'Mapalz wholesaler dashboard', caption: 'Wholesaler hub'},
      {src: '/assets/mapalz-customer.webp', alt: 'Mapalz customer shopping experience', caption: 'Customer experience'},
    ],
  },
  {
    id: 'tamx',
    company: 'TAMx Technologies',
    role: 'UI/UX Designer',
    years: '2025 – now',
    place: 'NASTP, Rawalpindi',
    url: 'https://www.tamxai.com',
    urlLabel: 'tamxai.com',
    logo: '/assets/tamx-logo.webp',
    logoBg: '#141414',
    about:
      'TAMx is an AI-focused software company building AI products and agents, network and security solutions, and web and mobile platforms for clients.',
    did: [
      'Design interfaces for AI products, web platforms and mobile apps.',
      'Run UX research and usability checks before designs go to engineering.',
      'Maintain Figma components so engineers ship consistent UI across projects.',
    ],
  },
];

export const PROJECTS = [
  {
    title: 'YouTube SEO Tool v2',
    body: 'A keyword tool for creators that scores titles, tags and descriptions and suggests practical fixes.',
    url: 'https://github.com/waheeda129/youtube-seo-tool-v2',
  },
  {
    title: 'Cinema Management System',
    body: 'An operations dashboard for movie schedules, seat availability, ticket bookings and daily revenue.',
    url: 'https://github.com/waheeda129?tab=repositories',
  },
  {
    title: 'Customer Relationship Management System',
    body: 'Lead tracking, follow-ups and client history, so a small team can keep its pipeline healthy.',
    url: 'https://github.com/waheeda129?tab=repositories',
  },
];

export const TOOLKIT = [
  {group: 'Design', items: ['Figma', 'FigJam', 'Framer', 'Adobe Illustrator', 'Adobe Photoshop']},
  {group: 'Research', items: ['User interviews', 'Usability testing', 'Journey mapping', 'Wireframing']},
  {group: 'Build', items: ['HTML & CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Framer Motion']},
  {group: 'Operations', items: ['Notion', 'Jira', 'Google Workspace', 'Project management']},
];

export const EDUCATION = [
  {school: 'COMSATS University Islamabad, Wah Campus', detail: 'BS Computer Science', years: '2023 – 2027'},
  {school: 'Springfield School and College, Bagh', detail: 'FSc Pre-Medical', years: ''},
];
