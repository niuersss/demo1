import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
}

export const WeChatDeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  isMobileView,
  setIsMobileView,
}) => {
  return (
    <div className="min-h-screen bg-[#edebe4] flex flex-col items-center justify-start sm:py-6 px-0 sm:px-4">
      {/* Top View Mode Switcher bar */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-3 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-xs border border-[#e5e1d8] text-xs text-[#5c544d]">
        <div className="flex items-center gap-1.5 font-medium text-[#c85a3c]">
          <span className="text-sm">🐾</span>
          <span>小猫咪到家 · 微信小程序预览</span>
        </div>
        <div className="flex items-center bg-[#f2efe9] p-0.5 rounded-full">
          <button
            id="btn-mobile-view"
            type="button"
            onClick={() => setIsMobileView(true)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              isMobileView
                ? 'bg-white text-[#c85a3c] shadow-xs'
                : 'text-[#877d73] hover:text-[#2b2523]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>真机比例</span>
          </button>
          <button
            id="btn-full-view"
            type="button"
            onClick={() => setIsMobileView(false)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              !isMobileView
                ? 'bg-white text-[#c85a3c] shadow-xs'
                : 'text-[#877d73] hover:text-[#2b2523]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>平铺展开</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 relative bg-[#f7f5f0] ${
          isMobileView
            ? 'sm:max-w-[420px] sm:min-h-[860px] sm:max-h-[92vh] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22)] sm:border-[9px] sm:border-[#221f1d] overflow-hidden flex flex-col'
            : 'max-w-4xl min-h-screen sm:rounded-3xl sm:shadow-lg sm:border border-[#e2ded5] overflow-hidden'
        }`}
      >
        {/* Mobile Mockup Notch on Desktop */}
        {isMobileView && (
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-[#221f1d] rounded-b-2xl z-50 pointer-events-none">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#3a3532] rounded-full" />
            <div className="absolute top-1.5 right-6 w-2 h-2 bg-[#1b233d] rounded-full" />
          </div>
        )}

        {/* Content Viewport */}
        <div className="w-full flex-1 flex flex-col relative overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
