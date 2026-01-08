import { useEffect, useState } from 'react';

interface RewardsPreviewProps {
  annualRewards: number;
  confidence: 'low' | 'medium' | 'high';
}

export function RewardsPreview({
  annualRewards,
  confidence,
}: RewardsPreviewProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate counter
  useEffect(() => {
    if (annualRewards === displayValue) return;

    setIsAnimating(true);
    const duration = 800;
    const startValue = displayValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (annualRewards - startValue) * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [annualRewards]);

  const confidenceColors = {
    low: 'text-[#9CA3AF]',
    medium: 'text-[#F59E0B]',
    high: 'text-[#22C55E]',
  };

  const confidenceLabels = {
    low: 'Estimate',
    medium: 'Good estimate',
    high: 'Accurate',
  };

  const animatedFormatted = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(displayValue);

  return (
    <div
      className={`bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FF] rounded-2xl p-5 border border-[#D3DFF6] transition-all duration-300 ${
        isAnimating ? 'scale-[1.02]' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#3866B0] flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <span className="font-bold text-[#283E48]">Your Rewards</span>
      </div>

      {/* Value display */}
      <div className="text-center mb-2">
        <span
          className={`text-3xl font-bold text-[#3866B0] transition-transform duration-300 inline-block ${
            isAnimating ? 'scale-110' : ''
          }`}
        >
          {animatedFormatted}
        </span>
        <span className="text-sm text-[#6B7280] block">/year potential</span>
      </div>

      {/* Confidence indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex gap-1">
          {['low', 'medium', 'high'].map((level, i) => (
            <div
              key={level}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i <= ['low', 'medium', 'high'].indexOf(confidence)
                  ? confidence === 'high'
                    ? 'bg-[#22C55E]'
                    : confidence === 'medium'
                    ? 'bg-[#F59E0B]'
                    : 'bg-[#9CA3AF]'
                  : 'bg-[#E5E7EB]'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs ${confidenceColors[confidence]}`}>
          {confidenceLabels[confidence]}
        </span>
      </div>
    </div>
  );
}
