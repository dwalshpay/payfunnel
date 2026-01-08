import { useEffect, useState } from 'react';

interface RewardsBreakdownProps {
  doubleDip: {
    creditCardPoints: number;
    creditCardValue: number;
    payRewardsPoints: number;
    payRewardsValue: number;
    totalPoints: number;
    totalValue: number;
    qantasPointsEquivalent: number;
  };
}

export function RewardsBreakdown({ doubleDip }: RewardsBreakdownProps) {
  const [animatedCC, setAnimatedCC] = useState(0);
  const [animatedPR, setAnimatedPR] = useState(0);

  // Animate the numbers when they change
  useEffect(() => {
    const duration = 600;
    const steps = 30;
    const ccStep = doubleDip.creditCardPoints / steps;
    const prStep = doubleDip.payRewardsPoints / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setAnimatedCC(Math.round(ccStep * current));
      setAnimatedPR(Math.round(prStep * current));

      if (current >= steps) {
        setAnimatedCC(doubleDip.creditCardPoints);
        setAnimatedPR(doubleDip.payRewardsPoints);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [doubleDip.creditCardPoints, doubleDip.payRewardsPoints]);

  return (
    <div className="space-y-3">
      {/* Double-dip label */}
      <div className="flex items-center gap-2">
        <div className="bg-white/20 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide">
          Double-Dip Rewards
        </div>
      </div>

      {/* Credit card points */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-[14px] opacity-90">Credit card points</span>
        </div>
        <span className="text-[14px] font-semibold">
          {animatedCC.toLocaleString()} pts
        </span>
      </div>

      {/* PayRewards points */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#00B67A] flex items-center justify-center">
            <span className="text-[10px] font-bold">P</span>
          </div>
          <span className="text-[14px] opacity-90">PayRewards bonus</span>
        </div>
        <span className="text-[14px] font-semibold text-[#86EFAC]">
          +{animatedPR.toLocaleString()} pts
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/20" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold">Total points</span>
        <span className="text-[16px] font-bold">
          {doubleDip.totalPoints.toLocaleString()} pts
        </span>
      </div>

      {/* Qantas equivalent */}
      <div className="bg-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
        <span className="text-[12px] opacity-80">Qantas Points equivalent</span>
        <span className="text-[13px] font-semibold">
          ~{doubleDip.qantasPointsEquivalent.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
