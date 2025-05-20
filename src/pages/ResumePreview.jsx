import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import { useResumeContext } from '../contexts/ResumeContext';
import MainFeature from '../components/MainFeature';

const ResumePreview = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { selectedTemplate, formData } = useResumeContext();
  
  // Get icons
  const ArrowLeftIcon = getIcon('arrow-left');
  const DownloadIcon = getIcon('download');

  // Navigate back to details
  const handleBack = () => {
    navigate('/resume-details');
  };

  // Handle download
  const handleDownload = () => {
    toast.success("Your resume has been downloaded!");
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
          Step 3: Review Your Resume
        </h1>
        <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl max-w-2xl mx-auto">
          Check how your resume looks and download it when you're satisfied.
        </p>
      </motion.div>
      
      <MainFeature activeTab="preview" />
      
      <div className="flex justify-between mt-8">
        <button onClick={handleBack} className="btn btn-outline flex items-center gap-2"><ArrowLeftIcon className="w-5 h-5" /> Back to Edit</button>
        <button onClick={handleDownload} className="btn btn-primary flex items-center gap-2">Download PDF <DownloadIcon className="w-5 h-5" /></button>
      </div>
    </div>
  );
};

export default ResumePreview;