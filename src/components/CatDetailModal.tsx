import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';
import { CatInfo } from '../types';

interface CatDetailModalProps {
  cat: CatInfo | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, catId: string) => void;
  onOpenAppointment: (cat: CatInfo) => void;
}

export const CatDetailModal: React.FC<CatDetailModalProps> = ({
  cat,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenAppointment,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  if (!cat) return null;

  const allImages = [cat.imageUrl, ...(cat.additionalImages || [])];
  const priceDisplay =
    cat.priceType === 'adoption'
      ? cat.adoptionFee === 0
        ? '免费爱心领养'
        : `领养费用 ¥${cat.adoptionFee}`
      : `¥${cat.pricePerHour || 50}/小时`;

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end sm:justify-center items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#ede9e1]">
        {/* Top Floating Buttons */}
        <div className="relative w-full aspect-4/3 bg-[#f2ede4] overflow-hidden shrink-0">
          <img
            src={allImages[activeImageIndex] || cat.imageUrl}
            alt={cat.name}
            className="w-full h-full object-cover transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Gradient Overlay for controls */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent flex items-center justify-between px-4">
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                title="分享猫咪"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => onToggleFavorite(e, cat.id)}
                className={`w-8 h-8 rounded-full backdrop-blur-xs flex items-center justify-center transition-colors ${
                  isFavorite
                    ? 'bg-white text-[#e06346]'
                    : 'bg-black/40 text-white hover:bg-black/60'
                }`}
                title="收藏猫咪"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Photo Index Indicator */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Share toast notification */}
          {shareToast && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-3 py-1.5 rounded-full shadow-lg animate-in fade-in">
              已复制猫咪分享卡片 ✨
            </div>
          )}
        </div>

        {/* Thumbnail selector if multiple images */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#f8f5f0] overflow-x-auto no-scrollbar border-b border-[#eeebe4]">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#e06346] scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Main Title & Price */}
          <div className="space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[#2b2523]">{cat.name}</h2>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      cat.gender === 'boy'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-pink-50 text-pink-600 border border-pink-200'
                    }`}
                  >
                    {cat.gender === 'boy' ? '♂ 弟弟' : '♀ 妹妹'}
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    可预约到家
                  </span>
                </div>
                <p className="text-xs text-[#7d746d] mt-1 flex items-center gap-2">
                  <span>{cat.breed}</span>
                  <span>·</span>
                  <span>{cat.age}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 text-[#9b9187]">
                    <MapPin className="w-3 h-3" />
                    {cat.district}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-[#e06346]">{priceDisplay}</div>
                <div className="text-[10px] text-[#9b9187]">专人专车直送</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-[#fbf6f0] text-[#71675f] px-2.5 py-0.5 rounded-lg border border-[#ede7dc]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Health Guarantee Card */}
          <div className="p-3.5 bg-[#fbfaf8] rounded-2xl border border-[#ede9e1] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-[#322b27] text-xs">
                <ShieldCheck className="w-4 h-4 text-[#e06346]" />
                <span>健康体检档案</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                体检合格
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#554d46]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>疫苗接种：{cat.health.vaccinated ? `已接种 ${cat.health.vaccineDoses} 针` : '未完成'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>体内外驱虫：{cat.health.dewormed ? '已做定期驱虫' : '未驱虫'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>绝育状态：{cat.health.neutered ? '已绝育' : '未绝育'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>传染病筛查：猫瘟抗原阴性</span>
              </div>
            </div>

            {cat.health.notes && (
              <p className="text-[10px] text-[#8e857c] pt-1 border-t border-[#f0ece4]">
                备注：{cat.health.notes}
              </p>
            )}
          </div>

          {/* Cat Story & Description */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#322b27] text-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#e06346]" />
              <span>猫咪故事 & 习性</span>
            </h4>
            <p className="text-xs text-[#524a44] leading-relaxed bg-[#fbfaf8] p-3 rounded-2xl border border-[#ede9e1]">
              {cat.description}
            </p>
          </div>

          {/* Publisher Card */}
          <div className="p-3 bg-[#faf7f2] rounded-2xl border border-[#eee9df] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={cat.publisher.avatar || cat.imageUrl}
                alt={cat.publisher.name}
                className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-[#2b2523]">{cat.publisher.name}</span>
                  {cat.publisher.verified && (
                    <span className="text-[9px] bg-[#e06346]/10 text-[#e06346] px-1.5 py-0.2 rounded font-medium">
                      实名认证
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#8e857c] mt-0.5">
                  已发布 {cat.publisher.isCurrentUser ? '当前小猫' : '多只优质好猫'} · 满意度 100%
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowContactPopup(true)}
              className="px-2.5 py-1.5 bg-white hover:bg-[#f6f2ec] text-[#4f463f] font-semibold text-[11px] rounded-xl border border-[#e4ded5] transition-colors shadow-2xs"
            >
              联系铲屎官
            </button>
          </div>
        </div>

        {/* Bottom Fixed Action Bar matching mini-program style */}
        <div className="p-3.5 bg-white border-t border-[#f0ece4] flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => onToggleFavorite(e, cat.id)}
            className="flex flex-col items-center justify-center text-[#786e66] hover:text-[#e06346] transition-colors px-2 shrink-0"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'text-[#e06346] fill-[#e06346]' : ''}`} />
            <span className="text-[10px] mt-0.5">{isFavorite ? '已收藏' : '收藏'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowContactPopup(true)}
            className="flex flex-col items-center justify-center text-[#786e66] hover:text-[#e06346] transition-colors px-2 shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">咨询</span>
          </button>

          {/* Primary Action Button */}
          <button
            id="book-now-cat-btn"
            type="button"
            onClick={() => onOpenAppointment(cat)}
            className="flex-1 py-3 bg-[#e06346] hover:bg-[#cb5539] text-white font-bold text-sm rounded-full shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>{cat.priceType === 'adoption' ? '申请爱心领养' : '立即预约猫咪到家'}</span>
          </button>
        </div>

        {/* Contact Popup */}
        {showContactPopup && (
          <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-xl border border-[#ece8df] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#f1eee7]">
                <h4 className="font-bold text-sm text-[#2b2523]">联系铲屎官</h4>
                <button
                  type="button"
                  onClick={() => setShowContactPopup(false)}
                  className="p-1 text-[#9b9289] hover:text-[#2b2523]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#fbf9f6] rounded-xl">
                  <span className="text-[#685f57] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#e06346]" /> 电话：
                  </span>
                  <span className="font-bold text-[#2b2523]">{cat.publisher.phone}</span>
                </div>

                {cat.publisher.wechat && (
                  <div className="flex items-center justify-between p-2.5 bg-[#fbf9f6] rounded-xl">
                    <span className="text-[#685f57] flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> 微信：
                    </span>
                    <span className="font-bold text-[#2b2523]">{cat.publisher.wechat}</span>
                  </div>
                )}
              </div>

              <p className="text-[10px] text-center text-[#9b9187]">
                平台提供交接安全监管协议，保障双方权益与猫咪健康
              </p>

              <button
                type="button"
                onClick={() => setShowContactPopup(false)}
                className="w-full py-2 bg-[#e06346] text-white text-xs font-semibold rounded-full hover:bg-[#c95337] transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
