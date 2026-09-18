import React, { useState } from 'react';
import { Truck, Clock, MapPin, CheckCircle, AlertCircle, Phone, FileText } from 'lucide-react';
import { AppointmentOrder } from '../types';

interface OrdersViewProps {
  orders: AppointmentOrder[];
  onUpdateOrderStatus: (orderId: string, status: AppointmentOrder['status']) => void;
  onGoHome: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onUpdateOrderStatus,
  onGoHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending_delivery' | 'in_progress' | 'completed'>('all');
  const [activeContractOrder, setActiveContractOrder] = useState<AppointmentOrder | null>(null);

  const filteredOrders = orders.filter((ord) => {
    if (filter === 'all') return true;
    return ord.status === filter;
  });

  const getStatusBadge = (status: AppointmentOrder['status']) => {
    switch (status) {
      case 'pending_delivery':
        return (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            待专车配送
          </span>
        );
      case 'delivering':
        return (
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            专员护送中
          </span>
        );
      case 'in_progress':
        return (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            暖萌陪伴中
          </span>
        );
      case 'completed':
        return (
          <span className="text-[10px] font-bold text-[#716860] bg-[#f4efe8] px-2 py-0.5 rounded-full">
            服务已完成
          </span>
        );
      case 'cancelled':
        return (
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            已取消
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-4 pt-2 pb-20 space-y-3">
      {/* Title & Filter Tabs */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base font-bold text-[#2b2523] flex items-center gap-1.5">
          <span>📦 我的预约订单</span>
          <span className="text-xs font-normal text-[#8e857c]">({orders.length})</span>
        </h2>
      </div>

      <div className="flex items-center gap-1.5 bg-[#eae5dc] p-1 rounded-xl">
        {[
          { key: 'all', label: '全部' },
          { key: 'pending_delivery', label: '待配送' },
          { key: 'in_progress', label: '进行中' },
          { key: 'completed', label: '已完成' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as any)}
            className={`flex-1 py-1 text-xs font-medium rounded-lg transition-all ${
              filter === tab.key
                ? 'bg-white text-[#d86243] shadow-xs'
                : 'text-[#685f57] hover:text-[#2b2523]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#ede9e1] p-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#fbf6f0] flex items-center justify-center text-2xl">
            🐾
          </div>
          <h4 className="text-sm font-bold text-[#2b2523]">暂无相关订单</h4>
          <p className="text-xs text-[#8e857c]">
            选一只心仪的小猫咪，把暖意带回家吧！
          </p>
          <button
            type="button"
            onClick={onGoHome}
            className="px-5 py-2 bg-[#e06346] text-white text-xs font-bold rounded-full shadow-xs hover:bg-[#c95337] transition-colors"
          >
            去逛逛附近猫咪
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-3.5 shadow-2xs border border-[#ede9e1] space-y-3"
            >
              {/* Top Order Number & Status */}
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#f4f1ea]">
                <span className="text-[#8c8278] text-[11px]">单号：{order.id}</span>
                {getStatusBadge(order.status)}
              </div>

              {/* Order Cat Content */}
              <div className="flex gap-3">
                <img
                  src={order.catImage}
                  alt={order.catName}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#2b2523] truncate">
                      {order.catName}
                    </h4>
                    <span className="text-xs font-bold text-[#e06346]">
                      ¥{order.totalPrice}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#786e66] truncate mt-0.5">
                    {order.catBreed} · {order.durationHours > 0 ? `${order.durationHours}小时陪伴` : '领养申请'}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-[#8e857c] mt-1.5">
                    <Clock className="w-3 h-3 text-[#e06346]" />
                    <span>{order.serviceDate} {order.timeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="p-2.5 bg-[#fbfaf8] rounded-xl text-[11px] text-[#5c544d] space-y-1">
                <div className="flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#a1978d] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{order.address}</span>
                </div>
                <div className="flex items-center justify-between text-[#8c8278] pl-4">
                  <span>收件人：{order.contactName} ({order.contactPhone})</span>
                  <span className="text-emerald-600 flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3" />
                    专车恒温送达
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveContractOrder(order)}
                  className="text-[11px] text-[#7d746d] hover:text-[#2b2523] flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>服务协议留档</span>
                </button>

                <div className="flex items-center gap-2">
                  {order.status === 'pending_delivery' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'cancelled')}
                        className="px-2.5 py-1 text-[#8e857c] hover:text-red-600 text-[11px] rounded-lg border border-[#e6e1d7]"
                      >
                        取消订单
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'in_progress')}
                        className="px-3 py-1 bg-[#e06346] text-white text-[11px] font-semibold rounded-lg hover:bg-[#c95337] transition-colors"
                      >
                        模拟确认送达
                      </button>
                    </>
                  )}

                  {order.status === 'in_progress' && (
                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                      className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      完成交接验收
                    </button>
                  )}

                  {order.status === 'completed' && (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> 已顺利交接
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contract Preview Modal */}
      {activeContractOrder && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-xl border border-[#ece8df] space-y-3">
            <h4 className="font-bold text-sm text-[#2b2523] pb-2 border-b border-[#f1eee7]">
              📜 小猫咪到家·安全协议留档凭证
            </h4>
            <div className="text-xs text-[#524a44] space-y-1.5 leading-relaxed bg-[#faf8f5] p-3 rounded-xl">
              <p><strong>服务小猫：</strong>{activeContractOrder.catName} ({activeContractOrder.catBreed})</p>
              <p><strong>预约服务单号：</strong>{activeContractOrder.id}</p>
              <p><strong>送达时段：</strong>{activeContractOrder.serviceDate} {activeContractOrder.timeSlot}</p>
              <p><strong>专车恒温保障：</strong>已为猫咪配备航空箱恒温箱与减压护具。</p>
              <p><strong>当面交接准则：</strong>配送专员当面核验猫咪毛发、精神状态，拍摄交接存根。</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveContractOrder(null)}
              className="w-full py-2 bg-[#e06346] text-white text-xs font-semibold rounded-full hover:bg-[#c95337] transition-colors"
            >
              已阅读并知悉
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
