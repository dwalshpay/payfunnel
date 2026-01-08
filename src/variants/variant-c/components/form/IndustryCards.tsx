import type { ReactNode } from 'react';
import { INDUSTRY_OPTIONS } from '../../data/variantCStepConfig';

interface IndustryCardsProps {
  selected: string | null;
  onSelect: (industry: string) => void;
}

// Icon mapping
const ICONS: Record<string, ReactNode> = {
  building: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  tools: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
        clipRule="evenodd"
      />
    </svg>
  ),
  briefcase: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  ),
  coffee: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
};

export function IndustryCards({ selected, onSelect }: IndustryCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {INDUSTRY_OPTIONS.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
              isSelected
                ? 'border-[#3866B0] bg-[#F0F7FF] shadow-md'
                : 'border-[#E2E9F9] bg-white hover:border-[#3866B0]/30 hover:shadow-sm'
            }`}
          >
            {/* Popular badge */}
            {option.popular && (
              <div className="absolute -top-2 -right-2 bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Popular
              </div>
            )}

            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                isSelected
                  ? 'bg-[#3866B0] text-white'
                  : 'bg-[#F0F4F8] text-[#6B7280]'
              }`}
            >
              {ICONS[option.icon || 'star']}
            </div>

            {/* Label */}
            <div
              className={`text-[14px] font-semibold mb-0.5 ${
                isSelected ? 'text-[#3866B0]' : 'text-[#283E48]'
              }`}
            >
              {option.label}
            </div>

            {/* Description */}
            {option.description && (
              <div className="text-[12px] text-[#6B7280]">
                {option.description}
              </div>
            )}

            {/* Selected checkmark */}
            {isSelected && (
              <div className="absolute top-3 right-3">
                <svg
                  className="w-5 h-5 text-[#3866B0]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
