const express = require('express');
const multer = require('multer');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const admin = require('../controllers/adminController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

const uploadResumeFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
});

router.use(authMiddleware);

// Top-level fields
router.put('/hero', admin.updateHero);
router.put('/about', admin.updateAbout);
router.put('/ai-spotlight', admin.updateAISpotlight);
router.put('/research', admin.updateResearch);
router.put('/contact', admin.updateContact);
router.put('/sections-visibility', admin.updateSectionsVisibility);
router.post('/upload-photo', upload.single('photo'), admin.uploadPhoto);
router.post('/upload-resume', uploadResumeFile.single('resume'), admin.uploadResume);
router.put('/credentials', admin.updateCredentials);

// Skills categories
router.post('/skills', admin.skillsResource.add);
router.put('/skills/:id', admin.skillsResource.update);
router.delete('/skills/:id', admin.skillsResource.remove);

// Experience
router.post('/experience', admin.experienceResource.add);
router.put('/experience/:id', admin.experienceResource.update);
router.delete('/experience/:id', admin.experienceResource.remove);

// Projects
router.post('/projects', admin.projectsResource.add);
router.put('/projects/:id', admin.projectsResource.update);
router.delete('/projects/:id', admin.projectsResource.remove);

// Education
router.post('/education', admin.educationResource.add);
router.put('/education/:id', admin.educationResource.update);
router.delete('/education/:id', admin.educationResource.remove);

// Certifications
router.post('/certifications', admin.certificationsResource.add);
router.put('/certifications/:id', admin.certificationsResource.update);
router.delete('/certifications/:id', admin.certificationsResource.remove);

// Custom sections
router.post('/custom-sections', admin.customSectionsResource.add);
router.put('/custom-sections/:id', admin.customSectionsResource.update);
router.delete('/custom-sections/:id', admin.customSectionsResource.remove);

module.exports = router;
