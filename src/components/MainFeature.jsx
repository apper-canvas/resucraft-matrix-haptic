import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

// Resume templates data
const resumeTemplates = [
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'A clean, professional design with a modern touch',
    previewImage: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    colorSchemes: [
      { name: 'Blue', primary: '#3b82f6', secondary: '#93c5fd' },
      { name: 'Emerald', primary: '#10b981', secondary: '#6ee7b7' },
      { name: 'Purple', primary: '#8b5cf6', secondary: '#c4b5fd' },
    ]
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and straightforward for a focused presentation',
    previewImage: 'https://images.unsplash.com/photo-1586282391129-76a2d60225f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    colorSchemes: [
      { name: 'Gray', primary: '#4b5563', secondary: '#9ca3af' },
      { name: 'Navy', primary: '#1e40af', secondary: '#60a5fa' },
      { name: 'Amber', primary: '#d97706', secondary: '#fbbf24' },
    ]
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Bold and authoritative for senior positions',
    previewImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    colorSchemes: [
      { name: 'Charcoal', primary: '#1f2937', secondary: '#6b7280' },
      { name: 'Burgundy', primary: '#9f1239', secondary: '#fb7185' },
      { name: 'Forest', primary: '#14532d', secondary: '#34d399' },
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A unique layout for creative professionals',
    previewImage: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    colorSchemes: [
      { name: 'Sunset', primary: '#db2777', secondary: '#f472b6' },
      { name: 'Ocean', primary: '#0369a1', secondary: '#22d3ee' },
      { name: 'Lime', primary: '#65a30d', secondary: '#a3e635' },
    ]
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold accents',
    previewImage: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    colorSchemes: [
      { name: 'Slate', primary: '#475569', secondary: '#94a3b8' },
      { name: 'Rose', primary: '#e11d48', secondary: '#fb7185' },
      { name: 'Teal', primary: '#0d9488', secondary: '#5eead4' },
    ]
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format that never goes out of style',
    previewImage: 'https://images.unsplash.com/photo-1594972752320-9ded9eb43d59?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    colorSchemes: [
      { name: 'Black', primary: '#171717', secondary: '#737373' },
      { name: 'Indigo', primary: '#4338ca', secondary: '#818cf8' },
      { name: 'Crimson', primary: '#b91c1c', secondary: '#ef4444' },
    ]
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Structured format for educational and research positions',
    previewImage: 'https://images.unsplash.com/photo-1532153955177-f59af40d6472?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    colorSchemes: [
      { name: 'Oxford', primary: '#1e3a8a', secondary: '#3b82f6' },
      { name: 'Maroon', primary: '#881337', secondary: '#e11d48' },
      { name: 'Olive', primary: '#3f6212', secondary: '#84cc16' },
    ]
  }
];

