import { useVariantG } from '../../context/VariantGContext';
import { CheckIcon, TrendingIcon, StarIcon } from '../../../../components/icons/Icons';

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
}

export function NextStepsPanel() {
  const { state } = useVariantG();
  const { answers, calculated } = state;

  const steps = [
    'Instant dashboard access',
    'Client invite links ready',
    'Onboarding call scheduled',
    'Marketing materials sent',
  ];

  return (
    <div className="space-y-6">
      {/* What happens next */}
      <div className="bg-white rounded-xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)]">
        <h3 className="text-xs font-bold tracking-[0.8px] text-[#6B7280] uppercase mb-4">
          What Happens Next
        </h3>
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckIcon className="w-3 h-3 text-[#166534]" />
              </div>
              <span className="text-[#283E48]">
                {step}
                {idx === 2 && (
                  <span className="block text-sm text-[#6B7280] mt-0.5">
                    (we'll help you roll out to your first clients)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-white rounded-xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
          ))}
        </div>
        <p className="text-[#283E48] italic mb-3 text-sm leading-relaxed">
          "pay.com.au has been a game changer for our practice. Our clients love the
          rewards and we've added a new revenue stream through referrals."
        </p>
        <p className="text-sm text-[#6B7280]">— Sarah K., Melbourne CPA</p>
      </div>

      {/* Portfolio Summary */}
      <div className="bg-[#F0F7FF] rounded-xl p-6 border border-[#D3DFF6]">
        <div className="flex items-center gap-2 mb-4">
          <TrendingIcon className="w-4 h-4 text-[#3866B0]" />
          <h3 className="text-xs font-bold tracking-[0.8px] text-[#3866B0] uppercase">
            Your Portfolio
          </h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280]">Clients</span>
            <span className="font-bold text-[#283E48]">{answers.clientCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280]">Points potential</span>
            <span className="font-bold text-[#3866B0]">
              {formatNumber(calculated.annualPointsPotential)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280]">Bonus potential</span>
            <span className="font-bold text-[#22C55E]">
              ${calculated.advisorBonusPotential.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
