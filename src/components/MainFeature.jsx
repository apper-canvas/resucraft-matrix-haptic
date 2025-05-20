import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

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
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary dual-column layout with clean lines',
    previewImage: 'https://res.cloudinary.com/dq5eomkfz/image/upload/v1716297565/resume-templates/modern_resume_nrjsyd.jpg',
    icon: 'layers',
    layout: 'two-column',
    fonts: {
      heading: 'Raleway',
      body: 'Open Sans'
    },
    colorSchemes: [
      { name: 'Ocean', primary: '#0c4a6e', secondary: '#38bdf8' },
      { name: 'Charcoal', primary: '#0f172a', secondary: '#64748b' },
      { name: 'Rose', primary: '#be123c', secondary: '#fb7185' },
    ]
  },
  {
    id: 'infographic',
    name: 'Infographic',
    description: 'Visual resume with skill bars and icons',
    previewImage: 'https://res.cloudinary.com/dq5eomkfz/image/upload/v1716297565/resume-templates/infographic_resume_qqtaiz.jpg',
    icon: 'bar-chart-2',
    layout: 'infographic',
    fonts: {
      heading: 'Montserrat',
      body: 'Nunito'
    },
    colorSchemes: [
      { name: 'Gradient Blue', primary: '#2563eb', secondary: '#60a5fa' },
      { name: 'Gradient Purple', primary: '#7e22ce', secondary: '#c084fc' },
      { name: 'Gradient Green', primary: '#059669', secondary: '#34d399' },
    ]
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Traditional format for academic and research CVs',
    previewImage: 'https://res.cloudinary.com/dq5eomkfz/image/upload/v1716297564/resume-templates/academic_resume_qocsrd.jpg',
    icon: 'book-open',
    layout: 'traditional',
    fonts: {
      heading: 'Merriweather',
      body: 'Source Sans Pro'
    },
    colorSchemes: [
      { name: 'Oxford Blue', primary: '#0c4a6e', secondary: '#38bdf8' },
      { name: 'Harvard Crimson', primary: '#7f1d1d', secondary: '#ef4444' },
      { name: 'Princeton Orange', primary: '#7c2d12', secondary: '#fb923c' },
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
                        <div className="flex items-center">
                          {template.icon && (
                            <span className="mr-1.5">
                              {React.createElement(getIcon(template.icon), { className: "w-4 h-4" })}
                            </span>
                          )}
                          <h3 className="font-semibold">{template.name}</h3>
                        </div>
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
          {/* Dynamic Resume Template Rendering */}
          {selectedTemplate.layout === 'sidebar-left' && (
            <div className="bg-white border border-surface-300 shadow-lg rounded-lg overflow-hidden max-w-[800px] mx-auto" style={{fontFamily: selectedTemplate.fonts.body}}>
              <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="md:w-1/3 bg-surface-800" style={{backgroundColor: selectedColorScheme.primary}}>
                  <div className="p-6 text-white">
                    {/* Photo placeholder */}
                    <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-white/50">
                      <span className="text-4xl">
                        {formData.personalInfo.name ? formData.personalInfo.name.charAt(0) : 'Y'}
                      </span>
                    </div>
                    
                    <div className="border-b border-white/20 pb-4 mb-6">
                      <h4 className="uppercase text-xs tracking-wider mb-2 text-white/70">Contact</h4>
                      {formData.personalInfo.email && <p className="text-sm mb-1">{formData.personalInfo.email}</p>}
                      {formData.personalInfo.phone && <p className="text-sm mb-1">{formData.personalInfo.phone}</p>}
                      {formData.personalInfo.location && <p className="text-sm">{formData.personalInfo.location}</p>}
                    </div>
                    
                    {formData.skills.some(skill => skill) && (
                      <div>
                        <h4 className="uppercase text-xs tracking-wider mb-3 text-white/70">Skills</h4>
                        <div className="space-y-2">
                          {formData.skills.map((skill, index) => (
                            skill && (
                              <div key={index} className="text-sm">
                                {skill}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="md:w-2/3 p-8">
                  <h1 className="text-3xl font-bold uppercase tracking-wide mb-1" style={{fontFamily: selectedTemplate.fonts.heading, color: selectedColorScheme.primary}}>
                    {formData.personalInfo.name || 'Your Name'}
                  </h1>
                  <p className="text-xl text-surface-600 mb-6 pb-6 border-b border-surface-200">
                    {formData.personalInfo.title || 'Professional Title'}
                  </p>
                  
                  {formData.personalInfo.summary && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-2 uppercase tracking-wide" style={{fontFamily: selectedTemplate.fonts.heading, color: selectedColorScheme.primary}}>
                        Profile
                      </h2>
                      <p className="text-surface-700">
                        {formData.personalInfo.summary}
                      </p>
                    </div>
                  )}
                  
                  {formData.experience.some(exp => exp.company || exp.position) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{fontFamily: selectedTemplate.fonts.heading, color: selectedColorScheme.primary}}>
                        Experience
                      </h2>
                      
                      {formData.experience.map((exp, index) => (
                        (exp.company || exp.position) && (
                          <div key={index} className="mb-4">
                            <h3 className="font-semibold">{exp.position || 'Position Title'}</h3>
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-surface-600">{exp.company || 'Company Name'}</p>
                              {(exp.startDate || exp.endDate) && (
                                <p className="text-sm text-surface-500">
                                  {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                                </p>
                              )}
                            </div>
                            {exp.description && (
                              <p className="text-surface-700 mt-1 text-sm">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  
                  {formData.education.some(edu => edu.institution || edu.degree) && (
                    <div>
                      <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{fontFamily: selectedTemplate.fonts.heading, color: selectedColorScheme.primary}}>
                        Education
                      </h2>
                      
                      {formData.education.map((edu, index) => (
                        (edu.institution || edu.degree) && (
                          <div key={index} className="mb-3">
                            <h3 className="font-semibold">
                              {edu.degree ? edu.degree : 'Degree'}{edu.field ? `, ${edu.field}` : ''}
                            </h3>
                            <div className="flex justify-between items-center">
                              <p className="text-surface-600">{edu.institution || 'Institution Name'}</p>
                              {(edu.startDate || edu.endDate) && (
                                <p className="text-sm text-surface-500">
                                  {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {selectedTemplate.layout === 'asymmetric' && (
            <div className="bg-white border border-surface-300 shadow-lg rounded-lg overflow-hidden max-w-[800px] mx-auto" style={{fontFamily: selectedTemplate.fonts.body}}>
              {/* Creative Header with diagonal element */}
              <div className="relative">
                <div className="h-36 w-full relative overflow-hidden" style={{backgroundColor: selectedColorScheme.primary}}>
                  <div className="absolute bottom-0 right-0 w-3/4 h-full" style={{
                    backgroundColor: selectedColorScheme.secondary,
                    clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)'
                  }}></div>
                  
                  <div className="absolute top-0 left-0 h-full w-full p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-white" style={{fontFamily: selectedTemplate.fonts.heading}}>
                      {formData.personalInfo.name || 'Your Name'}
                    </h1>
                    <p className="text-xl text-white/80">
                      {formData.personalInfo.title || 'Professional Title'}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end p-4 bg-surface-100 text-sm">
                  {formData.personalInfo.email && (
                    <div className="ml-4">
                      <span className="font-medium">Email:</span> {formData.personalInfo.email}
                    </div>
                  )}
                  {formData.personalInfo.phone && (
                    <div className="ml-4">
                      <span className="font-medium">Phone:</span> {formData.personalInfo.phone}
                    </div>
                  )}
                  {formData.personalInfo.location && (
                    <div className="ml-4">
                      <span className="font-medium">Location:</span> {formData.personalInfo.location}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-12 gap-6">
                  {/* Main content - 8 columns */}
                  <div className="col-span-12 md:col-span-8">
                    {formData.personalInfo.summary && (
                      <div className="mb-6 bg-surface-50 p-4 rounded-lg border-l-4" style={{borderColor: selectedColorScheme.primary}}>
                        <h2 className="text-lg font-bold mb-2" style={{fontFamily: selectedTemplate.fonts.heading, color: selectedColorScheme.primary}}>
                          About Me
                        </h2>
                        <p className="text-surface-700">
                          {formData.personalInfo.summary}
                        </p>
                      </div>
                    )}
                    
                    {formData.experience.some(exp => exp.company || exp.position) && (
                      <div className="mb-6">
                        <h2 className="text-lg font-bold mb-3 inline-block" style={{
                          fontFamily: selectedTemplate.fonts.heading, 
                          color: selectedColorScheme.primary,
                          borderBottom: `2px solid ${selectedColorScheme.secondary}`
                        }}>
                          Work Experience
                        </h2>
                        
                        {formData.experience.map((exp, index) => (
                          (exp.company || exp.position) && (
                            <div key={index} className="mb-5 pl-4 border-l-2 border-surface-200 hover:border-secondary transition-colors">
                              <div className="flex flex-col mb-1">
                                <h3 className="font-semibold" style={{color: selectedColorScheme.primary}}>
                                  {exp.position || 'Position Title'}
                                </h3>
                                <div className="flex justify-between items-center">
                                  <p className="font-medium">{exp.company || 'Company Name'}</p>
                                  {(exp.startDate || exp.endDate) && (
                                    <p className="text-sm bg-surface-100 px-2 py-0.5 rounded text-surface-600">
                                      {exp.startDate || 'Start Date'} — {exp.endDate || 'End Date'}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {exp.description && (
                                <p className="text-surface-700 mt-1 text-sm">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Sidebar content - 4 columns */}
                  <div className="col-span-12 md:col-span-4">
                    {formData.education.some(edu => edu.institution || edu.degree) && (
                      <div className="mb-6">
                        <h2 className="text-lg font-bold mb-3 inline-block" style={{
                          fontFamily: selectedTemplate.fonts.heading, 
                          color: selectedColorScheme.primary,
                          borderBottom: `2px solid ${selectedColorScheme.secondary}`
                        }}>
                          Education
                        </h2>
                        
                        {formData.education.map((edu, index) => (
                          (edu.institution || edu.degree) && (
                            <div key={index} className="mb-4 bg-surface-50 p-3 rounded">
                              <h3 className="font-semibold">
                                {edu.degree ? edu.degree : 'Degree'}{edu.field ? `, ${edu.field}` : ''}
                              </h3>
                              <p className="text-surface-600 text-sm">{edu.institution || 'Institution Name'}</p>
                              {(edu.startDate || edu.endDate) && (
                                <p className="text-xs text-surface-500 mt-1">
                                  {edu.startDate || 'Start Date'} — {edu.endDate || 'End Date'}
                                </p>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                    )}
                    
                    {formData.skills.some(skill => skill) && (
                      <div>
                        <h2 className="text-lg font-bold mb-3 inline-block" style={{
                          fontFamily: selectedTemplate.fonts.heading, 
                          color: selectedColorScheme.primary,
                          borderBottom: `2px solid ${selectedColorScheme.secondary}`
                        }}>
                          Skills
                        </h2>
                        
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            skill && (
                              <span 
                                key={index}
                                className="px-3 py-1.5 rounded text-sm inline-block mr-2 mb-2"
                                style={{ 
                                  backgroundColor: selectedColorScheme.primary,
                                  color: 'white'
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
          )}
          
          {/* Other template layouts would be implemented similarly */}
          {['single-column', 'header-focus', 'two-column', 'infographic', 'traditional'].includes(selectedTemplate.layout) && (
            <div className="bg-white border border-surface-300 shadow-lg rounded-lg overflow-hidden max-w-[800px] mx-auto p-6 flex justify-center items-center" style={{fontFamily: selectedTemplate.fonts.body, minHeight: '500px'}}>
              <div className="text-center"> 
                <h3 className="text-xl mb-4" style={{fontFamily: selectedTemplate.fonts.heading, color: selectedColorScheme.primary}}>
                  {selectedTemplate.name} Template Preview
                </h3>
                <img 
                  src={selectedTemplate.previewImage} 
                  alt={`${selectedTemplate.name} template preview`} 
                  className="max-w-full rounded-lg shadow-md border border-surface-200"
                />
                <p className="mt-4 text-surface-600">
                  Selected color scheme: <span className="font-medium" style={{color: selectedColorScheme.primary}}>{selectedColorScheme.name}</span>
                </p>
                <p className="mt-2 text-surface-500 text-sm">
                  This template features {selectedTemplate.fonts.heading} headings and {selectedTemplate.fonts.body} body text
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainFeature;