import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import { useResumeContext } from '../contexts/ResumeContext';

// Resume templates data
const resumeTemplates = [
  { 
    id: 'executive',
    name: 'Executive',
    description: 'Professional corporate design with a bold sidebar',
    previewImage: 'https://res.cloudinary.com/dq5eomkfz/image/upload/v1716297565/resume-templates/executive_resume_uxhpj2.jpg',
    icon: 'briefcase',
    layout: 'sidebar-left',
    fonts: {
      heading: 'Montserrat',
      body: 'Source Sans Pro'
    },
    colorSchemes: [
      { name: 'Navy', primary: '#1e3a8a', secondary: '#60a5fa' },
      { name: 'Maroon', primary: '#7f1d1d', secondary: '#ef4444' },
      { name: 'Forest', primary: '#064e3b', secondary: '#10b981' },
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold asymmetric design for creative professionals',
    previewImage: 'https://res.cloudinary.com/dq5eomkfz/image/upload/v1716297565/resume-templates/creative_resume_cdjy6a.jpg',
    icon: 'palette',
    layout: 'asymmetric',
    fonts: {
      heading: 'Poppins',
      body: 'Roboto'
    },
    colorSchemes: [
      { name: 'Coral', primary: '#f43f5e', secondary: '#fb7185' },
      { name: 'Violet', primary: '#6d28d9', secondary: '#a78bfa' },
      { name: 'Sunrise', primary: '#ff6b00', secondary: '#fb923c' },
    ]
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, minimalist design with elegant typography',
    previewImage: 'https://res.cloudinary.com/dq5eomkfz/image/upload/v1716297565/resume-templates/minimal_resume_bpvbw8.jpg',
    icon: 'minimize-2',
    layout: 'single-column',
    fonts: {
      heading: 'DM Sans',
      body: 'Inter'
    },
    colorSchemes: [
      { name: 'Slate', primary: '#334155', secondary: '#94a3b8' },
      { name: 'Teal', primary: '#0f766e', secondary: '#5eead4' },
      { name: 'Amber', primary: '#92400e', secondary: '#fbbf24' },
    ]
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with classic typography',
    previewImage: 'https://res.cloudinary.com/dq5eomkfz/image/upload/v1716297565/resume-templates/elegant_resume_qwz2nh.jpg',
    icon: 'feather',
    layout: 'header-focus',
    fonts: {
      heading: 'Playfair Display',
      body: 'Lato'
    },
    colorSchemes: [
      { name: 'Royal', primary: '#1e3a8a', secondary: '#3b82f6' },
      { name: 'Emerald', primary: '#065f46', secondary: '#10b981' },
      { name: 'Burgundy', primary: '#9f1239', secondary: '#fb7185' },
    ]
  },
  // Other templates remain the same...
];

const TemplateSelection = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate, selectedColorScheme, setSelectedColorScheme, goToNextStep } = useResumeContext();
  
  // Get icons
  const CheckIcon = getIcon('check');
  const ArrowRightIcon = getIcon('arrow-right');

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedColorScheme(template.colorSchemes[0]);
    toast.success(`Template "${template.name}" selected!`);
  };

  // Handle color scheme selection
  const handleColorSchemeSelect = (colorScheme) => {
    setSelectedColorScheme(colorScheme);
  };

  // Handle next step
  const handleNext = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first!");
      return;
    }
    navigate('/resume-details');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Step 1: Choose Your Template
        </h1>
        <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl max-w-2xl mx-auto">
          Select the perfect template design for your professional resume.
        </p>
      </motion.div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-6 text-surface-800 dark:text-white">
          Available Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumeTemplates.map(template => (
            <div
              key={template.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 border-2 ${
                selectedTemplate && selectedTemplate.id === template.id
                  ? 'border-primary shadow-md'
                  : 'border-transparent'
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <img
                src={template.previewImage}
                alt={template.name}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                {selectedTemplate && selectedTemplate.id === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <div className="flex items-center">
                    {template.icon && (
                      <span className="mr-1.5">
                        {React.createElement(getIcon(template.icon), { className: "w-4 h-4" })}
                      </span>
                    )}
                    <h3 className="font-semibold">{template.name}</h3>
                  </div>
                  <p className="text-sm text-white/80 mt-1">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="btn btn-primary flex items-center gap-2"
        >
          Continue to Details <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TemplateSelection;