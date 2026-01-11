import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useVariantD } from '../../context/VariantDContext';
import { useDoubleDipCalculator } from '../../hooks/useDoubleDipCalculator';
import { useValueUnlocker } from '../../hooks/useValueUnlocker';
import { DesktopSidebar } from './DesktopSidebar';
import { Logo } from '../../../../components/layout/Logo';

interface VariantDLayoutProps {
  children: ReactNode;
}

export function VariantDLayout({ children }: VariantDLayoutProps) {
  const { state, updateRewards } = useVariantD();
  const rewards = useDoubleDipCalculator(state.answers);
  const unlockStatus = useValueUnlocker(state.answers, rewards, state.currentStep);

  // Update rewards in context when they change
  // This allows other components to access calculated rewards
  if (
    rewards.totalPoints !== state.rewards.totalPoints ||
    rewards.businessClassFlights !== state.rewards.businessClassFlights
  ) {
    updateRewards(rewards);
  }

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

        {/* Step indicator - mobile only */}
        <div className="lg:hidden text-sm text-[#6B7280]">
          Step {state.currentStep + 1} of 4
        </div>

        {/* Help link */}
        <button className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors">
          Need help?
        </button>
      </header>

      {/* Main content with sidebar */}
      <main className="flex-1 flex justify-center px-4 py-8 lg:px-8">
        <div className="w-full max-w-[1100px] flex gap-8">
          {/* Form content */}
          <div className="flex-1 max-w-[680px]">{children}</div>

          {/* Desktop Sidebar */}
          <DesktopSidebar
            currentStep={state.currentStep}
            answers={state.answers}
            rewards={rewards}
            unlockStatus={unlockStatus}
            isComplete={state.isComplete}
          />
        </div>
      </main>

      {/* Footer - minimal on desktop since trust is in sidebar */}
      <footer className="py-4 border-t border-[rgba(0,0,0,0.06)] bg-white/50 lg:hidden">
        <div className="flex justify-center gap-6 text-xs text-[#6B7280]">
          <span>PCI DSS Certified</span>
          <span>50,000+ businesses</span>
          <span>Australian company</span>
        </div>
      </footer>
    </div>
  );
}
