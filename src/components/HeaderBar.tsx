import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface HeaderBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSubtitle?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title = '小猫咪到家',
  showBack = false,
  onBack,
  showSubtitle = true,
}) => {
  return (
    <div className="w-full bg-[#f7f5f0] pt-2 pb-2 px-4 select-none">
      {/* Mini Program Status Bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-[#201d1b] mb-2 px-1">
        <span className="tracking-tight text-[13px]">15:36</span>
        <div className="flex items-center gap-1.5 opacity-85">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>

      {/* Mini Program Navigation Bar with Capsule */}
      <div className="relative flex items-center justify-between h-10 mb-1">
        {showBack ? (
          <button
            id="btn-nav-back"
            type="button"
            onClick={onBack}
            className="flex items-center text-sm font-medium text-[#4a423d] hover:text-[#201d1b] transition-colors"
          >
            <span className="text-lg mr-0.5">‹</span> 返回
          </button>
        ) : (
          <div className="w-12" />
        )}

        {/* Center Page Title */}
        <h1 className="text-base font-bold text-[#201d1b] tracking-wide text-center">
          {title}
        </h1>

        {/* WeChat Mini-Program Capsule Button */}
        <div className="flex items-center bg-white/85 border border-[#e5e1d8] rounded-full px-2 py-1 shadow-2xs gap-2">
          <button
            type="button"
            className="text-xs text-[#4a423d] font-bold px-0.5 hover:text-black transition-colors"
            title="小程序菜单"
          >
            •••
          </button>
          <div className="w-[1px] h-3 bg-[#ded9cf]" />
          <button
            type="button"
            className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#4a423d] flex items-center justify-center hover:border-black transition-colors"
            title="关闭/最小化"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a423d]" />
          </button>
        </div>
      </div>

      {/* Main Slogan Banner Header (matching screenshot) */}
      {showSubtitle && (
        <div className="text-center pt-2 pb-1 relative">
          <div className="flex items-center justify-center gap-3">
            {/* Left paw decorative prints */}
            <div className="flex flex-col items-center opacity-40 rotate-[-18deg] text-xs">
              <span className="text-[#a47e65]">🐾</span>
            </div>

            <h2 className="text-2xl font-black tracking-wider text-[#d4583b]">
              小猫咪到家
            </h2>

            {/* Right paw decorative prints */}
            <div className="flex flex-col items-center opacity-40 rotate-[18deg] text-xs">
              <span className="text-[#a47e65]">🐾</span>
            </div>
          </div>
          <p className="text-xs text-[#8c827a] mt-1 tracking-wider font-normal">
            把暖萌健康的小猫咪，送到你身边
          </p>
        </div>
      )}
    </div>
  );
};
