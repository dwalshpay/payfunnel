import type { ReactNode } from 'react';
import { TrustBadges } from '../feedback/TrustBadges';

interface VariantALayoutProps {
  children: ReactNode;
}

export function VariantALayout({ children }: VariantALayoutProps) {
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
