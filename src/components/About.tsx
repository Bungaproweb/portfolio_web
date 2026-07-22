import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Code,
  Zap,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import {
  Profile,
  Experience,
  Education,
  Certification,
} from '../types/portfolio';
import { formatImageUrl } from '../utils/imageUtils';

interface AboutProps {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}

export const About: React.FC<AboutProps> = ({
  profile,
  experiences,
  education,
  certifications,
}) => {
  const [activeTab, setActiveTab] = useState<'exp' | 'edu' | 'values'>('exp');

  const coreValues = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: 'Performa Tinggi & Cepat',
      desc: 'Setiap baris kode dioptimalkan untuk meminimalkan waktu muat, menjamin skenario rendering tercepat.',
    },
    {
      icon: <Code className="w-5 h-5 text-blue-500" />,
      title: 'Kode Bersih & Modul',
      desc: 'Arsitektur komponen modular dengan TypeScript strict typing untuk mempermudah pemeliharaan jangka panjang.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Aksesibilitas & Standards',
      desc: 'Memastikan aplikasi ramah pengguna, memenuhi standar WCAG, dan berfungsi mulus di semua ukuran layar.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-500" />,
      title: 'Kolaborasi & Komunikasi',
      desc: 'Penyampaian progres kerja yang terstruktur, siap berdiskusi dengan desainer, PM, dan engineer backend.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white dark:bg-gray-900 transition-colors border-t border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Mengenal Lebih Dekat Latar Belakang & Passion Saya
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Menggabungkan keahlian teknis pemrograman frontend dan kepekaan desain antarmuka untuk menciptakan pengalaman web yang memukau.
          </p>
        </div>

        {/* Top Bio & Picture Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Image Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 dark:border-gray-800 bg-gray-900 group">
              <img
                src={formatImageUrl(profile.aboutImageUrl)}
                alt="Working Alex Pratama"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="font-bold text-lg">{profile.name}</div>
                  <div className="text-xs text-blue-300">{profile.location}</div>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-300 shrink-0" />
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-blue-100">
                  Kepuasan Klien
                </div>
                <div className="text-2xl font-black">{profile.satisfactionRate}</div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pengembang Web yang Fokus pada Kualitas, Kecepatan, & Estetika
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {profile.bio}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Saya percaya bahwa setiap produk digital yang sukses harus tidak hanya terlihat indah di mata, tetapi juga cepat diakses, responsif di semua perangkat, serta mudah dan nyaman digunakan oleh siapapun.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/80">
              <div className="text-center p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {profile.yearsOfExperience}+
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                  Tahun Exp
                </div>
              </div>

              <div className="text-center p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {profile.completedProjects}+
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                  Proyek
                </div>
              </div>

              <div className="text-center p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400">
                  {profile.happyClients}+
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                  Klien Puas
                </div>
              </div>

              <div className="text-center p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  100%
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                  On-Time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Exp / Edu / Values */}
        <div className="mt-12">
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('exp')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'exp'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Pengalaman Kerja</span>
              </button>

              <button
                onClick={() => setActiveTab('edu')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'edu'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Pendidikan & Sertifikat</span>
              </button>

              <button
                onClick={() => setActiveTab('values')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'values'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Prinsip Kerja</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panels */}
          <AnimatePresence mode="wait">
            {activeTab === 'exp' && (
              <motion.div
                key="exp-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-400 dark:hover:border-blue-500 transition-colors relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.role}
                        </h4>
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>{exp.company}</span>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span className="text-gray-500 dark:text-gray-400 font-normal">
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold shrink-0 w-fit">
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skillsUsed.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'edu' && (
              <motion.div
                key="edu-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                {/* Formal Education */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <span>Pendidikan Formal</span>
                  </h4>
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h5>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full w-fit">
                          {edu.period}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                        {edu.institution}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {edu.description}
                      </p>
                      {edu.achievements && (
                        <div className="space-y-1">
                          {edu.achievements.map((ach, aIdx) => (
                            <div
                              key={aIdx}
                              className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Professional Certifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>Sertifikasi Profesional</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                            {cert.issuer} • {cert.year}
                          </div>
                          <h5 className="font-bold text-gray-900 dark:text-white text-base">
                            {cert.name}
                          </h5>
                        </div>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            referrerPolicy="no-referrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-4"
                          >
                            <span>Lihat Kredensial</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'values' && (
              <motion.div
                key="values-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {coreValues.map((val, vIdx) => (
                  <div
                    key={vIdx}
                    className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 flex gap-4"
                  >
                    <div className="p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm shrink-0 h-fit">
                      {val.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                        {val.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
