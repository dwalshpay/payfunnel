import { useVariantC } from '../context/VariantCContext';
import { IndustryCards } from '../components/form/IndustryCards';
import { ExpenseSlider } from '../components/form/ExpenseSlider';
import { INDUSTRY_AVERAGES } from '../data/variantCStepConfig';

export function UnlockRewardsPage() {
  const {
    state,
    setSingleAnswer,
    setExpense,
    nextStep,
    canProceed,
    applySmartDefaults,
  } = useVariantC();
  const { answers, isLoading } = state;

  const handleIndustrySelect = (industry: string) => {
    setSingleAnswer('industry', industry);
    // Apply smart defaults for this industry
    applySmartDefaults(industry);
  };

  const handleContinue = () => {
    if (canProceed()) {
      nextStep();
    }
  };

  // Show industry comparison if industry is selected
  const industryAverage = answers.industry
    ? INDUSTRY_AVERAGES[answers.industry]
    : null;

  return (
    <div className="space-y-6">
      {/* Industry selection */}
      <div>
        <label className="block text-[14px] font-semibold text-[#283E48] mb-3">
          What industry is your business in?
        </label>
        <IndustryCards
          selected={answers.industry}
          onSelect={handleIndustrySelect}
        />
      </div>

      {/* Industry tip */}
      {answers.industry && industryAverage && (
        <div className="bg-[#F0F7FF] border border-[#D3DFF6] rounded-lg p-3 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-[#3866B0] flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <div className="text-[13px] font-semibold text-[#3866B0]">
              {answers.industry.charAt(0).toUpperCase() +
                answers.industry.slice(1)}{' '}
              businesses earn an average of ${industryAverage.toLocaleString()}/year
            </div>
            <div className="text-[12px] text-[#6B7280]">
              We've pre-selected common payment methods for your industry
            </div>
          </div>
        </div>
      )}

      {/* Monthly expenses */}
      <div>
        <label className="block text-[14px] font-semibold text-[#283E48] mb-3">
          How much does your business spend monthly?
        </label>
        <ExpenseSlider value={answers.monthlyExpenses} onChange={setExpense} />
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!canProceed() || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-[15px] transition-all ${
          canProceed() && !isLoading
            ? 'bg-[#3866B0] hover:bg-[#2D5490] text-white shadow-md hover:shadow-lg'
            : 'bg-[#E2E9F9] text-[#9CA3AF] cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Calculating...
          </span>
        ) : (
          'See My Full Rewards'
        )}
      </button>
    </div>
  );
}
