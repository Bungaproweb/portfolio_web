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
        return <Code className="w-6 h-6 text-blue-500" />;
      case 'FileCode':
        return <FileCode className="w-6 h-6 text-indigo-500" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-sky-500" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-emerald-500" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-green-500" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-amber-500" />;
      case 'Server':
        return <Server className="w-6 h-6 text-violet-500" />;
      case 'Database':
        return <Database className="w-6 h-6 text-orange-500" />;
      case 'HardDrive':
        return <HardDrive className="w-6 h-6 text-cyan-500" />;
      case 'Figma':
        return <Figma className="w-6 h-6 text-rose-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-500" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6 text-red-500" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      default:
        return <Cpu className="w-6 h-6 text-blue-500" />;
    }
  };

  const categories = [
    { id: 'all', label: 'Semua Keahlian' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design & UI/UX' },
    { id: 'tools', label: 'Tools & DevOps' },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="skills"
      className="py-20 md:py-28 bg-gray-50/70 dark:bg-gray-950 transition-colors border-t border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Keahlian Teknis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Teknologi & Toolsets yang Saya Kuasai
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Kombinasi teknologi frontend, backend, alat desain, dan alur kerja modern yang saya gunakan sehari-hari.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-blue-500/20'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700'
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
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill Title & Years */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                    Pengalaman: {skill.years}
                  </div>

                  {/* Description preview */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Animated Progress Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-gray-500 dark:text-gray-400">Tingkat Penguasaan</span>
                    <span className="text-blue-600 dark:text-blue-400">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
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
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 dark:border-gray-800 shadow-2xl relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900">
                      {renderSkillIcon(activeSkillModal.iconName)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {activeSkillModal.name}
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {activeSkillModal.categoryLabel} • {activeSkillModal.level} ({activeSkillModal.years})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveSkillModal(null)}
                    className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-500" />
                      <span>Rincian Penggunaan & Kapabilitas:</span>
                    </div>
                    <p className="leading-relaxed">{activeSkillModal.description}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span>Kemampuan Pemrograman</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {activeSkillModal.proficiency}%
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <div
                        style={{ width: `${activeSkillModal.proficiency}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSkillModal(null)}
                  className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm hover:opacity-90 transition-opacity"
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
