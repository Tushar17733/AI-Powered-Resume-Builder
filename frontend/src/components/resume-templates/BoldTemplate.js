import React from 'react';

const BoldTemplate = ({ resumeData }) => {
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
    <div className="bg-gray-900 text-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-6 rounded-lg mb-6">
          <h1 className="text-4xl font-black text-white mb-2">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <div className="text-red-100 space-y-1">
            {personalInfo.email && <p className="text-sm font-medium">{personalInfo.email}</p>}
            {personalInfo.phone && <p className="text-sm font-medium">{personalInfo.phone}</p>}
            {personalInfo.address && <p className="text-sm font-medium">{personalInfo.address}</p>}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors font-bold">
                LINKEDIN
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors font-bold">
                PORTFOLIO
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            SUMMARY
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            EXPERIENCE
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                <span className="text-yellow-400 text-sm font-bold bg-gray-700 px-3 py-1 rounded">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {exp.current ? 'PRESENT' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                </span>
              </div>
              <p className="text-red-400 font-bold mb-1 text-lg">
                {exp.company}{exp.location ? ` • ${exp.location}` : ''}
              </p>
              {exp.description && (
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-white">
                  {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                </h3>
                <span className="text-yellow-400 text-sm font-bold bg-gray-700 px-3 py-1 rounded">
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                </span>
              </div>
              <p className="text-yellow-400 font-bold text-lg">
                {edu.institution}{edu.location ? ` • ${edu.location}` : ''}
              </p>
              {edu.description && (
                <p className="text-gray-300 leading-relaxed">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-lg text-center font-bold">
                {skill.name || skill} {skill.level && `(${skill.level})`}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-yellow-400 text-sm font-bold bg-gray-700 px-3 py-1 rounded">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {project.startDate && project.endDate && ' - '}
                    {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
              {project.technologies && (
                <p className="text-red-400 font-bold mb-1 text-lg">
                  Technologies: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                </p>
              )}
              {project.description && (
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            CERTIFICATIONS
          </h2>
          <ul className="space-y-2">
            {certifications.map((cert, index) => (
              <li key={cert.id || index} className="bg-gray-800 p-3 rounded-lg border-l-4 border-yellow-500 text-gray-300">
                {cert.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            ACHIEVEMENTS
          </h2>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={achievement.id || index} className="bg-gray-800 p-3 rounded-lg border-l-4 border-red-500 text-gray-300">
                {achievement.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            LANGUAGES
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang, index) => (
              <div key={lang.id || index} className="bg-gray-800 p-3 rounded-lg text-center">
                <span className="text-white font-bold">{lang.name}</span>
                <span className="text-yellow-400 text-sm block">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-black text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
            HOBBIES & INTERESTS
          </h2>
          <div className="flex flex-wrap gap-3">
            {hobbies.map((hobby, index) => (
              <span key={hobby.id || index} className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-4 py-2 rounded-full font-bold">
                {hobby.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BoldTemplate;
