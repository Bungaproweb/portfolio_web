import React, { useState, useEffect, useRef } from 'react';
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
import { AnimatedBackground } from './components/AnimatedBackground';
import { ShieldCheck, Edit3, CloudCheck } from 'lucide-react';

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
import {
  subscribeToPortfolio,
  savePortfolioToFirestore,
  PortfolioData,
} from './lib/firebase';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // Default to modern dark mode
  });

  // Firebase connection status
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_admin_auth') === 'true';
  });

  // Admin Modal Open State
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Resume & Preview Modal States
  const [resumeOpen, setResumeOpen] = useState(false);
  const [livePreviewProject, setLivePreviewProject] = useState<Project | null>(null);

  // Editable Portfolio Data States
  const [profile, setProfileState] = useState<Profile>(() => {
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

  const [skills, setSkillsState] = useState<Skill[]>(() => {
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

  const [projects, setProjectsState] = useState<Project[]>(() => {
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

  const [experiences, setExperiencesState] = useState<Experience[]>(() => {
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

  const [education, setEducationState] = useState<Education[]>(() => {
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

  const [certifications, setCertificationsState] = useState<Certification[]>(() => {
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

  const [socialLinks, setSocialLinksState] = useState<SocialLink[]>(() => {
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

  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(() => {
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

  // Track if initial sync from Firestore has happened
  const isInitialSyncFromCloudRef = useRef(false);

  // Real-time synchronization with Firebase Firestore
  useEffect(() => {
    const unsubscribe = subscribeToPortfolio(
      (data) => {
        if (data) {
          if (data.profile) setProfileState(data.profile);
          if (data.skills) setSkillsState(data.skills);
          if (data.projects) setProjectsState(data.projects);
          if (data.experiences) setExperiencesState(data.experiences);
          if (data.education) setEducationState(data.education);
          if (data.certifications) setCertificationsState(data.certifications);
          if (data.socialLinks) setSocialLinksState(data.socialLinks);
          if (data.testimonials) setTestimonialsState(data.testimonials);
          setIsCloudSynced(true);
          isInitialSyncFromCloudRef.current = true;
        }
      },
      (err) => {
        console.warn('Firestore fallback to local state:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sync state changes to Firebase Firestore and LocalStorage
  const syncAllDataToCloud = async (overrideData?: Partial<PortfolioData>) => {
    const currentData: PortfolioData = {
      profile: overrideData?.profile ?? profile,
      skills: overrideData?.skills ?? skills,
      projects: overrideData?.projects ?? projects,
      experiences: overrideData?.experiences ?? experiences,
      education: overrideData?.education ?? education,
      certifications: overrideData?.certifications ?? certifications,
      socialLinks: overrideData?.socialLinks ?? socialLinks,
      testimonials: overrideData?.testimonials ?? testimonials,
    };

    // Save to localStorage
    localStorage.setItem('portfolio_profile', JSON.stringify(currentData.profile));
    localStorage.setItem('portfolio_skills', JSON.stringify(currentData.skills));
    localStorage.setItem('portfolio_projects', JSON.stringify(currentData.projects));
    localStorage.setItem('portfolio_experiences', JSON.stringify(currentData.experiences));
    localStorage.setItem('portfolio_education', JSON.stringify(currentData.education));
    localStorage.setItem('portfolio_certifications', JSON.stringify(currentData.certifications));
    localStorage.setItem('portfolio_social_links', JSON.stringify(currentData.socialLinks));
    localStorage.setItem('portfolio_testimonials', JSON.stringify(currentData.testimonials));

    // Save to Firebase Firestore
    try {
      await savePortfolioToFirestore(currentData);
      setIsCloudSynced(true);
    } catch (err) {
      console.error('Failed saving to Firebase:', err);
    }
  };

  // Wrapped State Setters that also write to Firebase
  const setProfile = (val: React.SetStateAction<Profile>) => {
    setProfileState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ profile: next });
      return next;
    });
  };

  const setSkills = (val: React.SetStateAction<Skill[]>) => {
    setSkillsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ skills: next });
      return next;
    });
  };

  const setProjects = (val: React.SetStateAction<Project[]>) => {
    setProjectsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ projects: next });
      return next;
    });
  };

  const setExperiences = (val: React.SetStateAction<Experience[]>) => {
    setExperiencesState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ experiences: next });
      return next;
    });
  };

  const setEducation = (val: React.SetStateAction<Education[]>) => {
    setEducationState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ education: next });
      return next;
    });
  };

  const setCertifications = (val: React.SetStateAction<Certification[]>) => {
    setCertificationsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ certifications: next });
      return next;
    });
  };

  const setSocialLinks = (val: React.SetStateAction<SocialLink[]>) => {
    setSocialLinksState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ socialLinks: next });
      return next;
    });
  };

  const setTestimonials = (val: React.SetStateAction<Testimonial[]>) => {
    setTestimonialsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      syncAllDataToCloud({ testimonials: next });
      return next;
    });
  };

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

    const defaultData: PortfolioData = {
      profile: profileData,
      skills: skillsData,
      projects: projectsData,
      experiences: experiencesData,
      education: educationData,
      certifications: certificationData,
      socialLinks: socialLinksData,
      testimonials: testimonialsData,
    };

    setProfileState(profileData);
    setSkillsState(skillsData);
    setProjectsState(projectsData);
    setExperiencesState(experiencesData);
    setEducationState(educationData);
    setCertificationsState(certificationData);
    setSocialLinksState(socialLinksData);
    setTestimonialsState(testimonialsData);

    savePortfolioToFirestore(defaultData).catch((e) =>
      console.error('Reset default error:', e)
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] dark:bg-[#12100E] text-stone-900 dark:text-stone-100 transition-colors duration-300 font-sans selection:bg-amber-800 selection:text-white overflow-x-hidden">
      {/* Dynamic Animated React Background */}
      <AnimatedBackground darkMode={darkMode} />

      {/* Main Relative Container Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
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
      </div>

      {/* Floating Admin Mode Pill / Quick Action */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {isCloudSynced && (
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg animate-fade-in">
            <CloudCheck className="w-3.5 h-3.5" />
            <span>Firebase Cloud Sync Aktif</span>
          </div>
        )}
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

