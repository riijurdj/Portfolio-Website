const bcrypt = require('bcryptjs');
const { getPortfolioDoc } = require('./portfolioController');
const User = require('../models/User');

// ---------- Top-level field updates ----------
// Nested paths are merged key-by-key via doc.set() so Mongoose reliably
// tracks the change regardless of whether the path is a true subdocument.

function mergeNested(doc, basePath, updates) {
  Object.keys(updates || {}).forEach((key) => {
    doc.set(`${basePath}.${key}`, updates[key]);
  });
}

async function updateHero(req, res) {
  const doc = await getPortfolioDoc();
  mergeNested(doc, 'hero', req.body);
  await doc.save();
  res.json(doc.hero);
}

async function updateAbout(req, res) {
  const doc = await getPortfolioDoc();
  mergeNested(doc, 'about', req.body);
  await doc.save();
  res.json(doc.about);
}

async function updateAISpotlight(req, res) {
  const doc = await getPortfolioDoc();
  mergeNested(doc, 'aiSpotlight', req.body);
  await doc.save();
  res.json(doc.aiSpotlight);
}

async function updateResearch(req, res) {
  const doc = await getPortfolioDoc();
  mergeNested(doc, 'research', req.body);
  await doc.save();
  res.json(doc.research);
}

async function updateContact(req, res) {
  const doc = await getPortfolioDoc();
  mergeNested(doc, 'contact', req.body);
  await doc.save();
  res.json(doc.contact);
}

async function updateSectionsVisibility(req, res) {
  const doc = await getPortfolioDoc();
  mergeNested(doc, 'sectionsVisibility', req.body);
  await doc.save();
  res.json(doc.sectionsVisibility);
}

async function uploadPhoto(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const target = req.query.target === 'about' ? 'about' : 'hero';
  const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

  const doc = await getPortfolioDoc();
  if (target === 'about') {
    doc.about.photo = base64;
  } else {
    doc.hero.profilePhoto = base64;
  }
  await doc.save();
  res.json({ target, photo: base64 });
}

async function uploadResume(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

  const doc = await getPortfolioDoc();
  doc.hero.resumeFile = base64;
  await doc.save();
  res.json({ resumeFile: base64 });
}

// ---------- Generic array sub-resource CRUD helper ----------
// Handles add / update / delete of an item within a named array field on the singleton doc.
function arrayResource(fieldPath) {
  const getArray = (doc) => fieldPath.split('.').reduce((obj, key) => obj[key], doc);

  return {
    async add(req, res) {
      const doc = await getPortfolioDoc();
      getArray(doc).push(req.body);
      await doc.save();
      res.status(201).json(getArray(doc));
    },
    async update(req, res) {
      const doc = await getPortfolioDoc();
      const arr = getArray(doc);
      const item = arr.id(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      item.set(req.body);
      await doc.save();
      res.json(item);
    },
    async remove(req, res) {
      const doc = await getPortfolioDoc();
      const arr = getArray(doc);
      const item = arr.id(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      item.deleteOne();
      await doc.save();
      res.json({ message: 'Deleted' });
    },
  };
}

const skillsResource = arrayResource('skills');
const experienceResource = arrayResource('experience');
const projectsResource = arrayResource('projects');
const educationResource = arrayResource('education');
const certificationsResource = arrayResource('certifications');
const customSectionsResource = arrayResource('customSections');

// ---------- Admin account ----------

async function updateCredentials(req, res) {
  const { currentPassword, newEmail, newPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ message: 'Current password is required' });
  }
  if (!newEmail && !newPassword) {
    return res.status(400).json({ message: 'Provide a new email and/or a new password' });
  }
  if (newPassword && newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Admin user not found' });
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  if (newEmail) user.email = String(newEmail).toLowerCase().trim();
  if (newPassword) user.password = await bcrypt.hash(newPassword, 10);

  try {
    await user.save();
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'That email is already in use' });
    }
    throw err;
  }

  res.json({ message: 'Credentials updated', email: user.email });
}

module.exports = {
  updateHero,
  updateAbout,
  updateAISpotlight,
  updateResearch,
  updateContact,
  updateSectionsVisibility,
  uploadPhoto,
  uploadResume,
  updateCredentials,
  skillsResource,
  experienceResource,
  projectsResource,
  educationResource,
  certificationsResource,
  customSectionsResource,
};
