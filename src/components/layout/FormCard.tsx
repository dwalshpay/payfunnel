import type { ReactNode } from 'react';
import { TOTAL_STEPS } from '../../data/stepConfig';

interface FormCardProps {
  children: ReactNode;
  navigation: ReactNode;
  currentStep: number;
}

export function FormCard({ children, navigation, currentStep }: FormCardProps) {
  const progressPercent = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="bg-white rounded-[12px] border border-[#F5F5F5] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] w-[640px] h-[760px] p-3 flex flex-col justify-between items-start">
      {/* Top section with progress and content */}
      <div className="w-full flex-1 flex flex-col gap-3">
        {/* Progress bar - pill style from Figma */}
        <div className="px-3 pt-1">
          <div className="h-4 bg-[#E2E9F9] rounded-full p-1 flex items-center">
            <div
              className="h-full bg-[#3866B0] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="w-full px-3 flex-1">
          {children}
        </div>
      </div>

      {/* Navigation area */}
      <div className="w-full">
        {navigation}
      </div>
    </div>
  );
}
