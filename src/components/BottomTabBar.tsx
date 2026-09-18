import React from 'react';
import { Home, Cat, PlusCircle, ClipboardList, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomTabBarProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  pendingOrdersCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onChangeTab,
  pendingOrdersCount,
}) => {
  return (
    <div className="sticky bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#eee9e0] py-1.5 px-3 z-40 select-none">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. 首页 */}
        <button
          type="button"
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
            currentTab === 'home' ? 'text-[#d86243]' : 'text-[#877e74] hover:text-[#2b2523]'
          }`}
        >
          {/* Active icon block style matching screenshot */}
          <div
            className={`w-6 h-5 rounded-md flex items-center justify-center transition-all ${
              currentTab === 'home' ? 'bg-[#d86243] text-white' : ''
            }`}
          >
            <Home className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] mt-1 font-medium">首页</span>
        </button>

        {/* 2. 猫咪 */}
        <button
          type="button"
          onClick={() => onChangeTab('cats')}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
            currentTab === 'cats' ? 'text-[#d86243]' : 'text-[#877e74] hover:text-[#2b2523]'
          }`}
        >
          <div
            className={`w-6 h-5 rounded-md flex items-center justify-center transition-all ${
              currentTab === 'cats' ? 'bg-[#d86243] text-white' : ''
            }`}
          >
            <Cat className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] mt-1 font-medium">猫咪</span>
        </button>

        {/* 3. ➕ 发布 (Highlighted Center Action) */}
        <button
          id="tab-publish-btn"
          type="button"
          onClick={() => onChangeTab('publish')}
          className="flex flex-col items-center justify-center -mt-4 group"
        >
          <div className="w-11 h-11 rounded-full bg-linear-to-tr from-[#d86243] to-[#eb7e63] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(216,98,67,0.38)] group-active:scale-95 transition-transform border-2 border-white">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-[#d86243]">发布</span>
        </button>

        {/* 4. 订单 */}
        <button
          type="button"
          onClick={() => onChangeTab('orders')}
          className={`flex flex-col items-center justify-center py-1 px-3 relative transition-colors ${
            currentTab === 'orders' ? 'text-[#d86243]' : 'text-[#877e74] hover:text-[#2b2523]'
          }`}
        >
          <div
            className={`w-6 h-5 rounded-md flex items-center justify-center transition-all ${
              currentTab === 'orders' ? 'bg-[#d86243] text-white' : ''
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] mt-1 font-medium">订单</span>
          {pendingOrdersCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#d86243]" />
          )}
        </button>

        {/* 5. 我的 */}
        <button
          type="button"
          onClick={() => onChangeTab('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
            currentTab === 'profile' ? 'text-[#d86243]' : 'text-[#877e74] hover:text-[#2b2523]'
          }`}
        >
          <div
            className={`w-6 h-5 rounded-md flex items-center justify-center transition-all ${
              currentTab === 'profile' ? 'bg-[#d86243] text-white' : ''
            }`}
          >
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] mt-1 font-medium">我的</span>
        </button>
      </div>
    </div>
  );
};
