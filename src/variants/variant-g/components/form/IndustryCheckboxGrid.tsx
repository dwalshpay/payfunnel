import { useVariantG } from '../../context/VariantGContext';
import {
  BuildingIcon,
  WrenchIcon,
  BriefcaseIcon,
  HospitalIcon,
  PackageIcon,
  GovernmentIcon,
  MoreIcon,
  CheckIcon,
} from '../../../../components/icons/Icons';

const INDUSTRY_OPTIONS = [
  { value: 'construction', label: 'Construction', icon: BuildingIcon },
  { value: 'trades', label: 'Trades', icon: WrenchIcon },
  { value: 'professional', label: 'Professional services', icon: BriefcaseIcon },
  { value: 'healthcare', label: 'Healthcare', icon: HospitalIcon },
  { value: 'retail', label: 'Retail', icon: PackageIcon },
  { value: 'property', label: 'Property', icon: GovernmentIcon },
  { value: 'other', label: 'Other', icon: MoreIcon },
];

export function IndustryCheckboxGrid() {
  const { state, toggleIndustry } = useVariantG();
  const { industries } = state.answers;

  const selectedCount = industries.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[16px] font-bold text-[#283E48] tracking-[0.3px]">
          What industries do your clients operate in?
        </label>
        {selectedCount > 0 && (
          <span className="text-sm text-[#3866B0] font-medium">
            {selectedCount} selected
          </span>
        )}
      </div>
      <p className="text-sm text-[#6B7280]">Select all that apply</p>

      <div className="grid grid-cols-2 gap-3">
        {INDUSTRY_OPTIONS.map((option) => {
          const isSelected = industries.includes(option.value);
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              onClick={() => toggleIndustry(option.value)}
              className={`
                flex items-center gap-3 py-4 px-4 rounded-xl transition-all duration-200 text-left
                ${
                  isSelected
                    ? 'bg-[#3866B0] text-white shadow-lg shadow-[#3866B0]/20'
                    : 'bg-[#F0F4FA] text-[#003C80] hover:bg-[#E2E9F9]'
                }
              `}
            >
              <div
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                  ${isSelected ? 'border-white bg-white' : 'border-[#D3DFF6]'}
                `}
              >
                {isSelected && <CheckIcon className="w-3 h-3 text-[#3866B0]" />}
              </div>
              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#3866B0]'}`} />
              <span className="font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
