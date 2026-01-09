import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useVariantC } from '../../context/VariantCContext';
import { useRewardsCalculator } from '../../hooks/useRewardsCalculator';
import { LiveRewardsDashboard } from '../dashboard/LiveRewardsDashboard';
import { MobileDashboardHeader } from './MobileDashboardHeader';
import { StepIndicator } from './StepIndicator';
import { STEPS, TOTAL_STEPS } from '../../data/variantCStepConfig';
import { Logo } from '../../../../components/layout/Logo';

interface VariantCLayoutProps {
  children: ReactNode;
}

export function VariantCLayout({ children }: VariantCLayoutProps) {
  const { state, prevStep } = useVariantC();
  const { answers, currentStep, isComplete } = state;

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  const currentStepConfig = STEPS[currentStep - 1]; // Adjust for 0-indexed hero

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2F8] via-[#F5F8FC] to-[#E8EEF5] flex flex-col">
      {/* Header */}
      <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-4 md:gap-6">
          <Logo />
          <Link
            to="/"
            className="text-sm text-[#6B7280] hover:text-[#3866B0] border border-[#E5E7EB] hover:border-[#3866B0] rounded-lg px-3 py-1.5 transition-colors"
          >
            Funnel Dashboard
          </Link>
        </div>

        {/* Step indicator - center */}
        <div className="hidden md:block">
          <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Help link */}
        <button className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors flex-shrink-0">
          Need help?
        </button>
      </header>

      {/* Mobile step indicator */}
      <div className="md:hidden px-4 py-3 bg-white/50 border-b border-[rgba(0,0,0,0.04)]">
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </div>

      {/* Mobile rewards header (sticky) */}
      <MobileDashboardHeader rewards={rewards} />

      {/* Main content - Two column on desktop */}
      <main className="flex-1 flex justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-[1140px] flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Form container (left side on desktop) */}
          <div className="w-full lg:w-[60%] lg:max-w-[660px]">
            {/* Card */}
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_1px_3px_1px_rgba(0,0,0,0.05)] border border-[#F5F5F5] overflow-hidden">
              {/* Card header */}
              {currentStepConfig && (
                <div className="px-6 pt-6 pb-4 border-b border-[#F5F5F5]">
                  <h1 className="text-[24px] md:text-[28px] font-bold text-[#283E48] mb-1">
                    {currentStepConfig.title}
                  </h1>
                  <p className="text-[15px] text-[#6B7280]">
                    {currentStepConfig.subtitle}
                  </p>
                </div>
              )}

              {/* Card content */}
              <div className="p-6">{children}</div>
            </div>

            {/* Back button (outside card on mobile) */}
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="mt-4 text-[14px] text-[#6B7280] hover:text-[#3866B0] transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
            )}
          </div>

          {/* Dashboard (right side on desktop) */}
          {!isComplete && (
            <div className="hidden lg:block w-full lg:w-[40%] lg:max-w-[420px]">
              <div className="sticky top-24">
                <LiveRewardsDashboard
                  rewards={rewards}
                  industry={answers.industry}
                  currentStep={currentStep}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer trust badges */}
      <footer className="py-4 px-4 border-t border-[rgba(0,0,0,0.06)] bg-white/50">
        <div className="max-w-[1140px] mx-auto flex flex-wrap justify-center gap-6 text-[12px] text-[#6B7280]">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>256-bit encryption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#3866B0]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span>10,000+ businesses</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#00B67A]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>4.9/5 Trustpilot</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
