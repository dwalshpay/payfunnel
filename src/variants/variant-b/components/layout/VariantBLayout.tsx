import type { ReactNode } from 'react';
import { TrustBadges } from '../feedback/TrustBadges';
import { Sidebar } from './Sidebar';
import { useVariantB } from '../../context/VariantBContext';
import { useRewardsCalculator } from '../../hooks/useRewardsCalculator';

interface VariantBLayoutProps {
  children: ReactNode;
}

export function VariantBLayout({ children }: VariantBLayoutProps) {
  const { state } = useVariantB();
  const { answers, currentStep, pointsEarned, isComplete } = state;

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2F8] via-[#F5F8FC] to-[#E8EEF5] flex flex-col">
      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        {/* Logo */}
        <svg
          width="140"
          height="28"
          viewBox="0 0 164 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="14" fill="#3866B0" />
          <path
            d="M10 7v14M10 7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4h-5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="7" r="2.5" fill="#00B67A" />
          <text
            x="34"
            y="19"
            fill="#283E48"
            fontSize="16"
            fontWeight="700"
            fontFamily="Europa, system-ui, sans-serif"
          >
            pay.com.au
          </text>
        </svg>

        {/* Points indicator in header (visible after step 1) */}
        {currentStep > 0 && !isComplete && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F7FF] border border-[#D3DFF6]">
            <svg
              className="w-4 h-4 text-[#3866B0]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-sm font-bold text-[#3866B0]">
              {pointsEarned.toLocaleString()} pts
            </span>
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
      <footer className="py-4 border-t border-[rgba(0,0,0,0.06)] bg-white/50">
        <TrustBadges />
      </footer>
    </div>
  );
}
