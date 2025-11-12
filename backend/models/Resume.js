import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled Resume'
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    linkedin: { type: String },
    website: { type: String }
  },
  summary: { type: String },
  education: [{
    institution: { type: String },
    degree: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String }
  }],
  experience: [{
    company: { type: String },
    position: { type: String },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    highlights: [{ type: String }]
  }],
  skills: [{
    name: { type: String },
    level: { type: String }
  }],
  projects: [{
    title: { type: String },
    description: { type: String },
    technologies: [{ type: String }],
    link: { type: String }
  }],
  moreDetails: {
    certifications: [{
      name: { type: String }
    }],
    achievements: [{
      description: { type: String }
    }],
    hobbies: [{
      name: { type: String }
    }],
    languages: [{
      name: { type: String },
      proficiency: { type: String }
    }]
  },
  templateId: {
    type: String,
    default: 'template1'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', ResumeSchema);