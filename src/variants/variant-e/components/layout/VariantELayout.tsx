import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../../components/layout/Logo';
import { useVariantE } from '../../context/VariantEContext';

interface VariantELayoutProps {
  children: ReactNode;
}

export function VariantELayout({ children }: VariantELayoutProps) {
  const { state } = useVariantE();
  const { currentStep, isComplete } = state;

  // Step 1 (Anchor) has its own full-screen dark layout
  const isAnchorStep = currentStep === 1;

  if (isAnchorStep && !isComplete) {
    // Full-bleed layout for anchor screen
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EEF7] via-[#EDF1F8] to-[#E5EBF5] flex flex-col">
      {/* Header - only shown on steps 2-4 and success */}
      <header className="h-14 md:h-16 px-4 md:px-6 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-4 md:gap-6">
          <Logo />
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-blue-600 border border-slate-300 hover:border-blue-600 rounded-lg px-3 py-1.5 transition-colors"
          >
            Funnel Dashboard
          </Link>
        </div>

        {/* Step indicator */}
        {!isComplete && currentStep > 1 && (
          <div className="flex items-center gap-1.5">
            {[2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${
                    step === currentStep
                      ? 'w-6 bg-blue-500'
                      : step < currentStep
                      ? 'bg-emerald-400'
                      : 'bg-slate-300'
                  }
                `}
              />
            ))}
          </div>
        )}

        {/* Help link */}
        <button className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
          Need help?
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
