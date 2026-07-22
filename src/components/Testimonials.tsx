import React from 'react';
import { Quote, Star, MessageSquare } from 'lucide-react';
import { Testimonial } from '../types/portfolio';
import { formatImageUrl } from '../utils/imageUtils';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gray-50/70 dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testimoni & Rekomendasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Apa Kata Klien & Rekan Kerja
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            Ulasan langsung dari para founder, product manager, dan tech lead yang pernah berkolaborasi bersama saya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-blue-100 dark:text-blue-900/40 absolute top-6 right-6" />

              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic relative z-10">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <img
                  src={formatImageUrl(item.avatarUrl)}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                    {item.name}
                  </h4>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {item.role} • {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
