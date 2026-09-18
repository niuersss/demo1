import React from 'react';
import {
  Heart,
  Calendar,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  Headphones,
  Settings,
  ChevronRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { CatInfo, AppointmentOrder } from '../types';

interface ProfileViewProps {
  userCats: CatInfo[];
  favoriteCats: CatInfo[];
  orders: AppointmentOrder[];
  onOpenPublish: () => void;
  onSelectCat: (cat: CatInfo) => void;
  onDeleteCat: (catId: string) => void;
  onGoToOrders: () => void;
  onGoToFavorites: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userCats,
  favoriteCats,
  orders,
  onOpenPublish,
  onSelectCat,
  onDeleteCat,
  onGoToOrders,
  onGoToFavorites,
}) => {
  return (
    <div className="w-full px-4 pt-2 pb-20 space-y-4">
      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl p-4 shadow-2xs border border-[#eee9df] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fdf2ee] rounded-full blur-xl pointer-events-none -mr-8 -mt-8" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-linear-to-tr from-[#f4a261] to-[#e76f51] p-0.5 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="User avatar"
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[#2b2523] truncate">暖阳铲屎官</h3>
              <span className="text-[10px] bg-[#e06346]/10 text-[#e06346] px-2 py-0.5 rounded-full font-medium shrink-0">
                已实名认证
              </span>
            </div>
            <p className="text-xs text-[#8c8278] mt-0.5 truncate">
              让每只小毛球都能被温柔以待 🐾
            </p>
          </div>
        </div>

        {/* 3 Quick Metric Blocks */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#f4f1ea] text-center">
          <div
            onClick={onGoToFavorites}
            className="p-2 rounded-2xl hover:bg-[#faf7f2] cursor-pointer transition-colors"
          >
            <div className="text-lg font-black text-[#2b2523]">{favoriteCats.length}</div>
            <div className="text-[11px] text-[#8e857c] flex items-center justify-center gap-0.5 mt-0.5">
              <Heart className="w-3 h-3 text-[#e06346]" /> 收藏猫咪
            </div>
          </div>

          <div
            onClick={onGoToOrders}
            className="p-2 rounded-2xl hover:bg-[#faf7f2] cursor-pointer transition-colors"
          >
            <div className="text-lg font-black text-[#2b2523]">{orders.length}</div>
            <div className="text-[11px] text-[#8e857c] flex items-center justify-center gap-0.5 mt-0.5">
              <Calendar className="w-3 h-3 text-blue-500" /> 预约订单
            </div>
          </div>

          <div
            onClick={onOpenPublish}
            className="p-2 rounded-2xl hover:bg-[#faf7f2] cursor-pointer transition-colors"
          >
            <div className="text-lg font-black text-[#e06346]">{userCats.length}</div>
            <div className="text-[11px] text-[#8e857c] flex items-center justify-center gap-0.5 mt-0.5">
              <Plus className="w-3 h-3 text-[#e06346]" /> 我的发布
            </div>
          </div>
        </div>
      </div>

      {/* Section: "我发布的猫咪" (My Published Cats) */}
      <div className="bg-white rounded-3xl p-4 shadow-2xs border border-[#eee9df] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-sm text-[#2b2523]">我发布的猫咪</h4>
            <span className="text-xs text-[#8e857c]">({userCats.length})</span>
          </div>

          <button
            type="button"
            onClick={onOpenPublish}
            className="flex items-center gap-1 text-xs font-bold text-white bg-[#e06346] hover:bg-[#c95337] px-3 py-1 rounded-full shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>发布新小猫</span>
          </button>
        </div>

        {userCats.length === 0 ? (
          <div className="py-8 text-center bg-[#fdfcf9] rounded-2xl border border-dashed border-[#e6e0d5] p-4 space-y-2">
            <p className="text-xs text-[#8c8278]">您还没有发布过小猫信息</p>
            <button
              type="button"
              onClick={onOpenPublish}
              className="inline-flex items-center gap-1 text-xs text-[#e06346] font-semibold hover:underline"
            >
              立即点击发布第一只小猫 →
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {userCats.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-2.5 bg-[#fbf9f6] rounded-2xl border border-[#efeae1] hover:bg-[#f6f2eb] transition-colors"
              >
                <div
                  onClick={() => onSelectCat(cat)}
                  className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#2b2523] truncate">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-[#e06346] font-bold">
                        {cat.priceType === 'adoption'
                          ? cat.adoptionFee === 0
                            ? '免费领养'
                            : `领养 ¥${cat.adoptionFee}`
                          : `¥${cat.pricePerHour}/小时`}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8e857c] truncate mt-0.5">
                      {cat.breed} · {cat.age} · {cat.gender === 'boy' ? '弟弟' : '妹妹'}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] text-[#a49a90] mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-2.5 h-2.5" /> 浏览 {cat.viewCount}
                      </span>
                      <span>·</span>
                      <span className="text-emerald-600">已上架可预约</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => onSelectCat(cat)}
                    className="p-1.5 text-[#786e66] hover:text-[#2b2523] hover:bg-white rounded-lg transition-colors"
                    title="查看详情"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`确定要下架并删除猫咪「${cat.name}」的信息吗？`)) {
                        onDeleteCat(cat.id);
                      }
                    }}
                    className="p-1.5 text-[#a89d93] hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                    title="删除下架"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust & Guarantees Menu */}
      <div className="bg-white rounded-3xl p-3 shadow-2xs border border-[#eee9df] divide-y divide-[#f6f2ec] text-xs">
        <div className="flex items-center justify-between p-2.5 hover:bg-[#faf7f2] rounded-xl cursor-pointer">
          <div className="flex items-center gap-2.5 text-[#3b332d]">
            <ShieldCheck className="w-4 h-4 text-[#e06346]" />
            <span>小猫咪到家·安全保障与规范体系</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#9e958c]" />
        </div>

        <div className="flex items-center justify-between p-2.5 hover:bg-[#faf7f2] rounded-xl cursor-pointer">
          <div className="flex items-center gap-2.5 text-[#3b332d]">
            <Headphones className="w-4 h-4 text-emerald-600" />
            <span>在线客服与专员热线 (9:00 - 22:00)</span>
          </div>
          <span className="text-[10px] text-[#8e857c]">400-880-9922</span>
        </div>

        <div className="flex items-center justify-between p-2.5 hover:bg-[#faf7f2] rounded-xl cursor-pointer">
          <div className="flex items-center gap-2.5 text-[#3b332d]">
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
            <span>定点合作宠物医院健康验核</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#9e958c]" />
        </div>
      </div>
    </div>
  );
};
