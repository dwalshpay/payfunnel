import { useVariantG } from '../../context/VariantGContext';
import { CheckIcon } from '../../../../components/icons/Icons';

const EXPENSE_OPTIONS = [
  { value: 'low', label: 'Under $10,000' },
  { value: 'medium', label: '$10,000 - $30,000' },
  { value: 'high', label: '$30,000 - $75,000' },
  { value: 'very_high', label: '$75,000+' },
] as const;

export function ExpenseRangeSelector() {
  const { state, setAvgExpenses } = useVariantG();
  const { avgMonthlyExpenses } = state.answers;

  return (
    <div className="space-y-3">
      <label className="block text-[16px] font-bold text-[#283E48] tracking-[0.3px]">
        What's the average monthly expense volume per client?
      </label>

      <div className="space-y-2">
        {EXPENSE_OPTIONS.map((option) => {
          const isSelected = avgMonthlyExpenses === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setAvgExpenses(option.value)}
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
