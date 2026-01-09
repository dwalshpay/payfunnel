import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../../components/layout/Logo';
import { useVariantG } from '../../context/VariantGContext';
import { PortfolioCalculator } from '../calculator/PortfolioCalculator';
import { BuildingIcon, ShieldIcon } from '../../../../components/icons/Icons';

interface VariantGLayoutProps {
  children: ReactNode;
  showCalculator?: boolean;
}

export function VariantGLayout({ children, showCalculator = false }: VariantGLayoutProps) {
  const { state } = useVariantG();
  const { currentStep, isComplete } = state;

  const showSidebar = showCalculator && !isComplete && currentStep !== 'entry' && currentStep !== 'success';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2E9F9] via-[#F0F4FA] to-[#FFFFFF] flex flex-col">
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

        {/* Advisor badge */}
        {currentStep !== 'entry' && !isComplete && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F7FF] border border-[#D3DFF6]">
            <BuildingIcon className="w-4 h-4 text-[#3866B0]" />
            <span className="text-sm font-medium text-[#3866B0]">Advisor Portal</span>
          </div>
        )}

        {/* Help link */}
        <button className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors">
          Need help?
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex justify-center px-4 py-8">
        <div className={`w-full ${showSidebar ? 'max-w-[1100px]' : 'max-w-[800px]'} flex flex-col lg:flex-row gap-6 lg:gap-8`}>
          {/* Form container */}
          <div className={`w-full ${showSidebar ? 'lg:w-[640px] lg:flex-shrink-0' : ''}`}>
            {children}
          </div>

          {/* Calculator sidebar */}
          {showSidebar && (
            <div className="hidden lg:block w-full lg:w-[380px] lg:flex-shrink-0">
              <PortfolioCalculator />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-[rgba(0,0,0,0.06)] bg-white/50">
        <div className="flex items-center justify-center gap-6 text-sm text-[#6B7280]">
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4" />
            <span>256-bit encryption</span>
          </div>
          <span className="hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <BuildingIcon className="w-4 h-4" />
            <span>2,000+ accounting practices</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
