import React from 'react';

const ExperienceForm = ({ data, onChange, onEnhance, loading, onGenerateDescription }) => {
  const handleAddExperience = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]);
  };

  const handleRemoveExperience = (id) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    onChange(
      data.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleCurrentJobChange = (id, checked) => {
    onChange(
      data.map(exp => {
        if (exp.id === id) {
          return { 
            ...exp, 
            current: checked,
            endDate: checked ? '' : exp.endDate 
          };
        }
        return exp;
      })
    );
  };

  return (
    <div className="space-y-6">
      {data.map((experience, index) => (
        <div key={experience.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Experience #{index + 1}
            </h3>
            <button
              type="button"
              onClick={() => handleRemoveExperience(experience.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`company-${experience.id}`}>
                Company/Organization *
              </label>
              <input
                type="text"
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`position-${experience.id}`}>
                Job Title/Position *
              </label>
              <input
                type="text"
                id={`position-${experience.id}`}
                value={experience.position}
                onChange={(e) => handleExperienceChange(experience.id, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`location-${experience.id}`}>
              Location
            </label>
            <input
              type="text"
              id={`location-${experience.id}`}
              value={experience.location}
              onChange={(e) => handleExperienceChange(experience.id, 'location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="City, State, Country (or Remote)"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`startDate-${experience.id}`}>
                Start Date
              </label>
              <input
                type="month"
                id={`startDate-${experience.id}`}
                value={experience.startDate}
                onChange={(e) => handleExperienceChange(experience.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`endDate-${experience.id}`}>
                End Date
              </label>
              <div className="space-y-2">
                <input
                  type="month"
                  id={`endDate-${experience.id}`}
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(experience.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={experience.current}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onChange={(e) => handleCurrentJobChange(experience.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${experience.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I currently work here
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
              <label className="block text-gray-700 dark:text-gray-300" htmlFor={`description-${experience.id}`}>
                Work Experience & Accomplishments
              </label>
              <div className="flex flex-wrap gap-2">
                {onGenerateDescription && (
                  <button
                    type="button"
                    onClick={() => onGenerateDescription(experience.id, experience.position, experience.company)}
                    disabled={loading || !experience.position}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    {loading ? 'Generating...' : 'Generate'}
                  </button>
                )}
                {onEnhance && experience.description && (
                  <button
                    type="button"
                    onClick={() => onEnhance(experience.id, experience.description)}
                    disabled={loading}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    {loading ? 'Enhancing...' : 'Enhance'}
                  </button>
                )}
              </div>
            </div>
            <textarea
              id={`description-${experience.id}`}
              value={experience.description}
              onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe what you accomplished in this role: key responsibilities, achievements, measurable results, and impact you made..."
            ></textarea>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Experience
        </button>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Pro Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Use bullet points to highlight key responsibilities and achievements</li>
          <li>Start each bullet point with a strong action verb</li>
          <li>Quantify your achievements whenever possible (e.g., "Increased sales by 20%")</li>
          <li>Focus on achievements rather than just listing responsibilities</li>
          <li>Tailor your experience to match the job you're applying for</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperienceForm;