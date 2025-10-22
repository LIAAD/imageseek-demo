import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaInfoCircle, FaVideo } from 'react-icons/fa';
import AboutModal from './AboutModal';
import VideoModal from './VideoModal';
import { useTheme } from '../hooks/useTheme';

import logo_ubi_light from '/src/assets/logo_ubi_light.png';
import logo_ubi_dark from '/src/assets/logo_ubi_dark.png';
import logo_inesctec from '/src/assets/logo_inesctec.png';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update isDarkMode state when theme changes or DOM changes
  useEffect(() => {
    const updateDarkMode = () => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkMode);
    };

    // Initial check
    updateDarkMode();

    // Watch for changes to the 'dark' class on the HTML element
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [theme]);

  const ubiLogo = isDarkMode ? logo_ubi_light : logo_ubi_dark;

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4">
        <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
          {/* First Row - Logos and Links */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            {/* Left side - Logos */}
            <div className="flex items-center space-x-6">
              <img 
                src={ubiLogo} 
                alt="UBI Logo" 
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <img 
                src={logo_inesctec} 
                alt="INESC TEC Logo" 
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            
            {/* Right side - Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/RodrigDuarte/imageseek-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 
                         hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                title={t('footer.github')}
              >
                <FaGithub className="h-3 w-3" />
                <span>{t('footer.github')}</span>
              </a>
              
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 
                         hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
                title={t('footer.video')}
              >
                <FaVideo className="h-3 w-3" />
                <span>{t('footer.video')}</span>
              </button>
              
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 
                         hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
                title={t('footer.about')}
              >
                <FaInfoCircle className="h-3 w-3" />
                <span>{t('footer.about')}</span>
              </button>
            </div>
          </div>

          {/* Second Row - Copyright (centered) */}
          <div className="flex justify-center md:justify-start mt-6">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </div>
          </div>
        </footer>
      </div>

      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </>
  );
};

export default Footer;