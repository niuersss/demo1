import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface FeatureDetail {
  title: string;
  icon: string;
  desc: string;
  details: string[];
}

const FEATURES: FeatureDetail[] = [
  {
    title: '健康好猫',
    icon: '❤️',
    desc: '严格体检无疾健康',
    details: [
      '所有猫咪均经过专业宠物医院抗原及PCR体检',
      '疫苗齐全，定期进行体内外驱虫',
      '无猫癣、无耳螨、无传染病健康保障'
    ]
  },
  {
    title: '安全协议',
    icon: '🛡️',
    desc: '正规签署安心合同',
    details: [
      '双方签署正规陪伴与领养服务协议',
      '明确双方权利义务与健康免责细则',
      '提供24小时专属宠物医生应急指导'
    ]
  },
  {
    title: '专人配送',
    icon: '🚗',
    desc: '恒温专车安全直送',
    details: [
      '配备专业恒温航空箱与舒压小毯',
      '同城专车点对点护送，避免换乘应激',
      '专员持健康码与消毒凭证规范送达'
    ]
  },
  {
    title: '交接拍照',
    icon: '📷',
    desc: '当面验猫留档无忧',
    details: [
      '送达现场当面检查猫咪精神状态与体表',
      '双方核对拍照建档，记录交接瞬间',
      '随赠应急小猫粮、罐头及猫砂试用装'
    ]
  },
];

export const ServiceFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureDetail | null>(null);

  return (
    <div className="w-full px-4 py-2">
      {/* 4 Items matching screenshot */}
      <div className="w-full bg-white rounded-2xl shadow-2xs border border-[#eeebe4] py-3.5 px-2 grid grid-cols-4 gap-1">
        {FEATURES.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveFeature(item)}
            className="flex flex-col items-center justify-center p-1 rounded-xl hover:bg-[#faf8f5] transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-[#fbf6f0] flex items-center justify-center text-lg mb-1 group-hover:scale-105 transition-transform">
              <span>{item.icon}</span>
            </div>
            <span className="text-xs font-semibold text-[#38312c]">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* Feature Details Modal */}
      {activeFeature && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-xl border border-[#ece8df] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1eee7]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeFeature.icon}</span>
                <div>
                  <h4 className="font-bold text-sm text-[#2b2523]">{activeFeature.title}</h4>
                  <p className="text-[11px] text-[#8e857c]">{activeFeature.desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveFeature(null)}
                className="p-1 text-[#9b9289] hover:text-[#2b2523]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {activeFeature.details.map((text, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#524a44]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e06346] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveFeature(null)}
              className="w-full mt-4 py-2 bg-[#e06346] text-white text-xs font-semibold rounded-full hover:bg-[#c95337] transition-colors"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
