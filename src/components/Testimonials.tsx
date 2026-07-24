import React from 'react';
import { Quote, Star, MessageSquare } from 'lucide-react';
import { Testimonial } from '../types/portfolio';
import { formatImageUrl } from '../utils/imageUtils';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-[#FAF7F2] dark:bg-[#12100E] border-t border-amber-900/10 dark:border-amber-500/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testimoni & Rekomendasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Apa Kata Klien & Rekan Kerja
          </h2>
          <p className="mt-4 text-base text-stone-600 dark:text-stone-400">
            Ulasan langsung dari para founder, product manager, dan tech lead yang pernah berkolaborasi bersama saya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-amber-200/80 dark:text-amber-900/40 absolute top-6 right-6" />

              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-600 text-amber-600 dark:fill-amber-500 dark:text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-6 italic relative z-10">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <img
                  src={formatImageUrl(item.avatarUrl)}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {item.name}
                  </h4>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
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
