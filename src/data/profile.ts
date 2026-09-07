/**
 * Single source of truth for portfolio content.
 * Every value here is taken from the resume PDF or the public GitHub profile
 * (https://github.com/maheshpcse). Nothing is invented.
 */

export const identity = {
  name: 'Mahesh Pachapalam',
  fullName: 'Pachapalam Mahesh',
  title: 'Senior Full Stack Engineer',
  tagline: 'Full Stack JavaScript Developer',
  yearsLabel: '6+ years',
  location: 'Hyderabad, India',
  email: 'maheshmahi1599@gmail.com',
  phone: '+91 8985341585',
  github: 'https://github.com/maheshpcse',
  githubHandle: 'maheshpcse',
  linkedin: 'https://linkedin.com/in/p-mahesh-89266a183',
  resumeFile: 'resume/Mahesh-Pachapalam-Resume.pdf',
  summary:
    'Senior Full Stack Engineer with 6+ years of experience in building scalable backend services and modern web applications. Strong focus on system reliability, performance and clean architecture with hands-on experience across cloud, CI/CD, and distributed systems.',
};

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  start: string;
  end: string;
  stack: string[];
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: '911 Fintech Solutions',
    role: 'Senior Full Stack Developer',
    location: 'Bengaluru',
    period: 'May 2022 - Jun 2026',
    start: '2022-05',
    end: '2026-06',
    stack: ['Node.js', 'Angular', 'Python', 'MySQL', 'AWS', 'Jenkins', 'Redis', 'CI/CD', 'ngRx'],
    highlights: [
      'Built scalable full-stack fintech modules for merchant onboarding, billing, and chargeback workflows.',
      'Designed and implemented high-performance REST APIs using Node.js and Express.js.',
      'Developed responsive Angular interfaces to support complex financial operations.',
      'Optimized MySQL queries and schemas to improve performance and data consistency.',
      'Integrated Redis caching to reduce latency and improve system responsiveness.',
      'Implemented unit and integration tests to ensure reliability and prevent regressions.',
      'Supported CI/CD pipelines and automated deployments using Jenkins and GitHub/GitLab.',
      'Deployed and maintained applications on AWS EC2 environments.',
      'Collaborated with product, QA, and engineering teams in Agile delivery cycles.',
    ],
  },
  {
    company: 'Akrivia Automation Pvt Ltd',
    role: 'MEAN Stack Developer',
    location: 'Visakhapatnam',
    period: 'Aug 2019 - Apr 2022',
    start: '2019-08',
    end: '2022-04',
    stack: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'WebSockets', 'AWS', 'RabbitMQ', 'SQL'],
    highlights: [
      'Developed and maintained full-stack web applications using MEAN stack technologies.',
      'Designed and implemented secure RESTful APIs using Node.js and Express following best practices.',
      'Built responsive UI components using HTML, CSS, JavaScript, and Angular.',
      'Handled backend development, ensuring application security, performance, and data integrity.',
      'Integrated authentication and authorization features across multiple web applications.',
      'Deployed and maintained applications on AWS and Heroku, managing version control with GitHub.',
    ],
  },
];

export const education = {
  degree: 'B.Tech in Computer Science',
  institute: 'IIIT (RGUKT), RK Valley',
  period: '2014 - 2018',
  score: 'CGPA 7.9 / 10',
};

export interface SkillGroup {
  layer: string;
  label: string;
  items: string[];
}

/** Skills grouped as "system layers" - the Systems section of MAHESH.OS. */
export const skillGroups: SkillGroup[] = [
  { layer: 'L0', label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript (Advanced)', 'Node.js', 'Python'] },
  { layer: 'L1', label: 'Frontend', items: ['Angular', 'Angular Material', 'RxJS', 'ngRx'] },
  { layer: 'L2', label: 'Backend', items: ['Hapi', 'Express.js', 'REST APIs', 'GraphQL'] },
  { layer: 'L3', label: 'Messaging', items: ['Kafka', 'RabbitMQ'] },
  { layer: 'L4', label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'MSSQL'] },
  {
    layer: 'L5',
    label: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, Lambda, CloudWatch)', 'Docker', 'CI/CD', 'Jenkins', 'GCP'],
  },
  { layer: 'L6', label: 'System Design', items: ['Microservices', 'Event-Driven Architecture'] },
  { layer: 'L7', label: 'Testing', items: ['Jest', 'Jasmine', 'Mocha', 'Unit Testing'] },
  { layer: 'L8', label: 'Tools', items: ['GitHub', 'BitBucket', 'Jira', 'Swagger', 'Postman', 'Figma'] },
  {
    layer: 'L9',
    label: 'AI',
    items: ['ChatGPT', 'Claude', 'Grok', 'Copilot', 'AI agents', 'AI Skills', 'Plugins', 'MCP Server Integrations'],
  },
];

