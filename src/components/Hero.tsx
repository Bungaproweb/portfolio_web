import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Award,
  Film,
  Video,
  Code,
} from 'lucide-react';
import { Profile } from '../types/portfolio';
import { formatImageUrl } from '../utils/imageUtils';

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-amber-100/40 via-[#FAF7F2] to-[#FAF7F2] dark:from-[#1C1714] dark:via-[#12100E] dark:to-[#12100E]"
    >
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600/15 dark:bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-stone-600/15 dark:bg-stone-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{profile.status}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15] mb-4">
              Halo, Saya{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-amber-800 to-amber-600 dark:from-amber-200 dark:via-amber-300 dark:to-amber-400">
                {profile.name}
              </span>
            </h1>

            {/* Headline / Role */}
            <h2 className="text-xl sm:text-2xl font-bold text-stone-700 dark:text-stone-300 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{profile.title}</span>
            </h2>

            {/* Bio / Description */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed mb-8">
              {profile.bio}
            </p>

            {/* Highlight Badges - Half Video Editor & Half Basic HTML */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {/* Video Editor Badges */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-950/50 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-semibold border border-amber-300/70 dark:border-amber-800/60">
                <Film className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Video Editing & Color Grading</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-950/50 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-semibold border border-amber-300/70 dark:border-amber-800/60">
                <Video className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Motion Graphics & Audio</span>
              </div>

              {/* HTML Basic Badges */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/70 dark:bg-stone-900 text-stone-800 dark:text-stone-300 text-xs sm:text-sm font-semibold border border-stone-300/70 dark:border-stone-800">
                <Code className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>HTML5 & CSS3 Basic</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/70 dark:bg-stone-900 text-stone-800 dark:text-stone-300 text-xs sm:text-sm font-semibold border border-stone-300/70 dark:border-stone-800">
                <CheckCircle2 className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Basic Web Development</span>
              </div>
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 hover:from-amber-900 hover:to-stone-950 text-amber-50 font-semibold text-base shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-2 group active:scale-95 border border-amber-800/50"
                id="hero-cta-projects"
              >
                <span>Lihat Proyek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-amber-50/80 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold text-base border border-stone-300 dark:border-stone-700 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                id="hero-cta-contact"
              >
                <MessageSquare className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>Hubungi Saya</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-3 pt-4 border-t border-stone-200 dark:border-stone-800 w-full">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mr-2">
                Temukan Saya:
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="p-2.5 rounded-lg bg-stone-200/70 dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="p-2.5 rounded-lg bg-stone-200/70 dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="p-2.5 rounded-lg bg-stone-200/70 dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-lg bg-stone-200/70 dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Profile Photo & Stat Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Glowing Gradient Circle Behind Profile */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8C5A3C] via-[#6F442B] to-[#3A2312] rotate-6 blur-lg opacity-70 animate-pulse" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-amber-100 dark:border-stone-800 shadow-2xl bg-stone-900">
                <img
                  src={formatImageUrl(profile.avatarUrl)}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Stat Card 1 - Experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-5 -left-4 sm:-left-8 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3 z-20"
              >
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-none">
                    {profile.yearsOfExperience}+ Tahun
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Pengalaman Coding
                  </div>
                </div>
              </motion.div>

              {/* Floating Stat Card 2 - Projects Completed */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3 z-20"
              >
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-none">
                    {profile.completedProjects}+ Proyek
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Selesai & Berjalan
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
