import { useVariantG, EXPENSE_VALUES } from '../../context/VariantGContext';
import {
  UsersIcon,
  WalletIcon,
  TrendingIcon,
  PlaneIcon,
  HotelIcon,
  BriefcaseIcon,
} from '../../../../components/icons/Icons';
import { useEffect, useState } from 'react';

// Animated counter hook
function useAnimatedNumber(target: number, duration: number = 500) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCurrent(0);
      return;
    }

    const start = current;
    const diff = target - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(start + diff * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return current;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
}

function formatCurrency(num: number): string {
  if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return '$' + (num / 1000).toFixed(0) + 'K';
  }
  return '$' + num.toLocaleString();
}

export function PortfolioCalculator() {
  const { state } = useVariantG();
  const { answers, calculated, currentStep } = state;

  const animatedPoints = useAnimatedNumber(calculated.annualPointsPotential);
  const animatedBonus = useAnimatedNumber(calculated.advisorBonusPotential);

  const hasExpenseSelection = answers.avgMonthlyExpenses !== null;
  const avgExpenseDisplay = hasExpenseSelection
    ? formatCurrency(EXPENSE_VALUES[answers.avgMonthlyExpenses!])
    : '--';

  const showFullResults = currentStep === 2 || currentStep === 3 || currentStep === 4;

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Calculator Card */}
      <div className="bg-white rounded-xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)]">
        <h3 className="text-xs font-bold tracking-[0.8px] text-[#6B7280] uppercase mb-4">
          Portfolio Rewards Calculator
        </h3>

        {/* Input summary */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-[#283E48]">
            <div className="w-8 h-8 rounded-lg bg-[#F0F4FA] flex items-center justify-center">
              <UsersIcon className="w-4 h-4 text-[#3866B0]" />
            </div>
            <span className="font-medium">{answers.clientCount} clients</span>
          </div>
          <div className="flex items-center gap-3 text-[#283E48]">
            <div className="w-8 h-8 rounded-lg bg-[#F0F4FA] flex items-center justify-center">
              <WalletIcon className="w-4 h-4 text-[#3866B0]" />
            </div>
            <span className={`font-medium ${!hasExpenseSelection ? 'text-[#BDBDBD]' : ''}`}>
              {avgExpenseDisplay} avg/month
            </span>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] my-4" />

        {/* Portfolio Potential */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingIcon className="w-4 h-4 text-[#3866B0]" />
            <span className="text-xs font-bold tracking-[0.8px] text-[#6B7280] uppercase">
              Portfolio Potential
            </span>
          </div>

          {hasExpenseSelection ? (
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-[#3866B0] mb-1">
                {formatNumber(animatedPoints)}
              </div>
              <div className="text-sm text-[#6B7280]">points per year</div>
            </div>
          ) : (
            <div className="text-center py-4 text-[#BDBDBD]">
              <div className="text-lg font-medium">Calculating...</div>
              <div className="text-sm">Select expense range to see results</div>
            </div>
          )}
        </div>

        {/* Equivalents (shown after step 1) */}
        {showFullResults && hasExpenseSelection && (
          <>
            <div className="border-t border-[#E5E7EB] my-4" />

            <div className="mb-2 text-sm text-[#6B7280]">That's worth:</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                  <PlaneIcon className="w-4 h-4 text-[#D97706]" />
                </div>
                <span className="text-[#283E48] font-medium">
                  {calculated.equivalentFlights} Business class flights
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
                  <HotelIcon className="w-4 h-4 text-[#2563EB]" />
                </div>
                <span className="text-[#283E48] font-medium">
                  {calculated.equivalentHotelNights} Hotel nights
                </span>
              </div>
            </div>
          </>
        )}

        {/* Advisor Bonus (shown after step 1) */}
        {showFullResults && hasExpenseSelection && (
          <>
            <div className="border-t border-[#E5E7EB] my-4" />

            <div className="flex items-center gap-2 mb-3">
              <BriefcaseIcon className="w-4 h-4 text-[#3866B0]" />
              <span className="text-xs font-bold tracking-[0.8px] text-[#6B7280] uppercase">
                Your Advisor Bonus
              </span>
            </div>
            <div className="bg-[#F0F7FF] rounded-lg p-4 text-center">
              <div className="text-sm text-[#6B7280] mb-1">
                Potential referral earnings:
              </div>
              <div className="text-2xl font-bold text-[#3866B0]">
                ${animatedBonus.toLocaleString()} / year
              </div>
            </div>
          </>
        )}
      </div>

      {/* Helper text */}
      <p className="text-center text-sm text-[#6B7280]">
        As you fill in details, the calculator updates in real-time
      </p>
    </div>
  );
}
