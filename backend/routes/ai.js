import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import jwt from 'jsonwebtoken';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const router = express.Router();

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!geminiApiKey) {
  console.warn(
    '[ai] GEMINI_API_KEY or GOOGLE_API_KEY is not set. AI endpoints will fail until it is set in .env.'
  );
}

let geminiClient;
function getGeminiClient() {
  if (!geminiApiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: geminiApiKey });
  }
  return geminiClient;
}

// Helper function to generate content
async function generateAIContent(prompt, model = 'gemini-2.5-flash-lite') {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error(
      'GEMINI_API_KEY is not set. Add GEMINI_API_KEY (or GOOGLE_API_KEY) to your project .env file.'
    );
  }
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

/** Flatten structured resume JSON into plain text for keyword matching */
function resumeDataToText(resumeData) {
  if (!resumeData || typeof resumeData !== 'object') return '';
  const parts = [];

  const pi = resumeData.personalInfo || {};
  parts.push(
    [pi.fullName, pi.email, pi.phone, pi.address, pi.linkedin, pi.website]
      .filter(Boolean)
      .join(' ')
  );

  if (resumeData.summary) parts.push(String(resumeData.summary));

  (resumeData.experience || []).forEach((exp) => {
    parts.push(
      [exp.company, exp.position, exp.location, exp.description]
        .filter(Boolean)
        .join(' ')
    );
    (exp.highlights || []).forEach((h) => parts.push(String(h)));
  });

  (resumeData.education || []).forEach((edu) => {
    parts.push(
      [edu.institution, edu.degree, edu.fieldOfStudy, edu.description]
        .filter(Boolean)
        .join(' ')
    );
  });

  (resumeData.skills || []).forEach((s) => {
    const name = typeof s === 'string' ? s : s?.name;
    if (name) parts.push(name);
  });

  (resumeData.projects || []).forEach((p) => {
    parts.push([p.title, p.description, (p.technologies || []).join(' ')].filter(Boolean).join(' '));
  });

  const md = resumeData.moreDetails || {};
  (md.certifications || []).forEach((c) => c?.name && parts.push(c.name));
  (md.achievements || []).forEach((a) => a?.description && parts.push(a.description));
  (md.languages || []).forEach((l) => l?.name && parts.push(l.name));
  (md.hobbies || []).forEach((h) => h?.name && parts.push(h.name));

  return parts.join('\n').replace(/\s+/g, ' ').trim();
}

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'this', 'that', 'from', 'your', 'you', 'are', 'our', 'all', 'any', 'can', 'has', 'have', 'will', 'been', 'being', 'such', 'their', 'they', 'them', 'what', 'which', 'when', 'where', 'who', 'how', 'about', 'into', 'than', 'then', 'also', 'not', 'but', 'may', 'must', 'should', 'could', 'would', 'years', 'year', 'work', 'team', 'role', 'job', 'position', 'company', 'experience', 'skills', 'ability', 'able', 'strong', 'excellent', 'good', 'looking', 'seeking', 'opportunity',
]);

