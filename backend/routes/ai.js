import express from 'express';
import jwt from 'jsonwebtoken';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Initialize Google GenAI
const ai = new GoogleGenAI({});

// Helper function to generate content
async function generateAIContent(prompt, model = 'gemini-2.5-flash-lite') {
  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
  });
  
  // Remove markdown formatting (asterisks, etc.)
  let text = response.text;
  
  // Remove bold markers (**text**)
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Remove single asterisks (*text*)
  text = text.replace(/\*(.*?)\*/g, '$1');
  
  // Remove markdown headers (# ## ###)
  text = text.replace(/^#{1,6}\s+/gm, '');
  
  // Clean up any remaining asterisks
  text = text.replace(/\*/g, '');
  
  return text.trim();
}

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// @route   POST api/ai/generate-summary
// @desc    Generate resume summary using AI
// @access  Private
router.post('/generate-summary', auth, async (req, res) => {
  try {
    const { skills, experience, education } = req.body;
    
    const prompt = `Generate a professional resume summary based on the following information:
    
Skills: ${skills?.map(skill => skill.name).join(', ') || 'Not specified'}

Experience: 
${experience?.map(exp => `- ${exp.position || 'Position'} at ${exp.company || 'Company'} (${exp.startDate || 'N/A'} - ${exp.endDate || 'Present'})
  ${exp.description || ''}`).join('\n') || 'No experience provided'}

Education:
${education?.map(edu => `- ${edu.degree || 'Degree'} in ${edu.fieldOfStudy || 'Field'} from ${edu.institution || 'Institution'} (${edu.startDate || 'N/A'} - ${edu.endDate || 'Present'})`).join('\n') || 'No education provided'}

Write a concise, professional, and impactful resume summary (2-3 sentences) that highlights my experience, skills, and value proposition:`;

    const summary = await generateAIContent(prompt);
    res.json({ summary });
  } catch (err) {
    console.error('AI Summary Generation Error:', err);
    res.status(500).json({ msg: 'Error generating summary', error: err.message });
  }
});

// @route   POST api/ai/enhance-resume
// @desc    Enhance resume content using AI
// @access  Private
router.post('/enhance-resume', auth, async (req, res) => {
  try {
    const { section, content } = req.body;
    
    const prompt = `Improve the following ${section} content for a professional resume. Make it more impactful, concise, and use strong action verbs. Highlight achievements and quantifiable results where possible.

${content}

IMPORTANT: Return ONLY the improved content in numbered format (1), 2), 3)...). Do NOT include any introductory text, explanations, or phrases like "Here's the enhanced version". Start directly with point 1).

Enhanced version:`;

    const enhancedContent = await generateAIContent(prompt);
    res.json({ enhancedContent });
  } catch (err) {
    console.error('AI Enhancement Error:', err);
    res.status(500).json({ msg: 'Error enhancing content', error: err.message });
  }
});

// @route   POST api/ai/generate-job-description
// @desc    Generate work experience description based on job title
// @access  Private
router.post('/generate-job-description', auth, async (req, res) => {
  try {
    const { jobTitle, company } = req.body;
    
    const prompt = `You are writing a resume work experience section. Generate a professional description of accomplishments and responsibilities for someone who worked as a "${jobTitle}"${company ? ` at ${company}` : ''}.

Write 2-3 numbered points describing what this person accomplished in this role, using:
- Strong action verbs (Led, Developed, Implemented, Designed, Managed, etc.)
- Specific achievements and measurable results (increased by X%, reduced by Y%, managed team of Z)
- Technical skills and tools used
- Impact on business/projects/team

IMPORTANT: Return ONLY the numbered points. Do NOT include any introductory text or explanations. Start directly with point 1).

Format example:
1) Developed and launched 3 major features that increased user engagement by 25%
2) Led a cross-functional team of 5 engineers to deliver project 2 weeks ahead of schedule
3) Implemented automated testing framework reducing bugs by 40%

Generate the numbered accomplishments now:`;

    const description = await generateAIContent(prompt);
    res.json({ description });
  } catch (err) {
    console.error('AI Experience Description Generation Error:', err);
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    res.status(500).json({ msg: 'Error generating experience description', error: err.message });
  }
});

// @route   POST api/ai/suggest-skills
// @desc    Suggest skills based on experience and education
// @access  Private
router.post('/suggest-skills', auth, async (req, res) => {
  try {
    const { experience, education, summary } = req.body;
    
    const experienceText = experience?.map(exp => 
      `${exp.position} at ${exp.company}: ${exp.description}`
    ).join('\n') || 'No experience provided';
    
    const educationText = education?.map(edu => 
      `${edu.degree} in ${edu.fieldOfStudy}`
    ).join('\n') || 'No education provided';

    const prompt = `Based on the following professional profile, suggest 8-12 relevant skills that would strengthen this resume:

Experience:
${experienceText}

Education:
${educationText}

${summary ? `Summary: ${summary}` : ''}

Provide a comma-separated list of specific, relevant skills (both technical and soft skills). Be specific with technologies and tools.

Skills:`;

    const skillsText = await generateAIContent(prompt);
    const skills = skillsText
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)
      .map(skill => ({
        name: skill,
        level: 'Intermediate'
      }));
    
    res.json({ skills });
  } catch (err) {
    console.error('AI Skills Suggestion Error:', err);
    res.status(500).json({ msg: 'Error suggesting skills', error: err.message });
  }
});

// @route   POST api/ai/match-job
// @desc    Match resume with job description
// @access  Private
router.post('/match-job', auth, async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    
    // Format the prompt for OpenAI
    const prompt = `Analyze the following resume and job description. Provide feedback on how well the resume matches the job requirements, suggest improvements, and identify keywords from the job description that should be added to the resume:

RESUME:
${JSON.stringify(resumeData, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Analysis:`;

    const analysis = await generateAIContent(prompt);
    
    // Calculate a match score (simplified version)
    const lines = analysis.split('\n');
    let matchScore = 0;
    
    if (analysis.toLowerCase().includes('excellent match') || analysis.toLowerCase().includes('strong match')) {
      matchScore = Math.floor(Math.random() * 16) + 85; // 85-100
    } else if (analysis.toLowerCase().includes('good match')) {
      matchScore = Math.floor(Math.random() * 15) + 70; // 70-85
    } else if (analysis.toLowerCase().includes('average match') || analysis.toLowerCase().includes('moderate match')) {
      matchScore = Math.floor(Math.random() * 20) + 50; // 50-70
    } else {
      matchScore = Math.floor(Math.random() * 30) + 20; // 20-50
    }
    
    res.json({ 
      analysis,
      matchScore
    });
  } catch (err) {
    console.error('AI Job Matching Error:', err);
    res.status(500).json({ msg: 'Error matching job description', error: err.message });
  }
});

export default router;