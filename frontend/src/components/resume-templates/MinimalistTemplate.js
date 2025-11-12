import React from 'react';

const MinimalistTemplate = ({ resumeData }) => {
  const {
    personalInfo = {},
    summary = '',
    education = [],
    experience = [],
    skills = [],
    projects = [],
    moreDetails = {}
  } = resumeData;

  const certifications = moreDetails?.certifications || [];
  const achievements = moreDetails?.achievements || [];
  const languages = moreDetails?.languages || [];
  const hobbies = moreDetails?.hobbies || [];

  return (
    <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 uppercase tracking-wider">{personalInfo.fullName || 'Your Name'}</h1>
        
        <div className="flex flex-wrap justify-center mt-3 text-sm">
          {personalInfo.email && (
            <div className="mx-3 mb-2">
              {personalInfo.email}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="mx-3 mb-2">
              {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.address && (
            <div className="mx-3 mb-2">
              {personalInfo.address}
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="mx-3 mb-2">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                LinkedIn
              </a>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="mx-3 mb-2">
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Profile</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Experience</h2>
          
          {experience.map((exp, index) => (
            <div key={exp.id || exp._id || index} className="mb-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm text-gray-700">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1 md:mt-0">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                </p>
              </div>
              
              {exp.description && (
                <div className="mt-2 text-sm whitespace-pre-line">
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Education</h2>
          
          {education.map((edu, index) => (
            <div key={edu.id || edu._id || index} className="mb-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="font-medium">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}{edu.location ? ` • ${edu.location}` : ''}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1 md:mt-0">
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                </p>
              </div>
              
              {edu.description && (
                <div className="mt-2 text-sm">
                  {edu.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Skills</h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <span 
                key={skill.id || skill._id || index} 
                className="mr-6 mb-2 text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Projects</h2>
          
          {projects.map((project, index) => (
            <div key={project.id || project._id || index} className="mb-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="font-medium">
                    {project.title}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-500 text-sm hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </h3>
                  {project.technologies && (
                    <p className="text-xs text-gray-600 mt-1">
                      {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                    </p>
                  )}
                </div>
                {(project.startDate || project.endDate) && (
                  <p className="text-sm text-gray-600 mt-1 md:mt-0">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {project.startDate && project.endDate && ' - '}
                    {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </p>
                )}
              </div>
              
              {project.description && (
                <div className="mt-2 text-sm">
                  {project.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Certifications</h2>
          <ul className="space-y-1">
            {certifications.map((cert, index) => (
              <li key={cert.id || index} className="text-sm">{cert.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Achievements</h2>
          <ul className="space-y-1">
            {achievements.map((achievement, index) => (
              <li key={achievement.id || index} className="text-sm">{achievement.description}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Languages</h2>
          <div className="flex flex-wrap">
            {languages.map((lang, index) => (
              <span key={lang.id || index} className="mr-6 mb-2 text-sm">
                <strong>{lang.name}</strong> - {lang.proficiency}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Hobbies & Interests</h2>
          <div className="flex flex-wrap">
            {hobbies.map((hobby, index) => (
              <span key={hobby.id || index} className="mr-6 mb-2 text-sm">{hobby.name}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalistTemplate;