import { useEffect, useState, useRef } from 'react';

interface AnimatedPointsCounterProps {
  totalPoints: number;
  pointsToAdd: number;
  showAnimation: boolean;
  onAnimationComplete: () => void;
}

export function AnimatedPointsCounter({
  totalPoints,
  pointsToAdd,
  showAnimation,
  onAnimationComplete,
}: AnimatedPointsCounterProps) {
  const [displayedPoints, setDisplayedPoints] = useState(totalPoints - (showAnimation ? pointsToAdd : 0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFloatingBadge, setShowFloatingBadge] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAnimation && pointsToAdd > 0) {
      // Start the animation sequence
      setShowFloatingBadge(true);
      setIsAnimating(true);

      // After badge flies in, start counting up
      const countStartTimer = setTimeout(() => {
        setShowFloatingBadge(false);

        // Animate the counter incrementing
        const startValue = totalPoints - pointsToAdd;
        const endValue = totalPoints;
        const duration = 600;
        const startTime = Date.now();

        const animateCount = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);

          setDisplayedPoints(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            // Animation complete
            setTimeout(() => {
              setIsAnimating(false);
              onAnimationComplete();
            }, 300);
          }
        };

        requestAnimationFrame(animateCount);
      }, 500);

      return () => clearTimeout(countStartTimer);
    } else {
      setDisplayedPoints(totalPoints);
    }
  }, [showAnimation, pointsToAdd, totalPoints, onAnimationComplete]);

  return (
    <div className="relative">
      {/* Floating points badge that animates in */}
      {showFloatingBadge && (
        <div
          className="absolute -left-16 top-1/2 -translate-y-1/2 animate-fly-to-counter z-10"
        >
          <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-full shadow-lg">
            <span className="text-sm font-bold text-white">
              +{pointsToAdd.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Main counter */}
      <div
        ref={counterRef}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
          isAnimating
            ? 'bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border-2 border-[#F59E0B] scale-110 shadow-lg shadow-[#F59E0B]/30'
            : 'bg-[#F0F7FF] border border-[#D3DFF6]'
        }`}
      >
        <svg
          className={`w-4 h-4 transition-colors duration-300 ${
            isAnimating ? 'text-[#F59E0B]' : 'text-[#3866B0]'
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {isAnimating ? (
            // Star icon when animating
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          ) : (
            // Checkmark icon normally
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          )}
        </svg>
        <span
          className={`text-sm font-bold tabular-nums transition-colors duration-300 ${
            isAnimating ? 'text-[#92400E]' : 'text-[#3866B0]'
          }`}
        >
          {displayedPoints.toLocaleString()} pts
        </span>
      </div>
    </div>
  );
}
