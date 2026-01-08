import { useEffect, useState } from 'react';
import { useVariantD } from '../context/VariantDContext';
import { formatPoints, getFlightDestination } from '../hooks/useDoubleDipCalculator';

export function SuccessPage() {
  const { state } = useVariantD();
  const { answers, rewards } = state;
  const [showConfetti, setShowConfetti] = useState(true);
  const [animatedFlights, setAnimatedFlights] = useState(0);

  // Confetti effect
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Animate flight counter
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    const targetFlights = rewards.businessClassFlights;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedFlights(targetFlights * eased);

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedFlights(targetFlights);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [rewards.businessClassFlights]);

  const destination = getFlightDestination(answers.partners);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#F5F5F5] overflow-hidden relative">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#3866B0', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'][
                  Math.floor(Math.random() * 5)
                ],
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animation: `fall ${2 + Math.random() * 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="px-8 py-12 text-center relative z-10">
        {/* Success icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg shadow-[#22C55E]/30">
          <svg
            className="w-10 h-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-[#283E48] mb-2">
          Your Rewards Are Unlocked!
        </h1>
        <p className="text-[#6B7280] mb-8">
          Here's what you could earn with pay.com.au
        </p>

        {/* Main reward display */}
        <div className="bg-gradient-to-br from-[#EEF2F8] to-[#F5F8FC] rounded-2xl p-8 mb-8">
          <div className="text-6xl font-bold text-[#3866B0] mb-2">
            {animatedFlights < 1
              ? animatedFlights.toFixed(1)
              : Math.round(animatedFlights)}
          </div>
          <div className="text-lg font-semibold text-[#283E48] mb-1">
            Business Class flights per year
          </div>
          <div className="flex items-center justify-center gap-2 text-[#6B7280]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {destination}
          </div>
        </div>

        {/* Points breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#F5F5F5] rounded-xl p-4">
            <div className="text-2xl font-bold text-[#283E48]">
              {formatPoints(rewards.creditCardPoints)}
            </div>
            <div className="text-sm text-[#6B7280]">Credit card points/yr</div>
          </div>
          <div className="bg-[#D1FAE5] rounded-xl p-4">
            <div className="text-2xl font-bold text-[#22C55E]">
              +{formatPoints(rewards.payRewardsPoints)}
            </div>
            <div className="text-sm text-[#166534]">PayRewards bonus/yr</div>
          </div>
        </div>

        {/* Summary */}
        <div className="text-left bg-[#FAFBFC] rounded-xl p-6 mb-8">
          <h3 className="font-bold text-[#283E48] mb-3">Your Profile Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Industry</span>
              <span className="font-medium text-[#283E48] capitalize">
                {answers.industry || 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Monthly expenses</span>
              <span className="font-medium text-[#283E48]">
                ${answers.monthlyExpenses.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Payment methods</span>
              <span className="font-medium text-[#283E48] capitalize">
                {answers.paymentMethods.join(', ') || 'None'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Reward partners</span>
              <span className="font-medium text-[#283E48] capitalize">
                {answers.partners.join(', ') || 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full h-14 bg-[#3866B0] text-white rounded-xl font-bold text-lg hover:bg-[#2D5490] transition-colors shadow-lg shadow-[#3866B0]/20">
          Start Earning Rewards
        </button>

        <p className="mt-4 text-sm text-[#9CA3AF]">
          Takes less than 5 minutes to set up. No commitment required.
        </p>
      </div>

      {/* CSS for confetti animation */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(600px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
