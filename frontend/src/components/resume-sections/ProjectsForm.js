import React from 'react';

const ProjectsForm = ({ data, onChange, onAIEnhance }) => {
  const handleAddProject = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        title: '',
        description: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: '',
      }
    ]);
  };

  const handleRemoveProject = (id) => {
    onChange(data.filter(project => project.id !== id));
  };

  const handleProjectChange = (id, field, value) => {
    onChange(
      data.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  return (
    <div className="space-y-6">
      {data.map((project, index) => (
        <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Project #{index + 1}
            </h3>
            <button
              type="button"
              onClick={() => handleRemoveProject(project.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`title-${project.id}`}>
              Project Title *
            </label>
            <input
              type="text"
              id={`title-${project.id}`}
              value={project.title}
              onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 dark:text-gray-300" htmlFor={`description-${project.id}`}>
                Project Description *
              </label>
              {onAIEnhance && (
                <button
                  type="button"
                  onClick={() => onAIEnhance('project', project.id)}
                  className="text-sm px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Enhance with AI
                </button>
              )}
            </div>
            <textarea
              id={`description-${project.id}`}
              value={project.description}
              onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe the project, your role, and the impact it had..."
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`technologies-${project.id}`}>
              Technologies Used
            </label>
            <input
              type="text"
              id={`technologies-${project.id}`}
              value={project.technologies}
              onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., React, Node.js, MongoDB, Docker"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`link-${project.id}`}>
              Project Link
            </label>
            <input
              type="url"
              id={`link-${project.id}`}
              value={project.link}
              onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://github.com/yourusername/project"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`startDate-${project.id}`}>
                Start Date
              </label>
              <input
                type="month"
                id={`startDate-${project.id}`}
                value={project.startDate}
                onChange={(e) => handleProjectChange(project.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`endDate-${project.id}`}>
                End Date
              </label>
              <input
                type="month"
                id={`endDate-${project.id}`}
                value={project.endDate}
                onChange={(e) => handleProjectChange(project.id, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Project
        </button>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Pro Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Focus on projects that demonstrate relevant skills for the job</li>
          <li>Highlight your specific contributions to team projects</li>
          <li>Include measurable outcomes or impact when possible</li>
          <li>Add links to live demos, repositories, or documentation</li>
          <li>List technologies used to showcase your technical skills</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;