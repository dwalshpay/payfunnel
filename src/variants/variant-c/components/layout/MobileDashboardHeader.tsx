import { useState } from 'react';
import { formatDestinationSummary } from '../../hooks/useDestinationConverter';
import type { useRewardsCalculator } from '../../hooks/useRewardsCalculator';

interface MobileDashboardHeaderProps {
  rewards: ReturnType<typeof useRewardsCalculator>;
}

export function MobileDashboardHeader({ rewards }: MobileDashboardHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const destinationInfo = formatDestinationSummary(
    rewards.doubleDip.qantasPointsEquivalent
  );

  return (
    <div className="lg:hidden sticky top-16 z-30 bg-gradient-to-r from-[#3866B0] to-[#5B8AD0] text-white">
      {/* Collapsed view */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="text-[20px] font-bold">{rewards.formattedRewards}</div>
          <div className="text-[12px] opacity-80">potential annual rewards</div>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded view */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/20">
          {/* Double-dip breakdown */}
          <div className="pt-3 space-y-2">
            <div className="flex justify-between text-[13px]">
              <span className="opacity-80">Credit card points</span>
              <span className="font-semibold">
                {rewards.doubleDip.creditCardPoints.toLocaleString()} pts
              </span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="opacity-80">PayRewards points</span>
              <span className="font-semibold">
                +{rewards.doubleDip.payRewardsPoints.toLocaleString()} pts
              </span>
            </div>
            <div className="h-px bg-white/20" />
            <div className="flex justify-between text-[14px] font-bold">
              <span>Total value</span>
              <span>{rewards.formattedRewards}/year</span>
            </div>
          </div>

          {/* Destination preview */}
          <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
            <span className="text-[24px]">{destinationInfo.emoji}</span>
            <div>
              <div className="text-[14px] font-semibold">{destinationInfo.text}</div>
              <div className="text-[12px] opacity-80">{destinationInfo.subtext}</div>
            </div>
          </div>

          {/* Confidence indicator */}
          <div className="flex items-center gap-2 text-[12px]">
            <div className="flex gap-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  rewards.confidence !== 'low' ? 'bg-white' : 'bg-white/30'
                }`}
              />
              <div
                className={`w-2 h-2 rounded-full ${
                  rewards.confidence === 'high' ? 'bg-white' : 'bg-white/30'
                }`}
              />
              <div
                className={`w-2 h-2 rounded-full ${
                  rewards.confidence === 'high' ? 'bg-white' : 'bg-white/30'
                }`}
              />
            </div>
            <span className="opacity-80">
              {rewards.confidence === 'high'
                ? 'High confidence estimate'
                : rewards.confidence === 'medium'
                ? 'Add more details for accuracy'
                : 'Estimate improves with more info'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
