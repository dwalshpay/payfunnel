import { useEffect, useState, useRef } from 'react';
import { ValueBreakdown } from './ValueBreakdown';
import { ConfettiCelebration } from './ConfettiCelebration';
import { BENCHMARK_POINTS } from '../utils/calculations';
import { TrendingIcon, StarIcon } from '../../../components/icons/Icons';

interface RewardComparisonProps {
  userPoints: number;
  benchmarkPoints?: number;
  comparisonPercentage: number;
  isAboveBenchmark: boolean;
  accuracy: number;
  email: string;
  onEmailChange: (email: string) => void;
  onEmailSubmit: () => void;
  onExpand: () => void;
  emailSubmitted: boolean;
}

export function RewardComparison({
  userPoints,
  benchmarkPoints = BENCHMARK_POINTS,
  comparisonPercentage,
  isAboveBenchmark,
  accuracy,
  email,
  onEmailChange,
  onEmailSubmit,
  onExpand,
  emailSubmitted,
}: RewardComparisonProps) {
  const [countedPoints, setCountedPoints] = useState(benchmarkPoints);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCountComplete, setIsCountComplete] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animate count from benchmark to user points
  useEffect(() => {
    const duration = 800;
    const startTime = Date.now();
    const startValue = benchmarkPoints;
    const endValue = userPoints;

    const timeout = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (endValue - startValue) * eased);
        setCountedPoints(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsCountComplete(true);
          // Trigger confetti if above benchmark
          if (isAboveBenchmark) {
            setTimeout(() => setShowConfetti(true), 200);
          }
        }
      };

      requestAnimationFrame(animate);
    }, 300);

    return () => clearTimeout(timeout);
  }, [userPoints, benchmarkPoints, isAboveBenchmark]);

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError('Please enter your email');
      inputRef.current?.focus();
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      inputRef.current?.focus();
      return;
    }
    setEmailError(null);
    onEmailSubmit();
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError(null);
    }
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col pb-24"
      style={{
        background: isAboveBenchmark
          ? 'linear-gradient(180deg, #E8F5E9 0%, #F1F8F2 30%, #F0F4F8 100%)'
          : 'linear-gradient(180deg, #E8EEF5 0%, #F0F4F8 100%)',
      }}
    >
      <ConfettiCelebration
        trigger={showConfetti}
        intensity="medium"
        onComplete={() => setShowConfetti(false)}
      />

      {/* Main content */}
      <div className="flex-1 px-4 md:px-6 pt-8 md:pt-12">
        <div className="max-w-lg mx-auto">
          {/* Headline */}
          <p className="text-center text-[#6B7280] text-sm font-medium mb-2 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            YOU could earn
          </p>

          {/* Points display */}
          <div className="text-center mb-4">
            <div className="relative inline-block">
              <span
                className={`
                  absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2
                  transition-all duration-500
                  ${isCountComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}
              >
                <StarIcon className="w-5 h-5 md:w-6 md:h-6 text-[#3866B0]" />
              </span>
              <h1
                className={`
                  text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums
                  transition-colors duration-500
                  ${isAboveBenchmark && isCountComplete ? 'text-[#00B67A]' : 'text-[#283E48]'}
                `}
                style={{
                  fontFamily: "'Europa', system-ui, sans-serif",
                }}
              >
                {countedPoints.toLocaleString()}
              </h1>
              <span
                className={`
                  absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2
                  transition-all duration-500
                  ${isCountComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}
              >
                <StarIcon className="w-5 h-5 md:w-6 md:h-6 text-[#3866B0]" />
              </span>
            </div>
            <p className="text-[#6B7280] text-lg mt-1">points per year</p>
          </div>

          {/* Comparison badge */}
          <div
            className={`
              flex items-center justify-center gap-2 mb-6
              opacity-0 animate-[fadeInUp_0.5s_ease-out_0.5s_forwards]
            `}
          >
            {isAboveBenchmark ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9] border border-[#00B67A]/20 text-[#00B67A] font-semibold">
                <TrendingIcon className="w-5 h-5" />
                <span>{comparisonPercentage}% MORE than average Australian businesses!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D3DFF6] border border-[#3866B0]/20 text-[#3866B0] font-semibold">
                <TrendingIcon className="w-5 h-5" />
                <span>Add more details to unlock your full potential</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent my-6" />

          {/* Value breakdown */}
          <div className="mb-8 opacity-0 animate-[fadeIn_0.5s_ease-out_0.3s_forwards]">
            <ValueBreakdown points={userPoints} />
          </div>

          {/* Email capture card */}
          <div
            className={`
              rounded-2xl p-6 md:p-8
              ${emailSubmitted ? 'bg-[#E8F5E9] border-2 border-[#00B67A]/30' : 'bg-white shadow-xl shadow-[#283E48]/5 border border-[#E0E0E0]'}
              opacity-0 animate-[fadeInUp_0.5s_ease-out_0.6s_forwards]
            `}
          >
            {emailSubmitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B67A]/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#00B67A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#283E48] mb-2">You're all set!</h3>
                <p className="text-[#6B7280]">
                  We've sent your personalized rewards estimate to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-bold text-[#283E48] mb-1 text-center">
                  Lock in your rewards estimate
                </h3>
                <p className="text-sm text-[#6B7280] mb-4 text-center">
                  Enter your email to save your estimate and get started
                </p>

                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        onEmailChange(e.target.value);
                        if (emailError) setEmailError(null);
                      }}
                      onBlur={handleEmailBlur}
                      placeholder="Enter your email"
                      className={`
                        w-full pl-12 pr-4 py-4 rounded-xl
                        border-2 transition-all duration-200
                        text-[#283E48] placeholder:text-[#BDBDBD]
                        focus:outline-none
                        ${
                          emailError
                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                            : 'border-[#E0E0E0] bg-[#F5F5F5] focus:border-[#3866B0] focus:bg-white'
                        }
                      `}
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-sm px-1">{emailError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#3866B0] hover:bg-[#2D5490] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-[#3866B0]/25 transition-all duration-300 active:scale-[0.98]"
                  >
                    Start Earning Points
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Expand prompt */}
          {!emailSubmitted && (
            <button
              onClick={onExpand}
              className="w-full mt-6 py-3 text-center text-[#6B7280] hover:text-[#3866B0] transition-colors group opacity-0 animate-[fadeIn_0.5s_ease-out_0.8s_forwards]"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isAboveBenchmark
                  ? 'Want a more accurate estimate? Add details'
                  : "Most businesses like yours earn more - let's refine your estimate"}
                <svg
                  className="w-4 h-4 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom accuracy bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-t border-[#E0E0E0] py-3 px-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3866B0] to-[#5A8AD4] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-[#283E48] tabular-nums w-14 text-right">
            {accuracy}%
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
