import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Home = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const FileTextIcon = getIcon('file-text');
  const ArrowRightIcon = getIcon('arrow-right');
  
  const handleStartClick = () => {
    navigate('/template-selection');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileTextIcon className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-surface-800 dark:text-white">
              Resu<span className="text-primary">Craft</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-300" />
              ) : (
                <MoonIcon className="w-5 h-5 text-surface-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-16 text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Create Professional Resumes
          </h1>
          <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl max-w-2xl mx-auto">
            Choose from elegant templates, customize colors, and build your perfect resume in minutes.
          </p>
          <button 
            onClick={handleStartClick}
            className="btn btn-primary px-8 py-3 text-lg mt-10 flex items-center gap-2 mx-auto"
          >
            Get Started <ArrowRightIcon className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Feature boxes */}
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(getIcon('layout-template'), { className: "w-8 h-8 text-primary" })}
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose a Template</h3>
            <p className="text-surface-600 dark:text-surface-400">Select from professionally designed templates tailored for different industries and career levels.</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(getIcon('edit-3'), { className: "w-8 h-8 text-primary" })}
            </div>
            <h3 className="text-xl font-semibold mb-2">Fill Your Details</h3>
            <p className="text-surface-600 dark:text-surface-400">Easily add your professional experience, education, skills and more with our intuitive editor.</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(getIcon('download'), { className: "w-8 h-8 text-primary" })}
            </div>
            <h3 className="text-xl font-semibold mb-2">Download & Share</h3>
            <p className="text-surface-600 dark:text-surface-400">Preview your resume, make adjustments, and download a polished PDF ready for job applications.</p>
          </div>
        </motion.div>
      </main>
      
      <footer className="mt-auto py-6 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
          <p>© {new Date().getFullYear()} ResuCraft. Create professional resumes with ease.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;