function simpleAtsFallback(resumeText, jobDescription) {
  const jd = (jobDescription || '').toLowerCase();
  const resume = (resumeText || '').toLowerCase();
  const tokens = jd.split(/[^a-zA-Z0-9+#.]+/).filter((w) => w.length > 2 && !STOPWORDS.has(w));
  const unique = [...new Set(tokens)].slice(0, 40);
  const matched = [];
  const missing = [];
  unique.forEach((kw) => {
    if (resume.includes(kw)) matched.push(kw);
    else missing.push(kw);
  });
  const total = unique.length || 1;
  const atsScore = Math.min(100, Math.round((matched.length / total) * 100));
  const highlightImprovements = [
    missing.length
      ? `Add or surface: ${missing.slice(0, 4).join(', ')}.`
      : 'Strengthen bullets with metrics and outcomes.',
    'Lead experience bullets with strong action verbs (e.g. Led, Delivered, Scaled).',
    'Align your summary and skills with the job’s top themes.',
  ];
  return {
    atsScore,
    missingKeywords: missing.slice(0, 15),
    matchedKeywords: matched.slice(0, 25),
    highlightImprovements,
    suggestions: [
      missing.length
        ? `Weave these terms naturally where accurate: ${missing.slice(0, 5).join(', ')}.`
        : 'Keyword coverage looks solid; tighten bullets with metrics next.',
      'Start bullets with strong action verbs (Led, Delivered, Reduced, Scaled).',
      'Mirror priority phrases from the job posting in your summary and skills.',
    ],
  };
}

function extractJsonObject(text) {
  if (!text) return null;
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fence ? fence[1].trim() : trimmed;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
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

// @route   POST api/ai/analyze-resume
// @desc    ATS-style analysis: score, missing keywords, suggestions
// @access  Private
router.post('/analyze-resume', auth, async (req, res) => {
  try {
    const { resumeData, jobDescription, resumeText: bodyResumeText } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
      return res.status(400).json({ msg: 'Job description is required' });
    }

    const resumeText =
      typeof bodyResumeText === 'string' && bodyResumeText.trim().length >= 20
        ? bodyResumeText.trim()
        : resumeDataToText(resumeData || {});
    if (!resumeText || resumeText.length < 20) {
      return res.status(400).json({ msg: 'Resume content is too thin to analyze. Add more sections first.' });
    }

    const prompt = `You are an ATS (Applicant Tracking System) analyzer.

JOB DESCRIPTION:
${jobDescription.trim()}

RESUME TEXT (plain text from the candidate's resume):
${resumeText}

Instructions:
1. From the job description, extract 15-28 distinct keywords/phrases that matter for ATS: technical skills, tools, frameworks, certifications, domain terms, and strong role-relevant verbs (e.g. developed, led, scaled). Prefer multi-word phrases when they appear in the JD (e.g. "React Native", "machine learning").
2. For each keyword, check if the resume text clearly reflects it (case-insensitive substring match is enough; accept common variants like "JS" vs "JavaScript" only when obviously equivalent).
3. atsScore: integer 0-100 = round(100 * (number of matched keywords / total keywords extracted)). If you extract 0 keywords, use 50.
4. missingKeywords: important keywords from the JD that are absent or only weakly implied in the resume (array of strings, max 18 items).
5. matchedKeywords: keywords you counted as present (array of strings).
6. highlightImprovements: 3-5 very short imperative lines (max 120 chars each) naming the highest-impact fixes (e.g. "Add Docker and CI/CD to your skills", "Quantify impact in your last role").
7. suggestions: 5-8 short, specific, actionable bullet strings to improve this resume for THIS job (mention missing themes, metrics, action verbs, or section placement).

Respond with ONLY valid JSON (no markdown, no commentary) in exactly this shape:
{"atsScore":number,"missingKeywords":string[],"matchedKeywords":string[],"highlightImprovements":string[],"suggestions":string[]}`;

    let raw;
    try {
      raw = await generateAIContent(prompt);
    } catch (aiErr) {
      console.error('ATS AI error, using fallback:', aiErr);
      const fb = simpleAtsFallback(resumeText, jobDescription);
      return res.json({
        atsScore: fb.atsScore,
        missingKeywords: fb.missingKeywords,
        matchedKeywords: fb.matchedKeywords,
        highlightImprovements: fb.highlightImprovements,
        suggestions: fb.suggestions,
        fallback: true,
      });
    }

    let parsed = extractJsonObject(raw);
    const scoreNum = parsed?.atsScore != null ? Number(parsed.atsScore) : NaN;
    if (!parsed || Number.isNaN(scoreNum)) {
      const fb = simpleAtsFallback(resumeText, jobDescription);
      return res.json({
        atsScore: fb.atsScore,
        missingKeywords: fb.missingKeywords,
        matchedKeywords: fb.matchedKeywords,
        highlightImprovements: fb.highlightImprovements,
        suggestions: fb.suggestions,
        fallback: true,
      });
    }

    const atsScore = Math.min(100, Math.max(0, Math.round(scoreNum)));
    const missingKeywords = Array.isArray(parsed.missingKeywords)
      ? parsed.missingKeywords.map(String).filter(Boolean).slice(0, 20)
      : [];
    const matchedKeywords = Array.isArray(parsed.matchedKeywords)
      ? parsed.matchedKeywords.map(String).filter(Boolean).slice(0, 30)
      : [];
    let highlightImprovements = Array.isArray(parsed.highlightImprovements)
      ? parsed.highlightImprovements.map(String).filter(Boolean).slice(0, 8)
      : [];
    if (highlightImprovements.length === 0 && Array.isArray(parsed.suggestions)) {
      highlightImprovements = parsed.suggestions.map(String).filter(Boolean).slice(0, 5);
    }
    const suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions.map(String).filter(Boolean).slice(0, 12)
      : [];

    res.json({
      atsScore,
      missingKeywords,
      matchedKeywords,
      highlightImprovements,
      suggestions,
      fallback: false,
    });
  } catch (err) {
    console.error('ATS analyze error:', err);
    res.status(500).json({ msg: 'Error analyzing resume for ATS', error: err.message });
  }
});

export default router;