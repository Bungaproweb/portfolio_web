import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Smartphone,
  Monitor,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Heart,
  Plus,
  Trash2,
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface LivePreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [cartCount, setCartCount] = useState(2);
  const [demoTab, setDemoTab] = useState<'home' | 'catalog' | 'stats'>('home');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-800 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Device Bar */}
        <div className="p-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm text-blue-400">
              Live Interactive Demo:
            </span>
            <span className="font-semibold text-sm text-gray-200 hidden sm:inline">
              {project.title}
            </span>
          </div>

          {/* Device Toggles */}
          <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                deviceMode === 'desktop'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                deviceMode === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold flex items-center gap-1"
                title="Buka di Tab Baru"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Demo Simulated Frame Canvas */}
        <div className="flex-1 bg-gray-950 p-4 sm:p-8 flex items-center justify-center overflow-auto">
          <div
            className={`transition-all duration-300 bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col ${
              deviceMode === 'mobile'
                ? 'w-[360px] h-[640px]'
                : 'w-full h-full max-w-4xl'
            }`}
          >
            {/* Simulated App Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between shrink-0">
              <div className="font-bold text-sm flex items-center gap-2">
                <span>{project.title.split('-')[0]}</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                  v2.4
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                {project.category === 'web' && (
                  <button
                    onClick={() => setCartCount(cartCount + 1)}
                    className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="font-bold">{cartCount}</span>
                  </button>
                )}
                <span className="text-[10px] bg-emerald-500/80 px-2 py-0.5 rounded-full font-bold">
                  Online
                </span>
              </div>
            </div>

            {/* Simulated App Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50 text-gray-800">
              {/* Hero Banner inside App */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white relative overflow-hidden shadow-md">
                <div className="relative z-10">
                  <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
                    {project.subtitle}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <button
                    onClick={() => alert('Fitur demo interaktif berhasil ditrigger!')}
                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    Mulai Eksplorasi
                  </button>
                </div>
              </div>

              {/* Interactive Sample Modules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Statistik Performa
                    </span>
                    <span className="text-emerald-600">+24.8%</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Aktivitas transaksi real-time dan optimasi memori.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      Status Sistem
                    </span>
                    <span className="text-blue-600">Aktif</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Terhubung langsung ke API serverless dan database.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                <div className="text-xs font-bold text-gray-900 mb-2">
                  Fitur Unggulan Terintegrasi:
                </div>
                <div className="space-y-1.5">
                  {project.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-gray-600 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Demo Bar */}
            <div className="p-3 bg-white border-t border-gray-200 text-center text-[11px] text-gray-500 shrink-0">
              Simulasi Antarmuka Interaktif • Portofolio {project.year}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
