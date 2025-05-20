import React, { createContext, useState, useContext } from 'react';

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

// Create context
const ResumeContext = createContext();

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  // State for resume data
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedColorScheme, setSelectedColorScheme] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [currentSection, setCurrentSection] = useState('personalInfo');
  const [currentStep, setCurrentStep] = useState(1); // 1: Template Selection, 2: Details, 3: Preview

  // Function to reset all data
  const resetData = () => {
    setSelectedTemplate(null);
    setSelectedColorScheme(null);
    setFormData(initialFormState);
    setCurrentSection('personalInfo');
    setCurrentStep(1);
  };

  // Function to go to the next step
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  // Function to go to the previous step
  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <ResumeContext.Provider
      value={{
        selectedTemplate,
        setSelectedTemplate,
        selectedColorScheme,
        setSelectedColorScheme,
        formData,
        setFormData,
        currentSection,
        setCurrentSection,
        currentStep,
        goToNextStep,
        goToPrevStep,
        resetData
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};