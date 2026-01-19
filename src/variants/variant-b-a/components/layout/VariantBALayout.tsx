import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TrustBadges } from '../feedback/TrustBadges';
import { AnimatedPointsCounter } from '../feedback/AnimatedPointsCounter';
import { Sidebar } from './Sidebar';
import { useVariantBA } from '../../context/VariantBAContext';
import { useRewardsCalculator } from '../../hooks/useRewardsCalculator';
import { Logo } from '../../../../components/layout/Logo';

interface VariantBALayoutProps {
  children: ReactNode;
}

export function VariantBALayout({ children }: VariantBALayoutProps) {
  const { state, hidePointsAnimation } = useVariantBA();
  const { answers, currentStep, pointsEarned, pointsAnimation, isComplete } = state;

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EEF7] via-[#EDF1F8] to-[#E5EBF5] flex flex-col">
      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Logo />
          <Link
            to="/"
            className="text-sm text-[#6B7280] hover:text-[#3866B0] border border-[#E5E7EB] hover:border-[#3866B0] rounded-lg px-3 py-1.5 transition-colors"
          >
            Funnel Dashboard
          </Link>
        </div>

        {/* Animated points indicator in header (visible after step 1) */}
        {currentStep > 0 && !isComplete && (
          <div className="hidden md:block">
            <AnimatedPointsCounter
              totalPoints={pointsEarned}
              pointsToAdd={pointsAnimation.amount}
              showAnimation={pointsAnimation.show}
              onAnimationComplete={hidePointsAnimation}
            />
          </div>
        )}

        {/* Help link */}
        <button className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors">
          Need help?
        </button>
      </header>

      {/* Main content - Two column on desktop */}
      <main className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-[1100px] flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Form container (left side on desktop) */}
          <div className="w-full lg:w-[680px] lg:flex-shrink-0">{children}</div>

          {/* Sidebar (right side on desktop, hidden on mobile unless complete) */}
          {!isComplete && (
            <div className="hidden lg:block w-full lg:w-[340px] lg:flex-shrink-0">
              <Sidebar
                currentStep={currentStep}
                pointsEarned={pointsEarned}
                rewards={rewards}
                industry={answers.industry}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer with trust badges */}
      <footer className="py-2 border-t border-[rgba(0,0,0,0.06)] bg-white sticky bottom-0">
        <TrustBadges />
      </footer>
    </div>
  );
}
