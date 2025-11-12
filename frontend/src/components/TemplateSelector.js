import React from 'react';
import ClassicTemplate from './resume-templates/ClassicTemplate';
import ModernTemplate from './resume-templates/ModernTemplate';
import MinimalistTemplate from './resume-templates/MinimalistTemplate';
import ElegantTemplate from './resume-templates/ElegantTemplate';
import CreativeTemplate from './resume-templates/CreativeTemplate';
import BoldTemplate from './resume-templates/BoldTemplate';

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, resumeData }) => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      component: ClassicTemplate,
      preview: 'Traditional layout with clean typography and professional styling'
    },
    {
      id: 'modern',
      name: 'Modern',
      component: ModernTemplate,
      preview: 'Contemporary design with blue accents and modern layout'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      component: MinimalistTemplate,
      preview: 'Clean and simple design with minimal visual elements'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      component: ElegantTemplate,
      preview: 'Sophisticated design with purple gradients and elegant styling'
    },
    {
      id: 'creative',
      name: 'Creative',
      component: CreativeTemplate,
      preview: 'Vibrant design with orange-pink gradients and creative elements'
    },
    {
      id: 'bold',
      name: 'Bold',
      component: BoldTemplate,
      preview: 'Dark theme with bold typography and high contrast design'
    }
  ];

  const PreviewThumbnail = ({ template, isSelected, onClick }) => {
    const TemplateComponent = template.component;
    
    return (
      <div 
        className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${
          isSelected 
            ? 'border-blue-500 shadow-lg scale-105' 
            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
        }`}
        onClick={onClick}
      >
        <div className="h-24 sm:h-32 overflow-hidden bg-gray-50 dark:bg-gray-700">
          <div className="transform scale-50 origin-top-left w-[200%] h-[200%]">
            <TemplateComponent resumeData={resumeData} />
          </div>
        </div>
        <div className="p-2 sm:p-3 bg-white dark:bg-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{template.name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 hidden sm:block">{template.preview}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Choose Template</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {templates.map((template) => (
          <PreviewThumbnail
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onClick={() => onTemplateSelect(template.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
