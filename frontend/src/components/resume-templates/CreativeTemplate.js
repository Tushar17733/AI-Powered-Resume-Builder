import React from 'react';

const CreativeTemplate = ({ resumeData }) => {
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
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 opacity-10 rounded-lg"></div>
        <div className="relative p-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-4">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              {personalInfo.email && <p className="mb-1">📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p className="mb-1">📱 {personalInfo.phone}</p>}
            </div>
            <div>
              {personalInfo.address && <p className="mb-1">📍 {personalInfo.address}</p>}
              <div className="flex space-x-4">
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-pink-600 transition-colors">
                    🔗 LinkedIn
                  </a>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-pink-600 transition-colors">
                    🌐 Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-orange-700 mb-3 flex items-center">
              <span className="text-2xl mr-2">✨</span>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">💼</span>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg border-l-4 border-orange-400">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-orange-600 text-sm font-medium bg-orange-100 px-2 py-1 rounded">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {' - '}
                    {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                  </span>
                </div>
                <p className="text-orange-700 font-medium mb-1">
                  {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                </p>
                {exp.description && (
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">🎓</span>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </h3>
                  <span className="text-pink-600 text-sm font-medium bg-pink-100 px-2 py-1 rounded">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {' - '}
                    {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                  </span>
                </div>
                <p className="text-pink-700 font-medium">
                  {edu.institution}{edu.location ? ` • ${edu.location}` : ''}
                </p>
                {edu.description && (
                  <p className="text-gray-600 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">🚀</span>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                {skill.name || skill} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">🛠️</span>
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg border-l-4 border-orange-400">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-orange-600 text-sm font-medium bg-orange-100 px-2 py-1 rounded">
                      {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {project.startDate && project.endDate && ' - '}
                      {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-orange-700 font-medium mb-1">
                    Technologies: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                  </p>
                )}
                {project.description && (
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">🏆</span>
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={cert.id || index} className="bg-gradient-to-r from-orange-50 to-pink-50 p-3 rounded-lg text-gray-700">
                {cert.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">⭐</span>
            Achievements
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div key={achievement.id || index} className="bg-gradient-to-r from-orange-50 to-pink-50 p-3 rounded-lg">
                {achievement.description}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">🌍</span>
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang, index) => (
              <div key={lang.id || index} className="bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full">
                <span className="font-semibold text-orange-700">{lang.name}</span>
                <span className="text-gray-600"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">🎨</span>
            Hobbies & Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span key={hobby.id || index} className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                {hobby.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CreativeTemplate;
