import { useVariantC } from '../context/VariantCContext';
import { PartnerTransferGrid } from '../components/form/PartnerTransferGrid';
import { TEAM_SIZE_OPTIONS } from '../data/variantCStepConfig';

export function ClaimPartnersPage() {
  const {
    state,
    toggleMultiAnswer,
    setSingleAnswer,
    nextStep,
    canProceed,
  } = useVariantC();
  const { answers, isLoading } = state;

  const handleContinue = () => {
    if (canProceed()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Partner selection */}
      <div>
        <label className="block text-[14px] font-semibold text-[#283E48] mb-1">
          Where would you like to transfer your rewards?
        </label>
        <p className="text-[13px] text-[#6B7280] mb-3">
          Select your preferred partners - you can change this anytime
        </p>
        <PartnerTransferGrid
          selected={answers.partners}
          onToggle={(partner) => toggleMultiAnswer('partners', partner)}
          industry={answers.industry}
        />
      </div>

      {/* Team size (optional refinement) */}
      <div>
        <label className="block text-[14px] font-semibold text-[#283E48] mb-1">
          How many people are in your team?
        </label>
        <p className="text-[13px] text-[#6B7280] mb-3">
          Optional - helps us refine your estimate
        </p>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSingleAnswer('employees', option.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                answers.employees === option.id
                  ? 'bg-[#3866B0] text-white'
                  : 'bg-[#F0F4F8] text-[#6B7280] hover:bg-[#E2E9F9]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary preview */}
      {answers.partners.length > 0 && (
        <div className="bg-[#F0F7FF] border border-[#D3DFF6] rounded-xl p-4">
          <div className="text-[13px] text-[#3866B0] font-semibold mb-2">
            You've selected {answers.partners.length} partner
            {answers.partners.length > 1 ? 's' : ''}
          </div>
          <div className="text-[12px] text-[#6B7280]">
            You can transfer your PayRewards to any of these partners at any time.
            Transfer rates are shown next to each partner.
          </div>
        </div>
      )}

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
        Continue to Secure Your Rewards
        <svg
          className="inline-block ml-2 w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
