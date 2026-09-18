import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface BannerCarouselProps {
  onQuickAction: (action: 'book' | 'publish' | 'safety') => void;
}

const SLIDES = [
  {
    id: 1,
    title: '健康好猫 · 定时回访',
    subtitle: '每只猫咪均完成专业体检与健康建档',
    cta: '立即预约',
    action: 'book' as const,
    gradient: 'from-[#fbcab5] via-[#f7b79d] to-[#f5a788]',
    textColor: 'text-white',
  },
  {
    id: 2,
    title: '专人护送 · 恒温到家',
    subtitle: '全程空调专车配送，安全当面交接',
    cta: '查看保障',
    action: 'safety' as const,
    gradient: 'from-[#f7cca6] via-[#f5b892] to-[#ec997b]',
    textColor: 'text-white',
  },
  {
    id: 3,
    title: '我有萌宠 · 暖心发布',
    subtitle: '快速填写猫咪信息，支持陪伴与领养',
    cta: '立即发布',
    action: 'publish' as const,
    gradient: 'from-[#f5b89b] via-[#ef9f87] to-[#e68369]',
    textColor: 'text-white',
  },
];

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ onQuickAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = SLIDES[currentIndex];

  return (
    <div className="w-full px-4 pt-1 pb-3 select-none">
      <div
        onClick={() => onQuickAction(currentSlide.action)}
        className={`relative w-full h-34 rounded-2xl p-5 bg-linear-to-r ${currentSlide.gradient} shadow-[0_6px_20px_rgba(235,140,110,0.22)] cursor-pointer overflow-hidden transition-all duration-500 flex flex-col justify-center items-center text-center`}
      >
        {/* Soft background decorative circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/15 blur-xs pointer-events-none" />
        <div className="absolute -bottom-8 -left-6 w-32 h-32 rounded-full bg-white/10 blur-xs pointer-events-none" />

        {/* Content */}
        <h3 className="text-xl font-bold tracking-wider text-white drop-shadow-xs mb-1.5">
          {currentSlide.title}
        </h3>
        <p className="text-[11px] text-white/90 font-light mb-2.5">
          {currentSlide.subtitle}
        </p>

        <div className="inline-flex items-center gap-1 text-xs font-semibold text-white/95 bg-white/20 hover:bg-white/30 backdrop-blur-xs px-3 py-1 rounded-full transition-colors">
          <span>{currentSlide.cta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

        {/* Dots indicators matching screenshot */}
        <div className="absolute bottom-2 flex items-center justify-center gap-1.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-4 h-1.5 bg-[#d86243]'
                  : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
