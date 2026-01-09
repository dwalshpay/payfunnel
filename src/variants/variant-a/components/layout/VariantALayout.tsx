import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TrustBadges } from '../feedback/TrustBadges';
import { Logo } from '../../../../components/layout/Logo';

interface VariantALayoutProps {
  children: ReactNode;
}

export function VariantALayout({ children }: VariantALayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2F8] via-[#F5F8FC] to-[#E8EEF5] flex flex-col">
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

        {/* Help link */}
        <button className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors">
          Need help?
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {/* Form container */}
        <div className="w-full max-w-[680px]">{children}</div>
      </main>

      {/* Footer with trust badges */}
      <footer className="py-4 border-t border-[rgba(0,0,0,0.06)] bg-white/50">
        <TrustBadges />
      </footer>
    </div>
  );
}
