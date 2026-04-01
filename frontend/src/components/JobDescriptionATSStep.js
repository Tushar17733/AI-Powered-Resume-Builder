import React from 'react';

const JobDescriptionATSStep = ({
  jobDescription,
  onJobDescriptionChange,
  onAnalyze,
  analyzing,
  atsResult,
  error,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Target job description
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Paste the job posting so we can compare your resume to what employers and ATS systems look for.
        </p>
        <label htmlFor="job-description" className="sr-only">
          Paste job description
        </label>
        <textarea
          id="job-description"
          rows={10}
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste job description"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={analyzing || !jobDescription.trim()}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {analyzing ? 'Analyzing…' : 'Check ATS Score'}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {atsResult && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-gray-50/80 dark:bg-gray-900/40">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">ATS analysis</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {atsResult.atsScore}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">/ 100</span>
              {atsResult.fallback && (
                <span className="text-xs text-amber-700 dark:text-amber-300 ml-1">(quick estimate)</span>
              )}
            </div>
          </div>

          <div className="p-4 space-y-5">
            {atsResult.matchedKeywords && atsResult.matchedKeywords.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keywords found in your resume
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.matchedKeywords.map((kw, i) => (
                    <span
                      key={`${kw}-${i}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {atsResult.missingKeywords && atsResult.missingKeywords.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Missing keywords (job description / role)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.missingKeywords.map((kw, i) => (
                    <span
                      key={`${kw}-${i}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {atsResult.highlightImprovements && atsResult.highlightImprovements.length > 0 && (
              <div className="rounded-lg border-l-4 border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/30 pl-4 py-3 pr-3">
                <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  Highlight improvements
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-800 dark:text-gray-200">
                  {atsResult.highlightImprovements.map((h, i) => (
                    <li key={`hi-${i}`}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {atsResult.suggestions && atsResult.suggestions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Suggestions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {atsResult.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Tip: Use <span className="font-medium text-gray-600 dark:text-gray-300">Previous</span> to edit your resume, then run the check again.
        When you are happy with the score, open <span className="font-medium text-gray-600 dark:text-gray-300">Preview Resume</span> and download your PDF.
      </p>
    </div>
  );
};

export default JobDescriptionATSStep;
