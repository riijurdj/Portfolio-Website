const mongoose = require('mongoose');
const { Schema } = mongoose;

const StatSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '' },
    prefix: { type: String, default: '' },
  },
  { _id: true }
);

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, default: '' },
  },
  { _id: true }
);

const SkillCategorySchema = new Schema(
  {
    category: { type: String, required: true },
    skills: [SkillSchema],
  },
  { _id: true }
);

const ExperienceAchievementSchema = new Schema(
  { text: { type: String, required: true } },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    location: { type: String, default: '' },
    role: { type: String, required: true },
    duration: { type: String, default: '' },
    logo: { type: String, default: '' },
    achievements: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const AISpotlightFeatureSchema = new Schema(
  {
    icon: { type: String, default: 'FaBrain' },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: true }
);

const AISpotlightSchema = new Schema(
  {
    title: { type: String, default: 'AI at the Core — Not Just a Buzzword' },
    subtitle: { type: String, default: "I don't just use AI tools. I build products that run on them." },
    footerLine: {
      type: String,
      default:
        'Currently building AI-agentic workflows using AIDLC and Claude Code — delivering 5x productivity gains.',
    },
    features: [AISpotlightFeatureSchema],
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const ResearchSchema = new Schema(
  {
    title: { type: String, default: '' },
    journal: { type: String, default: '' },
    volume: { type: String, default: '' },
    publishedDate: { type: String, default: '' },
    publisher: { type: String, default: '' },
    doi: { type: String, default: '' },
    authors: [{ type: String }],
    abstractSnippet: { type: String, default: '' },
    tags: [{ type: String }],
    paperUrl: { type: String, default: '' },
    badge: { type: String, default: 'Published' },
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    institution: { type: String, required: true },
    location: { type: String, default: '' },
    degree: { type: String, required: true },
    duration: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const CertificationSchema = new Schema(
  {
    name: { type: String, required: true },
    issuer: { type: String, default: '' },
    duration: { type: String, default: '' },
    status: { type: String, enum: ['Completed', 'In Progress'], default: 'Completed' },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const CustomSectionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: '' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { _id: true }
);

const PortfolioSchema = new Schema(
  {
    singleton: { type: String, default: 'main', unique: true },

    hero: {
      name: { type: String, default: 'Riiju Jagetiya' },
      titles: [{ type: String }],
      tagline: { type: String, default: '' },
      profilePhoto: { type: String, default: '' },
      resumeUrl: { type: String, default: '/resume.pdf' },
      resumeFile: { type: String, default: '' },
      socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        email: { type: String, default: '' },
      },
    },

    about: {
      story: { type: String, default: '' },
      photo: { type: String, default: '' },
      stats: [StatSchema],
    },

    skills: [SkillCategorySchema],

    experience: [ExperienceSchema],

    aiSpotlight: AISpotlightSchema,

    projects: [ProjectSchema],

    research: ResearchSchema,

    education: [EducationSchema],
    certifications: [CertificationSchema],

    contact: {
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      footerText: { type: String, default: '' },
    },

    customSections: [CustomSectionSchema],

    sectionsVisibility: {
      hero: { type: Boolean, default: true },
      about: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      aiSpotlight: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      research: { type: Boolean, default: true },
      education: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);