const MainFeature = ({ activeTab }) => {
  // Initial form state
  const initialFormState = {
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    education: [{
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: ['']
  };

  // State hooks
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0]);
  const [selectedColorScheme, setSelectedColorScheme] = useState(resumeTemplates[0].colorSchemes[0]);
  const [formData, setFormData] = useState(initialFormState);
  const [currentSection, setCurrentSection] = useState('personalInfo');
  const [previewMode, setPreviewMode] = useState(false);

  // Update preview mode when active tab changes
  useEffect(() => {
    setPreviewMode(activeTab === 'preview');
  }, [activeTab]);

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

  // Handle form input changes
  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      
      if (index !== null) {
        // For array fields (education, experience, skills)
        newData[section] = [...newData[section]];
        
        if (section === 'skills') {
          newData[section][index] = value;
        } else {
          newData[section][index] = {
            ...newData[section][index],
            [field]: value
          };
        }
      } else {
        // For nested objects (personalInfo)
        newData[section] = {
          ...newData[section],
          [field]: value
        };
      }
      
      return newData;
    });
  };

  // Handle adding new items to array fields
  const handleAddItem = (section) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      
      if (section === 'education') {
        newData.education = [
          ...newData.education,
          {
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            description: ''
          }
        ];
      } else if (section === 'experience') {
        newData.experience = [
          ...newData.experience,
          {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
          }
        ];
      } else if (section === 'skills') {
        newData.skills = [...newData.skills, ''];
      }
      
      return newData;
    });
    
    toast.info(`Added new ${section.slice(0, -1)} entry`);
  };

  // Handle removing items from array fields
  const handleRemoveItem = (section, index) => {
    if (formData[section].length <= 1) {
      toast.error(`You need at least one ${section.slice(0, -1)} entry`);
      return;
    }
    
    setFormData(prevData => {
      const newData = { ...prevData };
      newData[section] = newData[section].filter((_, i) => i !== index);
      return newData;
    });
    
    toast.info(`Removed ${section.slice(0, -1)} entry`);
  };

  // Get icons
  const UserIcon = getIcon('user');
  const GraduationCapIcon = getIcon('graduation-cap');
  const BriefcaseIcon = getIcon('briefcase');
  const CodeIcon = getIcon('code');
  const PlusIcon = getIcon('plus');
  const TrashIcon = getIcon('trash-2');
  const CheckIcon = getIcon('check');

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Side - Form or Templates Selection */}
      <div className={`w-full lg:w-1/2 ${previewMode ? 'lg:hidden' : ''}`}>
        {/* Templates Selection */}
        {!previewMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                Choose a Template
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {resumeTemplates.map(template => (
                  <div
                    key={template.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 border-2 ${
                      selectedTemplate.id === template.id
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
                      {selectedTemplate.id === template.id && (
                        <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="font-semibold">{template.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Schemes */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                Color Scheme
              </h2>
              <div className="flex flex-wrap gap-3">
                {selectedTemplate.colorSchemes.map(colorScheme => (
                  <button
                    key={colorScheme.name}
                    onClick={() => handleColorSchemeSelect(colorScheme)}
                    className={`relative p-1 rounded-md transition-all ${
                      selectedColorScheme.name === colorScheme.name
                        ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-surface-800'
                        : 'hover:scale-105'
                    }`}
                  >
                    <div className="flex">
                      <div 
                        className="w-8 h-8 rounded-l-sm" 
                        style={{ backgroundColor: colorScheme.primary }}
                      />
                      <div 
                        className="w-8 h-8 rounded-r-sm" 
                        style={{ backgroundColor: colorScheme.secondary }}
                      />
                    </div>
                    <span className="block text-xs mt-1 text-center">
                      {colorScheme.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card">
              <div className="flex mb-6 border-b border-surface-200 dark:border-surface-700">
                <button
                  onClick={() => setCurrentSection('personalInfo')}
                  className={`flex items-center py-3 px-4 border-b-2 text-sm font-medium ${
                    currentSection === 'personalInfo'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-surface-500 hover:text-surface-800 dark:hover:text-white'
                  }`}
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  Personal
                </button>
                <button
                  onClick={() => setCurrentSection('education')}
                  className={`flex items-center py-3 px-4 border-b-2 text-sm font-medium ${
                    currentSection === 'education'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-surface-500 hover:text-surface-800 dark:hover:text-white'
                  }`}
                >
                  <GraduationCapIcon className="w-4 h-4 mr-2" />
                  Education
                </button>
                <button
                  onClick={() => setCurrentSection('experience')}
                  className={`flex items-center py-3 px-4 border-b-2 text-sm font-medium ${
                    currentSection === 'experience'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-surface-500 hover:text-surface-800 dark:hover:text-white'
                  }`}
                >
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  Experience
                </button>
                <button
                  onClick={() => setCurrentSection('skills')}
                  className={`flex items-center py-3 px-4 border-b-2 text-sm font-medium ${
                    currentSection === 'skills'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-surface-500 hover:text-surface-800 dark:hover:text-white'
                  }`}
                >
                  <CodeIcon className="w-4 h-4 mr-2" />
                  Skills
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Personal Information Form */}
                  {currentSection === 'personalInfo' && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="input-group">
                          <label htmlFor="name" className="input-label">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            value={formData.personalInfo.name}
                            onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="input-group">
                          <label htmlFor="title" className="input-label">Professional Title</label>
                          <input
                            type="text"
                            id="title"
                            value={formData.personalInfo.title}
                            onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                            placeholder="Senior Developer"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="input-group">
                          <label htmlFor="email" className="input-label">Email</label>
                          <input
                            type="email"
                            id="email"
                            value={formData.personalInfo.email}
                            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        <div className="input-group">
                          <label htmlFor="phone" className="input-label">Phone</label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.personalInfo.phone}
                            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                      <div className="input-group mb-4">
                        <label htmlFor="location" className="input-label">Location</label>
                        <input
                          type="text"
                          id="location"
                          value={formData.personalInfo.location}
                          onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="summary" className="input-label">Professional Summary</label>
                        <textarea
                          id="summary"
                          rows="4"
                          value={formData.personalInfo.summary}
                          onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                          placeholder="Briefly describe your professional background and key strengths"
                          className="resize-none"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Education Form */}
                  {currentSection === 'education' && (
                    <div>
                      {formData.education.map((edu, index) => (
                        <div key={index} className="mb-8 pb-6 border-b border-surface-200 dark:border-surface-700 last:border-b-0 last:pb-0 last:mb-0">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Education #{index + 1}</h3>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem('education', index)}
                              className="text-accent hover:text-accent/80 p-1"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="input-group">
                              <label htmlFor={`institution-${index}`} className="input-label">Institution</label>
                              <input
                                type="text"
                                id={`institution-${index}`}
                                value={edu.institution}
                                onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                                placeholder="University Name"
                              />
                            </div>
                            <div className="input-group">
                              <label htmlFor={`degree-${index}`} className="input-label">Degree</label>
                              <input
                                type="text"
                                id={`degree-${index}`}
                                value={edu.degree}
                                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                                placeholder="Bachelor of Science"
                              />
                            </div>
                          </div>

                          <div className="input-group mb-4">
                            <label htmlFor={`field-${index}`} className="input-label">Field of Study</label>
                            <input
                              type="text"
                              id={`field-${index}`}
                              value={edu.field}
                              onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                              placeholder="Computer Science"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="input-group">
                              <label htmlFor={`edu-start-${index}`} className="input-label">Start Date</label>
                              <input
                                type="text"
                                id={`edu-start-${index}`}
                                value={edu.startDate}
                                onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                                placeholder="Sep 2016"
                              />
                            </div>
                            <div className="input-group">
                              <label htmlFor={`edu-end-${index}`} className="input-label">End Date</label>
                              <input
                                type="text"
                                id={`edu-end-${index}`}
                                value={edu.endDate}
                                onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                                placeholder="Jun 2020 (or Present)"
                              />
                            </div>
                          </div>

                          <div className="input-group">
                            <label htmlFor={`edu-desc-${index}`} className="input-label">Description</label>
                            <textarea
                              id={`edu-desc-${index}`}
                              rows="3"
                              value={edu.description}
                              onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                              placeholder="Notable achievements, GPA, relevant coursework, etc."
                              className="resize-none"
                            ></textarea>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddItem('education')}
                        className="flex items-center text-primary hover:text-primary-dark mt-4"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Another Education
                      </button>
                    </div>
                  )}

                  {/* Experience Form */}
                  {currentSection === 'experience' && (
                    <div>
                      {formData.experience.map((exp, index) => (
                        <div key={index} className="mb-8 pb-6 border-b border-surface-200 dark:border-surface-700 last:border-b-0 last:pb-0 last:mb-0">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Experience #{index + 1}</h3>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem('experience', index)}
                              className="text-accent hover:text-accent/80 p-1"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="input-group">
                              <label htmlFor={`company-${index}`} className="input-label">Company</label>
                              <input
                                type="text"
                                id={`company-${index}`}
                                value={exp.company}
                                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                                placeholder="Company Name"
                              />
                            </div>
                            <div className="input-group">
                              <label htmlFor={`position-${index}`} className="input-label">Position</label>
                              <input
                                type="text"
                                id={`position-${index}`}
                                value={exp.position}
                                onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                                placeholder="Software Engineer"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="input-group">
                              <label htmlFor={`exp-start-${index}`} className="input-label">Start Date</label>
                              <input
                                type="text"
                                id={`exp-start-${index}`}
                                value={exp.startDate}
                                onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                                placeholder="Jan 2020"
                              />
                            </div>
                            <div className="input-group">
                              <label htmlFor={`exp-end-${index}`} className="input-label">End Date</label>
                              <input
                                type="text"
                                id={`exp-end-${index}`}
                                value={exp.endDate}
                                onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                                placeholder="Present"
                              />
                            </div>
                          </div>

                          <div className="input-group">
                            <label htmlFor={`exp-desc-${index}`} className="input-label">Description</label>
                            <textarea
                              id={`exp-desc-${index}`}
                              rows="4"
                              value={exp.description}
                              onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                              placeholder="Describe your responsibilities, achievements, and technologies used"
                              className="resize-none"
                            ></textarea>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddItem('experience')}
                        className="flex items-center text-primary hover:text-primary-dark mt-4"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Another Experience
                      </button>
                    </div>
                  )}

                  {/* Skills Form */}
                  {currentSection === 'skills' && (
                    <div>
                      <p className="text-surface-600 dark:text-surface-300 mb-4">
                        List your technical and professional skills
                      </p>
                      
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2 mb-3">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleInputChange('skills', null, e.target.value, index)}
                            placeholder={`Skill ${index + 1}`}
                            className="flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('skills', index)}
                            className="text-accent hover:text-accent/80 p-1"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddItem('skills')}
                        className="flex items-center text-primary hover:text-primary-dark mt-4"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Another Skill
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Right Side - Resume Preview */}
      <div className={`w-full ${previewMode ? '' : 'lg:w-1/2'}`}>
        <div className="card h-full">
          <div className="bg-white border border-surface-300 shadow-lg rounded-lg overflow-hidden max-w-[800px] mx-auto">
            <div 
              className="p-8"
              style={{
                background: `linear-gradient(135deg, ${selectedColorScheme.primary}60, ${selectedColorScheme.secondary}40)`,
                borderBottom: `3px solid ${selectedColorScheme.primary}`
              }}
            >
              <h1 
                className="text-3xl font-bold"
                style={{ color: selectedColorScheme.primary }}
              >
                {formData.personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-xl text-surface-700 mt-1">
                {formData.personalInfo.title || 'Professional Title'}
              </p>
              
              <div className="flex flex-wrap mt-4 gap-4">
                {formData.personalInfo.email && (
                  <div className="flex items-center text-sm text-surface-600">
                    <span className="font-medium">Email:</span>
                    <span className="ml-1">{formData.personalInfo.email}</span>
                  </div>
                )}
                {formData.personalInfo.phone && (
                  <div className="flex items-center text-sm text-surface-600">
                    <span className="font-medium">Phone:</span>
                    <span className="ml-1">{formData.personalInfo.phone}</span>
                  </div>
                )}
                {formData.personalInfo.location && (
                  <div className="flex items-center text-sm text-surface-600">
                    <span className="font-medium">Location:</span>
                    <span className="ml-1">{formData.personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-8">
              {formData.personalInfo.summary && (
                <div className="mb-6">
                  <h2 
                    className="text-lg font-semibold mb-2"
                    style={{ color: selectedColorScheme.primary }}
                  >
                    Professional Summary
                  </h2>
                  <p className="text-surface-700">
                    {formData.personalInfo.summary}
                  </p>
                </div>
              )}
              
              {formData.experience.some(exp => exp.company || exp.position) && (
                <div className="mb-6">
                  <h2 
                    className="text-lg font-semibold mb-3"
                    style={{ color: selectedColorScheme.primary, borderBottom: `2px solid ${selectedColorScheme.secondary}`, paddingBottom: '0.5rem' }}
                  >
                    Experience
                  </h2>
                  
                  {formData.experience.map((exp, index) => (
                    (exp.company || exp.position) && (
                      <div key={index} className="mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium">{exp.position || 'Position Title'}</h3>
                            <p className="text-surface-600">{exp.company || 'Company Name'}</p>
                          </div>
                          {(exp.startDate || exp.endDate) && (
                            <p className="text-sm text-surface-500 mt-1 sm:mt-0">
                              {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                            </p>
                          )}
                        </div>
                        {exp.description && (
                          <p className="text-surface-700 mt-2 text-sm">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}
              
              {formData.education.some(edu => edu.institution || edu.degree) && (
                <div className="mb-6">
                  <h2 
                    className="text-lg font-semibold mb-3"
                    style={{ color: selectedColorScheme.primary, borderBottom: `2px solid ${selectedColorScheme.secondary}`, paddingBottom: '0.5rem' }}
                  >
                    Education
                  </h2>
                  
                  {formData.education.map((edu, index) => (
                    (edu.institution || edu.degree) && (
                      <div key={index} className="mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium">
                              {edu.degree ? edu.degree : 'Degree'}{edu.field ? `, ${edu.field}` : ''}
                            </h3>
                            <p className="text-surface-600">{edu.institution || 'Institution Name'}</p>
                          </div>
                          {(edu.startDate || edu.endDate) && (
                            <p className="text-sm text-surface-500 mt-1 sm:mt-0">
                              {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                            </p>
                          )}
                        </div>
                        {edu.description && (
                          <p className="text-surface-700 mt-2 text-sm">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}
              
              {formData.skills.some(skill => skill) && (
                <div>
                  <h2 
                    className="text-lg font-semibold mb-3"
                    style={{ color: selectedColorScheme.primary, borderBottom: `2px solid ${selectedColorScheme.secondary}`, paddingBottom: '0.5rem' }}
                  >
                    Skills
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      skill && (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: `${selectedColorScheme.secondary}30`,
                            color: selectedColorScheme.primary
                          }}
                        >
                          {skill}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;