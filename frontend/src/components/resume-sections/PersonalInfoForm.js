import React from 'react';

const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="fullName">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="address">
            Location/Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="City, State, Country"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="linkedin">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={data.linkedin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="website">
            Personal Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={data.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Pro Tips:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Use a professional email address</li>
          <li>Include your LinkedIn profile to enhance credibility</li>
          <li>Add your personal website or portfolio if relevant to your field</li>
          <li>For location, city and state/country is usually sufficient</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfoForm;