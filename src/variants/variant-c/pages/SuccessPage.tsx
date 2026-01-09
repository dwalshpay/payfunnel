import { useEffect, useState } from 'react';
import { useVariantC } from '../context/VariantCContext';
import { useRewardsCalculator } from '../hooks/useRewardsCalculator';
import { useDestinationConverter, formatDestinationSummary } from '../hooks/useDestinationConverter';
import { getPartnerById } from '../data/partnerTransferRates';
import { INDUSTRY_OPTIONS } from '../data/variantCStepConfig';

export function SuccessPage() {
  const { state } = useVariantC();
  const { answers } = state;

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  const destinations = useDestinationConverter(
    rewards.doubleDip.totalPoints
  );

  const destinationInfo = formatDestinationSummary(
    rewards.doubleDip.totalPoints
  );

  // Animated counter
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = rewards.annualRewards;
    const duration = 1000;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.round(increment * step);
      setDisplayValue(Math.min(current, target));

      if (step >= steps) {
        setDisplayValue(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [rewards.annualRewards]);

  // Get selected industry label
  const industryLabel = INDUSTRY_OPTIONS.find(
    (i) => i.id === answers.industry
  )?.label;

  // Confetti effect
  useEffect(() => {
    // Simple confetti using CSS animations
    const container = document.getElementById('confetti-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.backgroundColor = ['#3866B0', '#22C55E', '#F59E0B', '#EC4899'][
        Math.floor(Math.random() * 4)
      ];
      container.appendChild(confetti);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2F8] via-[#F5F8FC] to-[#E8EEF5]">
      {/* Confetti container */}
      <div
        id="confetti-container"
        className="fixed inset-0 pointer-events-none overflow-hidden z-50"
      />

      {/* Confetti styles */}
      <style>{`
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0;
          animation: confetti-fall 3s ease-out forwards;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Header */}
      <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-white/80 backdrop-blur-sm">
        <svg
          width="140"
          height="28"
          viewBox="0 0 164 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="14" fill="#3866B0" />
          <path
            d="M10 7v14M10 7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4h-5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="7" r="2.5" fill="#00B67A" />
          <text
            x="34"
            y="19"
            fill="#283E48"
            fontSize="16"
            fontWeight="700"
            fontFamily="Europa, system-ui, sans-serif"
          >
            pay.com.au
          </text>
        </svg>
      </header>

      {/* Main content */}
      <main className="max-w-[800px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-[28px] md:text-[36px] font-bold text-[#283E48] mb-2">
            Your Rewards Dashboard
          </h1>
          <p className="text-[16px] text-[#6B7280]">
            Here's what you could earn with pay.com.au
          </p>
        </div>

        {/* Main rewards card */}
        <div className="bg-gradient-to-br from-[#3866B0] to-[#2D5490] rounded-2xl p-6 md:p-8 text-white text-center shadow-xl mb-6">
          <div className="text-[14px] opacity-80 mb-1">
            Estimated Annual Points
          </div>
          <div className="text-[48px] md:text-[64px] font-bold leading-none mb-4">
            {displayValue.toLocaleString()} pts
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-[12px] opacity-80">Credit Card Points</div>
              <div className="text-[18px] font-bold">
                {rewards.doubleDip.creditCardPoints.toLocaleString()}
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-[12px] opacity-80">PayRewards Bonus</div>
              <div className="text-[18px] font-bold text-[#86EFAC]">
                +{rewards.doubleDip.payRewardsPoints.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Destination visualization */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E2E9F9] mb-6">
          <div className="text-center mb-4">
            <div className="text-[48px] mb-2">{destinationInfo.emoji}</div>
            <div className="text-[20px] font-bold text-[#283E48]">
              {destinationInfo.text}
            </div>
            <div className="text-[14px] text-[#6B7280]">
              {destinationInfo.subtext}
            </div>
          </div>

          {/* Other destinations */}
          {destinations.affordableDestinations.length > 1 && (
            <div className="border-t border-[#E2E9F9] pt-4 mt-4">
              <div className="text-[12px] text-[#6B7280] text-center mb-3">
                Or earn enough for:
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {destinations.affordableDestinations.slice(1, 4).map((dest) => (
                  <div
                    key={dest.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F4F8] rounded-full"
                  >
                    <span className="text-[16px]">{dest.emoji}</span>
                    <span className="text-[13px] font-medium text-[#6B7280]">
                      {dest.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E2E9F9] mb-6">
          <h3 className="text-[16px] font-bold text-[#283E48] mb-4">
            Your Profile Summary
          </h3>

          <div className="space-y-3 text-[14px]">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Industry</span>
              <span className="font-semibold text-[#283E48]">
                {industryLabel || 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Monthly Expenses</span>
              <span className="font-semibold text-[#283E48]">
                ${answers.monthlyExpenses.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Payment Methods</span>
              <span className="font-semibold text-[#283E48]">
                {answers.paymentMethods.length} selected
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Transfer Partners</span>
              <span className="font-semibold text-[#283E48]">
                {answers.partners.map((p) => getPartnerById(p)?.shortName).join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <a
            href="https://id.pay.com.au/register"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-[16px] rounded-xl shadow-lg transition-all hover:shadow-xl text-center"
          >
            Start Earning Rewards
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          <div className="text-center text-[13px] text-[#6B7280]">
            30-day free Premium trial • No credit card required
          </div>
        </div>
      </main>
    </div>
  );
}
