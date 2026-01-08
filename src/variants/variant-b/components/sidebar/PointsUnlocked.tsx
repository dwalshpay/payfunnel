import { useEffect, useState } from 'react';

interface PointsUnlockedProps {
  pointsEarned: number;
  currentStep: number;
}

export function PointsUnlocked({ pointsEarned, currentStep }: PointsUnlockedProps) {
  const [displayPoints, setDisplayPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate counter when points change
  useEffect(() => {
    if (pointsEarned === displayPoints) return;

    setIsAnimating(true);
    const duration = 600;
    const startValue = displayPoints;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (pointsEarned - startValue) * easeOut);

      setDisplayPoints(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [pointsEarned]);

  const getMessage = () => {
    if (currentStep === 0) {
      return 'Complete this step to start earning';
    } else if (currentStep < 5) {
      return 'Complete signup to claim your points';
    } else {
      return 'Ready to claim!';
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl p-5 border border-[#F59E0B]/30 transition-all duration-300 ${
        isAnimating ? 'scale-[1.02]' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <span className="font-bold text-[#92400E]">Points Unlocked</span>
      </div>

      {/* Points display */}
      <div className="text-center mb-3">
        <span
          className={`text-4xl font-bold text-[#92400E] transition-transform duration-300 inline-block ${
            isAnimating ? 'scale-110' : ''
          }`}
        >
          {displayPoints.toLocaleString()}
        </span>
        <span className="text-lg text-[#B45309] ml-1">pts</span>
      </div>

      {/* Message */}
      <p className="text-sm text-[#92400E] text-center">{getMessage()}</p>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {[0, 1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              step < currentStep
                ? 'bg-[#F59E0B]'
                : step === currentStep
                ? 'bg-[#F59E0B]/50 animate-pulse'
                : 'bg-[#F59E0B]/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
