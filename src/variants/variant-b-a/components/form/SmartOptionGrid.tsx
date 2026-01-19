import { iconMap, ChevronRightIcon } from '../../../../components/icons/Icons';
import { partnerLogoMap } from '../../../../components/icons/PartnerLogos';

interface Option {
  id: string;
  label: string;
  icon?: string;
  popular?: boolean;
  hasOtherInput?: boolean;
}

interface SmartOptionGridProps {
  options: Option[];
  selectedValues: string | string[] | null;
  isMulti?: boolean;
  onSelect: (value: string) => void;
  columns?: 1 | 2;
  size?: 'default' | 'compact';
}

export function SmartOptionGrid({
  options,
  selectedValues,
  isMulti = false,
  onSelect,
  columns = 1,
  size = 'default',
}: SmartOptionGridProps) {
  const isSelected = (id: string): boolean => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(id);
    }
    return selectedValues === id;
  };

  // Use 2 columns on desktop for multi-select grids, 1 column for single-select
  const gridCols = isMulti
    ? 'grid-cols-1 lg:grid-cols-2'
    : columns === 2
    ? 'grid-cols-2'
    : 'grid-cols-1';
  const padding = size === 'compact' ? 'px-4 py-3' : 'pl-4 pr-6 py-4';

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {options.map((option) => {
        const selected = isSelected(option.id);
        const IconComponent = option.icon ? iconMap[option.icon] : null;
        const PartnerLogo = option.icon ? partnerLogoMap[option.icon] : null;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`relative w-full flex items-center justify-between ${padding} rounded-2xl transition-all duration-200 ${
              selected
                ? 'bg-[#3866B0] text-white shadow-lg shadow-[#3866B0]/20 scale-[1.02]'
                : 'bg-[#F0F4F8] text-[#283E48] hover:bg-[#E2E9F9] hover:scale-[1.01]'
            }`}
          >
            {/* Popular badge */}
            {option.popular && !selected && (
              <span className="absolute -top-2 left-4 px-2 py-0.5 bg-[#F59E0B] text-white text-[10px] font-bold rounded-full uppercase">
                Popular
              </span>
            )}

            <div className="flex items-center gap-4">
              {/* Multi-select checkbox indicator */}
              {isMulti && (
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selected
                      ? 'bg-white border-white'
                      : 'border-[#BDBDBD] bg-transparent'
                  }`}
                >
                  {selected && (
                    <svg
                      className="w-3 h-3 text-[#3866B0]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              )}

              {/* Partner Logo */}
              {PartnerLogo && (
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden ${
                    selected ? 'bg-white/20' : 'bg-white'
                  }`}
                >
                  <PartnerLogo className="w-6 h-6" />
                </div>
              )}

              {/* Regular Icon */}
              {IconComponent && !PartnerLogo && (
                <IconComponent
                  className={`w-6 h-6 flex-shrink-0 ${
                    selected ? 'text-white' : 'text-[#3866B0]'
                  }`}
                />
              )}

              {/* Label */}
              <span className="font-semibold text-[15px]">{option.label}</span>
            </div>

            {/* Chevron for single select */}
            {!isMulti && (
              <ChevronRightIcon
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  selected ? 'text-white translate-x-1' : 'text-[#BDBDBD]'
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// Compact version for size selection
export function SizeSelector({
  options,
  selectedValue,
  onSelect,
}: {
  options: { id: string; label: string }[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => {
        const selected = selectedValue === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              selected
                ? 'bg-[#3866B0] text-white'
                : 'bg-[#F0F4F8] text-[#283E48] hover:bg-[#E2E9F9]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
