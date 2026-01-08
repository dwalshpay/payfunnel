import { useEffect, useState } from 'react';
import type { VariantDRewards } from '../../context/VariantDContext';
import { formatPoints, getFlightDestination } from '../../hooks/useDoubleDipCalculator';
import { DOUBLE_DIP_CONTENT } from '../../data/valuePropContent';

interface DoubleDipValueMeterProps {
  rewards: VariantDRewards;
  partners: string[];
  isCalculating?: boolean;
}

export function DoubleDipValueMeter({ rewards, partners, isCalculating }: DoubleDipValueMeterProps) {
  const [animatedFlights, setAnimatedFlights] = useState(0);
  const [animatedCCPoints, setAnimatedCCPoints] = useState(0);
  const [animatedPRPoints, setAnimatedPRPoints] = useState(0);

  // Animate the numbers when they change
  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const interval = duration / steps;

    const flightDiff = rewards.businessClassFlights - animatedFlights;
    const ccDiff = rewards.creditCardPoints - animatedCCPoints;
    const prDiff = rewards.payRewardsPoints - animatedPRPoints;

    if (Math.abs(flightDiff) < 0.01 && ccDiff === 0 && prDiff === 0) return;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedFlights(animatedFlights + flightDiff * eased);
      setAnimatedCCPoints(Math.round(animatedCCPoints + ccDiff * eased));
      setAnimatedPRPoints(Math.round(animatedPRPoints + prDiff * eased));

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedFlights(rewards.businessClassFlights);
        setAnimatedCCPoints(rewards.creditCardPoints);
        setAnimatedPRPoints(rewards.payRewardsPoints);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [rewards.businessClassFlights, rewards.creditCardPoints, rewards.payRewardsPoints]);

  const destination = getFlightDestination(partners);
  const hasData = rewards.totalPoints > 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E9F9]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3866B0] to-[#2D5490] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-[#283E48] text-sm">{DOUBLE_DIP_CONTENT.title}</h3>
          <p className="text-xs text-[#6B7280]">{DOUBLE_DIP_CONTENT.subtitle}</p>
        </div>
      </div>

      {isCalculating ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-[#6B7280] text-sm">Calculating...</div>
        </div>
      ) : hasData ? (
        <>
          {/* Points breakdown */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#6B7280]">{DOUBLE_DIP_CONTENT.creditCardLabel}</span>
              <span className="font-semibold text-[#283E48]">{formatPoints(animatedCCPoints)}/yr</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#22C55E] font-medium">+ {DOUBLE_DIP_CONTENT.payRewardsLabel}</span>
              <span className="font-semibold text-[#22C55E]">+{formatPoints(animatedPRPoints)}/yr</span>
            </div>
            <div className="border-t border-dashed border-[#E2E9F9] my-2" />
          </div>

          {/* Total in flights */}
          <div className="bg-gradient-to-br from-[#EEF2F8] to-[#F5F8FC] rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-[#3866B0] mb-1">
              {animatedFlights < 1 ? animatedFlights.toFixed(1) : Math.round(animatedFlights)}
            </div>
            <div className="text-sm font-medium text-[#283E48]">
              {DOUBLE_DIP_CONTENT.totalLabel}
            </div>
            <div className="text-xs text-[#6B7280] mt-1 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {destination}
            </div>
          </div>

          {/* Confidence indicator */}
          <div className="flex items-center justify-center gap-1 mt-3">
            {['low', 'medium', 'high'].map((level) => (
              <div
                key={level}
                className={`w-2 h-2 rounded-full transition-colors ${
                  rewards.confidence === level ||
                  (rewards.confidence === 'high' && level !== 'high') ||
                  (rewards.confidence === 'medium' && level === 'low')
                    ? 'bg-[#22C55E]'
                    : 'bg-[#E2E9F9]'
                }`}
              />
            ))}
            <span className="text-xs text-[#6B7280] ml-1 capitalize">{rewards.confidence} estimate</span>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="text-[#6B7280] text-sm">{DOUBLE_DIP_CONTENT.emptyStateMessage}</div>
        </div>
      )}
    </div>
  );
}
