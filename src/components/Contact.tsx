import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  Github,
  Linkedin,
  Instagram,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Profile, SocialLink, ContactMessage } from '../types/portfolio';

interface ContactProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export const Contact: React.FC<ContactProps> = ({ profile, socialLinks }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<ContactMessage | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek pesan wajib diisi.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Isi pesan wajib diisi.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Isi pesan minimal 10 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setSubmittedMessage(newMessage);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 1000);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-white dark:bg-gray-900 transition-colors border-t border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Kontak & Diskusi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Mari Bekerja Sama atau Mengobrol
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Punya proyek menarik, penawaran kerja, atau sekadar ingin berdiskusi? Jangan ragu untuk menghubungi saya!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side Info & Social Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/80 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Informasi Kontak
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang kerjasama bisnis.
              </p>

              {/* Direct Info List */}
              <div className="space-y-5 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Email Resmi
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {profile.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${profile.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      WhatsApp / Telepon
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {profile.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Lokasi Domisili
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {profile.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={`https://wa.me/${profile.whatsappNumber}?text=Halo%20Alex,%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20proyek%20web.`}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                  id="whatsapp-direct-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Langsung via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Social Links Badge Row */}
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/80">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Media Sosial & Profil Profesional
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 text-xs font-semibold transition-all shadow-sm"
                  >
                    {getSocialIcon(s.platform)}
                    <span>{s.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl relative">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Kirim Pesan Langsung
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                Isi formulir di bawah ini dan saya akan merespon pesan Anda dalam waktu kurang dari 24 jam.
              </p>

              {/* Success Notification Alert */}
              {submittedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Pesan Terkirim dengan Sukses!</div>
                    <div className="text-xs mt-1">
                      Terima kasih, {submittedMessage.name}. Pesan mengenai "{submittedMessage.subject}" telah dicatat pada pukul {submittedMessage.createdAt}. Saya akan segera mengontak Anda via email.
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" id="portfolio-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Misal: Budi Pratama"
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      id="contact-name-input"
                    />
                    {errors.name && (
                      <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Alamat Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="budi@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      id="contact-email-input"
                    />
                    {errors.email && (
                      <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Subjek / Topik <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Misal: Penawaran Proyek Redesain Web E-Commerce"
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    id="contact-subject-input"
                  />
                  {errors.subject && (
                    <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Isi Pesan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ceritakan gambaran singkat mengenai proyek, timeline, atau pertanyaan Anda..."
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    id="contact-message-input"
                  />
                  {errors.message && (
                    <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  id="submit-message-btn"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 animate-spin" />
                      <span>Mengirim Pesan...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
