import type { VariantDAnswers, VariantDRewards } from '../../context/VariantDContext';
import type { UnlockStatus } from '../../hooks/useValueUnlocker';
import { DoubleDipValueMeter } from '../sidebar/DoubleDipValueMeter';
import { ValueUnlocker } from '../sidebar/ValueUnlocker';
import { UniqueValuePropRotator } from '../sidebar/UniqueValuePropRotator';
import { IndustryTestimonial } from '../sidebar/IndustryTestimonial';
import { TrustFooter } from '../sidebar/TrustFooter';

interface DesktopSidebarProps {
  currentStep: number;
  answers: VariantDAnswers;
  rewards: VariantDRewards;
  unlockStatus: UnlockStatus;
  isComplete: boolean;
}

export function DesktopSidebar({
  currentStep,
  answers,
  rewards,
  unlockStatus,
  isComplete,
}: DesktopSidebarProps) {
  // Hide sidebar when complete
  if (isComplete) return null;

  return (
    <aside className="hidden lg:block w-[360px] flex-shrink-0">
      <div className="sticky top-24 flex flex-col gap-4">
        {/* Double-Dip Value Meter - always visible */}
        <DoubleDipValueMeter
          rewards={rewards}
          partners={answers.partners}
          isCalculating={currentStep === 0}
        />

        {/* Value Unlocker - visible from step 1 onwards */}
        {currentStep >= 1 && (
          <ValueUnlocker unlockStatus={unlockStatus} />
        )}

        {/* Unique Value Prop Rotator - always visible */}
        <UniqueValuePropRotator />

        {/* Industry Testimonial - visible from step 1 onwards when industry selected */}
        {currentStep >= 1 && (
          <IndustryTestimonial industry={answers.industry} />
        )}

        {/* Trust Footer - always visible */}
        <TrustFooter />
      </div>
    </aside>
  );
}
