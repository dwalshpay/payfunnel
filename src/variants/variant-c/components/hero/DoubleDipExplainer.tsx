interface DoubleDipExplainerProps {
  creditCardPoints: number;
  payRewardsPoints: number;
  totalPoints: number;
}

export function DoubleDipExplainer({
  creditCardPoints,
  payRewardsPoints,
  totalPoints,
}: DoubleDipExplainerProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E2E9F9]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-r from-[#3866B0] to-[#5B8AD0] text-white px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wide">
          Double-Dip Rewards
        </div>
        <div className="text-[12px] text-[#6B7280]">
          Earn points twice on every payment
        </div>
      </div>

      {/* Visual explanation */}
      <div className="space-y-4">
        {/* Row 1: Credit card */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F0F4F8] to-[#E2E9F9] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#6B7280]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-[#283E48]">
              Your credit card points
            </div>
            <div className="text-[13px] text-[#6B7280]">
              From your existing rewards card
            </div>
          </div>
          <div className="text-[16px] font-bold text-[#283E48]">
            {creditCardPoints.toLocaleString()}
          </div>
        </div>

        {/* Plus sign */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-bold text-[18px]">
            +
          </div>
        </div>

        {/* Row 2: PayRewards */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3866B0] to-[#5B8AD0] flex items-center justify-center">
            <span className="text-white font-bold text-[16px]">P</span>
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-[#283E48]">
              PayRewards bonus
            </div>
            <div className="text-[13px] text-[#6B7280]">
              Extra points on top - only with pay.com.au
            </div>
          </div>
          <div className="text-[16px] font-bold text-[#22C55E]">
            +{payRewardsPoints.toLocaleString()}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E2E9F9]" />

        {/* Total */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-[16px] font-semibold text-[#283E48]">
            Total annual points
          </div>
          <div className="text-[24px] font-bold text-[#3866B0]">
            {totalPoints.toLocaleString()} pts
          </div>
        </div>
      </div>
    </div>
  );
}
