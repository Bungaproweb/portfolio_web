import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Search,
  Sparkles,
  ArrowUpRight,
  Eye,
  Layers,
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { formatImageUrl } from '../utils/imageUtils';

interface ProjectsProps {
  projects: Project[];
  onOpenLivePreview?: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onOpenLivePreview }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);

  const baseCategories = [
    { id: 'all', label: 'Semua Karya' },
    { id: 'commercial', label: 'Iklan & Commercial' },
    { id: 'motion', label: 'Motion & VFX' },
    { id: 'social', label: 'Content & Social Media' },
    { id: 'cinematic', label: 'Film & Dokumenter' },
  ];

  const customCategoryMap = new Map<string, string>();
  projects.forEach((p) => {
    if (p.category && !baseCategories.some((c) => c.id === p.category)) {
      customCategoryMap.set(p.category, p.categoryLabel || p.category);
    }
  });

  const categories = [
    ...baseCategories,
    ...Array.from(customCategoryMap.entries()).map(([id, label]) => ({
      id,
      label,
    })),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-[#FAF7F2] dark:bg-[#12100E] transition-colors border-t border-amber-900/10 dark:border-amber-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portofolio Karya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Proyek Pilihan & Hasil Kerja
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400">
            Jelajahi berbagai video komersial, motion graphics, konten media sosial, short film, dan karya editing sinematik yang telah saya produksi.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                  selectedCategory === cat.id
                    ? 'bg-amber-900 dark:bg-amber-700 text-amber-50 shadow-amber-900/20'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-amber-50/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
                }`}
                id={`filter-project-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek atau teknologi..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-800 transition-all"
              id="search-project-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-white"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-stone-200/50 dark:bg-stone-900/40 border border-dashed border-stone-300 dark:border-stone-800">
            <Layers className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Tidak Ada Proyek yang Ditemukan
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-600/60 dark:hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                      <img
                        src={formatImageUrl(project.imageUrl)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                        <button
                          onClick={() => setSelectedProjectModal(project)}
                          className="px-4 py-2 rounded-xl bg-amber-900/90 text-amber-50 font-semibold text-xs shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform border border-amber-700/50"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail Proyek</span>
                        </button>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-800 text-amber-100 text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 border border-amber-600/50">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Unggulan</span>
                        </div>
                      )}

                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-amber-200 text-[11px] font-medium border border-white/20">
                        {project.year}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="text-xs font-semibold text-amber-800 dark:text-amber-400 mb-1">
                        {project.categoryLabel}
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.slice(0, 4).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-950 text-stone-700 dark:text-stone-300 text-[11px] font-medium border border-stone-200 dark:border-stone-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-950 text-stone-500 text-[11px]">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProjectModal(project)}
                      className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      <span>Lihat Rincian</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          referrerPolicy="no-referrer"
                          className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                          title="Source Code GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          referrerPolicy="no-referrer"
                          className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors"
                          title="Live Demo Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Project Modal */}
        {selectedProjectModal && (
          <ProjectModal
            project={selectedProjectModal}
            onClose={() => setSelectedProjectModal(null)}
            onOpenLivePreview={onOpenLivePreview}
          />
        )}
      </div>
    </section>
  );
};
