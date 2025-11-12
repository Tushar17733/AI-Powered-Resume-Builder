import React, { useState } from 'react';

const SkillsForm = ({ data, onChange, onSuggest, loading }) => {
  const [newSkill, setNewSkill] = useState('');
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        name: newSkill.trim(),
        level: 'Intermediate'
      }
    ]);
    
    setNewSkill('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (id) => {
    onChange(data.filter(skill => (skill.id || skill._id) !== id));
  };

  const handleSkillChange = (id, field, value) => {
    onChange(
      data.map(skill => 
        (skill.id || skill._id) === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleSuggestSkills = async () => {
    setLoadingSuggestions(true);
    const suggestions = await onSuggest();
    if (suggestions && suggestions.length > 0) {
      // Filter out skills that already exist
      const existingSkillNames = data.map(s => s.name.toLowerCase());
      const newSuggestions = suggestions.filter(
        skill => !existingSkillNames.includes(skill.name.toLowerCase())
      ).map(skill => ({
        ...skill,
        id: Date.now().toString() + Math.random().toString()
      }));
      setSuggestedSkills(newSuggestions);
    }
    setLoadingSuggestions(false);
  };

  const handleAddSuggestedSkill = (skill) => {
    // Add to main skills list
    onChange([...data, { ...skill, id: Date.now().toString() }]);
    // Remove from suggestions
    setSuggestedSkills(suggestedSkills.filter(s => s.id !== skill.id));
  };

  const handleAddAllSuggestions = () => {
    onChange([...data, ...suggestedSkills.map(s => ({ ...s, id: Date.now().toString() + Math.random() }))]);
    setSuggestedSkills([]);
  };

  const handleClearSuggestions = () => {
    setSuggestedSkills([]);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Skills
          </label>
          {onSuggest && (
            <button
              type="button"
              onClick={handleSuggestSkills}
              disabled={loading || loadingSuggestions}
              className="text-sm px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              {loadingSuggestions ? 'Generating...' : 'Suggest Skills with AI'}
            </button>
          )}
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Add a skill (e.g., JavaScript, Project Management, Photoshop)"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* AI Suggested Skills Section */}
      {suggestedSkills.length > 0 && (
        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              AI Suggested Skills ({suggestedSkills.length})
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddAllSuggestions}
                className="text-xs px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Add All
              </button>
              <button
                type="button"
                onClick={handleClearSuggestions}
                className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {suggestedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md border border-purple-200 dark:border-purple-700"
              >
                <span className="text-sm text-gray-800 dark:text-gray-200 truncate flex-grow">
                  {skill.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleAddSuggestedSkill(skill)}
                  className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex-shrink-0"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Added Skills Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Your Skills {data.length > 0 && `(${data.length})`}
        </h3>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.map((skill, index) => (
              <div 
                key={skill.id || skill._id || index} 
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md group"
              >
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.id || skill._id)}
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <select
                    value={skill.level || 'Intermediate'}
                    onChange={(e) => handleSkillChange(skill.id || skill._id, 'level', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-xs border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-gray-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-gray-500 dark:text-gray-400">No skills added yet. Add your first skill above or use AI suggestions.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Pro Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Include a mix of technical (hard) and interpersonal (soft) skills</li>
          <li>Prioritize skills that are relevant to the job you're applying for</li>
          <li>Be specific with technical skills (e.g., "React.js" instead of just "JavaScript")</li>
          <li>Include skill level to provide more context to employers</li>
          <li>Look at job descriptions for keywords to include in your skills section</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;