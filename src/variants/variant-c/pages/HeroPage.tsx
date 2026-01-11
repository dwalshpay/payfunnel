import { useEffect, useState } from 'react';
import { useVariantC } from '../context/VariantCContext';
import { ExpenseSliderHero } from '../components/hero/ExpenseSliderHero';
import { DoubleDipExplainer } from '../components/hero/DoubleDipExplainer';
import { PartnerCarousel } from '../components/hero/PartnerCarousel';
import { calculateHeroRewards } from '../hooks/useRewardsCalculator';

export function HeroPage() {
  const { state, setHeroPreview, startFunnel } = useVariantC();
  const { heroExpensePreview } = state;

  const rewards = calculateHeroRewards(heroExpensePreview);

  // Animated counter for rewards
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = rewards.annualPoints;
    const duration = 800;
    const steps = 40;
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
  }, [rewards.annualPoints]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2F8] via-[#F5F8FC] to-[#E8EEF5]">
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

        <button className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors">
          Need help?
        </button>
      </header>

      {/* Main content */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero section */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] md:text-[42px] font-bold text-[#283E48] mb-3 leading-tight">
            See what your business could earn
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#6B7280] max-w-[600px] mx-auto">
            Earn rewards on every business payment - even when suppliers don't accept cards
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Calculator */}
          <div className="space-y-6">
            {/* Rewards display */}
            <div className="bg-gradient-to-br from-[#3866B0] to-[#2D5490] rounded-2xl p-6 md:p-8 text-white text-center shadow-xl">
              <div className="text-[14px] opacity-80 mb-2">
                Your estimated annual points
              </div>
              <div className="text-[48px] md:text-[56px] font-bold leading-none mb-2">
                {displayValue.toLocaleString()} pts
              </div>
              <div className="text-[14px] opacity-80">
                {rewards.creditCardPoints.toLocaleString()} credit card + {rewards.payRewardsPoints.toLocaleString()} PayRewards
              </div>
            </div>

            {/* Expense input */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E2E9F9]">
              <label className="block text-[14px] font-semibold text-[#283E48] mb-4 text-center">
                How much does your business spend monthly?
              </label>
              <ExpenseSliderHero
                value={heroExpensePreview}
                onChange={setHeroPreview}
              />
            </div>

            {/* CTA Button */}
            <button
              onClick={startFunnel}
              className="w-full py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-[16px] rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              See Your Full Rewards Breakdown
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
            </button>
          </div>

          {/* Right: Explainer */}
          <div className="space-y-6">
            {/* Double-dip explainer */}
            <DoubleDipExplainer
              creditCardPoints={rewards.creditCardPoints}
              payRewardsPoints={rewards.payRewardsPoints}
              totalPoints={rewards.annualPoints}
            />

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 text-[13px] text-[#6B7280]">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Bank-level encryption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#3866B0]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>50,000+ businesses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#00B67A]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>4.9/5 Trustpilot</span>
              </div>
            </div>

            {/* Unique selling point */}
            <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] rounded-xl p-4 border border-[#F59E0B]/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#92400E]">
                    Only with pay.com.au
                  </div>
                  <div className="text-[13px] text-[#B45309]">
                    Use your points to pay business invoices - no other platform offers this
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner carousel */}
        <div className="mt-12">
          <div className="text-center mb-4">
            <div className="text-[14px] font-semibold text-[#283E48]">
              Transfer rewards to your favorite partners
            </div>
          </div>
          <PartnerCarousel />
        </div>

        {/* Bottom CTA (mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E2E9F9] shadow-lg">
          <button
            onClick={startFunnel}
            className="w-full py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-[16px] rounded-xl transition-all"
          >
            See Your Full Rewards
          </button>
        </div>
      </main>
    </div>
  );
}
