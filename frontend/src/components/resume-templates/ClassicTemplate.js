import React from 'react';

const ClassicTemplate = ({ resumeData }) => {
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
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-600 space-y-1">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.address && <p>{personalInfo.address}</p>}
          <div className="flex justify-center space-x-4 mt-2">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">
                {exp.company}{exp.location ? ` • ${exp.location}` : ''}
              </p>
              {exp.description && (
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                </h3>
                <span className="text-gray-600 text-sm">
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                </span>
              </div>
              <p className="text-gray-700 font-medium">
                {edu.institution}{edu.location ? ` • ${edu.location}` : ''}
              </p>
              {edu.description && (
                <p className="text-gray-600 leading-relaxed">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">SKILLS</h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700">
                  {skill.name || skill} {skill.level && `(${skill.level})`}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">PROJECTS</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-gray-600 text-sm">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {project.startDate && project.endDate && ' - '}
                    {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
              {project.technologies && (
                <p className="text-gray-700 font-medium mb-1">
                  Technologies: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                </p>
              )}
              {project.description && (
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">CERTIFICATIONS</h2>
          <ul className="list-disc list-inside space-y-1">
            {certifications.map((cert, index) => (
              <li key={cert.id || index} className="text-gray-700">{cert.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">ACHIEVEMENTS</h2>
          <ul className="list-disc list-inside space-y-1">
            {achievements.map((achievement, index) => (
              <li key={achievement.id || index} className="text-gray-700">{achievement.description}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">LANGUAGES</h2>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang, index) => (
              <div key={lang.id || index} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span><strong>{lang.name}</strong> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">HOBBIES & INTERESTS</h2>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span key={hobby.id || index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                {hobby.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
