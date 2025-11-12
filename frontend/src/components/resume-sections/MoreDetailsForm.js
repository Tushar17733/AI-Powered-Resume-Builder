import React, { useState } from 'react';

const MoreDetailsForm = ({ data = {}, onChange }) => {
  const [newCertification, setNewCertification] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'Intermediate' });

  const certifications = data.certifications || [];
  const achievements = data.achievements || [];
  const hobbies = data.hobbies || [];
  const languages = data.languages || [];

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // Certifications handlers
  const handleAddCertification = () => {
    if (newCertification.trim() === '') return;
    handleChange('certifications', [...certifications, {
      id: Date.now().toString(),
      name: newCertification.trim()
    }]);
    setNewCertification('');
  };

  const handleRemoveCertification = (id) => {
    handleChange('certifications', certifications.filter(cert => cert.id !== id));
  };

  // Achievements handlers
  const handleAddAchievement = () => {
    if (newAchievement.trim() === '') return;
    handleChange('achievements', [...achievements, {
      id: Date.now().toString(),
      description: newAchievement.trim()
    }]);
    setNewAchievement('');
  };

  const handleRemoveAchievement = (id) => {
    handleChange('achievements', achievements.filter(ach => ach.id !== id));
  };

  // Hobbies handlers
  const handleAddHobby = () => {
    if (newHobby.trim() === '') return;
    handleChange('hobbies', [...hobbies, {
      id: Date.now().toString(),
      name: newHobby.trim()
    }]);
    setNewHobby('');
  };

  const handleRemoveHobby = (id) => {
    handleChange('hobbies', hobbies.filter(hobby => hobby.id !== id));
  };

  // Languages handlers
  const handleAddLanguage = () => {
    if (newLanguage.name.trim() === '') return;
    handleChange('languages', [...languages, {
      id: Date.now().toString(),
      name: newLanguage.name.trim(),
      proficiency: newLanguage.proficiency
    }]);
    setNewLanguage({ name: '', proficiency: 'Intermediate' });
  };

  const handleRemoveLanguage = (id) => {
    handleChange('languages', languages.filter(lang => lang.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Certifications Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Certifications
        </h3>
        <div className="mb-4">
          <div className="flex">
            <input
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., AWS Certified Solutions Architect"
            />
            <button
              type="button"
              onClick={handleAddCertification}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        {certifications.length > 0 ? (
          <ul className="space-y-2">
            {certifications.map((cert) => (
              <li key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <span className="text-gray-800 dark:text-gray-200">{cert.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(cert.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            No certifications added yet
          </p>
        )}
      </div>

      {/* Achievements Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Achievements
        </h3>
        <div className="mb-4">
          <div className="flex">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAchievement())}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Won Employee of the Year Award 2023"
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        {achievements.length > 0 ? (
          <ul className="space-y-2">
            {achievements.map((achievement) => (
              <li key={achievement.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <span className="text-gray-800 dark:text-gray-200">{achievement.description}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(achievement.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 ml-2 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            No achievements added yet
          </p>
        )}
      </div>

      {/* Languages Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Languages
        </h3>
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., English, Spanish"
            />
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Native">Native</option>
            </select>
            <button
              type="button"
              onClick={handleAddLanguage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        {languages.length > 0 ? (
          <ul className="space-y-2">
            {languages.map((lang) => (
              <li key={lang.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{lang.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({lang.proficiency})</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(lang.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            No languages added yet
          </p>
        )}
      </div>

      {/* Hobbies Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Hobbies & Interests
        </h3>
        <div className="mb-4">
          <div className="flex">
            <input
              type="text"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHobby())}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Photography, Reading, Playing Guitar"
            />
            <button
              type="button"
              onClick={handleAddHobby}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        {hobbies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby) => (
              <div key={hobby.id} className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-full">
                <span className="text-gray-800 dark:text-gray-200">{hobby.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(hobby.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            No hobbies added yet
          </p>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Pro Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Include relevant certifications that add value to your profession</li>
          <li>Highlight achievements with measurable results when possible</li>
          <li>Language proficiency can be a valuable asset in many roles</li>
          <li>Hobbies can show personality, but keep them professional and relevant</li>
        </ul>
      </div>
    </div>
  );
};

export default MoreDetailsForm;
