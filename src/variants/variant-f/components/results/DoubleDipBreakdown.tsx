import { PlaneIcon, HotelIcon } from '../../../../components/icons/Icons';
import { formatNumber, getRewardExamples } from '../../utils/scoreCalculation';

interface DoubleDipBreakdownProps {
  annualPoints: number;
  className?: string;
}

export function DoubleDipBreakdown({
  annualPoints,
  className = '',
}: DoubleDipBreakdownProps) {
  // Calculate the split - credit card is roughly 60%, PayRewards is 40%
  const creditCardPoints = Math.round(annualPoints * 0.6);
  const payRewardsPoints = annualPoints - creditCardPoints;

  const { flights, hotelNights } = getRewardExamples(annualPoints);

  return (
    <div className={className}>
      <h3 className="text-sm font-bold text-[#283E48] uppercase tracking-wider mb-4">
        Your Rewards Breakdown
      </h3>

      {/* Points calculation */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex-1 bg-[#F3F4F6] rounded-lg p-4 text-center">
          <p className="text-xs text-[#6B7280] mb-1">Credit Card</p>
          <p className="text-lg font-bold text-[#283E48]">
            ~{formatNumber(creditCardPoints)}
          </p>
          <p className="text-xs text-[#9CA3AF]">pts</p>
        </div>

        <div className="text-2xl font-light text-[#9CA3AF]">+</div>

        <div className="flex-1 bg-[#E2E9F9] rounded-lg p-4 text-center">
          <p className="text-xs text-[#3866B0] mb-1">PayRewards</p>
          <p className="text-lg font-bold text-[#3866B0]">
            +{formatNumber(payRewardsPoints)}
          </p>
          <p className="text-xs text-[#3866B0]/70">pts</p>
        </div>

        <div className="text-2xl font-light text-[#9CA3AF]">=</div>

        <div className="flex-1 bg-[#3866B0] rounded-lg p-4 text-center">
          <p className="text-xs text-white/70 mb-1">Total Annual</p>
          <p className="text-lg font-bold text-white">
            {formatNumber(annualPoints)}
          </p>
          <p className="text-xs text-white/70">pts</p>
        </div>
      </div>

      {/* Reward examples */}
      {(flights > 0 || hotelNights > 0) && (
        <div className="bg-[#FEF3C7] rounded-lg p-4">
          <p className="text-sm font-medium text-[#92400E] mb-3">
            That's worth:
          </p>
          <div className="flex flex-wrap gap-4">
            {flights > 0 && (
              <div className="flex items-center gap-2">
                <PlaneIcon className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-sm text-[#92400E]">
                  <strong>{flights}</strong> Business Class {flights === 1 ? 'flight' : 'flights'} to Asia
                </span>
              </div>
            )}
            {hotelNights > 0 && (
              <div className="flex items-center gap-2">
                <HotelIcon className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-sm text-[#92400E]">
                  <strong>{hotelNights}</strong> {hotelNights === 1 ? 'night' : 'nights'} at premium hotels
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
