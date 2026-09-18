import React, { useState, useEffect } from 'react';
import { WeChatDeviceFrame } from './components/WeChatDeviceFrame';
import { HeaderBar } from './components/HeaderBar';
import { SearchBar } from './components/SearchBar';
import { BannerCarousel } from './components/BannerCarousel';
import { ServiceFeatures } from './components/ServiceFeatures';
import { CatCard } from './components/CatCard';
import { CatDetailModal } from './components/CatDetailModal';
import { PublishCatModal } from './components/PublishCatModal';
import { AppointmentModal } from './components/AppointmentModal';
import { OrdersView } from './components/OrdersView';
import { ProfileView } from './components/ProfileView';
import { BottomTabBar } from './components/BottomTabBar';
import { CatInfo, AppointmentOrder, TabType } from './types';
import { INITIAL_CATS, INITIAL_ORDERS } from './data/initialCats';
import { ChevronRight, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

const STORAGE_CATS_KEY = 'xiaomaomi_cats_v1';
const STORAGE_ORDERS_KEY = 'xiaomaomi_orders_v1';
const STORAGE_FAVS_KEY = 'xiaomaomi_favs_v1';

export default function App() {
  const [isMobileView, setIsMobileView] = useState(true);
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Persistence: Cats list
  const [cats, setCats] = useState<CatInfo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CATS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CATS;
  });

  // Persistence: Orders
  const [orders, setOrders] = useState<AppointmentOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // Persistence: Favorite Cat IDs
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['cat-2'];
  });

  // Search & Filter state
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTag, setSelectedTag] = useState('全部');
  const [selectedBreed, setSelectedBreed] = useState('全部');

  // Modals & Selected items
  const [selectedCatForDetail, setSelectedCatForDetail] = useState<CatInfo | null>(null);
  const [selectedCatForAppointment, setSelectedCatForAppointment] = useState<CatInfo | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CATS_KEY, JSON.stringify(cats));
    } catch (e) {
      console.error(e);
    }
  }, [cats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteIds]);

  // Toggle favorite
  const handleToggleFavorite = (e: React.MouseEvent, catId: string) => {
    e.stopPropagation();
    if (favoriteIds.includes(catId)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== catId));
      showToast('已取消收藏');
    } else {
      setFavoriteIds([...favoriteIds, catId]);
      showToast('已加入收藏夹 ❤️');
    }
  };

  // Publish new cat
  const handlePublishCat = (newCat: CatInfo) => {
    setCats([newCat, ...cats]);
    setIsPublishModalOpen(false);
    showToast(`🐾 成功发布小猫「${newCat.name}」的信息！`);
    setSelectedCatForDetail(newCat);
  };

  // Delete cat (by user)
  const handleDeleteCat = (catId: string) => {
    setCats(cats.filter((c) => c.id !== catId));
    showToast('已下架猫咪信息');
  };

  // Create appointment order
  const handleCreateOrder = (newOrder: AppointmentOrder) => {
    setOrders([newOrder, ...orders]);
    setSelectedCatForAppointment(null);
    setSelectedCatForDetail(null);
    setCurrentTab('orders');
    showToast('🎉 预约成功！送猫专员即将与您联系');
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, status: AppointmentOrder['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast('订单状态已更新');
  };

  // Filtering cats
  const filteredCats = cats.filter((cat) => {
    // Keyword match
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = cat.name.toLowerCase().includes(q);
      const matchBreed = cat.breed.toLowerCase().includes(q);
      const matchTag = cat.tags.some((t) => t.toLowerCase().includes(q));
      const matchDistrict = cat.district.toLowerCase().includes(q);
      if (!matchName && !matchBreed && !matchTag && !matchDistrict) {
        return false;
      }
    }

    // Tag filter
    if (selectedTag !== '全部') {
      if (selectedTag === '幼猫') {
        const isBaby = cat.age.includes('月');
        if (!isBaby) return false;
      } else if (selectedTag === '免费领养') {
        if (cat.priceType !== 'adoption' || cat.adoptionFee !== 0) return false;
      } else if (selectedTag === '金渐层') {
        if (!cat.breed.includes('金渐层')) return false;
      } else if (selectedTag === '英短') {
        if (!cat.breed.includes('短毛')) return false;
      } else if (selectedTag === '已绝育') {
        if (!cat.health.neutered) return false;
      } else {
        if (!cat.tags.includes(selectedTag)) return false;
      }
    }

    // Breed filter on Cats tab
    if (selectedBreed !== '全部') {
      if (!cat.breed.includes(selectedBreed)) return false;
    }

    return true;
  });

  const userPublishedCats = cats.filter((c) => c.publisher.isCurrentUser);
  const favoriteCats = cats.filter((c) => favoriteIds.includes(c.id));
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending_delivery').length;

  return (
    <WeChatDeviceFrame isMobileView={isMobileView} setIsMobileView={setIsMobileView}>
      {/* Mini Program Header */}
      <HeaderBar
        title={
          currentTab === 'home'
            ? '小猫咪到家'
            : currentTab === 'cats'
            ? '发现猫咪'
            : currentTab === 'orders'
            ? '预约订单'
            : '个人中心'
        }
        showBack={currentTab !== 'home'}
        onBack={() => setCurrentTab('home')}
        showSubtitle={currentTab === 'home'}
      />

      {/* Main Tab Views */}
      <main className="flex-1 w-full pb-16">
        {/* TAB 1: HOME */}
        {currentTab === 'home' && (
          <div className="space-y-1">
            {/* Search Bar */}
            <SearchBar
              keyword={searchKeyword}
              setKeyword={setSearchKeyword}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />

            {/* Banner Carousel */}
            <BannerCarousel
              onQuickAction={(action) => {
                if (action === 'book') {
                  const targetCat = cats[1] || cats[0];
                  setSelectedCatForAppointment(targetCat);
                } else if (action === 'publish') {
                  setIsPublishModalOpen(true);
                } else {
                  showToast('小猫咪到家：严格体检 + 恒温专车 + 当面验猫');
                }
              }}
            />

            {/* 4 Quick Service Badges (matching screenshot) */}
            <ServiceFeatures />

            {/* Section: "📍 附近可预约猫咪" with "更多 >" */}
            <div className="px-4 pt-2 pb-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">📍</span>
                <h3 className="text-sm font-bold text-[#2b2523] tracking-tight">
                  附近可预约猫咪
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentTab('cats')}
                className="text-xs text-[#8e857c] hover:text-[#2b2523] flex items-center gap-0.5 transition-colors"
              >
                <span>更多</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cat Cards Waterfall Grid (matching screenshot: 云铮 ¥50/小时, 糖果 ¥99/小时) */}
            <div className="px-4 pb-20">
              {filteredCats.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl border border-[#ede9e1] p-6 space-y-2">
                  <div className="text-2xl">🐱</div>
                  <p className="text-xs text-[#8e857c]">未找到符合条件的猫咪</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchKeyword('');
                      setSelectedTag('全部');
                    }}
                    className="text-xs text-[#e06346] font-semibold underline"
                  >
                    清除筛选条件
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  {filteredCats.map((cat) => (
                    <CatCard
                      key={cat.id}
                      cat={cat}
                      isFavorite={favoriteIds.includes(cat.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectCat={(c) => setSelectedCatForDetail(c)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Floating Action CTA Button matching screenshot ("立即预约猫咪到家") */}
            <div className="fixed bottom-16 inset-x-0 px-8 z-30 flex justify-center pointer-events-none">
              <button
                id="btn-floating-book-now"
                type="button"
                onClick={() => {
                  const targetCat = cats[0];
                  setSelectedCatForAppointment(targetCat);
                }}
                className="pointer-events-auto w-full max-w-[320px] py-3 px-6 bg-linear-to-r from-[#e06346] to-[#eb7658] text-white font-bold text-sm rounded-full shadow-[0_8px_25px_rgba(224,99,70,0.38)] active:scale-98 hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <span>立即预约猫咪到家</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CATS LIST */}
        {currentTab === 'cats' && (
          <div className="px-4 pt-1 pb-20 space-y-3">
            {/* Search */}
            <div className="pt-1">
              <SearchBar
                keyword={searchKeyword}
                setKeyword={setSearchKeyword}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            </div>

            {/* Breed Filter Chips */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#322b27] px-1">品种分类</div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {['全部', '短毛猫', '金渐层', '布偶猫', '橘猫', '美短', '狮子猫'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBreed(b)}
                    className={`shrink-0 text-[11px] px-3 py-1 rounded-full transition-all ${
                      selectedBreed === b
                        ? 'bg-[#2b2523] text-white font-medium shadow-xs'
                        : 'bg-white text-[#716860] border border-[#e8e4db] hover:bg-[#faf7f2]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Result count & quick publish banner */}
            <div className="flex items-center justify-between px-1 text-xs text-[#8c8278]">
              <span>共找到 {filteredCats.length} 只可陪伴小猫</span>
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                className="text-[#e06346] font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>我也要发布</span>
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {filteredCats.map((cat) => (
                <CatCard
                  key={cat.id}
                  cat={cat}
                  isFavorite={favoriteIds.includes(cat.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectCat={(c) => setSelectedCatForDetail(c)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {currentTab === 'orders' && (
          <OrdersView
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onGoHome={() => setCurrentTab('home')}
          />
        )}

        {/* TAB 4: PROFILE */}
        {currentTab === 'profile' && (
          <ProfileView
            userCats={userPublishedCats}
            favoriteCats={favoriteCats}
            orders={orders}
            onOpenPublish={() => setIsPublishModalOpen(true)}
            onSelectCat={(c) => setSelectedCatForDetail(c)}
            onDeleteCat={handleDeleteCat}
            onGoToOrders={() => setCurrentTab('orders')}
            onGoToFavorites={() => {
              setCurrentTab('cats');
              setSelectedTag('全部');
            }}
          />
        )}
      </main>

      {/* Bottom Mini-Program Tab Bar */}
      <BottomTabBar
        currentTab={currentTab}
        onChangeTab={(tab) => {
          if (tab === 'publish') {
            setIsPublishModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Cat Detail Modal */}
      <CatDetailModal
        cat={selectedCatForDetail}
        onClose={() => setSelectedCatForDetail(null)}
        isFavorite={selectedCatForDetail ? favoriteIds.includes(selectedCatForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenAppointment={(cat) => {
          setSelectedCatForAppointment(cat);
          setSelectedCatForDetail(null);
        }}
      />

      {/* Publish Cat Modal (Core requested feature: "我能发布小猫信息") */}
      <PublishCatModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublishCat}
      />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        cat={selectedCatForAppointment}
        onClose={() => setSelectedCatForAppointment(null)}
        onSubmitOrder={handleCreateOrder}
      />

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-60 bg-[#2b2523]/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </WeChatDeviceFrame>
  );
}
