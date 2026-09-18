import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { CatInfo, AppointmentOrder } from '../types';

interface AppointmentModalProps {
  cat: CatInfo | null;
  onClose: () => void;
  onSubmitOrder: (order: AppointmentOrder) => void;
}

const DATES = [
  { label: '今天', date: '2026-09-18' },
  { label: '明天', date: '2026-09-19' },
  { label: '后天', date: '2026-09-20' },
  { label: '大后天', date: '2026-09-21' },
];

const TIME_SLOTS = [
  '10:00 - 12:00 (上午场)',
  '14:00 - 16:00 (午后场)',
  '16:30 - 18:30 (傍晚场)',
  '19:00 - 21:00 (晚间场)',
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  cat,
  onClose,
  onSubmitOrder,
}) => {
  const [selectedDate, setSelectedDate] = useState(DATES[0].date);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[1]);
  const [durationHours, setDurationHours] = useState(2);
  const [contactName, setContactName] = useState('王小喵');
  const [contactPhone, setContactPhone] = useState('13800138000');
  const [address, setAddress] = useState('北京市朝阳区建国门外大街1号国贸大厦A座');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  if (!cat) return null;

  const pricePerHour = cat.pricePerHour || 50;
  const isAdoption = cat.priceType === 'adoption';
  const totalPrice = isAdoption ? cat.adoptionFee || 0 : pricePerHour * durationHours;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      setError('请填写预约联系人');
      return;
    }
    if (!contactPhone.trim()) {
      setError('请填写联系电话');
      return;
    }
    if (!address.trim()) {
      setError('请填写详细配送地址');
      return;
    }
    if (!agreed) {
      setError('请勾选并同意服务协议');
      return;
    }

    const newOrder: AppointmentOrder = {
      id: `ord-${Date.now().toString().slice(-8)}`,
      catId: cat.id,
      catName: cat.name,
      catBreed: cat.breed,
      catImage: cat.imageUrl,
      pricePerHour,
      serviceDate: selectedDate,
      timeSlot: selectedSlot,
      durationHours: isAdoption ? 0 : durationHours,
      totalPrice,
      contactName: contactName.trim(),
      contactPhone: contactPhone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      insuranceIncluded: true,
      status: 'pending_delivery',
      createdAt: Date.now(),
    };

    onSubmitOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end sm:justify-center items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#ede9e1]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0ece4] bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐱</span>
            <div>
              <h3 className="text-base font-bold text-[#2b2523]">
                {isAdoption ? '爱心领养申请' : '预约猫咪到家'}
              </h3>
              <p className="text-[11px] text-[#8e857c]">专人专车配送 · 当面验猫留档</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#e8e4db] flex items-center justify-center text-[#8e857c] hover:text-[#2b2523] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {error && (
            <div className="p-2.5 bg-red-50 text-red-600 rounded-xl border border-red-200 text-xs">
              {error}
            </div>
          )}

          {/* Target Cat Summary Card */}
          <div className="flex items-center gap-3 p-3 bg-[#faf7f2] rounded-2xl border border-[#eee9df]">
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="w-14 h-14 rounded-xl object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#2b2523] truncate">{cat.name}</h4>
                <span className="font-bold text-[#e06346] text-xs">
                  {isAdoption ? (cat.adoptionFee === 0 ? '免费领养' : `¥${cat.adoptionFee}`) : `¥${pricePerHour}/小时`}
                </span>
              </div>
              <p className="text-[11px] text-[#8e857c] mt-0.5 truncate">
                {cat.breed} · {cat.age} · {cat.gender === 'boy' ? '弟弟' : '妹妹'}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-600">
                <span className="flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  已体检疫苗全
                </span>
                <span>·</span>
                <span className="text-[#a47e65]">随赠应急猫粮罐头</span>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block font-bold text-[#322b27] mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#e06346]" />
              <span>期望送达日期</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DATES.map((item) => (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => setSelectedDate(item.date)}
                  className={`p-2 rounded-xl text-center transition-all ${
                    selectedDate === item.date
                      ? 'bg-[#e06346] text-white font-bold shadow-xs'
                      : 'bg-[#f7f4ef] text-[#554d46] hover:bg-[#ede7dd]'
                  }`}
                >
                  <div className="text-xs">{item.label}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{item.date.slice(5)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block font-bold text-[#322b27] mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#e06346]" />
              <span>配送时段</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 rounded-xl text-left transition-all text-[11px] ${
                    selectedSlot === slot
                      ? 'bg-[#fbece7] text-[#c95337] font-semibold border border-[#e06346]'
                      : 'bg-[#f7f4ef] text-[#554d46] hover:bg-[#ede7dd]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector (for hourly service) */}
          {!isAdoption && (
            <div>
              <label className="block font-bold text-[#322b27] mb-1.5">
                陪伴时长选择
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((hours) => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => setDurationHours(hours)}
                    className={`py-2 rounded-xl text-center text-xs font-semibold transition-all ${
                      durationHours === hours
                        ? 'bg-[#e06346] text-white shadow-xs'
                        : 'bg-[#f7f4ef] text-[#554d46]'
                    }`}
                  >
                    {hours} 小时
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-2.5 pt-1">
            <label className="block font-bold text-[#322b27] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#e06346]" />
              <span>配送与联系信息</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="收件联系人姓名"
                className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523]"
                required
              />
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="手机号码"
                className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523]"
                required
              />
            </div>

            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="详细配送收件地址（例如：小区、单元号、门牌）"
              className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523] resize-none"
              required
            />

            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="备注特殊要求（例如：家中有准备猫碗、提前电话等）"
              className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523]"
            />
          </div>

          {/* Cost Breakdown */}
          <div className="p-3 bg-[#faf7f2] rounded-2xl border border-[#eee9df] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#6f665e]">
              <span>{isAdoption ? '爱心领养费' : `陪伴服务费 (${durationHours}小时)`}</span>
              <span>¥{totalPrice}</span>
            </div>
            <div className="flex justify-between text-[#6f665e]">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#e06346]" /> 恒温专车配送
              </span>
              <span className="text-emerald-600 font-medium">免配送费 (限时立减 ¥30)</span>
            </div>
            <div className="flex justify-between text-[#6f665e]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#e06346]" /> 萌宠交接健康险
              </span>
              <span className="text-emerald-600 font-medium">平台已赠送</span>
            </div>
            <div className="border-t border-[#ede7dc] pt-1.5 flex justify-between items-baseline font-bold">
              <span className="text-sm text-[#2b2523]">合计应付：</span>
              <span className="text-lg text-[#e06346]">¥{totalPrice}</span>
            </div>
          </div>

          {/* Agreement */}
          <label className="flex items-center gap-2 text-[11px] text-[#716860] cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="rounded text-[#e06346] focus:ring-[#e06346]"
            />
            <span>我已阅读并同意《小猫咪到家服务协议》与《健康安全保障责任书》</span>
          </label>

          {/* Submit */}
          <button
            id="confirm-submit-appointment-btn"
            type="submit"
            className="w-full py-3 bg-[#e06346] hover:bg-[#cb5539] text-white font-bold text-sm rounded-full shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <span>确认预约并下单</span>
          </button>
        </form>
      </div>
    </div>
  );
};
