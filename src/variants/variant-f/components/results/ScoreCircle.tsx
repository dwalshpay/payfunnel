import { useEffect, useState } from 'react';
import { TrophyIcon, StarIcon, TrendingIcon } from '../../../../components/icons/Icons';
import type { Tier } from '../../types';
import { TIER_CONFIGS } from '../../types';

interface ScoreCircleProps {
  score: number;
  tier: Tier;
  percentile: number;
  animate?: boolean;
  className?: string;
}

export function ScoreCircle({
  score,
  tier,
  percentile,
  animate = true,
  className = '',
}: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const [strokeOffset, setStrokeOffset] = useState(animate ? 100 : 100 - score);

  const tierConfig = TIER_CONFIGS[tier];

  useEffect(() => {
    if (!animate) return;

    // Animate the score count-up
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, stepDuration);

    // Animate the circle
    const animateCircle = setTimeout(() => {
      setStrokeOffset(100 - score);
    }, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(animateCircle);
    };
  }, [score, animate]);

  // Get the appropriate icon and color class based on tier
  const getTierIconColor = () => {
    switch (tier) {
      case 'gold': return 'text-[#F59E0B]';
      case 'silver': return 'text-[#3866B0]';
      case 'bronze': return 'text-[#6B7280]';
    }
  };

  const getTierTextColor = () => {
    switch (tier) {
      case 'gold': return 'text-[#F59E0B]';
      case 'silver': return 'text-[#3866B0]';
      case 'bronze': return 'text-[#6B7280]';
    }
  };

  const getTierBgColor = () => {
    switch (tier) {
      case 'gold': return 'bg-[#FEF3C7]';
      case 'silver': return 'bg-[#E0E7FF]';
      case 'bronze': return 'bg-[#F3F4F6]';
    }
  };

  const TierIcon = tier === 'gold' ? TrophyIcon : tier === 'silver' ? StarIcon : TrendingIcon;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Score circle */}
      <div className="relative w-40 h-40">
        {/* Background circle */}
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="2.5"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke={tierConfig.accentColor}
            strokeWidth="2.5"
            strokeDasharray="100"
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[#283E48]">{displayScore}</span>
          <span className="text-sm text-[#6B7280]">/100</span>
        </div>
      </div>

      {/* Tier badge */}
      <div
        className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full ${getTierBgColor()}`}
      >
        <TierIcon className={`w-5 h-5 ${getTierIconColor()}`} />
        <span className={`text-sm font-bold ${getTierTextColor()}`}>
          TOP {percentile}%
        </span>
        <span className="text-sm text-[#283E48]">of Australian businesses</span>
      </div>
    </div>
  );
}