export interface Project {
  name: string;
  repo: string;
  /** Companion repository (e.g. server for a UI), if any. */
  companion?: { label: string; repo: string };
  description: string;
  stack: string[];
  kind: 'Full stack' | 'Backend' | 'Frontend';
}

/**
 * Public repositories on github.com/maheshpcse.
 * Descriptions are taken from repository descriptions / READMEs.
 */
export const projects: Project[] = [
  {
    name: 'Chat System',
    repo: 'https://github.com/maheshpcse/chat-system',
    companion: { label: 'Angular client', repo: 'https://github.com/maheshpcse/chat-app' },
    description:
      'Microservice-based real-time chat backend built with Node.js 18, Express, MySQL, MongoDB, Redis, and Socket.IO. Modular MVC per feature with authentication, authorization, validation, rate limiting, and request tracking middleware.',
    stack: ['Node.js', 'Express', 'Socket.IO', 'MySQL', 'MongoDB', 'Redis', 'Docker'],
    kind: 'Backend',
  },
  {
    name: 'NovaBank - Banking System',
    repo: 'https://github.com/maheshpcse/banking-system',
    companion: { label: 'Express + MongoDB API', repo: 'https://github.com/maheshpcse/banking-system-server' },
    description:
      'Minimal banking system on the MEAN stack. JWT register/login, dashboard with balance and rolling 24h limit meters, deposit/withdraw, instant transfers, paginated history, staff approval flows, and a billing/POS module.',
    stack: ['Angular 14', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Docker'],
    kind: 'Full stack',
  },
  {
    name: 'Fake Store - Payment File Processor',
    repo: 'https://github.com/maheshpcse/fake-store-system',
    companion: { label: 'Vite + React client', repo: 'https://github.com/maheshpcse/fake-store-app' },
    description:
      'FastAPI + SQLAlchemy backend implementing an SFTP -> Lambda -> S3 -> processor -> validation -> payments workflow. CSV/XLSX/JSON processor factory, row-level validation, checksum and transaction-ID idempotency, Alembic migrations, integration tests.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'MySQL', 'AWS Lambda', 'S3', 'React', 'Zustand', 'Zod'],
    kind: 'Full stack',
  },
  {
    name: 'Music Player World',
    repo: 'https://github.com/maheshpcse/music-player-world',
    description:
      'Full-stack music player: Angular 14 frontend with a Node.js + Express backend using Knex on MySQL and a factory pattern for controllers, services, and repositories.',
    stack: ['Angular 14', 'Node.js', 'Express', 'Knex', 'MySQL'],
    kind: 'Full stack',
  },
  {
    name: 'Angular Screen Recorder Microservices',
    repo: 'https://github.com/maheshpcse/angular-screen-recorder-microservices',
    description:
      'Angular template paired with a Node.js server and microservice code integrating AWS services.',
    stack: ['Angular', 'Node.js', 'AWS', 'Docker'],
    kind: 'Full stack',
  },
  {
    name: 'User Contact Management System',
    repo: 'https://github.com/maheshpcse/ucmsUI',
    companion: { label: 'Node.js server', repo: 'https://github.com/maheshpcse/ucmsServer' },
    description: 'Angular 10 web application for managing user contacts, backed by a Node.js API server.',
    stack: ['Angular 10', 'Node.js', 'TypeScript'],
    kind: 'Full stack',
  },
  {
    name: 'MiNi HRMS',
    repo: 'https://github.com/maheshpcse/miniHrmsUI',
    companion: { label: 'Node.js server', repo: 'https://github.com/maheshpcse/miniHrmsServer' },
    description: 'A small HR management system: Angular web client with a Node.js server.',
    stack: ['Angular', 'Node.js'],
    kind: 'Full stack',
  },
  {
    name: 'Student Result Management System',
    repo: 'https://github.com/maheshpcse/srmsUI',
    companion: { label: 'Node.js server', repo: 'https://github.com/maheshpcse/srmsServer' },
    description:
      'Student Result Management System web app built in Angular 10 with a Node.js server managing the APIs and database.',
    stack: ['Angular 10', 'Node.js'],
    kind: 'Full stack',
  },
];

/** Lines shown during the laptop boot sequence. Derived from verified data only. */
export const bootLines: string[] = [
  'MAHESH.OS v6.9 - booting',
  'mounting /journey ........ ok',
  'mounting /projects ....... ok',
  'mounting /systems ........ ok',
  'node  : ready',
  'angular: ready',
  'aws   : ec2 s3 lambda cloudwatch',
  'user  : mahesh pachapalam',
  'role  : senior full stack engineer',
  'entering screen >',
];
