import React, { useState } from 'react';
import {
  X,
  Upload,
  Sparkles,
  Camera,
  Check,
  AlertCircle,
  Plus
} from 'lucide-react';
import { CatInfo, ServiceType } from '../types';
import { POPULAR_BREEDS, COMMON_TAGS, PRESET_CAT_AVATARS } from '../data/initialCats';

interface PublishCatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newCat: CatInfo) => void;
}

export const PublishCatModal: React.FC<PublishCatModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('英国短毛猫');
  const [customBreed, setCustomBreed] = useState('');
  const [age, setAge] = useState('3个月');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [priceType, setPriceType] = useState<ServiceType>('hourly');
  const [pricePerHour, setPricePerHour] = useState<number>(50);
  const [adoptionFee, setAdoptionFee] = useState<number>(0);

  // Photo state
  const [imageUrl, setImageUrl] = useState<string>(PRESET_CAT_AVATARS[0].url);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showPresetPicker, setShowPresetPicker] = useState(false);

  // Health
  const [vaccinated, setVaccinated] = useState(true);
  const [vaccineDoses, setVaccineDoses] = useState(3);
  const [dewormed, setDewormed] = useState(true);
  const [neutered, setNeutered] = useState(false);
  const [checkupPassed, setCheckupPassed] = useState(true);
  const [healthNotes, setHealthNotes] = useState('体检健康，定期驱虫，精神状态优良。');

  // Personality tags
  const [selectedTags, setSelectedTags] = useState<string[]>([
    '活泼粘人',
    '呼噜怪',
    '会用猫砂',
  ]);

  // Description & AI Assistant
  const [description, setDescription] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  // Location & Publisher
  const [city] = useState('北京市');
  const [district, setDistrict] = useState('朝阳区');
  const [publisherName, setPublisherName] = useState('我爱猫咪');
  const [contactPhone, setContactPhone] = useState('13812345678');
  const [contactWechat, setContactWechat] = useState('');

  // Error validation
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      setFormError('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImageUrl(result);
        setUploadedImages((prev) => [result, ...prev]);
        setFormError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= 6) {
        setFormError('最多选择6个性格标签');
        return;
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // AI 1-Click Generate Profile Description
  const handleGenerateAiDescription = async () => {
    setIsGeneratingAi(true);
    setAiMessage('');
    try {
      const targetBreed = breed === '其它品种' && customBreed ? customBreed : breed;
      const res = await fetch('/api/generate-cat-desc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || '小可爱',
          breed: targetBreed,
          age,
          gender,
          tags: selectedTags,
          style: '可爱暖萌、详细生动',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDescription(data.description);
        setAiMessage(data.source === 'gemini' ? '✨ Gemini AI 已为你生成生动文案！' : '✨ 已为你生成暖萌推荐文案！');
      } else {
        throw new Error('API request failed');
      }
    } catch {
      // Client-side fallback template
      const fallback = `${name || '小可爱'}是一只超治愈的${breed}，今年${age}，是个${gender === 'boy' ? '男孩子(弟弟)' : '女孩子(妹妹)'}。平时特别${selectedTags.join('、')}，会自己用猫砂盆，随时开启呼噜小马达，期待与你温暖相遇！`;
      setDescription(fallback);
      setAiMessage('✨ 已生成推荐文案！');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('请填写猫咪昵称');
      return;
    }
    if (!imageUrl) {
      setFormError('请上传或选择猫咪照片');
      return;
    }
    if (priceType === 'hourly' && (isNaN(pricePerHour) || pricePerHour <= 0)) {
      setFormError('请输入有效的小时服务价格');
      return;
    }

    const finalBreed = breed === '其它品种' && customBreed.trim() ? customBreed.trim() : breed;

    const newCat: CatInfo = {
      id: `user-cat-${Date.now()}`,
      name: name.trim(),
      breed: finalBreed,
      age: age.trim() || '3个月',
      gender,
      imageUrl,
      additionalImages: uploadedImages.length > 1 ? uploadedImages : undefined,
      priceType,
      pricePerHour: priceType === 'hourly' ? Number(pricePerHour) : undefined,
      adoptionFee: priceType === 'adoption' ? Number(adoptionFee) : undefined,
      tags: selectedTags.length > 0 ? selectedTags : ['健康活泼', '性格温顺'],
      city,
      district,
      distance: '附近 500m',
      health: {
        vaccinated,
        vaccineDoses,
        dewormed,
        neutered,
        checkupPassed,
        notes: healthNotes,
      },
      description:
        description.trim() ||
        `${name}是一只非常可爱温顺的${finalBreed}，身体健康指标优良，期待认识新朋友！`,
      temperament: selectedTags,
      publisher: {
        id: `user-pub-${Date.now()}`,
        name: publisherName.trim() || '爱宠铲屎官',
        avatar: imageUrl,
        phone: contactPhone.trim() || '138****0000',
        wechat: contactWechat.trim() || 'cat_friend',
        verified: true,
        isCurrentUser: true,
      },
      status: 'available',
      likeCount: 1,
      viewCount: 1,
      createdAt: Date.now(),
    };

    onPublish(newCat);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end sm:justify-center items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#ede9e1]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0ece4] bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <div>
              <h3 className="text-base font-bold text-[#2b2523]">发布猫咪信息</h3>
              <p className="text-[11px] text-[#8e857c]">让更多爱宠人士认识你的暖萌小猫</p>
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {formError && (
            <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Cat Photo Upload & Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#322b27] flex items-center gap-1">
                <span>猫咪美照</span>
                <span className="text-[#e06346]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPresetPicker(!showPresetPicker)}
                className="text-[11px] text-[#e06346] hover:underline font-medium"
              >
                {showPresetPicker ? '收起推荐图库' : '🖼️ 快速选用萌猫图'}
              </button>
            </div>

            {/* Current Image Display & Upload Area */}
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[#f0ece4] border-2 border-dashed border-[#dcd6cb] flex items-center justify-center group shrink-0">
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Cat preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <label
                      htmlFor="cat-photo-upload"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer"
                    >
                      <Camera className="w-5 h-5 mb-0.5" />
                      <span className="text-[10px]">更换</span>
                    </label>
                  </>
                ) : (
                  <div className="text-center text-[#9b9187]">
                    <Upload className="w-6 h-6 mx-auto mb-1 opacity-60" />
                    <span className="text-[10px]">上传照片</span>
                  </div>
                )}
              </div>

              {/* Upload input button */}
              <div className="flex-1 space-y-1.5">
                <label
                  htmlFor="cat-photo-upload"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#f6f2ec] hover:bg-[#eee8e0] text-[#4f463f] font-medium rounded-xl border border-[#e4ded5] cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#e06346]" />
                  <span>选择本地照片上传</span>
                </label>
                <input
                  id="cat-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-[10px] text-[#9b9187]">
                  支持 JPG、PNG、WebP 格式，清晰正脸照更受欢迎
                </p>
              </div>
            </div>

            {/* Preset Image Picker Drawer */}
            {showPresetPicker && (
              <div className="p-2.5 bg-[#faf8f5] rounded-2xl border border-[#eeebe4] space-y-1.5 animate-in fade-in duration-150">
                <span className="text-[11px] font-semibold text-[#665e57]">点击一键选用推荐萌照：</span>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_CAT_AVATARS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setImageUrl(preset.url);
                        setShowPresetPicker(false);
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        imageUrl === preset.url
                          ? 'border-[#e06346] ring-2 ring-[#e06346]/30'
                          : 'border-transparent hover:border-[#dcd6cb]'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[9px] py-0.5 text-center truncate px-0.5">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Cat Basic Information */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#322b27] mb-1">
                猫咪昵称 <span className="text-[#e06346]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：糖果、咪咪、大白"
                className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523] placeholder-[#aba299] focus:outline-none focus:border-[#e06346] focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#322b27] mb-1">
                性别
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGender('boy')}
                  className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    gender === 'boy'
                      ? 'bg-[#3b82f6]/15 text-[#2563eb] border border-[#3b82f6]/40'
                      : 'bg-[#f8f5f0] text-[#716962] border border-[#e6e1d7]'
                  }`}
                >
                  <span>♂ 弟弟</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('girl')}
                  className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    gender === 'girl'
                      ? 'bg-[#ec4899]/15 text-[#db2777] border border-[#ec4899]/40'
                      : 'bg-[#f8f5f0] text-[#716962] border border-[#e6e1d7]'
                  }`}
                >
                  <span>♀ 妹妹</span>
                </button>
              </div>
            </div>
          </div>

          {/* Breed & Age */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#322b27] mb-1">品种</label>
              <select
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523] focus:outline-none focus:border-[#e06346] focus:bg-white"
              >
                {POPULAR_BREEDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#322b27] mb-1">年龄</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="例如：3个月、1岁半"
                className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523] placeholder-[#aba299] focus:outline-none focus:border-[#e06346] focus:bg-white"
              />
            </div>
          </div>

          {breed === '其它品种' && (
            <div>
              <input
                type="text"
                value={customBreed}
                onChange={(e) => setCustomBreed(e.target.value)}
                placeholder="请输入具体猫咪品种"
                className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl px-3 py-2 text-xs text-[#2b2523] focus:outline-none focus:border-[#e06346] focus:bg-white"
              />
            </div>
          )}

          {/* Section 3: Service Type & Pricing */}
          <div className="p-3 bg-[#faf7f2] rounded-2xl border border-[#eee9df] space-y-2.5">
            <label className="block font-bold text-[#322b27]">发布模式与费用</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPriceType('hourly')}
                className={`p-2 rounded-xl text-left transition-all ${
                  priceType === 'hourly'
                    ? 'bg-white border-2 border-[#e06346] shadow-xs'
                    : 'bg-[#f4efe8] border border-transparent'
                }`}
              >
                <div className="font-bold text-[#2b2523]">陪伴预约</div>
                <div className="text-[10px] text-[#8e857c]">按小时提供暖萌陪伴</div>
              </button>

              <button
                type="button"
                onClick={() => setPriceType('adoption')}
                className={`p-2 rounded-xl text-left transition-all ${
                  priceType === 'adoption'
                    ? 'bg-white border-2 border-[#e06346] shadow-xs'
                    : 'bg-[#f4efe8] border border-transparent'
                }`}
              >
                <div className="font-bold text-[#2b2523]">爱心领养</div>
                <div className="text-[10px] text-[#8e857c]">为猫咪寻找温暖新家</div>
              </button>
            </div>

            {priceType === 'hourly' ? (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-[#59514b]">每小时陪伴费用：</span>
                <div className="flex items-center bg-white border border-[#e6e1d7] rounded-xl px-2.5 py-1.5 w-32">
                  <span className="text-xs font-bold text-[#e06346] mr-1">¥</span>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(Number(e.target.value))}
                    className="w-full text-xs font-bold text-[#2b2523] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#9b9289]">/小时</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-[#59514b]">领养费用设置：</span>
                <div className="flex items-center bg-white border border-[#e6e1d7] rounded-xl px-2.5 py-1.5 w-32">
                  <span className="text-xs font-bold text-[#e06346] mr-1">¥</span>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={adoptionFee}
                    onChange={(e) => setAdoptionFee(Number(e.target.value))}
                    className="w-full text-xs font-bold text-[#2b2523] focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-[#8e857c]">(输入 0 表示免费领养)</span>
              </div>
            )}
          </div>

          {/* Section 4: Health Status & Guarantees */}
          <div className="space-y-2">
            <label className="block font-bold text-[#322b27]">健康保证</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 bg-[#f8f5f0] p-2 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={vaccinated}
                  onChange={(e) => setVaccinated(e.target.checked)}
                  className="rounded text-[#e06346] focus:ring-[#e06346]"
                />
                <span>已接种疫苗 ({vaccineDoses}针)</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f8f5f0] p-2 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={dewormed}
                  onChange={(e) => setDewormed(e.target.checked)}
                  className="rounded text-[#e06346] focus:ring-[#e06346]"
                />
                <span>已做体内外驱虫</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f8f5f0] p-2 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={neutered}
                  onChange={(e) => setNeutered(e.target.checked)}
                  className="rounded text-[#e06346] focus:ring-[#e06346]"
                />
                <span>已绝育</span>
              </label>

              <label className="flex items-center gap-2 bg-[#f8f5f0] p-2 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkupPassed}
                  onChange={(e) => setCheckupPassed(e.target.checked)}
                  className="rounded text-[#e06346] focus:ring-[#e06346]"
                />
                <span>医院体检合格</span>
              </label>
            </div>
          </div>

          {/* Section 5: Personality Tags */}
          <div className="space-y-1.5">
            <label className="block font-bold text-[#322b27]">
              性格标签 <span className="text-[10px] text-[#9b9187] font-normal">(点击添加/取消)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-full transition-all ${
                      isSelected
                        ? 'bg-[#e06346] text-white font-medium shadow-2xs'
                        : 'bg-[#f4efe8] text-[#6d645c] hover:bg-[#eae3d9]'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 inline mr-1" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Story Description & AI Helper */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#322b27]">猫咪故事与介绍</label>
              <button
                type="button"
                onClick={handleGenerateAiDescription}
                disabled={isGeneratingAi}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#e06346] bg-[#fbf3ef] hover:bg-[#f8e7df] px-2.5 py-1 rounded-full border border-[#f2d7cb] transition-colors"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAi ? 'AI 构思中...' : '✨ AI 帮写文案'}</span>
              </button>
            </div>

            {aiMessage && (
              <p className="text-[10px] text-[#e06346] animate-in fade-in">
                {aiMessage}
              </p>
            )}

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="分享小猫的生活习惯、可爱瞬间、性格特点或注意事项..."
              className="w-full bg-[#f8f5f0] border border-[#e6e1d7] rounded-xl p-3 text-xs text-[#2b2523] placeholder-[#aba299] focus:outline-none focus:border-[#e06346] focus:bg-white resize-none"
            />
          </div>

          {/* Section 7: Location & Publisher Contact */}
          <div className="p-3 bg-[#faf7f2] rounded-2xl border border-[#eee9df] space-y-2">
            <div className="font-bold text-[#322b27]">铲屎官联系方式</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-[#716860] mb-0.5">所在区域</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="例如：朝阳区三里屯"
                  className="w-full bg-white border border-[#e6e1d7] rounded-xl px-2.5 py-1.5 text-xs text-[#2b2523]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#716860] mb-0.5">联系称呼</label>
                <input
                  type="text"
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                  placeholder="例如：王小姐"
                  className="w-full bg-white border border-[#e6e1d7] rounded-xl px-2.5 py-1.5 text-xs text-[#2b2523]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-[#716860] mb-0.5">联系电话</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="手机号码"
                  className="w-full bg-white border border-[#e6e1d7] rounded-xl px-2.5 py-1.5 text-xs text-[#2b2523]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#716860] mb-0.5">微信号 (选填)</label>
                <input
                  type="text"
                  value={contactWechat}
                  onChange={(e) => setContactWechat(e.target.value)}
                  placeholder="用于沟通交接"
                  className="w-full bg-white border border-[#e6e1d7] rounded-xl px-2.5 py-1.5 text-xs text-[#2b2523]"
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 pb-1">
            <button
              id="submit-cat-publish-btn"
              type="submit"
              className="w-full py-3 bg-[#e06346] hover:bg-[#cb5539] text-white font-bold text-sm rounded-full shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>确认发布小猫信息</span>
            </button>
            <p className="text-[10px] text-center text-[#9b9187] mt-2">
              发布即代表承诺提供真实健康的猫咪信息，遵守爱护动物准则
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
