import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import { getIcon } from '../utils/iconUtils';

const Home = ({ darkMode, toggleDarkMode }) => {
  const [selectedTab, setSelectedTab] = useState('editor');
  
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const FileTextIcon = getIcon('file-text');
  const DownloadIcon = getIcon('download');
  
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
              onClick={() => {
                toast.info("Template downloaded as PDF!");
              }}
              className="btn btn-outline text-sm px-3 py-1.5"
            >
              <DownloadIcon className="w-4 h-4 mr-1.5" /> Export
            </button>
            
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
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Create Professional Resumes
          </h1>
          <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl max-w-2xl mx-auto">
            Choose from elegant templates, customize colors, and build your perfect resume in minutes.
          </p>
        </motion.div>

        <div className="mt-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg p-1 bg-surface-200 dark:bg-surface-700">
              <button
                onClick={() => setSelectedTab('editor')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'editor'
                    ? 'bg-white dark:bg-surface-800 text-primary shadow-sm'
                    : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setSelectedTab('preview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'preview'
                    ? 'bg-white dark:bg-surface-800 text-primary shadow-sm'
                    : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          <MainFeature activeTab={selectedTab} />
        </div>
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