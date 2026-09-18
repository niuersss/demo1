import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  keyword: string;
  setKeyword: (val: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}

const FILTER_TAGS = ['全部', '幼猫', '温顺粘人', '金渐层', '英短', '免费领养', '已绝育'];

export const SearchBar: React.FC<SearchBarProps> = ({
  keyword,
  setKeyword,
  selectedTag,
  setSelectedTag,
}) => {
  return (
    <div className="w-full px-4 pt-2 pb-2">
      {/* Pill Search Input matching screenshot */}
      <div className="relative flex items-center w-full bg-white rounded-full shadow-2xs border border-[#eae6de] px-3.5 py-2">
        <Search className="w-4 h-4 text-[#9c938a] shrink-0 mr-2" />
        <input
          id="search-cats-input"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索喜欢的猫咪（名字、品种、性格）"
          className="w-full bg-transparent text-xs text-[#2b2523] placeholder-[#aba299] focus:outline-none"
        />
        {keyword && (
          <button
            type="button"
            onClick={() => setKeyword('')}
            className="p-1 text-[#a39a91] hover:text-[#453e39]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Quick Filter Tags */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 pb-1">
        {FILTER_TAGS.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full transition-all ${
                isActive
                  ? 'bg-[#d86243] text-white font-medium shadow-xs'
                  : 'bg-white/80 text-[#716962] border border-[#ebe7e0] hover:bg-white'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
