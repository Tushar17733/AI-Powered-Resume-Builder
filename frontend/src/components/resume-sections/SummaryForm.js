import React from 'react';

const SummaryForm = ({ data, onChange, onEnhance, onGenerate, loading }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700 dark:text-gray-300" htmlFor="summary">
            Professional Summary
          </label>
          <div className="flex gap-2">
            {onGenerate && (
              <button
                type="button"
                onClick={onGenerate}
                disabled={loading}
                className="text-sm px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                {loading ? 'Generating...' : 'Auto-Generate'}
              </button>
            )}
            {onEnhance && data && data.trim() !== '' && (
              <button
                type="button"
                onClick={onEnhance}
                disabled={loading}
                className="text-sm px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                {loading ? 'Enhancing...' : 'Enhance with AI'}
              </button>
            )}
          </div>
        </div>
        <textarea
          id="summary"
          name="summary"
          value={data || ''}
          onChange={handleChange}
          rows="5"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Write a compelling summary that highlights your professional background, key skills, and career goals... Or click 'Auto-Generate' to create one based on your experience and skills."
        ></textarea>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Pro Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Keep your summary concise (3-5 sentences)</li>
          <li>Highlight your most relevant skills and experiences</li>
          <li>Tailor your summary to the job you're applying for</li>
          <li>Use action verbs and quantify achievements when possible</li>
          <li>Avoid clichés and generic statements</li>
        </ul>
      </div>
    </div>
  );
};

export default SummaryForm;