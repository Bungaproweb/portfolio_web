import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  FileCode,
  Palette,
  Globe,
  Layers,
  Layout,
  Server,
  Database,
  HardDrive,
  Figma,
  Sparkles,
  GitBranch,
  Zap,
  Cpu,
  Info,
} from 'lucide-react';
import { Skill } from '../types/portfolio';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-6 h-6 text-amber-800 dark:text-amber-400" />;
      case 'FileCode':
        return <FileCode className="w-6 h-6 text-amber-700 dark:text-amber-300" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-amber-800 dark:text-amber-400" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-amber-700 dark:text-amber-300" />;
      case 'Server':
        return <Server className="w-6 h-6 text-amber-900 dark:text-amber-300" />;
      case 'Database':
        return <Database className="w-6 h-6 text-amber-800 dark:text-amber-400" />;
      case 'HardDrive':
        return <HardDrive className="w-6 h-6 text-stone-700 dark:text-stone-300" />;
      case 'Figma':
        return <Figma className="w-6 h-6 text-amber-700 dark:text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-300" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6 text-stone-800 dark:text-stone-300" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      default:
        return <Cpu className="w-6 h-6 text-amber-800 dark:text-amber-400" />;
    }
  };

  const baseCategories = [
    { id: 'all', label: 'Semua Keahlian' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design & UI/UX' },
    { id: 'tools', label: 'Tools & DevOps' },
  ];

  // Dynamically extract any custom categories present in skills prop
  const customCategoryMap = new Map<string, string>();
  skills.forEach((s) => {
    if (s.category && !baseCategories.some((c) => c.id === s.category)) {
      customCategoryMap.set(s.category, s.categoryLabel || s.category);
    }
  });

  const categories = [
    ...baseCategories,
    ...Array.from(customCategoryMap.entries()).map(([id, label]) => ({
      id,
      label,
    })),
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="skills"
      className="py-20 md:py-28 bg-[#FAF7F2] dark:bg-[#12100E] transition-colors border-t border-amber-900/10 dark:border-amber-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Keahlian Teknis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Teknologi & Toolsets yang Saya Kuasai
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400">
            Kombinasi teknologi frontend, backend, alat desain, dan alur kerja modern yang saya gunakan sehari-hari.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs ${
                selectedCategory === cat.id
                  ? 'bg-amber-900 dark:bg-amber-700 text-amber-50 shadow-amber-900/20'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-amber-50/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
              }`}
              id={`filter-skill-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveSkillModal(skill)}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-md hover:border-amber-600/60 dark:hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-stone-950 border border-amber-100 dark:border-stone-800 group-hover:scale-110 transition-transform">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill Title & Years */}
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="text-xs text-stone-500 dark:text-stone-400 mb-4 font-medium">
                    Pengalaman: {skill.years}
                  </div>

                  {/* Description preview */}
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Animated Progress Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-stone-500 dark:text-stone-400">Tingkat Penguasaan</span>
                    <span className="text-amber-800 dark:text-amber-400">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {activeSkillModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#FAF7F2] dark:bg-[#12100E] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950 border border-amber-200 dark:border-amber-900">
                      {renderSkillIcon(activeSkillModal.iconName)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                        {activeSkillModal.name}
                      </h3>
                      <span className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                        {activeSkillModal.categoryLabel} • {activeSkillModal.level} ({activeSkillModal.years})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveSkillModal(null)}
                    className="p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 mb-6">
                  <div className="p-4 rounded-xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                    <div className="font-semibold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <span>Rincian Penggunaan & Kapabilitas:</span>
                    </div>
                    <p className="leading-relaxed">{activeSkillModal.description}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span>Kemampuan Pemrograman</span>
                      <span className="text-amber-800 dark:text-amber-400">
                        {activeSkillModal.proficiency}%
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                      <div
                        style={{ width: `${activeSkillModal.proficiency}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSkillModal(null)}
                  className="w-full py-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold text-sm transition-colors shadow-md"
                >
                  Tutup Detail
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
