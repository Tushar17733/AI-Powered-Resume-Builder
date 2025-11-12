import express from 'express';
import Resume from '../models/Resume.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/resumes
// @desc    Get all resumes for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/resumes/:id
// @desc    Get resume by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    // Check user owns the resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/resumes
// @desc    Create a new resume
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newResume = new Resume({
      ...req.body,
      user: req.user.id
    });
    
    const resume = await newResume.save();
    res.json(resume);
  } catch (err) {
    console.error('Resume creation error:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ msg: `Validation error: ${errors}` });
    }
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// @route   PUT api/resumes/:id
// @desc    Update a resume
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    // Check user owns the resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Update resume
    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/resumes/:id
// @desc    Delete a resume
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    // Check user owns the resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;