import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { CatInfo } from '../types';

interface CatCardProps {
  cat: CatInfo;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, catId: string) => void;
  onSelectCat: (cat: CatInfo) => void;
}

export const CatCard: React.FC<CatCardProps> = ({
  cat,
  isFavorite,
  onToggleFavorite,
  onSelectCat,
}) => {
  const priceDisplay =
    cat.priceType === 'adoption'
      ? cat.adoptionFee === 0
        ? '免费领养'
        : `领养费 ¥${cat.adoptionFee}`
      : `¥${cat.pricePerHour || 50}/小时`;

  return (
    <div
      id={`cat-card-${cat.id}`}
      onClick={() => onSelectCat(cat)}
      className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#eeeae2] cursor-pointer group hover:shadow-md transition-all duration-200 flex flex-col"
    >
      {/* Cat Photo Box */}
      <div className="relative w-full aspect-square bg-[#f0ebe3] overflow-hidden">
        <img
          src={cat.imageUrl}
          alt={cat.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top left mini pill indicator (matches grey pill in screenshot) */}
        <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-light">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{cat.age}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(e, cat.id)}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90 ${
            isFavorite
              ? 'bg-white text-[#e06346] shadow-xs'
              : 'bg-black/25 text-white hover:bg-white/80 hover:text-[#e06346]'
          }`}
          title="收藏猫咪"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* User published badge if published by current user */}
        {cat.publisher.isCurrentUser && (
          <div className="absolute bottom-2 left-2 bg-[#d86243] text-white text-[9px] font-medium px-1.5 py-0.5 rounded-md shadow-xs">
            我的发布
          </div>
        )}
      </div>

      {/* Card Info Box (Matching screenshot's "云铮 ¥50/小时" style) */}
      <div className="p-2.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-1 mb-1">
            <h4 className="text-sm font-bold text-[#2b2523] truncate">
              {cat.name}
            </h4>
            <span className="text-xs font-black text-[#e06346] shrink-0">
              {priceDisplay}
            </span>
          </div>

          <p className="text-[11px] text-[#8c8278] truncate mb-1.5">
            {cat.breed} · {cat.gender === 'boy' ? '弟弟' : '妹妹'}
          </p>

          {/* Mini Tags */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {cat.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-[#f8f5f0] text-[#786e66] px-1.5 py-0.5 rounded border border-[#eae5dd]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Distance & District Footer */}
        <div className="flex items-center justify-between text-[10px] text-[#a1978d] pt-1 border-t border-[#f4f1ea]">
          <span className="truncate">{cat.district}</span>
          {cat.distance && (
            <span className="flex items-center gap-0.5 shrink-0">
              <MapPin className="w-2.5 h-2.5" />
              <span>{cat.distance}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
