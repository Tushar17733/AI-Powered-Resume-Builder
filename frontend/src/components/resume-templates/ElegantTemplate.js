import React from 'react';

const ElegantTemplate = ({ resumeData }) => {
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
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 max-w-4xl mx-auto shadow-xl">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-light mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="text-purple-100 space-y-1">
            {personalInfo.email && <p className="text-sm">{personalInfo.email}</p>}
            {personalInfo.phone && <p className="text-sm">{personalInfo.phone}</p>}
            {personalInfo.address && <p className="text-sm">{personalInfo.address}</p>}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-100 hover:text-white transition-colors">
                LinkedIn
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-purple-100 hover:text-white transition-colors">
                Portfolio
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed pl-4">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-purple-600 text-sm font-medium">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                </span>
              </div>
              <p className="text-purple-700 font-medium mb-1">
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
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pl-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                </h3>
                <span className="text-purple-600 text-sm font-medium">
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' - '}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                </span>
              </div>
              <p className="text-purple-700 font-medium">
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
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Skills
          </h2>
          <div className="pl-4">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {skill.name || skill} {skill.level && `(${skill.level})`}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 pl-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-purple-600 text-sm font-medium">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {project.startDate && project.endDate && ' - '}
                    {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
              {project.technologies && (
                <p className="text-purple-700 font-medium mb-1">
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
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Certifications
          </h2>
          <ul className="pl-4 space-y-2">
            {certifications.map((cert, index) => (
              <li key={cert.id || index} className="text-gray-700">{cert.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Achievements
          </h2>
          <ul className="pl-4 space-y-2">
            {achievements.map((achievement, index) => (
              <li key={achievement.id || index} className="text-gray-700">{achievement.description}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Languages
          </h2>
          <div className="pl-4 flex flex-wrap gap-3">
            {languages.map((lang, index) => (
              <div key={lang.id || index} className="text-gray-700">
                <span className="font-semibold text-purple-700">{lang.name}</span>
                <span className="text-gray-600"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mr-3"></div>
            Hobbies & Interests
          </h2>
          <div className="pl-4 flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span key={hobby.id || index} className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {hobby.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ElegantTemplate;
