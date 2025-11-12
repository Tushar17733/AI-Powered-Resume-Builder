import React from 'react';

const ModernTemplate = ({ resumeData }) => {
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
      <header className="border-b-2 border-blue-500 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        
        <div className="flex flex-wrap mt-2 text-sm">
          {personalInfo.email && (
            <div className="mr-4 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="mr-4 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.address && (
            <div className="mr-4 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo.address}
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="mr-4 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Profile</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Professional Experience</h2>
          
          {experience.map((exp, index) => (
            <div key={exp.id || exp._id || index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm text-gray-700">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                </div>
                <p className="text-sm text-gray-600">
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
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Education</h2>
          
          {education.map((edu, index) => (
            <div key={edu.id || edu._id || index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}{edu.location ? ` • ${edu.location}` : ''}</p>
                </div>
                <p className="text-sm text-gray-600">
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
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Skills</h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <span 
                key={skill.id || skill._id || index} 
                className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
              >
                {skill.name} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Projects</h2>
          
          {projects.map((project, index) => (
            <div key={project.id || project._id || index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {project.title}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 text-sm hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </h3>
                  {project.technologies && (
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                    </p>
                  )}
                </div>
                {(project.startDate || project.endDate) && (
                  <p className="text-sm text-gray-600">
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
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Certifications</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {certifications.map((cert, index) => (
              <li key={cert.id || index}>{cert.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Achievements</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {achievements.map((achievement, index) => (
              <li key={achievement.id || index}>{achievement.description}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Languages</h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang, index) => (
              <div key={lang.id || index} className="text-sm">
                <span className="font-medium">{lang.name}</span>
                <span className="text-gray-600"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Hobbies & Interests</h2>
          <div className="flex flex-wrap">
            {hobbies.map((hobby, index) => (
              <span 
                key={hobby.id || index} 
                className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
              >
                {hobby.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;