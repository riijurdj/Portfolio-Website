require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');

const portfolioData = {
  singleton: 'main',

  hero: {
    name: 'Riiju Jagetiya',
    titles: [
      'Full Stack .NET Developer',
      'AI Integration Engineer',
      'Microservices Architect',
      'DevOps Enthusiast',
    ],
    tagline: 'From first line of code to production — I build things end to end.',
    profilePhoto: '',
    resumeUrl: '/resume.pdf',
    socialLinks: {
      github: 'https://github.com/riijurdj',
      linkedin: 'https://linkedin.com/in/riijujagetiya',
      email: 'jagetiya.rd@gmail.com',
    },
  },

  about: {
    story:
      "I'm a Full Stack .NET Developer with 3.5+ years of experience at Arcon Tech Solutions, Mumbai, where I've been part of building a product from its very first line of code all the way to production. Over this journey, I've touched every layer of the stack — backend APIs, frontend components, DevOps pipelines, cloud infrastructure, automated testing, and AI integration. I don't just write features; I take ownership of outcomes.",
    photo: '',
    stats: [
      { label: 'RESTful APIs Built', value: 100, suffix: '+', prefix: '' },
      { label: 'API Performance Improvement', value: 300, suffix: '%', prefix: '50-' },
      { label: 'Deployment Effort Saved (CI/CD)', value: 100, suffix: '%', prefix: '' },
      { label: 'Manual Effort Cut (PDF Automation)', value: 60, suffix: '%', prefix: '' },
      { label: 'Productivity via AI Tools', value: 5, suffix: 'x', prefix: '' },
      { label: 'Published Research Paper', value: 1, suffix: '', prefix: '' },
    ],
  },

  skills: [
    {
      category: 'Backend',
      skills: [
        { name: 'C#', icon: 'TbBrandCSharp' },
        { name: '.NET Core', icon: 'SiDotnet' },
        { name: 'ASP.NET MVC', icon: 'SiDotnet' },
        { name: 'Web API', icon: 'TbApi' },
        { name: 'Entity Framework', icon: 'SiDotnet' },
        { name: 'SignalR', icon: 'TbPlugConnected' },
        { name: 'Quartz.NET', icon: 'TbClockCog' },
        { name: 'Microservices', icon: 'TbBrandDocker' },
        { name: 'SOLID Principles', icon: 'TbBuildingBridge2' },
        { name: 'Design Patterns', icon: 'TbPuzzle' },
        { name: 'Python', icon: 'SiPython' },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'Angular', icon: 'SiAngular' },
        { name: 'TypeScript', icon: 'SiTypescript' },
        { name: 'React', icon: 'SiReact' },
        { name: 'JavaScript', icon: 'SiJavascript' },
        { name: 'HTML', icon: 'SiHtml5' },
        { name: 'CSS', icon: 'SiCss' },
        { name: 'AngularJS', icon: 'SiAngular' },
      ],
    },
    {
      category: 'Database',
      skills: [
        { name: 'MS SQL Server', icon: 'DiMsqlServer' },
        { name: 'MongoDB', icon: 'SiMongodb' },
        { name: 'SQL Query Optimization', icon: 'TbDatabaseCog' },
        { name: 'Caching', icon: 'TbDatabase' },
        { name: 'Pagination', icon: 'TbLayoutList' },
      ],
    },
    {
      category: 'DevOps & Cloud',
      skills: [
        { name: 'CI/CD Pipeline', icon: 'TbInfinity' },
        { name: 'OCI (Oracle Cloud Infrastructure)', icon: 'TbCloud' },
        { name: 'Git', icon: 'SiGit' },
        { name: 'GitHub Actions', icon: 'SiGithubactions' },
        { name: 'SQL Deployment Automation', icon: 'TbRocket' },
      ],
    },
    {
      category: 'AI & Automation',
      skills: [
        { name: 'AIDLC', icon: 'TbRobot' },
        { name: 'Claude Code', icon: 'TbSparkles' },
        { name: 'Agent AI', icon: 'TbRobotFace' },
        { name: 'AI Integration', icon: 'TbBrain' },
        { name: 'Web Scraping + AI Structuring', icon: 'TbWorldSearch' },
        { name: 'PDF Data Extraction', icon: 'TbFileTypePdf' },
      ],
    },
    {
      category: 'Testing',
      skills: [
        { name: 'Automation Test Suite (from scratch)', icon: 'TbTestPipe' },
        { name: 'Positive Testing', icon: 'TbCircleCheck' },
        { name: 'Negative Testing', icon: 'TbCircleX' },
        { name: 'Scenario-Based Testing', icon: 'TbListCheck' },
      ],
    },
    {
      category: 'Languages',
      skills: [
        { name: 'C#', icon: 'TbBrandCSharp' },
        { name: 'C++', icon: 'SiCplusplus' },
        { name: 'Java', icon: 'SiOpenjdk' },
        { name: 'Python', icon: 'SiPython' },
        { name: 'JavaScript', icon: 'SiJavascript' },
        { name: 'TypeScript', icon: 'SiTypescript' },
        { name: 'SQL', icon: 'TbSql' },
      ],
    },
    {
      category: 'Concepts',
      skills: [
        { name: 'OOPS', icon: 'TbCube' },
        { name: 'DSA', icon: 'TbBinaryTree' },
        { name: 'HLD', icon: 'TbSitemap' },
        { name: 'LLD', icon: 'TbComponents' },
        { name: 'REST APIs', icon: 'TbApi' },
        { name: 'Agile/Scrum', icon: 'TbRefresh' },
      ],
    },
  ],

  experience: [
    {
      company: 'Arcon Tech Solutions',
      location: 'Mumbai, India',
      role: 'Full Stack Developer',
      duration: 'Jan 2023 – Present (3.5+ years)',
      logo: '',
      order: 0,
      achievements: [
        'Designed and developed 100+ RESTful APIs using .NET Core and C#, following SOLID principles and design patterns',
        'Enhanced application performance by 50% through SQL query optimization, pagination, and caching strategies',
        'Built scalable front-end components using Angular and TypeScript',
        'Designed and implemented SignalR in Microservices for real-time file download processing; Quartz.NET for background automation',
        'Identified and resolved SQL injection vulnerabilities; automated SQL deployment scripts cutting release time by 50%',
        'Automated structured PDF data extraction using Python — reducing manual effort by 60%',
        'Architected and deployed product infrastructure on OCI, eliminating 100% of manual client-side installation effort',
        'Built the complete CI/CD pipeline from scratch, saving 100% of manual deployment effort',
        'Optimized the deployment package size from 7.6 GB to 2.1 GB — a ~72% reduction — speeding up deployments and cutting storage/transfer overhead',
        'Created end-to-end automation test suite from scratch covering positive, negative, and scenario-based test cases — improving QA efficiency by 20-30%',
        'Integrated AI capabilities into the product: AI-generated smart lists, file analysis with AI-extracted content insertion, and web scraping pipelines structured by AI — all connected directly into the production system',
        'Optimized slow APIs by 50–300% through deep code profiling and architectural improvements',
        'Collaborated in Agile sprints — sprint planning, reviews, retrospectives',
      ],
    },
  ],

  aiSpotlight: {
    title: 'AI at the Core — Not Just a Buzzword',
    subtitle: "I don't just use AI tools. I build products that run on them.",
    footerLine:
      'Currently building AI-agentic workflows using AIDLC and Claude Code — delivering 5x productivity gains.',
    features: [
      {
        icon: 'TbListDetails',
        title: 'Smart AI List Generation',
        description:
          'Integrated AI to dynamically generate contextual lists within the product; users can directly add AI suggestions into the system.',
      },
      {
        icon: 'TbFileAnalytics',
        title: 'Intelligent File Analysis',
        description:
          'Built pipeline where AI reads, analyzes, and extracts structured content from files, automatically populating the product database.',
      },
      {
        icon: 'TbWorldSearch',
        title: 'AI-Powered Web Scraping',
        description:
          'Automated web scraping workflows where AI structures and validates scraped data before direct injection into the product.',
      },
    ],
  },

  projects: [
    {
      name: 'Travel Collab System',
      description:
        'A collaborative travel platform for finding travel partners, searching by preferences, and creating groups with detailed descriptions.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/riijurdj/Travel-Collab',
      liveUrl: '',
      image: '',
      order: 0,
    },
    {
      name: 'Ecommerce Website',
      description:
        'Full-featured eCommerce platform with login/signup, form validation, dynamic data loading, cart management, and seller product management.',
      techStack: ['Angular', 'TypeScript'],
      githubUrl: 'https://github.com/riijurdj/FirstEcommAngwebsite',
      liveUrl: '',
      image: '',
      order: 1,
    },
  ],

  research: {
    title:
      'An Energy-Efficient Wireless Sensor Network (EE-WSN) for Hazard and Crack Detection in Coal Mines',
    journal: 'International Journal of Wireless and Microwave Technologies (IJWMT)',
    volume: 'Vol. 14, No. 4',
    publishedDate: 'August 8, 2024',
    publisher: 'MECS Press',
    doi: '10.5815/ijwmt.2024.04.02',
    authors: [
      'Kakelli Anil Kumar',
      'Saurav Ranjan',
      'Gudla Mohan Sathwik',
      'Tanmay Agrawal',
      'Riiju Jagetiya',
    ],
    abstractSnippet:
      'Presents a detailed study on energy-efficient WSNs for hazard and crack detection in coal mines, with real-time monitoring capabilities and minimal power consumption...',
    tags: ['Wireless Sensor Networks', 'ZigBee', 'Energy Harvesting', 'Cooja Simulator', 'IoT'],
    paperUrl: 'https://www.mecs-press.org/ijwmt/ijwmt-v14-n4/v14n4-2.html',
    badge: 'Published',
  },

  education: [
    {
      institution: 'Vellore Institute of Technology, Vellore, India',
      location: 'Vellore, India',
      degree: 'B.E. in Computer Science & Engineering',
      duration: '2019 – 2023',
      order: 0,
    },
  ],

  certifications: [
    {
      name: 'AI Developer Course',
      issuer: 'Masai School × IIT Roorkee',
      duration: 'May 2026 – Feb 2027',
      status: 'In Progress',
      order: 0,
    },
  ],

  contact: {
    email: 'jagetiya.rd@gmail.com',
    phone: '+91-9687903079',
    location: 'Mumbai, India',
    github: 'https://github.com/riijurdj',
    linkedin: 'https://linkedin.com/in/riijujagetiya',
    footerText: 'Built with passion by Riiju Jagetiya © 2024',
  },

  customSections: [],

  sectionsVisibility: {
    hero: true,
    about: true,
    skills: true,
    experience: true,
    aiSpotlight: true,
    projects: true,
    research: true,
    education: true,
    contact: true,
  },
};

async function seed() {
  try {
    await connectDB();

    await Portfolio.deleteMany({});
    await Portfolio.create(portfolioData);
    console.log('Portfolio data seeded successfully.');

    const adminEmail = (process.env.ADMIN_EMAIL || 'riiju@admin.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.deleteMany({});
    await User.create({ email: adminEmail, password: hashedPassword, role: 'admin' });
    console.log(`Admin user seeded: ${adminEmail}`);

    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
