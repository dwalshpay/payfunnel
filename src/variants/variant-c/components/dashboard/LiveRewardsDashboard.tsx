import { RewardsBreakdown } from './RewardsBreakdown';
import { DestinationVisualizer } from './DestinationVisualizer';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { useDestinationConverter } from '../../hooks/useDestinationConverter';
import { INDUSTRY_AVERAGES } from '../../data/variantCStepConfig';

interface LiveRewardsDashboardProps {
  rewards: {
    annualPoints: number;
    formattedPoints: string;
    annualRewards: number;
    formattedRewards: string;
    confidence: 'low' | 'medium' | 'high';
    doubleDip: {
      creditCardPoints: number;
      payRewardsPoints: number;
      totalPoints: number;
    };
  };
  industry: string | null;
  currentStep: number;
}

export function LiveRewardsDashboard({
  rewards,
  industry,
  currentStep,
}: LiveRewardsDashboardProps) {
  // Use total points for destination converter
  const destinations = useDestinationConverter(
    rewards.doubleDip.totalPoints
  );

  // Industry comparison for social proof (using points)
  const industryAverage = industry ? INDUSTRY_AVERAGES[industry] : null;
  const isAboveAverage = industryAverage
    ? rewards.annualPoints > industryAverage
    : false;

  return (
    <div className="space-y-4">
      {/* Main rewards card */}
      <div className="bg-gradient-to-br from-[#3866B0] to-[#2D5490] rounded-2xl p-6 text-white shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-medium opacity-90 mb-1">
              Your Estimated Annual Points
            </h3>
            <div className="text-[36px] font-bold leading-tight">
              {rewards.formattedPoints}
            </div>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1 text-[12px] font-medium">
            per year
          </div>
        </div>

        {/* Double-dip breakdown */}
        <RewardsBreakdown doubleDip={rewards.doubleDip} />

        {/* Confidence indicator */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <ConfidenceIndicator
            confidence={rewards.confidence}
            currentStep={currentStep}
          />
        </div>
      </div>

      {/* Destination visualizer - shows after step 1 */}
      {currentStep >= 2 && rewards.annualPoints > 0 && (
        <DestinationVisualizer destinations={destinations} />
      )}

      {/* Industry comparison (social proof) */}
      {industry && industryAverage && (
        <div className="bg-white rounded-xl p-4 border border-[#F5F5F5] shadow-sm">
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isAboveAverage ? 'bg-[#DCFCE7]' : 'bg-[#FEF3C7]'
              }`}
            >
              {isAboveAverage ? (
                <svg
                  className="w-4 h-4 text-[#22C55E]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-[#F59E0B]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#283E48]">
                {isAboveAverage ? 'Above average!' : 'Room to grow'}
              </div>
              <div className="text-[13px] text-[#6B7280]">
                {industry.charAt(0).toUpperCase() + industry.slice(1)} businesses
                earn avg {industryAverage.toLocaleString()} pts/year
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unique feature highlight */}
      <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-xl p-4 border border-[#F59E0B]/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <div className="text-[14px] font-semibold text-[#92400E]">
              Only with pay.com.au
            </div>
            <div className="text-[13px] text-[#B45309]">
              Use points to pay your invoices - no other platform offers this
            </div>
          </div>
        </div>
      </div>

      {/* Partner logos */}
      <div className="bg-white rounded-xl p-4 border border-[#F5F5F5] shadow-sm">
        <div className="text-[12px] text-[#6B7280] mb-3 text-center">
          Transfer to 16 airline & hotel partners
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {['Qantas', 'Virgin', 'Singapore', 'Emirates', 'Accor', 'Marriott'].map(
            (partner) => (
              <div
                key={partner}
                className="px-3 py-1.5 bg-[#F0F4F8] rounded-full text-[11px] font-medium text-[#6B7280]"
              >
                {partner}
              </div>
            )
          )}
          <div className="px-3 py-1.5 bg-[#F0F4F8] rounded-full text-[11px] font-medium text-[#3866B0]">
            +10 more
          </div>
        </div>
      </div>
    </div>
  );
}
