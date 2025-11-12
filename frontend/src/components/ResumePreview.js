import React, { useRef } from 'react';
import ClassicTemplate from './resume-templates/ClassicTemplate';
import ModernTemplate from './resume-templates/ModernTemplate';
import MinimalistTemplate from './resume-templates/MinimalistTemplate';
import ElegantTemplate from './resume-templates/ElegantTemplate';
import CreativeTemplate from './resume-templates/CreativeTemplate';
import BoldTemplate from './resume-templates/BoldTemplate';

const ResumePreview = ({ resumeData, templateId = 'modern' }) => {

  const renderTemplate = () => {
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate resumeData={resumeData} />;
      case 'elegant':
        return <ElegantTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      case 'bold':
        return <BoldTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  const previewRef = useRef(null);

  const printPreview = () => {
    if (!previewRef.current) return;
    
    // For mobile devices, use a simpler approach
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile: Direct window.print() with better styling
      const originalContents = document.body.innerHTML;
      const printContents = previewRef.current.innerHTML;
      const documentTitle = `${resumeData?.personalInfo?.fullName || 'Resume'}`;
      
      document.body.innerHTML = `
        <html>
          <head>
            <title>${documentTitle}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            <style>
              @page { size: A4; margin: 0; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              @media print {
                body { margin: 0; padding: 0; }
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `;
      
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
      return;
    }
    
    // Desktop: Open new window
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const documentTitle = `${resumeData?.personalInfo?.fullName || 'Resume'}`;
    const headLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((link) => link.outerHTML)
      .join('\n');
    const headStyles = Array.from(document.querySelectorAll('style'))
      .map((style) => style.outerHTML)
      .join('\n');

    // Clone preview content
    const cloned = previewRef.current.cloneNode(true);

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${documentTitle}</title>
          ${headLinks}
          ${headStyles}
          <style>
            @page { size: A4; margin: 0; }
            html, body { height: 100%; }
            body { margin: 0; padding: 0; background: white; }
            .print-wrapper { width: 210mm; min-height: 297mm; margin: 0 auto; }
            /* Ensure shadows/borders print nicely */
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          </style>
        </head>
        <body>
          <div class="print-wrapper"></div>
          <script>
            window.onload = function() {
              setTimeout(function(){ window.print(); window.close(); }, 150);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    const wrapper = printWindow.document.querySelector('.print-wrapper');
    if (wrapper) {
      wrapper.appendChild(cloned);
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-md mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Resume Preview</h2>
        <button
          onClick={printPreview}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-block text-center text-sm sm:text-base"
        >
          Download PDF
        </button>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
        <div 
          className="bg-white shadow-lg mx-auto origin-top"
          style={{ 
            width: '100%', 
            maxWidth: '210mm',
            minHeight: '297mm',
            transform: 'scale(0.9)',
            transformOrigin: 'top center'
          }}
          ref={previewRef}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;