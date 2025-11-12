import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { resumeService } from '../services/api';
import ResumePDF from '../components/ResumePDF';

const ResumePreview = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await resumeService.getById(id);
        setResume(res.data);
      } catch (err) {
        console.error('Error fetching resume:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResume();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!resume) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Resume not found</h2>
        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Resume Preview</h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
          <button
            onClick={() => navigate(`/resume/${id}/edit`)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm sm:text-base"
          >
            Edit
          </button>
          <PDFDownloadLink
            document={<ResumePDF resumeData={resume} />}
            fileName={`${resume?.personalInfo?.name || 'resume'}.pdf`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block text-center text-sm sm:text-base"
          >
            {({ blob, url, loading, error }) => 
              loading ? 'Generating PDF...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-gray-300 dark:border-gray-600 pb-4 mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white">{resume.personalInfo.name}</h1>
          <div className="flex flex-wrap mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <p className="mr-4">{resume.personalInfo.email}</p>
            <p className="mr-4">{resume.personalInfo.phone}</p>
            <p>{resume.personalInfo.location}</p>
          </div>
          {resume.personalInfo.linkedin && (
            <p className="mt-1 text-blue-600 dark:text-blue-400">
              <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          )}
        </div>
        
        {/* Summary */}
        {resume.summary && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Professional Summary</h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{resume.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">Experience</h2>
            {resume.experience.map((exp, index) => (
              <div key={exp.id || exp._id || index} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{exp.startDate} - {exp.endDate || 'Present'}</p>
                </div>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">{exp.company}</p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">Education</h2>
            {resume.education.map((edu, index) => (
              <div key={edu.id || edu._id || index} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{edu.startDate} - {edu.endDate || 'Present'}</p>
                </div>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">{edu.institution}</p>
                {edu.description && <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span 
                  key={skill.id || skill._id || index} 
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs sm:text-sm"
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;