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
import { AdminPanel } from './components/AdminPanel';
import { ShieldCheck, Edit3 } from 'lucide-react';

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
import {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  SocialLink,
  Testimonial,
} from './types/portfolio';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // Default to modern dark mode
  });

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_admin_auth') === 'true';
  });

  // Admin Modal Open State
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Resume & Preview Modal States
  const [resumeOpen, setResumeOpen] = useState(false);
  const [livePreviewProject, setLivePreviewProject] = useState<Project | null>(null);

  // Editable Portfolio Data States with LocalStorage Persistence
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing profile state', e);
      }
    }
    return profileData;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing skills state', e);
      }
    }
    return skillsData;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing projects state', e);
      }
    }
    return projectsData;
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('portfolio_experiences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing experiences state', e);
      }
    }
    return experiencesData;
  });

  const [education, setEducation] = useState<Education[]>(() => {
    const saved = localStorage.getItem('portfolio_education');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing education state', e);
      }
    }
    return educationData;
  });

  const [certifications, setCertifications] = useState<Certification[]>(() => {
    const saved = localStorage.getItem('portfolio_certifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing certifications state', e);
      }
    }
    return certificationData;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem('portfolio_social_links');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing social links state', e);
      }
    }
    return socialLinksData;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('portfolio_testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing testimonials state', e);
      }
    }
    return testimonialsData;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('portfolio_education', JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem('portfolio_certifications', JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem('portfolio_social_links', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('portfolio_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Reset to Factory Defaults
  const handleResetToDefaults = () => {
    localStorage.removeItem('portfolio_profile');
    localStorage.removeItem('portfolio_skills');
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_experiences');
    localStorage.removeItem('portfolio_education');
    localStorage.removeItem('portfolio_certifications');
    localStorage.removeItem('portfolio_social_links');
    localStorage.removeItem('portfolio_testimonials');

    setProfile(profileData);
    setSkills(skillsData);
    setProjects(projectsData);
    setExperiences(experiencesData);
    setEducation(educationData);
    setCertifications(certificationData);
    setSocialLinks(socialLinksData);
    setTestimonials(testimonialsData);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Fixed Sticky Navbar */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
        isAuthenticated={isAuthenticated}
      />

      {/* Main Sections Flow */}
      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* About Section */}
        <About
          profile={profile}
          experiences={experiences}
          education={education}
          certifications={certifications}
        />

        {/* Skills Section */}
        <Skills skills={skills} />

        {/* Projects Section */}
        <Projects
          projects={projects}
          onOpenLivePreview={(project) => setLivePreviewProject(project)}
        />

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonials} />

        {/* Contact Section */}
        <Contact
          profile={profile}
          socialLinks={socialLinks}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        socialLinks={socialLinks}
      />

      {/* Floating Admin Mode Pill / Quick Action */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setAdminPanelOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm font-bold ${
            isAuthenticated
              ? 'bg-emerald-600/90 hover:bg-emerald-600 text-white border-emerald-400/40 shadow-emerald-900/20'
              : 'bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 border-gray-700 dark:border-gray-200'
          }`}
          id="floating-admin-btn"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isAuthenticated ? 'Kelola Beranda (Admin Mode)' : 'Mode Admin'}</span>
          <Edit3 className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        experiences={experiences}
        education={education}
        certifications={certifications}
        skills={skills}
      />

      {/* Live Interactive Project Preview Modal */}
      <LivePreviewModal
        project={livePreviewProject}
        onClose={() => setLivePreviewProject(null)}
      />

      {/* Admin Panel & Authentication Modal */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        profile={profile}
        setProfile={setProfile}
        skills={skills}
        setSkills={setSkills}
        projects={projects}
        setProjects={setProjects}
        experiences={experiences}
        setExperiences={setExperiences}
        education={education}
        setEducation={setEducation}
        certifications={certifications}
        setCertifications={setCertifications}
        socialLinks={socialLinks}
        setSocialLinks={setSocialLinks}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        onResetToDefaults={handleResetToDefaults}
      />
    </div>
  );
}

