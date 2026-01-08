import { iconMap, ChevronRightIcon } from '../icons/Icons';
import { partnerLogoMap } from '../icons/PartnerLogos';

interface OptionItemProps {
  id: string;
  label: string;
  icon?: string;
  isSelected: boolean;
  isMulti: boolean;
  onClick: () => void;
}

export function OptionItem({
  label,
  icon,
  isSelected,
  onClick,
}: OptionItemProps) {
  const IconComponent = icon ? iconMap[icon] : null;
  const PartnerLogo = icon ? partnerLogoMap[icon] : null;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between pl-4 pr-6 py-4 rounded-full transition-all ${
        isSelected
          ? 'bg-[#3866B0] text-white'
          : 'bg-[#D3DFF6] text-[#003C80] hover:bg-[#C5D4F0]'
      }`}
    >
      <div className="flex items-center gap-6">
        {/* Partner Logo (for airlines/cards) */}
        {PartnerLogo && (
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center overflow-hidden">
            <PartnerLogo className="w-6 h-6" />
          </div>
        )}

        {/* Regular Icon (if not a partner logo) */}
        {IconComponent && !PartnerLogo && (
          <IconComponent
            className={`w-6 h-6 flex-shrink-0 ${
              isSelected ? 'text-white' : 'text-[#003C80]'
            }`}
          />
        )}

        {/* Label */}
        <span className="font-bold text-[16px] tracking-[0.8px] leading-6">
          {label}
        </span>
      </div>

      {/* Chevron */}
      <ChevronRightIcon
        className={`w-6 h-6 flex-shrink-0 ${
          isSelected ? 'text-white' : 'text-[#003C80]'
        }`}
      />
    </button>
  );
}
