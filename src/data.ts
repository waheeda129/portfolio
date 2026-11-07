export const PROFILE = {
  name: 'Waheeda Gillani',
  role: 'Product Designer',
  email: 'waheedagillani728@gmail.com',
  linkedin: 'https://www.linkedin.com/in/waheeda-gillani-b8093430b',
  linkedinHandle: 'waheeda-gillani',
  github: 'https://github.com/waheeda129',
  githubHandle: 'waheeda129',
  hometown: 'Bagh, Azad Kashmir',
};

export const MAILTO = `mailto:${PROFILE.email}?subject=Hello%20Waheeda`;
export const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=Hello%20Waheeda`;

export const NAV = [
  {href: '/', label: 'Home'},
  {href: '/work', label: 'Work'},
  {href: '/services', label: 'Services'},
  {href: '/about', label: 'About'},
];

/** Rotating line in the home intro. */
export const NOW = [
  'Running delivery and operations at SaleForgers',
  'Designing interfaces for AI products at TAMx',
  'Shaping the Mapalz commerce platform',
  'Finishing my Computer Science degree at COMSATS',
];

/** Timeline for the Experience card and the About page, oldest first. */
export const TIMELINE = [
  {title: 'BS Computer Science, COMSATS', years: '2023 – 2027', detail: 'COMSATS University Islamabad, Wah Campus'},
  {title: 'Founding team at Mapalz', years: '2024 – now', detail: 'Unified commerce platform for wholesalers, sellers and customers'},
  {title: 'UI/UX Designer at TAMx', years: '2025 – now', detail: 'AI-focused software company, NASTP Rawalpindi'},
  {title: 'Co-founder & COO, SaleForgers', years: '2026 – now', detail: 'Custom software and automation, Islamabad'},
  {title: 'Shipped StockFlow', years: '2026', detail: 'Inventory and operations management, delivered with SaleForgers'},
  {title: 'Shipped FaceAttend', years: '2026', detail: 'Facial attendance and school management, delivered with SaleForgers'},
];

export const STEPS = [
  {
    title: 'Discovery call',
    body: 'We start with a free 30-minute call so I can learn how your team works today and where people get stuck.',
    get: 'A short summary of the problems worth solving first',
  },
  {
    title: 'Scope & flows',
    body: 'Together we turn that into goals, a written scope and the key user flows, so everyone knows what we are building.',
    get: 'Written scope, user flows and a timeline',
  },
  {
    title: 'Design & test',
    body: 'I design and prototype in weekly cycles and test with real users, so feedback lands while it is still cheap to change.',
    get: 'Clickable prototypes and weekly design reviews',
  },
  {
    title: 'Handoff & support',
    body: 'Your team gets organised Figma files, specs and a walkthrough, plus a month of support after launch.',
    get: 'Figma files, specs, a walkthrough and a month of support',
  },
];

/* ---------------- Case studies ---------------- */

export type Shot = {src: string; alt: string; caption: string; w: number; h: number};

export type CaseStudy = {
  slug: string;
  company: string;
  kind: string;
  role: string;
  years: string;
  place: string;
  tagline: string;
  summary: string;
  url: string;
  urlLabel: string;
  logo: string;
  logoBg: string;
  focus: string[];
  problemTitle: string;
  problem: string;
  builtTitle: string;
  built: string;
  myPart: string[];
  steps?: {title: string; body: string}[];
  stepsTitle?: string;
  parts?: {title: string; items: string[]}[];
  partsTitle?: string;
  systems?: {name: string; type: string; line: string; body: string; modules: string[]; url: string}[];
  shots?: Shot[];
  proof?: {label: string; href: string; note: string};
  closing?: string;
};

export const CASES: CaseStudy[] = [
  {
    slug: 'saleforgers',
    company: 'SaleForgers',
    kind: 'Company I co-founded',
    role: 'Co-founder & COO',
    years: 'Oct 2026 – now',
    place: 'Islamabad',
    tagline: 'Business first. Then the system.',
    summary:
      'SaleForgers builds custom software, practical AI and automation for e-commerce brands and growing businesses that have outgrown spreadsheets and disconnected tools. I run delivery and day-to-day operations.',
    url: 'https://saleforgers.com',
    urlLabel: 'saleforgers.com',
    logo: '/assets/saleforgers-mark.webp',
    logoBg: '#E4EEE7',
    focus: ['Delivery management', 'Operations', 'Scoping', 'Client systems'],
    problemTitle: 'Growing teams outgrow their tools',
    problem:
      'Orders live in too many places, inventory updates depend on memory and reports take more work than the decisions they support. Generic software makes the team change how it works instead of fitting the work.',
    builtTitle: 'Systems designed around the real workflow',
    built:
      'SaleForgers understands the work first, agrees the scope in writing and builds in stages the client can see. A new system should not become a digital copy of a broken process.',
    myPart: [
      'Lead operational governance and delivery, so every client system moves from discovery to launch on a plan the client can follow.',
      'Turn discovery notes into a written scope, screen flows and a timeline the engineering team builds from.',
      'Keep design, engineering and the client aligned through staged releases and handover.',
    ],
    stepsTitle: 'How a project runs',
    steps: [
      {title: 'Discovery', body: 'We walk through how the work happens today, who is involved, and where time or information is lost.'},
      {title: 'Scope and design', body: 'We agree what the system will and will not do, the integrations it needs, and how people will use it.'},
      {title: 'Build and test', body: 'We build in short stages and test the workflows that matter, so the client sees working software early.'},
      {title: 'Launch and support', body: 'We move to production deliberately, hand over what the team needs, and stay available for improvements.'},
    ],
    systems: [
      {
        name: 'StockFlow',
        type: 'Inventory & operations management',
        line: 'Follow the stock. Connect the records.',
        body: 'Purchasing, FIFO inventory, sales and the supplier and customer ledgers behind them, connected around a real retail workflow.',
        modules: ['Purchasing', 'FIFO inventory', 'Invoices', 'Supplier ledger', 'Customer ledger', 'Reporting'],
        url: 'https://saleforgers.com/work/stockflow',
      },
      {
        name: 'FaceAttend',
        type: 'Facial attendance & school management',
        line: 'The timetable starts the story.',
        body: 'Attendance sessions open and close with the class timetable, exceptions reach the right people, and attendance connects to students, fees and exams.',
        modules: ['Timetable sessions', 'Facial attendance', 'Exceptions', 'Notifications', 'Fees', 'Examinations'],
        url: 'https://saleforgers.com/work/faceattend',
      },
    ],
    proof: {
      label: 'saleforgers.com/about#team',
      href: 'https://saleforgers.com/about#team',
      note: 'The SaleForgers team page lists me as Co-founder & COO.',
    },
    closing: 'Client screens stay confidential, so the interfaces SaleForgers shows are recreated with sample data. The workflows and modules are real.',
  },
  {
    slug: 'mapalz',
    company: 'Mapalz',
    kind: 'Founding team',
    role: 'Founding team, product & UX',
    years: '2024 – now',
    place: 'Pakistan',
    tagline: 'One platform. Every connection.',
    summary:
      'Mapalz connects wholesalers, sellers, retailers and customers in one commerce platform, so stock, orders and payments move through a single system. I joined the founding team and work on the product experience.',
    url: 'https://mapalz.com',
    urlLabel: 'mapalz.com',
    logo: '/assets/mapalz-mark.webp',
    logoBg: '#FDEEE3',
    focus: ['Multi-role product', 'Dashboards', 'Inventory', 'Commerce'],
    problemTitle: 'Every hand-off was manual',
    problem:
      'Wholesalers, sellers, retailers and customers usually work in separate tools. Stock lives in one place, orders in another and payments in a third, so every hand-off between them is manual.',
    builtTitle: 'Each role gets its own experience on one database',
    built:
      'Mapalz puts every participant in the value chain on one platform. Each role gets its own experience, and they all share one live database for catalogues, stock, orders and settlements.',
    myPart: [
      'Shaped the product experience across the wholesaler hub, seller storefronts and customer portal.',
      'Designed dashboard flows for inventory, multi-channel orders and stock sync.',
      'Kept the three roles consistent, so a seller and a wholesaler read the same screens the same way.',
    ],
    shots: [
      {src: '/assets/mapalz-seller.webp', alt: 'Mapalz seller dashboard with total sales, orders, sync channels and a multi-channel inventory table', caption: 'Seller dashboard: sales, orders and stock across channels in one view.', w: 1200, h: 800},
      {src: '/assets/mapalz-wholesaler.webp', alt: 'Mapalz wholesale hub with buyers, purchase orders, shipments and sales performance', caption: 'Wholesale hub: buyers, purchase orders and shipments.', w: 1200, h: 800},
      {src: '/assets/mapalz-customer.webp', alt: 'Mapalz customer storefront with categories, deals and best sellers', caption: 'Customer storefront: categories, deals and order tracking.', w: 1200, h: 728},
    ],
    stepsTitle: 'How a business joins the ecosystem',
    steps: [
      {title: 'Plan', body: "Map the business's goals and how its wholesalers, sellers, retailers and customers work together."},
      {title: 'Structure', body: 'Connect suppliers, distributors, catalogues and payment gateways into one central database.'},
      {title: 'Automate', body: 'Process multi-channel orders, sync stock in real time and settle transactions automatically.'},
      {title: 'Scale', body: 'Use live analytics and demand forecasting to expand into new markets.'},
    ],
    partsTitle: 'What it is made of',
    parts: [
      {title: 'Wholesaler hub', items: ['Bulk inventory', 'Tiered pricing', 'Supply relationships']},
      {title: 'Seller storefronts', items: ['Product launches', 'Multi-channel orders', 'Digital and retail stores']},
      {title: 'Customer portal', items: ['One-click checkout', 'Verified sellers', 'End-to-end tracking']},
      {title: 'Smart inventory', items: ['Multi-warehouse stock', 'Live stock sync', 'Low-stock alerts']},
    ],
  },
  {
    slug: 'tamx',
    company: 'TAMx Technologies',
    kind: 'Design role',
    role: 'UI/UX Designer',
    years: '2025 – now',
    place: 'NASTP, Rawalpindi',
    tagline: 'Designing for products that think.',
    summary:
      'TAMx is an AI-focused software company building AI products and agents, network and security solutions, and web and mobile platforms for clients. I design the interfaces people use to work with them.',
    url: 'https://www.tamxai.com',
    urlLabel: 'tamxai.com',
    logo: '/assets/tamx-logo.webp',
    logoBg: '#141414',
    focus: ['UI/UX', 'UX research', 'AI products', 'Web & mobile'],
    problemTitle: 'AI is only useful if people can trust it',
    problem:
      'AI agents and automation change what a screen has to do. People need to see what the system did, why it did it and how to step in, or they stop relying on it.',
    builtTitle: 'Interfaces that show their work',
    built:
      "TAMx's product design practice covers UI/UX, UX research and product design for web platforms, mobile apps and AI agents, from first flows to production-ready screens.",
    myPart: [
      'Design interfaces for AI products, web platforms and mobile apps.',
      'Run UX research and usability checks before designs go to engineering.',
      'Maintain Figma components so engineers ship consistent UI across projects.',
    ],
    partsTitle: 'Principles I design AI products by',
    parts: [
      {title: 'Show the reasoning', items: ['What the system did', 'Why it did it', 'What it is unsure about']},
      {title: 'Keep people in control', items: ['Easy to review', 'Easy to undo', 'Clear hand-off to a person']},
      {title: 'Design the edges', items: ['Empty states', 'Errors that explain', 'Slow and failed responses']},
    ],
  },
];

export const PROJECTS = [
  {
    title: 'YouTube SEO Tool v2',
    body: 'A keyword tool for creators that scores titles, tags and descriptions and suggests practical fixes.',
    url: 'https://github.com/waheeda129/youtube-seo-tool-v2',
    tags: ['React', 'SEO', 'Analytics'],
  },
  {
    title: 'Cinema Management System',
    body: 'An operations dashboard for movie schedules, seat availability, ticket bookings and daily revenue.',
    url: 'https://github.com/waheeda129?tab=repositories',
    tags: ['Dashboard', 'Booking'],
  },
  {
    title: 'Customer Relationship Management System',
    body: 'Lead tracking, follow-ups and client history, so a small team can keep its pipeline healthy.',
    url: 'https://github.com/waheeda129?tab=repositories',
    tags: ['CRM', 'TypeScript'],
  },
];

/* ---------------- Services ---------------- */

export const SERVICES = [
  {
    id: 'product-design',
    title: 'Product & UI/UX design',
    body: 'Interfaces for web and mobile products, from the first user flows to polished, consistent screens your engineers can build.',
    items: ['User flows', 'Wireframes', 'High-fidelity UI', 'Prototypes'],
  },
  {
    id: 'research',
    title: 'UX research & usability testing',
    body: 'Talk to the people who use the product and watch them use it, so decisions rest on evidence instead of opinions.',
    items: ['User interviews', 'Usability tests', 'Journey maps', 'Findings report'],
  },
  {
    id: 'design-systems',
    title: 'Design systems',
    body: 'A shared set of Figma components, tokens and rules, so every new screen looks and behaves like the last one.',
    items: ['Component library', 'Tokens', 'Documentation', 'Developer handoff'],
  },
  {
    id: 'dashboards',
    title: 'Dashboards & business tools',
    body: 'Inventory, orders, attendance and admin panels: the screens a team lives in all day, designed to be read at a glance.',
    items: ['Admin panels', 'Data tables', 'Reporting views', 'Role-based flows'],
  },
  {
    id: 'websites',
    title: 'Websites & landing pages',
    body: 'Company sites and launch pages that explain what you do in seconds, load quickly on a phone and are easy to change.',
    items: ['Responsive design', 'Framer or React', 'Content structure', 'Launch support'],
  },
  {
    id: 'delivery',
    title: 'Product delivery & operations',
    body: 'Scope, timelines and coordination between design, engineering and the client, so the project ships when it should.',
    items: ['Written scope', 'Delivery plan', 'Sprint reviews', 'Handover'],
  },
];

export const FAQ = [
  {
    q: 'What do you need from us to get started?',
    a: 'A short description of the product, who uses it and where it gets stuck. No design brief is needed; we work that out together on the first call.',
  },
  {
    q: 'Can you work with our existing developers?',
    a: 'Yes. I hand over organised Figma files, specs and a walkthrough, and I stay available while your team builds.',
  },
  {
    q: 'Do you only design, or can SaleForgers build it too?',
    a: 'Both work. I can design for your team, or the SaleForgers team can design, build and support the whole system.',
  },
  {
    q: 'Is the first call really free?',
    a: 'Yes. It is a 30-minute conversation about your product. You leave with a clear idea of what is worth doing first, whether or not we work together.',
  },
];

/* ---------------- About ---------------- */

export const BELIEFS = [
  {
    title: 'Start with how the work happens',
    body: 'Before drawing a screen I want to know who does the job, what they do today and where time gets lost. The design follows the workflow, not the other way round.',
  },
  {
    title: 'Clear beats clever',
    body: 'A button that says exactly what it does, a table you can read at a glance, an error that tells you how to fix it. Plain interfaces earn trust.',
  },
  {
    title: 'Design and delivery belong together',
    body: 'Running operations at SaleForgers taught me that a design is only finished when it ships. I plan for engineering, timelines and handover from day one.',
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
