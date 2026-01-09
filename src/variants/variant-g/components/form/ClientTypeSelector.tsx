import { useVariantG } from '../../context/VariantGContext';
import { CheckIcon } from '../../../../components/icons/Icons';

const CLIENT_TYPE_OPTIONS = [
  { value: 'sole_traders', label: 'Sole traders' },
  { value: 'smes', label: 'SMEs (2-50 employees)' },
  { value: 'mid_market', label: 'Mid-market (50-200)' },
  { value: 'mixed', label: 'Mixed portfolio' },
] as const;

export function ClientTypeSelector() {
  const { state, setClientType } = useVariantG();
  const { clientType } = state.answers;

  return (
    <div className="space-y-3">
      <label className="block text-[16px] font-bold text-[#283E48] tracking-[0.3px]">
        What type of clients do you primarily serve?
      </label>

      <div className="space-y-2">
        {CLIENT_TYPE_OPTIONS.map((option) => {
          const isSelected = clientType === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setClientType(option.value)}
              className={`
                w-full flex items-center justify-between py-4 px-5 rounded-xl transition-all duration-200
                ${
                  isSelected
                    ? 'bg-[#3866B0] text-white shadow-lg shadow-[#3866B0]/20'
                    : 'bg-[#F0F4FA] text-[#003C80] hover:bg-[#E2E9F9]'
                }
              `}
            >
              <span className="font-medium">{option.label}</span>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-[#3866B0]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
