import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resumeService, aiService } from '../services/api';

// Form Sections
import PersonalInfoForm from '../components/resume-sections/PersonalInfoForm';
import EducationForm from '../components/resume-sections/EducationForm';
import ExperienceForm from '../components/resume-sections/ExperienceForm';
import SkillsForm from '../components/resume-sections/SkillsForm';
import ProjectsForm from '../components/resume-sections/ProjectsForm';
import SummaryForm from '../components/resume-sections/SummaryForm';
import MoreDetailsForm from '../components/resume-sections/MoreDetailsForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';

// Context
import { ThemeContext } from '../context/ThemeContext';

const ResumeBuilder = () => {
  const { id } = useParams();
  
  const [step, setStep] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [templateId, setTemplateId] = useState('modern');
  const [resumeData, setResumeData] = useState({
    title: 'My Resume',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    moreDetails: {
      certifications: [],
      achievements: [],
      hobbies: [],
      languages: []
    },
    templateId: 'modern'
  });

  // Load resume data if editing
  useEffect(() => {
    if (id && id !== 'new') {
      const fetchResumeData = async () => {
        setInitialLoading(true);
        try {
          const res = await resumeService.getById(id);
          setResumeData(res.data);
        } catch (err) {
          setError('Failed to load resume data');
          console.error(err);
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchResumeData();
    }
  }, [id]);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData && !id) {
      try {
        const parsedData = JSON.parse(savedData);
        // Clean the parsed data to remove any invalid fields
        const cleanData = {
          title: parsedData.title || 'My Resume',
          personalInfo: parsedData.personalInfo || {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            linkedin: '',
            website: ''
          },
          summary: parsedData.summary || '',
          education: parsedData.education || [],
          experience: parsedData.experience || [],
          skills: parsedData.skills || [],
          projects: parsedData.projects || [],
          moreDetails: parsedData.moreDetails || {
            certifications: [],
            achievements: [],
            hobbies: [],
            languages: []
          },
          templateId: parsedData.templateId || 'modern'
        };
        setResumeData(cleanData);
      } catch (error) {
        console.error('Error parsing saved data:', error);
        // Clear corrupted localStorage data
        localStorage.removeItem('resumeBuilderData');
      }
    }
  }, [id]);

  // Auto-dismiss errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Auto-dismiss success messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (section, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccessMessage('');
    
    // Clear any corrupted localStorage data first
    try {
      localStorage.removeItem('resumeBuilderData');
    } catch (error) {
      // Error clearing localStorage
    }
    
    // Validate required fields
    if (!resumeData.personalInfo?.fullName) {
      setError('Please fill in your full name in the Personal Information section');
      setSaving(false);
      return;
    }
    
    if (!resumeData.personalInfo?.email) {
      setError('Please fill in your email in the Personal Information section');
      setSaving(false);
      return;
    }
    
    try {
      // Clean the resume data to remove any invalid fields
      const cleanResumeData = {
        title: resumeData.title || 'My Resume',
        personalInfo: resumeData.personalInfo,
        summary: resumeData.summary || '',
        education: resumeData.education?.map(edu => ({
          institution: edu.institution || '',
          degree: edu.degree || '',
          fieldOfStudy: edu.fieldOfStudy || '',
          startDate: edu.startDate ? new Date(edu.startDate) : null,
          endDate: edu.endDate ? new Date(edu.endDate) : null,
          description: edu.description || ''
        })) || [],
        experience: resumeData.experience?.map(exp => ({
          company: exp.company || '',
          position: exp.position || '',
          location: exp.location || '',
          startDate: exp.startDate ? new Date(exp.startDate) : null,
          endDate: exp.endDate ? new Date(exp.endDate) : null,
          description: exp.description || '',
          highlights: exp.highlights || []
        })) || [],
        skills: resumeData.skills?.map(skill => ({
          name: skill.name || '',
          level: skill.level || ''
        })) || [],
        projects: resumeData.projects?.map(project => ({
          title: project.title || '',
          description: project.description || '',
          technologies: project.technologies || [],
          link: project.link || ''
        })) || [],
        moreDetails: {
          certifications: resumeData.moreDetails?.certifications?.map(cert => ({
            name: cert.name || ''
          })) || [],
          achievements: resumeData.moreDetails?.achievements?.map(ach => ({
            description: ach.description || ''
          })) || [],
          hobbies: resumeData.moreDetails?.hobbies?.map(hobby => ({
            name: hobby.name || ''
          })) || [],
          languages: resumeData.moreDetails?.languages?.map(lang => ({
            name: lang.name || '',
            proficiency: lang.proficiency || 'Intermediate'
          })) || []
        },
        templateId: resumeData.templateId || 'modern'
      };
      
      let res;
      if (id && id !== 'new') {
        res = await resumeService.update(id, cleanResumeData);
        setSuccessMessage('Resume updated successfully!');
      } else {
        res = await resumeService.create(cleanResumeData);
        setSuccessMessage('Resume saved successfully!');
        // Update the URL to the new resume ID without navigating
        window.history.replaceState(null, '', `/resume/edit/${res.data._id}`);
      }
      
      // Clear localStorage after successful save
      localStorage.removeItem('resumeBuilderData');
      
    } catch (err) {
      console.error('Save error details:', err);
      console.error('Error response:', err.response?.data);
      setError(`Failed to save resume: ${err.response?.data?.msg || err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const generateAISummary = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const res = await aiService.generateSummary({
        skills: resumeData.skills,
        experience: resumeData.experience,
        education: resumeData.education
      });
      
      handleChange('summary', res.data.summary);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.msg || err.message || 'Failed to generate AI summary';
      setError(errorMsg);
      console.error('Generate Summary Error:', err);
      console.error('Error details:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const enhanceSummary = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const res = await aiService.enhanceResume({
        section: 'summary',
        content: resumeData.summary
      });
      
      handleChange('summary', res.data.enhancedContent);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.msg || err.message || 'Failed to enhance summary';
      setError(errorMsg);
      console.error('Enhance Summary Error:', err);
      console.error('Error details:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const generateJobDescription = async (experienceId, jobTitle, company) => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const res = await aiService.generateJobDescription({
        jobTitle,
        company
      });
      
      // Update the specific experience description
      const updatedExperience = resumeData.experience.map(exp =>
        exp.id === experienceId ? { ...exp, description: res.data.description } : exp
      );
      handleChange('experience', updatedExperience);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.msg || err.message || 'Failed to generate job description';
      setError(errorMsg);
      console.error('Generate Job Description Error:', err);
      console.error('Error details:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const enhanceExperienceDescription = async (experienceId, description) => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const res = await aiService.enhanceResume({
        section: 'experience',
        content: description
      });
      
      // Update the specific experience description
      const updatedExperience = resumeData.experience.map(exp =>
        exp.id === experienceId ? { ...exp, description: res.data.enhancedContent } : exp
      );
      handleChange('experience', updatedExperience);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.msg || err.message || 'Failed to enhance experience description';
      setError(errorMsg);
      console.error('Enhance Experience Error:', err);
      console.error('Error details:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const enhanceResume = async (section, content) => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const res = await aiService.enhanceResume({
        section,
        content
      });
      
      return res.data.enhancedContent;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.msg || err.message || `Failed to enhance ${section}`;
      setError(errorMsg);
      console.error(`Enhance ${section} Error:`, err);
      console.error('Error details:', err.response?.data);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const suggestSkills = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const res = await aiService.suggestSkills({
        experience: resumeData.experience,
        education: resumeData.education,
        summary: resumeData.summary
      });
      return res.data.skills;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.msg || err.message || 'Failed to suggest skills';
      setError(errorMsg);
      console.error('Suggest Skills Error:', err);
      console.error('Error details:', err.response?.data);
      return [];
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleTemplateSelect = (templateId) => {
    setTemplateId(templateId);
    handleChange('templateId', templateId);
  };

  const renderStep = () => {
    if (isPreviewMode) {
      return (
        <div className="mt-6">
          <TemplateSelector 
            selectedTemplate={templateId} 
            onTemplateSelect={handleTemplateSelect}
            resumeData={resumeData}
          />
          <ResumePreview resumeData={resumeData} templateId={templateId} />
        </div>
      );
    }
    
    switch (step) {
      case 1:
        return (
          <PersonalInfoForm 
            data={resumeData.personalInfo} 
            onChange={(value) => handleChange('personalInfo', value)} 
          />
        );
      case 2:
        return (
          <ExperienceForm 
            data={resumeData.experience} 
            onChange={(value) => handleChange('experience', value)}
            onGenerateDescription={generateJobDescription}
            onEnhance={enhanceExperienceDescription}
            loading={loading}
          />
        );
      case 3:
        return (
          <EducationForm 
            data={resumeData.education} 
            onChange={(value) => handleChange('education', value)} 
          />
        );
      case 4:
        return (
          <SkillsForm 
            data={resumeData.skills} 
            onChange={(value) => handleChange('skills', value)}
            onSuggest={suggestSkills}
            loading={loading}
          />
        );
      case 5:
        return (
          <SummaryForm 
            data={resumeData.summary} 
            onChange={(value) => handleChange('summary', value)}
            onGenerate={generateAISummary}
            onEnhance={enhanceSummary}
            loading={loading}
          />
        );
      case 6:
        return (
          <ProjectsForm 
            data={resumeData.projects} 
            onChange={(value) => handleChange('projects', value)}
            onEnhance={async (content) => {
              const enhanced = await enhanceResume('project', content);
              return enhanced || content;
            }}
            loading={loading}
          />
        );
      case 7:
        return (
          <MoreDetailsForm 
            data={resumeData.moreDetails} 
            onChange={(value) => handleChange('moreDetails', value)}
          />
        );
      case 8:
        return (
          <TemplateSelector 
            selectedTemplate={templateId} 
            onTemplateSelect={handleTemplateSelect}
            resumeData={resumeData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span className="text-sm sm:text-base">{error}</span>
          <button
            onClick={() => setError('')}
            className="text-red-700 hover:text-red-900 font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span className="text-sm sm:text-base">{successMessage}</span>
          <button
            onClick={() => setSuccessMessage('')}
            className="text-green-700 hover:text-green-900 font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          {id && id !== 'new' ? 'Edit Resume' : 'Create New Resume'}
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm sm:text-base"
          >
            {isPreviewMode ? 'Back to Edit' : 'Preview'}
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
          >
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </div>

      {!isPreviewMode && (
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                    step === i
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Work Experience'}
            {step === 3 && 'Education'}
            {step === 4 && 'Skills'}
            {step === 5 && 'Professional Summary'}
            {step === 6 && 'Projects'}
            {step === 7 && 'More Details (Certifications, Achievements, Languages, Hobbies)'}
            {step === 8 && 'Choose Template'}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6"
      >
        {renderStep()}
      </motion.div>

      {!isPreviewMode && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 text-sm sm:text-base order-2 sm:order-1"
          >
            Previous
          </button>

          {step < 8 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base order-1 sm:order-2"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setIsPreviewMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base order-1 sm:order-2"
            >
              Preview Resume
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;