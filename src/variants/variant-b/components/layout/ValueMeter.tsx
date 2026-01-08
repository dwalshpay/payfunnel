import { useEffect, useState } from 'react';

interface ValueMeterProps {
  value: number;
  confidence: 'low' | 'medium' | 'high';
  label?: string;
}

export function ValueMeter({
  value,
  confidence,
  label = 'Estimated Annual Rewards',
}: ValueMeterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate the counter
  useEffect(() => {
    if (value === displayValue) return;

    setIsAnimating(true);
    const duration = 800;
    const startValue = displayValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  // Confidence colors
  const confidenceColors = {
    low: 'text-[#9CA3AF]',
    medium: 'text-[#F59E0B]',
    high: 'text-[#22C55E]',
  };

  const confidenceLabels = {
    low: 'Add more details for accurate estimate',
    medium: 'Good estimate',
    high: 'Accurate estimate',
  };

  // Format the animated value
  const animatedFormatted = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(displayValue);

  return (
    <div
      className={`bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FF] rounded-2xl p-6 border border-[#D3DFF6] transition-all duration-300 ${
        isAnimating ? 'scale-[1.02]' : ''
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        {/* Label */}
        <span className="text-sm font-medium text-[#6B7280]">{label}</span>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl font-bold transition-colors duration-300 ${
              value > 0 ? 'text-[#3866B0]' : 'text-[#BDBDBD]'
            }`}
          >
            {value > 0 ? animatedFormatted : '$0'}
          </span>
          <span className="text-lg text-[#6B7280]">/year</span>
        </div>

        {/* Confidence indicator */}
        {value > 0 && (
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-1">
              {['low', 'medium', 'high'].map((level, i) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
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
        )}

        {/* Pulse animation ring when value increases */}
        {isAnimating && value > 0 && (
          <div className="absolute inset-0 rounded-2xl border-2 border-[#3866B0] animate-ping opacity-20 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

// Compact version for header display
export function ValueMeterCompact({
  formattedValue,
  confidence,
}: {
  formattedValue: string;
  confidence: 'low' | 'medium' | 'high';
}) {
  const confidenceColors = {
    low: 'bg-[#E5E7EB]',
    medium: 'bg-[#FEF3C7]',
    high: 'bg-[#D1FAE5]',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${confidenceColors[confidence]}`}
    >
      <span className="text-sm font-bold text-[#283E48]">{formattedValue}</span>
      <span className="text-xs text-[#6B7280]">est. rewards</span>
    </div>
  );
}
