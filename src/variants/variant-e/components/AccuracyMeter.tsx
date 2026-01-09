import { useEffect, useState } from 'react';

interface AccuracyMeterProps {
  percentage: number;
  label?: string;
  showCheckOnComplete?: boolean;
  variant?: 'default' | 'compact';
}

export function AccuracyMeter({
  percentage,
  label = 'Accuracy',
  showCheckOnComplete = true,
  variant = 'default',
}: AccuracyMeterProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate percentage changes
  useEffect(() => {
    setIsAnimating(true);
    const duration = 400;
    const startTime = Date.now();
    const startValue = displayPercentage;
    const endValue = percentage;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * eased);
      setDisplayPercentage(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage]);

  const isComplete = percentage >= 100;

  if (variant === 'compact') {
    return (
      <div className="w-full">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${displayPercentage}%`,
              background: isComplete
                ? 'linear-gradient(90deg, #10B981, #34D399)'
                : 'linear-gradient(90deg, #60A5FA, #3B82F6)',
            }}
          />
        </div>
        <div className="mt-1.5 text-xs text-white/70 font-medium">
          {displayPercentage}%
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
        border-t border-white/10 backdrop-blur-xl
        transition-all duration-300
        ${variant === 'default' ? 'py-3 px-4 md:py-4 md:px-6' : 'py-2 px-3'}
      `}
    >
      <div className="max-w-2xl mx-auto">
        {/* Progress bar container */}
        <div className="relative">
          {/* Track */}
          <div className="h-2 md:h-2.5 bg-white/10 rounded-full overflow-hidden">
            {/* Fill with gradient and glow effect */}
            <div
              className={`
                h-full rounded-full relative overflow-hidden
                transition-all duration-500 ease-out
                ${isAnimating ? 'shadow-[0_0_20px_rgba(59,130,246,0.5)]' : ''}
              `}
              style={{
                width: `${displayPercentage}%`,
                background: isComplete
                  ? 'linear-gradient(90deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)'
                  : 'linear-gradient(90deg, #3866B0 0%, #60A5FA 50%, #93C5FD 100%)',
              }}
            >
              {/* Animated shimmer effect */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>
          </div>

          {/* Floating indicator dot */}
          {displayPercentage > 0 && displayPercentage < 100 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white shadow-lg transition-all duration-500 ease-out"
              style={{
                left: `calc(${displayPercentage}% - 7px)`,
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.6), 0 2px 8px rgba(0,0,0,0.3)',
              }}
            />
          )}
        </div>

        {/* Label row */}
        <div className="flex items-center justify-between mt-2 md:mt-2.5">
          <span className="text-xs md:text-sm font-medium text-white/60 tracking-wide uppercase">
            {label}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`
                text-sm md:text-base font-bold tabular-nums
                transition-colors duration-300
                ${isComplete ? 'text-emerald-400' : 'text-white'}
              `}
            >
              {displayPercentage}%
            </span>
            {showCheckOnComplete && isComplete && (
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 animate-[scaleIn_0.3s_ease-out]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
