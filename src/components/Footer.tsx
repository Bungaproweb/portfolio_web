import React from 'react';
import {
  Code2,
  ArrowUp,
  Heart,
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { Profile, SocialLink } from '../types/portfolio';

interface FooterProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ profile, socialLinks }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-800">
          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-2.5 inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                {profile.name}
              </span>
            </a>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {profile.shortBio}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-950/40 transition-colors"
                  title={s.platform}
                >
                  {getSocialIcon(s.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  Tentang Saya
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="hover:text-white transition-colors"
                >
                  Keahlian Teknis
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-white transition-colors"
                >
                  Portofolio Proyek
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Hubungi Saya
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Kontak Singkat
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Email: {profile.email}</div>
              <div>Telepon / WA: {profile.phone}</div>
              <div>Lokasi: {profile.location}</div>
              <div className="text-xs text-emerald-400 font-semibold pt-2">
                ● {profile.status}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. Dibuat dengan React, Tailwind CSS, & Motion.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-blue-500 transition-all shadow-md active:scale-95"
            id="back-to-top-btn"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
