import React from 'react';

const EducationForm = ({ data, onChange }) => {
  const handleAddEducation = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        location: '',
        description: ''
      }
    ]);
  };

  const handleRemoveEducation = (id) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const handleEducationChange = (id, field, value) => {
    onChange(
      data.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-6">
      {data.map((education, index) => (
        <div key={education.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Education #{index + 1}
            </h3>
            <button
              type="button"
              onClick={() => handleRemoveEducation(education.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`institution-${education.id}`}>
                Institution/School *
              </label>
              <input
                type="text"
                id={`institution-${education.id}`}
                value={education.institution}
                onChange={(e) => handleEducationChange(education.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`degree-${education.id}`}>
                Degree/Certificate *
              </label>
              <input
                type="text"
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`fieldOfStudy-${education.id}`}>
                Field of Study
              </label>
              <input
                type="text"
                id={`fieldOfStudy-${education.id}`}
                value={education.fieldOfStudy}
                onChange={(e) => handleEducationChange(education.id, 'fieldOfStudy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`location-${education.id}`}>
                Location
              </label>
              <input
                type="text"
                id={`location-${education.id}`}
                value={education.location}
                onChange={(e) => handleEducationChange(education.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="City, State, Country"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`startDate-${education.id}`}>
                Start Date
              </label>
              <input
                type="month"
                id={`startDate-${education.id}`}
                value={education.startDate}
                onChange={(e) => handleEducationChange(education.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`endDate-${education.id}`}>
                End Date (or Expected)
              </label>
              <input
                type="month"
                id={`endDate-${education.id}`}
                value={education.endDate}
                onChange={(e) => handleEducationChange(education.id, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor={`description-${education.id}`}>
              Description (achievements, activities, etc.)
            </label>
            <textarea
              id={`description-${education.id}`}
              value={education.description}
              onChange={(e) => handleEducationChange(education.id, 'description', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Relevant coursework, honors, activities, or other achievements..."
            ></textarea>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Education
        </button>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Pro Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>List your education in reverse chronological order (most recent first)</li>
          <li>Include relevant coursework, honors, and activities</li>
          <li>For recent graduates, education should be more detailed</li>
          <li>For experienced professionals, focus on degrees and certifications</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationForm;