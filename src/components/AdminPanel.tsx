import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  LogOut,
  User,
  Key,
  ShieldCheck,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Check,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  MessageSquare,
  Share2,
  Sparkles,
  Layers,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  SocialLink,
  Testimonial
} from '../types/portfolio';
import { formatImageUrl, isGoogleDriveUrl } from '../utils/imageUtils';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;

  // Data & Mutators
  profile: Profile;
  setProfile: (data: Profile) => void;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
  certifications: Certification[];
  setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;

  onResetToDefaults: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  setIsAuthenticated,
  profile,
  setProfile,
  skills,
  setSkills,
  projects,
  setProjects,
  experiences,
  setExperiences,
  education,
  setEducation,
  certifications,
  setCertifications,
  socialLinks,
  setSocialLinks,
  testimonials,
  setTestimonials,
  onResetToDefaults,
}) => {
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Password Settings
  const [storedAdminEmail, setStoredAdminEmail] = useState(() => {
    return localStorage.getItem('portfolio_admin_email') || 'admin@portfolio.com';
  });
  const [storedAdminPassword, setStoredAdminPassword] = useState(() => {
    return localStorage.getItem('portfolio_admin_password') || 'admin123';
  });
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'profile' | 'skills' | 'projects' | 'experiences' | 'testimonials' | 'socials' | 'security'
  >('profile');

  // Form Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (email.trim().toLowerCase() === storedAdminEmail.toLowerCase() || email.trim() === 'admin') &&
      password === storedAdminPassword
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('portfolio_admin_auth', 'true');
      setLoginError('');
      showToast('Berhasil masuk sebagai Admin!');
    } else {
      setLoginError('Email atau kata sandi tidak cocok. Gunakan kredensial demo jika diperlukan.');
    }
  };

  // Quick Demo Login Fill
  const fillDemoCreds = () => {
    setEmail(storedAdminEmail);
    setPassword(storedAdminPassword);
    setLoginError('');
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolio_admin_auth');
    showToast('Anda telah keluar dari mode admin.');
  };

  // Update Security Creds
  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminEmail.trim()) {
      localStorage.setItem('portfolio_admin_email', newAdminEmail.trim());
      setStoredAdminEmail(newAdminEmail.trim());
    }
    if (newAdminPassword.trim()) {
      localStorage.setItem('portfolio_admin_password', newAdminPassword.trim());
      setStoredAdminPassword(newAdminPassword.trim());
    }
    setSecuritySuccess('Kredensial login admin berhasil diperbarui!');
    setNewAdminEmail('');
    setNewAdminPassword('');
    setTimeout(() => setSecuritySuccess(''), 4000);
  };

  // ----------------------------------------------------
  // PROFILE EDIT FORM STATE
  // ----------------------------------------------------
  const [profileForm, setProfileForm] = useState<Profile>(profile);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(profileForm);
    localStorage.setItem('portfolio_profile', JSON.stringify(profileForm));
    showToast('Profil beranda berhasil diperbarui!');
  };

  // ----------------------------------------------------
  // SKILLS EDIT FORM STATE
  // ----------------------------------------------------
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    name: '',
    category: 'frontend',
    categoryLabel: 'Frontend',
    proficiency: 80,
    level: 'Mahir',
    iconName: 'Code',
    years: '2+ Tahun',
    description: '',
  });

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name?.trim()) return;

    if (editingSkillId) {
      setSkills((prev) =>
        prev.map((s) =>
          s.id === editingSkillId
            ? ({ ...s, ...skillForm } as Skill)
            : s
        )
      );
      showToast('Keahlian berhasil diperbarui!');
    } else {
      const newSkill: Skill = {
        id: 'skill_' + Date.now(),
        name: skillForm.name || 'Keahlian Baru',
        category: skillForm.category || 'frontend',
        categoryLabel:
          skillForm.category === 'frontend'
            ? 'Frontend'
            : skillForm.category === 'backend'
            ? 'Backend'
            : skillForm.category === 'design'
            ? 'Design & UI/UX'
            : 'Tools & DevOps',
        proficiency: Number(skillForm.proficiency) || 80,
        level: skillForm.level || 'Mahir',
        iconName: skillForm.iconName || 'Code',
        years: skillForm.years || '1+ Tahun',
        description: skillForm.description || '',
      };
      setSkills((prev) => [...prev, newSkill]);
      showToast('Keahlian baru berhasil ditambahkan!');
    }

    setEditingSkillId(null);
    setSkillForm({
      name: '',
      category: 'frontend',
      categoryLabel: 'Frontend',
      proficiency: 80,
      level: 'Mahir',
      iconName: 'Code',
      years: '2+ Tahun',
      description: '',
    });
  };

  const handleEditSkillClick = (s: Skill) => {
    setEditingSkillId(s.id);
    setSkillForm(s);
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus keahlian ini?')) {
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showToast('Keahlian berhasil dihapus.');
    }
  };

  // ----------------------------------------------------
  // PROJECTS EDIT FORM STATE
  // ----------------------------------------------------
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    description: '',
    fullDescription: '',
    category: 'web',
    categoryLabel: 'Web App',
    featured: false,
    imageUrl: '',
    tags: [],
    liveUrl: '',
    githubUrl: '',
    highlights: [],
    challenge: '',
    solution: '',
    client: '',
    year: '2024',
  });
  const [tagInput, setTagInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title?.trim()) return;

    const tagsArr = Array.isArray(projectForm.tags) ? projectForm.tags : [];
    const highlightsArr = Array.isArray(projectForm.highlights) ? projectForm.highlights : [];

    if (editingProjectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProjectId
            ? ({
                ...p,
                ...projectForm,
                tags: tagsArr,
                highlights: highlightsArr,
                gallery: projectForm.imageUrl ? [projectForm.imageUrl] : p.gallery,
              } as Project)
            : p
        )
      );
      showToast('Proyek berhasil diperbarui!');
    } else {
      const newProj: Project = {
        id: 'proj_' + Date.now(),
        title: projectForm.title || 'Proyek Baru',
        subtitle: projectForm.subtitle || '',
        description: projectForm.description || '',
        fullDescription: projectForm.fullDescription || projectForm.description || '',
        category: projectForm.category || 'web',
        categoryLabel:
          projectForm.category === 'web'
            ? 'Web App'
            : projectForm.category === 'saas'
            ? 'SaaS & Dashboard'
            : projectForm.category === 'mobile'
            ? 'Mobile Responsive'
            : 'UI/UX Design',
        featured: Boolean(projectForm.featured),
        imageUrl:
          projectForm.imageUrl ||
          'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          projectForm.imageUrl ||
            'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        ],
        tags: tagsArr.length > 0 ? tagsArr : ['React', 'Tailwind CSS'],
        liveUrl: projectForm.liveUrl || 'https://example.com',
        githubUrl: projectForm.githubUrl || 'https://github.com',
        highlights: highlightsArr.length > 0 ? highlightsArr : ['Antarmuka Responsif Modern'],
        challenge: projectForm.challenge || 'Optimasi performa & kenyamanan pengguna.',
        solution: projectForm.solution || 'Implementasi arsitektur modular yang cepat.',
        client: projectForm.client || 'Klien Mandiri',
        year: projectForm.year || '2024',
      };
      setProjects((prev) => [newProj, ...prev]);
      showToast('Proyek baru berhasil ditambahkan!');
    }

    setEditingProjectId(null);
    setProjectForm({
      title: '',
      subtitle: '',
      description: '',
      fullDescription: '',
      category: 'web',
      categoryLabel: 'Web App',
      featured: false,
      imageUrl: '',
      tags: [],
      liveUrl: '',
      githubUrl: '',
      highlights: [],
      challenge: '',
      solution: '',
      client: '',
      year: '2024',
    });
    setTagInput('');
    setHighlightInput('');
  };

  const handleEditProjectClick = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectForm(p);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Proyek berhasil dihapus.');
    }
  };

  // ----------------------------------------------------
  // EXPERIENCES & EDUCATION STATE
  // ----------------------------------------------------
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<Partial<Experience>>({
    role: '',
    company: '',
    period: '',
    location: '',
    description: '',
    skillsUsed: [],
    type: 'Full-time',
  });

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.role?.trim()) return;

    if (editingExpId) {
      setExperiences((prev) =>
        prev.map((x) =>
          x.id === editingExpId ? ({ ...x, ...expForm } as Experience) : x
        )
      );
      showToast('Pengalaman kerja diperbarui!');
    } else {
      const newExp: Experience = {
        id: 'exp_' + Date.now(),
        role: expForm.role || 'Peran Baru',
        company: expForm.company || 'Perusahaan',
        period: expForm.period || '2023 - Sekarang',
        location: expForm.location || 'Indonesia',
        description: expForm.description || '',
        skillsUsed: expForm.skillsUsed || ['React'],
        type: expForm.type || 'Full-time',
      };
      setExperiences((prev) => [newExp, ...prev]);
      showToast('Pengalaman kerja baru ditambahkan!');
    }

    setEditingExpId(null);
    setExpForm({
      role: '',
      company: '',
      period: '',
      location: '',
      description: '',
      skillsUsed: [],
      type: 'Full-time',
    });
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm('Hapus pengalaman kerja ini?')) {
      setExperiences((prev) => prev.filter((x) => x.id !== id));
      showToast('Pengalaman kerja dihapus.');
    }
  };

  // ----------------------------------------------------
  // TESTIMONIALS STATE
  // ----------------------------------------------------
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    company: '',
    avatarUrl: '',
    content: '',
    rating: 5,
  });

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name?.trim()) return;

    if (editingTestimonialId) {
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === editingTestimonialId ? ({ ...t, ...testimonialForm } as Testimonial) : t
        )
      );
      showToast('Testimoni berhasil diperbarui!');
    } else {
      const newT: Testimonial = {
        id: 't_' + Date.now(),
        name: testimonialForm.name || 'Klien',
        role: testimonialForm.role || 'CEO',
        company: testimonialForm.company || 'Perusahaan',
        avatarUrl:
          testimonialForm.avatarUrl ||
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        content: testimonialForm.content || 'Hasil kerja sangat memuaskan!',
        rating: Number(testimonialForm.rating) || 5,
      };
      setTestimonials((prev) => [...prev, newT]);
      showToast('Testimoni baru ditambahkan!');
    }

    setEditingTestimonialId(null);
    setTestimonialForm({
      name: '',
      role: '',
      company: '',
      avatarUrl: '',
      content: '',
      rating: 5,
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Hapus testimoni ini?')) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast('Testimoni dihapus.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        {/* Main Admin Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl my-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          id="admin-panel-modal"
        >
          {/* Toast Notification Banner */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-full shadow-lg font-medium text-xs sm:text-sm flex items-center gap-2 border border-emerald-400/30"
              >
                <Check className="w-4 h-4" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Header Bar */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>Panel Kelola Beranda</span>
                  {isAuthenticated && (
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      Terautentikasi
                    </span>
                  )}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isAuthenticated
                    ? 'Edit konten beranda secara langsung dan tersimpan permanen'
                    : 'Masuk dengan kredensial admin untuk mengakses editor'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 text-xs font-semibold transition-colors border border-red-200 dark:border-red-900/50"
                  title="Keluar dari mode admin"
                  id="admin-logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                id="close-admin-panel-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          {!isAuthenticated ? (
            /* LOGIN VIEW */
            <div className="p-6 sm:p-10 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700/80 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Autentikasi Admin
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Silakan masuk untuk mengedit semua informasi beranda.
                  </p>
                </div>

                {loginError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Email / Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@portfolio.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        id="admin-login-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        id="admin-login-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md active:scale-[0.98]"
                    id="admin-login-submit"
                  >
                    Masuk ke Admin Panel
                  </button>
                </form>

                {/* Demo Helper Box */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/60 text-center">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">
                    Kredensial Bawaan Demo:
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 px-3 py-1.5 rounded-lg text-xs font-mono text-blue-700 dark:text-blue-300">
                    <span>{storedAdminEmail}</span>
                    <span>/</span>
                    <span>{storedAdminPassword}</span>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={fillDemoCreds}
                      className="mt-2.5 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Isi Otomatis Kredensial Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* AUTHENTICATED EDITOR VIEW WITH TABS */
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Left Sidebar Navigation Tabs */}
              <div className="w-full md:w-64 bg-gray-50/80 dark:bg-gray-800/40 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left shrink-0 ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800'
                  }`}
                  id="tab-profile"
                >
                  <User className="w-4 h-4 shrink-0" />
                  <span>Profil & Hero</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left shrink-0 ${
                    activeTab === 'skills'
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800'
                  }`}
                  id="tab-skills"
                >
                  <Code2 className="w-4 h-4 shrink-0" />
                  <span>Keahlian ({skills.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left shrink-0 ${
                    activeTab === 'projects'
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800'
                  }`}
                  id="tab-projects"
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>Proyek ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('experiences')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left shrink-0 ${
                    activeTab === 'experiences'
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800'
                  }`}
                  id="tab-experiences"
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Pengalaman ({experiences.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left shrink-0 ${
                    activeTab === 'testimonials'
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800'
                  }`}
                  id="tab-testimonials"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Testimoni ({testimonials.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left shrink-0 md:mt-auto ${
                    activeTab === 'security'
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800'
                  }`}
                  id="tab-security"
                >
                  <Key className="w-4 h-4 shrink-0" />
                  <span>Autentikasi & Reset</span>
                </button>
              </div>

              {/* Main Panel Content Area */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                {/* ---------------- PROFILE TAB ---------------- */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Edit Profil & Bio Beranda
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Ubah nama, status, foto, bio, dan kontak utama yang tampil di beranda.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Nama Lengkap
                          </label>
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, name: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Judul / Peran Utama
                          </label>
                          <input
                            type="text"
                            value={profileForm.title}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, title: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Sub-Judul Hero Section
                          </label>
                          <input
                            type="text"
                            value={profileForm.subTitle}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, subTitle: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Google Drive Info Banner */}
                        <div className="sm:col-span-2 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5 shadow-sm">
                            <Share2 className="w-4 h-4" />
                          </div>
                          <div className="text-xs text-blue-950 dark:text-blue-200 space-y-1">
                            <div className="font-bold text-sm flex items-center gap-2">
                              <span>💡 Mendukung Link Gambar Google Drive</span>
                              <span className="text-[10px] bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full font-semibold">
                                Auto-Convert
                              </span>
                            </div>
                            <p className="leading-relaxed">
                              Anda dapat menempelkan link Google Drive (contoh: <code className="bg-blue-100 dark:bg-blue-900/80 px-1.5 py-0.5 rounded text-[11px] font-mono">https://drive.google.com/file/d/1A2B3.../view?usp=sharing</code>). Sistem akan otomatis mengonversinya menjadi URL foto publik.
                            </p>
                            <p className="text-blue-700 dark:text-blue-300 font-medium">
                              ⚠️ Catatan: Pastikan izin berbagi di Google Drive diubah ke <strong>"Siapa saja yang memiliki link" (Anyone with the link)</strong>.
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            URL Foto Profil (Avatar Hero)
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={profileForm.avatarUrl}
                              onChange={(e) => {
                                const val = e.target.value;
                                setProfileForm({
                                  ...profileForm,
                                  avatarUrl: isGoogleDriveUrl(val) ? formatImageUrl(val) : val,
                                });
                              }}
                              placeholder="https://drive.google.com/file/d/... atau https://..."
                              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                            />
                            {profileForm.avatarUrl && (
                              <img
                                src={formatImageUrl(profileForm.avatarUrl)}
                                alt="Avatar Preview"
                                className="w-10 h-10 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0 bg-gray-900"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </div>
                          {isGoogleDriveUrl(profileForm.avatarUrl) && (
                            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Link Google Drive terdeteksi & terkonversi
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            URL Foto Seksi Tentang (About Image)
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={profileForm.aboutImageUrl}
                              onChange={(e) => {
                                const val = e.target.value;
                                setProfileForm({
                                  ...profileForm,
                                  aboutImageUrl: isGoogleDriveUrl(val) ? formatImageUrl(val) : val,
                                });
                              }}
                              placeholder="https://drive.google.com/file/d/... atau https://..."
                              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                            />
                            {profileForm.aboutImageUrl && (
                              <img
                                src={formatImageUrl(profileForm.aboutImageUrl)}
                                alt="About Image Preview"
                                className="w-10 h-10 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0 bg-gray-900"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </div>
                          {isGoogleDriveUrl(profileForm.aboutImageUrl) && (
                            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Link Google Drive terdeteksi & terkonversi
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Bio Lengkap (Seksi Tentang Saya)
                          </label>
                          <textarea
                            rows={3}
                            value={profileForm.bio}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, bio: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Bio Singkat (Hero Section)
                          </label>
                          <input
                            type="text"
                            value={profileForm.shortBio}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, shortBio: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Lokasi
                          </label>
                          <input
                            type="text"
                            value={profileForm.location}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, location: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Status Ketersediaan
                          </label>
                          <input
                            type="text"
                            value={profileForm.status}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, status: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Email Kontak
                          </label>
                          <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, email: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Nomor Telepon
                          </label>
                          <input
                            type="text"
                            value={profileForm.phone}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, phone: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Nomor WhatsApp (cth: 6281234567890)
                          </label>
                          <input
                            type="text"
                            value={profileForm.whatsappNumber}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, whatsappNumber: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* STATS */}
                        <div className="sm:col-span-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                            Statistik & Angka Pengalaman
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">
                                Pengalaman (Tahun)
                              </label>
                              <input
                                type="number"
                                value={profileForm.yearsOfExperience}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    yearsOfExperience: Number(e.target.value),
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">
                                Proyek Selesai
                              </label>
                              <input
                                type="number"
                                value={profileForm.completedProjects}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    completedProjects: Number(e.target.value),
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">
                                Klien Puas
                              </label>
                              <input
                                type="number"
                                value={profileForm.happyClients}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    happyClients: Number(e.target.value),
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">
                                Tingkat Kepuasan
                              </label>
                              <input
                                type="text"
                                value={profileForm.satisfactionRate}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    satisfactionRate: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md"
                        >
                          <Save className="w-4 h-4" />
                          <span>Simpan Perubahan Profil</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ---------------- SKILLS TAB ---------------- */}
                {activeTab === 'skills' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Kelola Keahlian & Teknologi
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Tambah, edit, atau hapus keahlian teknis yang ditampilkan di beranda.
                      </p>
                    </div>

                    {/* Skill Form Box */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                        {editingSkillId ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
                      </h4>

                      <form onSubmit={handleSaveSkill} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Nama Keahlian
                            </label>
                            <input
                              type="text"
                              placeholder="cth: React.js, GraphQL"
                              value={skillForm.name || ''}
                              onChange={(e) =>
                                setSkillForm({ ...skillForm, name: e.target.value })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Kategori
                            </label>
                            <select
                              value={skillForm.category || 'frontend'}
                              onChange={(e) => {
                                const cat = e.target.value as any;
                                setSkillForm({
                                  ...skillForm,
                                  category: cat,
                                  categoryLabel:
                                    cat === 'frontend'
                                      ? 'Frontend'
                                      : cat === 'backend'
                                      ? 'Backend'
                                      : cat === 'design'
                                      ? 'Design & UI/UX'
                                      : 'Tools & DevOps',
                                });
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            >
                              <option value="frontend">Frontend</option>
                              <option value="backend">Backend</option>
                              <option value="design">Design & UI/UX</option>
                              <option value="tools">Tools & DevOps</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Kemahiran ({skillForm.proficiency || 80}%)
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={skillForm.proficiency || 80}
                              onChange={(e) =>
                                setSkillForm({
                                  ...skillForm,
                                  proficiency: Number(e.target.value),
                                })
                              }
                              className="w-full accent-blue-600"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Tingkat Keahlian
                            </label>
                            <select
                              value={skillForm.level || 'Mahir'}
                              onChange={(e) =>
                                setSkillForm({ ...skillForm, level: e.target.value as any })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            >
                              <option value="Pemula">Pemula</option>
                              <option value="Menengah">Menengah</option>
                              <option value="Mahir">Mahir</option>
                              <option value="Ahli">Ahli</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Lama Pengalaman
                            </label>
                            <input
                              type="text"
                              placeholder="cth: 3+ Tahun"
                              value={skillForm.years || ''}
                              onChange={(e) =>
                                setSkillForm({ ...skillForm, years: e.target.value })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Deskripsi / Catatan Singkat
                            </label>
                            <input
                              type="text"
                              placeholder="Keahlian spesifik atau penggunaan"
                              value={skillForm.description || ''}
                              onChange={(e) =>
                                setSkillForm({ ...skillForm, description: e.target.value })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                          {editingSkillId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingSkillId(null);
                                setSkillForm({
                                  name: '',
                                  category: 'frontend',
                                  categoryLabel: 'Frontend',
                                  proficiency: 80,
                                  level: 'Mahir',
                                  iconName: 'Code',
                                  years: '2+ Tahun',
                                  description: '',
                                });
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              Batal Edit
                            </button>
                          )}
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-md"
                          >
                            <Plus className="w-4 h-4" />
                            <span>{editingSkillId ? 'Update Keahlian' : 'Tambah Keahlian'}</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Skill List Table */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Daftar Keahlian Saat Ini ({skills.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                        {skills.map((s) => (
                          <div
                            key={s.id}
                            className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3 shadow-xs"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
                                  {s.name}
                                </span>
                                <span className="text-[10px] bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-semibold">
                                  {s.proficiency}%
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                {s.categoryLabel} • {s.level} ({s.years})
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditSkillClick(s)}
                                className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg"
                                title="Edit keahlian ini"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSkill(s.id)}
                                className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg"
                                title="Hapus keahlian ini"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------- PROJECTS TAB ---------------- */}
                {activeTab === 'projects' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Kelola Proyek Portfolio
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Tambah proyek baru, edit detail proyek, link live preview, atau foto galeri.
                      </p>
                    </div>

                    {/* Project Form Box */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                        {editingProjectId ? 'Edit Detail Proyek' : 'Tambah Proyek Baru'}
                      </h4>

                      <form onSubmit={handleSaveProject} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Judul Proyek
                            </label>
                            <input
                              type="text"
                              value={projectForm.title || ''}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, title: e.target.value })
                              }
                              placeholder="cth: NusaCart E-Commerce"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Sub-Judul Ringkas
                            </label>
                            <input
                              type="text"
                              value={projectForm.subtitle || ''}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, subtitle: e.target.value })
                              }
                              placeholder="cth: Platform Toko Online Berkecepatan Tinggi"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Kategori Proyek
                            </label>
                            <select
                              value={projectForm.category || 'web'}
                              onChange={(e) => {
                                const cat = e.target.value as any;
                                setProjectForm({
                                  ...projectForm,
                                  category: cat,
                                  categoryLabel:
                                    cat === 'web'
                                      ? 'Web App'
                                      : cat === 'saas'
                                      ? 'SaaS & Dashboard'
                                      : cat === 'mobile'
                                      ? 'Mobile Responsive'
                                      : 'UI/UX Design',
                                });
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            >
                              <option value="web">Web App</option>
                              <option value="saas">SaaS & Dashboard</option>
                              <option value="mobile">Mobile Responsive</option>
                              <option value="design">UI/UX Design</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Tahun Selesai
                            </label>
                            <input
                              type="text"
                              value={projectForm.year || '2024'}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, year: e.target.value })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              URL Sampul Gambar Proyek (Mendukung Link Google Drive)
                            </label>
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={projectForm.imageUrl || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProjectForm({
                                    ...projectForm,
                                    imageUrl: isGoogleDriveUrl(val) ? formatImageUrl(val) : val,
                                  });
                                }}
                                placeholder="https://drive.google.com/file/d/... atau https://..."
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              />
                              {projectForm.imageUrl && (
                                <img
                                  src={formatImageUrl(projectForm.imageUrl)}
                                  alt="Project Preview"
                                  className="w-12 h-9 rounded-lg object-cover border border-gray-200 dark:border-gray-700 shrink-0 bg-gray-900"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                            </div>
                            {isGoogleDriveUrl(projectForm.imageUrl || '') && (
                              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Link Google Drive terdeteksi & terkonversi
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Deskripsi Singkat (Card View)
                            </label>
                            <textarea
                              rows={2}
                              value={projectForm.description || ''}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, description: e.target.value })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              URL Live Demo
                            </label>
                            <input
                              type="text"
                              value={projectForm.liveUrl || ''}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, liveUrl: e.target.value })
                              }
                              placeholder="https://example.com"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              URL GitHub Repository
                            </label>
                            <input
                              type="text"
                              value={projectForm.githubUrl || ''}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, githubUrl: e.target.value })
                              }
                              placeholder="https://github.com/example/repo"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="featured-checkbox"
                              checked={Boolean(projectForm.featured)}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, featured: e.target.checked })
                              }
                              className="w-4 h-4 accent-blue-600 rounded"
                            />
                            <label
                              htmlFor="featured-checkbox"
                              className="text-xs font-semibold text-gray-800 dark:text-gray-200"
                            >
                              Tampilkan sebagai Proyek Unggulan (Featured Project)
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                          {editingProjectId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProjectId(null);
                                setProjectForm({
                                  title: '',
                                  subtitle: '',
                                  description: '',
                                  fullDescription: '',
                                  category: 'web',
                                  categoryLabel: 'Web App',
                                  featured: false,
                                  imageUrl: '',
                                  tags: [],
                                  liveUrl: '',
                                  githubUrl: '',
                                  highlights: [],
                                  challenge: '',
                                  solution: '',
                                  client: '',
                                  year: '2024',
                                });
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              Batal Edit
                            </button>
                          )}
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-md"
                          >
                            <Plus className="w-4 h-4" />
                            <span>{editingProjectId ? 'Update Proyek' : 'Tambah Proyek'}</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Project List */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Daftar Proyek Beranda ({projects.length})
                      </h4>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {projects.map((p) => (
                          <div
                            key={p.id}
                            className="p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4 shadow-xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-200 dark:border-gray-700"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                                    {p.title}
                                  </h5>
                                  {p.featured && (
                                    <span className="text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-semibold">
                                      Unggulan
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                  {p.categoryLabel} • {p.year} • {p.tags.join(', ')}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleEditProjectClick(p)}
                                className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg"
                                title="Edit proyek ini"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(p.id)}
                                className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg"
                                title="Hapus proyek ini"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------- EXPERIENCES TAB ---------------- */}
                {activeTab === 'experiences' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Pengalaman Kerja & Karir
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Tambah atau edit riwayat pengalaman kerja yang muncul di seksi Tentang Saya.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                        {editingExpId ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
                      </h4>

                      <form onSubmit={handleSaveExperience} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Peran / Jabatan
                            </label>
                            <input
                              type="text"
                              value={expForm.role || ''}
                              onChange={(e) =>
                                setExpForm({ ...expForm, role: e.target.value })
                              }
                              placeholder="cth: Senior Frontend Developer"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Nama Perusahaan
                            </label>
                            <input
                              type="text"
                              value={expForm.company || ''}
                              onChange={(e) =>
                                setExpForm({ ...expForm, company: e.target.value })
                              }
                              placeholder="cth: PT Tech Innovation"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Periode
                            </label>
                            <input
                              type="text"
                              value={expForm.period || ''}
                              onChange={(e) =>
                                setExpForm({ ...expForm, period: e.target.value })
                              }
                              placeholder="cth: 2023 - Sekarang"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Tipe Pekerjaan
                            </label>
                            <select
                              value={expForm.type || 'Full-time'}
                              onChange={(e) =>
                                setExpForm({ ...expForm, type: e.target.value as any })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            >
                              <option value="Full-time">Full-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Freelance">Freelance</option>
                              <option value="Internship">Internship</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Deskripsi Tanggung Jawab
                            </label>
                            <textarea
                              rows={2}
                              value={expForm.description || ''}
                              onChange={(e) =>
                                setExpForm({ ...expForm, description: e.target.value })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1">
                          {editingExpId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingExpId(null);
                                setExpForm({
                                  role: '',
                                  company: '',
                                  period: '',
                                  location: '',
                                  description: '',
                                  skillsUsed: [],
                                  type: 'Full-time',
                                });
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-400"
                            >
                              Batal
                            </button>
                          )}
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-md"
                          >
                            <Plus className="w-4 h-4" />
                            <span>
                              {editingExpId ? 'Update Pengalaman' : 'Tambah Pengalaman'}
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {experiences.map((x) => (
                        <div
                          key={x.id}
                          className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between"
                        >
                          <div>
                            <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                              {x.role} <span className="font-normal text-xs text-gray-500">at {x.company}</span>
                            </h5>
                            <p className="text-[11px] text-gray-500">{x.period} • {x.type}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingExpId(x.id);
                                setExpForm(x);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteExperience(x.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------- TESTIMONIALS TAB ---------------- */}
                {activeTab === 'testimonials' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Testimoni & Rekomendasi Klien
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Tambah ulasan klien baru atau ubah testimoni yang sudah ada.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                        {editingTestimonialId ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
                      </h4>

                      <form onSubmit={handleSaveTestimonial} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Nama Klien
                            </label>
                            <input
                              type="text"
                              value={testimonialForm.name || ''}
                              onChange={(e) =>
                                setTestimonialForm({ ...testimonialForm, name: e.target.value })
                              }
                              placeholder="cth: Budi Santoso"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Jabatan / Perusahaan
                            </label>
                            <input
                              type="text"
                              value={testimonialForm.role || ''}
                              onChange={(e) =>
                                setTestimonialForm({ ...testimonialForm, role: e.target.value })
                              }
                              placeholder="cth: CEO di Nusa Retail Indo"
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              URL Foto Avatar Klien (Mendukung Link Google Drive)
                            </label>
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={testimonialForm.avatarUrl || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setTestimonialForm({
                                    ...testimonialForm,
                                    avatarUrl: isGoogleDriveUrl(val) ? formatImageUrl(val) : val,
                                  });
                                }}
                                placeholder="https://drive.google.com/file/d/... atau https://..."
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                              />
                              {testimonialForm.avatarUrl && (
                                <img
                                  src={formatImageUrl(testimonialForm.avatarUrl)}
                                  alt="Testimonial Avatar Preview"
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700 shrink-0 bg-gray-900"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                            </div>
                            {isGoogleDriveUrl(testimonialForm.avatarUrl || '') && (
                              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Link Google Drive terdeteksi & terkonversi
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Isi Ulasan / Testimoni
                            </label>
                            <textarea
                              rows={2}
                              value={testimonialForm.content || ''}
                              onChange={(e) =>
                                setTestimonialForm({
                                  ...testimonialForm,
                                  content: e.target.value,
                                })
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1">
                          {editingTestimonialId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTestimonialId(null);
                                setTestimonialForm({
                                  name: '',
                                  role: '',
                                  company: '',
                                  avatarUrl: '',
                                  content: '',
                                  rating: 5,
                                });
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-400"
                            >
                              Batal
                            </button>
                          )}
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-md"
                          >
                            <Plus className="w-4 h-4" />
                            <span>
                              {editingTestimonialId ? 'Update Testimoni' : 'Tambah Testimoni'}
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {testimonials.map((t) => (
                        <div
                          key={t.id}
                          className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={formatImageUrl(t.avatarUrl)}
                              alt={t.name}
                              className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200 dark:border-gray-700 bg-gray-900"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                                {t.name} <span className="text-xs text-gray-500 font-normal">({t.role})</span>
                              </h5>
                              <p className="text-[11px] text-gray-500 line-clamp-1">{t.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingTestimonialId(t.id);
                                setTestimonialForm(t);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(t.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------- SECURITY & RESET TAB ---------------- */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Keamanan & Pengaturan Akun Admin
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Ubah email dan kata sandi login admin, atau reset seluruh data beranda ke bawaan pabrik.
                      </p>
                    </div>

                    {/* Google Drive Link Tester & Direct Link Generator Widget */}
                    <div className="p-5 bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl border border-blue-200/80 dark:border-blue-800/80 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                          Alat Penguji & Konverter Link Foto Google Drive
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        Tempelkan link berbagi Google Drive di bawah untuk menguji konversi link langsung dan melihat pratinjau gambarnya secara instan.
                      </p>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Tempel Link Google Drive (misal: view/sharing link)
                          </label>
                          <input
                            type="text"
                            placeholder="https://drive.google.com/file/d/1234567890ABCDEF/view?usp=sharing"
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500"
                            id="gdrive-test-input"
                            onChange={(e) => {
                              const el = document.getElementById('gdrive-test-result') as HTMLInputElement;
                              if (el) {
                                el.value = formatImageUrl(e.target.value);
                              }
                              const imgEl = document.getElementById('gdrive-test-img') as HTMLImageElement;
                              if (imgEl) {
                                imgEl.src = formatImageUrl(e.target.value);
                              }
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Hasil URL Gambar Langsung (Direct CDN Image URL)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              id="gdrive-test-result"
                              readOnly
                              placeholder="Hasil URL gambar langsung akan muncul di sini..."
                              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-mono select-all"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const el = document.getElementById('gdrive-test-result') as HTMLInputElement;
                                if (el && el.value) {
                                  navigator.clipboard.writeText(el.value);
                                  showToast('Link gambar langsung berhasil disalin!');
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shrink-0 transition-colors shadow-sm"
                            >
                              Salin Link
                            </button>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-blue-200/60 dark:border-blue-800/60 flex items-center gap-4">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            Pratinjau Hasil Gambar:
                          </span>
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-300 dark:border-blue-700 bg-gray-900 shadow-sm flex items-center justify-center shrink-0">
                            <img
                              id="gdrive-test-img"
                              src=""
                              alt="Gdrive Test Preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                              onLoad={(e) => {
                                (e.target as HTMLElement).style.display = 'block';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Change Credentials Form */}
                    <div className="p-5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Ubah Kredensial Login Admin</span>
                      </h4>

                      {securitySuccess && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">
                          {securitySuccess}
                        </div>
                      )}

                      <form onSubmit={handleUpdateSecurity} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Email Admin Baru
                            </label>
                            <input
                              type="email"
                              placeholder={storedAdminEmail}
                              value={newAdminEmail}
                              onChange={(e) => setNewAdminEmail(e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Kata Sandi Admin Baru
                            </label>
                            <input
                              type="password"
                              placeholder="Biarkan kosong jika tidak diubah"
                              value={newAdminPassword}
                              onChange={(e) => setNewAdminPassword(e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          Simpan Kredensial Baru
                        </button>
                      </form>
                    </div>

                    {/* Danger Zone: Reset Data */}
                    <div className="p-5 bg-red-50/60 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900/60">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" />
                            <span>Reset Seluruh Data Beranda</span>
                          </h4>
                          <p className="text-xs text-red-600/80 dark:text-red-300/80 mt-1">
                            Aksi ini akan menghapus semua editan lokal dan mengembalikan profil, keahlian, proyek, serta testimoni ke data awal asli.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            if (
                              confirm(
                                'Apakah Anda yakin ingin MENGEMBALIKAN seluruh data beranda ke setelan awal?'
                              )
                            ) {
                              onResetToDefaults();
                              showToast('Seluruh data berhasil direset ke bawaan awal!');
                            }
                          }}
                          className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-colors shadow-md shrink-0"
                          id="reset-defaults-btn"
                        >
                          Reset ke Default
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
