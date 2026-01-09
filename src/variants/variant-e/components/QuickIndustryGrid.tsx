import {
  BuildingIcon,
  WrenchIcon,
  BriefcaseIcon,
  HospitalIcon,
  PackageIcon,
  SparklesIcon,
} from '../../../components/icons/Icons';

interface IndustryOption {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface QuickIndustryGridProps {
  options?: IndustryOption[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const defaultOptions: IndustryOption[] = [
  { id: 'construction', icon: BuildingIcon, label: 'Construction' },
  { id: 'trades', icon: WrenchIcon, label: 'Trades' },
  { id: 'professional', icon: BriefcaseIcon, label: 'Professional' },
  { id: 'healthcare', icon: HospitalIcon, label: 'Healthcare' },
  { id: 'retail', icon: PackageIcon, label: 'Retail' },
  { id: 'other', icon: SparklesIcon, label: 'Other' },
];

export function QuickIndustryGrid({
  options = defaultOptions,
  selected,
  onSelect,
}: QuickIndustryGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
      {options.map((option, index) => {
        const isSelected = selected === option.id;
        const IconComponent = option.icon;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`
              relative group
              flex flex-col items-center justify-center gap-2
              p-4 md:p-5
              rounded-xl
              border-2 transition-all duration-200
              opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]
              ${
                isSelected
                  ? 'bg-[#D3DFF6] border-[#3866B0] shadow-[0_0_0_3px_rgba(56,102,176,0.15)]'
                  : 'bg-white border-[#E0E0E0] hover:border-[#3866B0]/30 hover:bg-[#F8FAFC] hover:shadow-md'
              }
            `}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Selection checkmark */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#3866B0] flex items-center justify-center animate-[scaleIn_0.2s_ease-out]">
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Icon */}
            <div
              className={`
                w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-[#3866B0] scale-110'
                    : 'bg-[#3866B0]/10 group-hover:bg-[#3866B0]/20 group-hover:scale-105'
                }
              `}
            >
              <IconComponent
                className={`
                  w-5 h-5 md:w-6 md:h-6
                  transition-colors duration-200
                  ${isSelected ? 'text-white' : 'text-[#3866B0]'}
                `}
              />
            </div>

            {/* Label */}
            <span
              className={`
                text-xs md:text-sm font-medium text-center leading-tight
                transition-colors duration-200
                ${isSelected ? 'text-[#003C80]' : 'text-[#283E48] group-hover:text-[#3866B0]'}
              `}
            >
              {option.label}
            </span>
          </button>
        );
      })}

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export { defaultOptions as industryOptions };
