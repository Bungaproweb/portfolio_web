import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { LivePreviewModal } from './components/LivePreviewModal';

import {
  profileData,
  skillsData,
  projectsData,
  experiencesData,
  educationData,
  certificationData,
  socialLinksData,
  testimonialsData,
} from './data/portfolioData';
import { Project } from './types/portfolio';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // Default to modern dark mode
  });

  const [resumeOpen, setResumeOpen] = useState(false);
  const [livePreviewProject, setLivePreviewProject] = useState<Project | null>(null);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Fixed Sticky Navbar */}
      <Navbar
        profile={profileData}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Sections Flow */}
      <main>
        {/* Hero Section */}
        <Hero
          profile={profileData}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* About Section */}
        <About
          profile={profileData}
          experiences={experiencesData}
          education={educationData}
          certifications={certificationData}
        />

        {/* Skills Section */}
        <Skills skills={skillsData} />

        {/* Projects Section */}
        <Projects
          projects={projectsData}
          onOpenLivePreview={(project) => setLivePreviewProject(project)}
        />

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonialsData} />

        {/* Contact Section */}
        <Contact
          profile={profileData}
          socialLinks={socialLinksData}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profileData}
        socialLinks={socialLinksData}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profileData}
        experiences={experiencesData}
        education={educationData}
        certifications={certificationData}
        skills={skillsData}
      />

      {/* Live Interactive Project Preview Modal */}
      <LivePreviewModal
        project={livePreviewProject}
        onClose={() => setLivePreviewProject(null)}
      />
    </div>
  );
}
