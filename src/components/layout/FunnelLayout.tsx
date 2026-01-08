import type { ReactNode } from 'react';
import { Logo } from './Logo';
import { TestimonialSidebar } from './TestimonialSidebar';

interface FunnelLayoutProps {
  children: ReactNode;
}

export function FunnelLayout({ children }: FunnelLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - matches Figma Global Header */}
      <header className="h-16 px-6 flex items-center border-b border-[rgba(0,0,0,0.12)] bg-white">
        <Logo />
      </header>

      {/* Main content - matches Figma layout with 160px gap */}
      <main className="flex-1 flex items-start justify-center gap-[160px] px-6 py-16">
        {/* Form area */}
        <div className="flex-shrink-0">{children}</div>

        {/* Testimonials - 480px width from Figma */}
        <div className="hidden lg:block w-[480px]">
          <TestimonialSidebar />
        </div>
      </main>
    </div>
  );
}
