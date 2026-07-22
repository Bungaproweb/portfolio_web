import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  User,
  Sparkles,
  Layers,
  ArrowRight,
  MonitorPlay,
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLivePreview?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenLivePreview,
}) => {
  if (!project) return null;

  const [selectedImg, setSelectedImg] = useState<string>(project.imageUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]"
      >
        {/* Sticky Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Featured Screenshot Display */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-gray-950 border border-gray-200 dark:border-gray-800 aspect-video shadow-lg">
              <img
                src={selectedImg}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnails list if gallery > 1 */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImg === img
                        ? 'border-blue-600 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technology Tags */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Teknologi & Stack:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-xs border border-blue-200/60 dark:border-blue-900/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description & Overview */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Ringkasan Proyek
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Challenge vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
              <h5 className="font-bold text-amber-800 dark:text-amber-300 text-base mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Tantangan Utama</span>
              </h5>
              <p className="text-xs sm:text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40">
              <h5 className="font-bold text-emerald-800 dark:text-emerald-300 text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solusi & Hasil</span>
              </h5>
              <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Fitur Utama & Keunggulan:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((hl, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-750 text-xs text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <User className="w-4 h-4 text-blue-500" />
            <span>Klien: {project.client || 'Klien Konfidensial'}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {onOpenLivePreview ? (
              <button
                onClick={() => onOpenLivePreview(project)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md transition-all flex items-center gap-2"
              >
                <MonitorPlay className="w-4 h-4" />
                <span>Simulasi Demo Live</span>
              </button>
            ) : (
              project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md transition-all flex items-center gap-2"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
