import { useVariantG } from '../../context/VariantGContext';

const CLIENT_COUNT_OPTIONS = [
  { value: 5, label: '5' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100+' },
];

export function ClientCountSelector() {
  const { state, setClientCount } = useVariantG();
  const { clientCount } = state.answers;

  return (
    <div className="space-y-3">
      <label className="block text-[16px] font-bold text-[#283E48] tracking-[0.3px]">
        How many business clients do you manage?
      </label>

      <div className="grid grid-cols-4 gap-3">
        {CLIENT_COUNT_OPTIONS.map((option) => {
          const isSelected = clientCount === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setClientCount(option.value)}
              className={`
                py-4 px-4 rounded-xl text-center font-bold transition-all duration-200
                ${
                  isSelected
                    ? 'bg-[#3866B0] text-white shadow-lg shadow-[#3866B0]/20'
                    : 'bg-[#F0F4FA] text-[#003C80] hover:bg-[#E2E9F9]'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[#6B7280]">
        Select the approximate number of business clients in your portfolio
      </p>
    </div>
  );
}
