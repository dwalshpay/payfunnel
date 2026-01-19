import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useVariantBA } from '../context/VariantBAContext';
import { useRewardsCalculator } from '../hooks/useRewardsCalculator';
import { VARIANT_BA_STEPS } from '../data/variantBAStepConfig';

// Simple confetti animation using CSS
function Confetti() {
  const [particles, setParticles] = useState<
    { id: number; x: number; color: string; delay: number }[]
  >([]);

  useEffect(() => {
    const colors = ['#3866B0', '#22C55E', '#F59E0B', '#EC4899', '#8B5CF6'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-confetti"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(displayValue)}
    </span>
  );
}

function AnimatedPoints({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export function SuccessPage() {
  const { state } = useVariantBA();
  const { answers, pointsEarned } = state;
  const [showConfetti, setShowConfetti] = useState(true);

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Get readable labels for selections
  const getLabel = (stepId: string, fieldId: string, value: string) => {
    const step = VARIANT_BA_STEPS.find((s) => s.id === stepId);
    const section = step?.sections.find((s) => s.field === fieldId);
    const option = section?.options?.find((o) => o.id === value);
    return option?.label || value;
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="bg-white rounded-3xl shadow-xl border border-[#F5F5F5] overflow-hidden">
        {/* Success header */}
        <div className="bg-gradient-to-br from-[#3866B0] to-[#2D5490] px-8 py-12 text-center text-white">
          {/* Checkmark */}
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-2">Account Created!</h1>
          <p className="text-white/80">Your personalised rewards plan is ready</p>

          {/* Account info */}
          {answers.registration?.email && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="text-sm">{answers.registration.email}</span>
            </div>
          )}
        </div>

        {/* Points claimed highlight */}
        <div className="px-8 py-6 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-b border-[#F59E0B]/20">
          <div className="text-center">
            <p className="text-sm font-medium text-[#92400E] mb-2">
              Points Claimed!
            </p>
            <p className="text-4xl font-bold text-[#92400E]">
              <AnimatedPoints value={pointsEarned} /> pts
            </p>
            <p className="text-sm text-[#B45309] mt-2">
              Make your first payment to start earning more
            </p>
          </div>
        </div>

        {/* Rewards highlight */}
        <div className="px-8 py-8 bg-[#F0F7FF] border-b border-[#E2E9F9]">
          <div className="text-center">
            <p className="text-sm font-medium text-[#6B7280] mb-2">
              Your Estimated Annual Rewards
            </p>
            <p className="text-5xl font-bold text-[#3866B0]">
              <AnimatedCounter value={rewards.annualRewards} />
            </p>
            <p className="text-sm text-[#6B7280] mt-2">
              Based on ${answers.monthlyExpenses.toLocaleString()}/month in expenses
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="px-8 py-6">
          {/* Welcome message with name */}
          {answers.registration?.firstName && (
            <div className="mb-6 p-4 bg-[#F0F7FF] rounded-xl border border-[#E2E9F9]">
              <p className="text-[#283E48]">
                Welcome, <span className="font-bold">{answers.registration.firstName}</span>!
                Your account has been verified and is ready to use.
              </p>
            </div>
          )}

          <h2 className="text-lg font-bold text-[#283E48] mb-4">Your Selections</h2>

          <div className="space-y-4">
            {/* Role */}
            {answers.role && (
              <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                <span className="text-[#6B7280]">Role</span>
                <span className="font-medium text-[#283E48]">
                  {getLabel('about-you', 'role', answers.role)}
                </span>
              </div>
            )}

            {/* Industry */}
            {answers.industry && (
              <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                <span className="text-[#6B7280]">Industry</span>
                <span className="font-medium text-[#283E48]">
                  {getLabel('your-business', 'industry', answers.industry)}
                </span>
              </div>
            )}

            {/* Team Size */}
            {answers.employees && (
              <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                <span className="text-[#6B7280]">Team Size</span>
                <span className="font-medium text-[#283E48]">
                  {getLabel('your-business', 'employees', answers.employees)} employees
                </span>
              </div>
            )}

            {/* Partners */}
            {answers.partners.length > 0 && (
              <div className="flex items-center justify-between py-2 border-b border-[#F5F5F5]">
                <span className="text-[#6B7280]">Reward Partners</span>
                <span className="font-medium text-[#283E48]">
                  {answers.partners
                    .map((p) => getLabel('choose-partners', 'partners', p))
                    .join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="px-8 py-6 bg-[#FAFBFC] border-t border-[#F5F5F5]">
          <button className="w-full h-14 bg-[#3866B0] text-white font-bold text-[16px] rounded-xl hover:bg-[#2D5490] transition-colors shadow-lg shadow-[#3866B0]/20">
            Start Earning Rewards
          </button>

          <div className="flex items-center justify-center gap-4 mt-4">
            <Link
              to="/"
              className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors"
            >
              Back to variants
            </Link>
            <span className="text-[#E0E0E0]">|</span>
            <button className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors">
              Share results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
