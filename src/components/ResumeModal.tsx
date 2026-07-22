import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code,
} from 'lucide-react';
import {
  Profile,
  Experience,
  Education,
  Certification,
  Skill,
} from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  education,
  certifications,
  skills,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]"
      >
        {/* Sticky Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              Curriculum Vitae (CV) - {profile.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Printable Document Area */}
        <div className="p-8 sm:p-12 space-y-8 overflow-y-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-white print:p-0 print:bg-white print:text-black">
          {/* Header Info */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {profile.name}
              </h1>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                {profile.title}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 max-w-xl">
                {profile.shortBio}
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium text-gray-600 dark:text-gray-300 shrink-0 border-l-2 border-blue-500 pl-4">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>Pengalaman Kerja</span>
            </h2>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      {exp.role} — <span className="text-blue-600 dark:text-blue-400">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono pt-1">
                    Stack: {exp.skillsUsed.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>Pendidikan</span>
            </h2>

            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {edu.period}
                  </span>
                </div>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {edu.institution}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>

          {/* Key Skills */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-500" />
              <span>Keahlian Utama</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skills.map((s) => (
                <div
                  key={s.id}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-750 text-xs"
                >
                  <div className="font-bold text-gray-900 dark:text-white">{s.name}</div>
                  <div className="text-[10px] text-gray-500">{s.level} ({s.years})</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Sertifikasi</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((c) => (
                <div key={c.id} className="text-xs">
                  <div className="font-bold text-gray-900 dark:text-white">{c.name}</div>
                  <div className="text-gray-500">{c.issuer} • {c.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
