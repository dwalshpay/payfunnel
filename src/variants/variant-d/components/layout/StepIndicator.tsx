import { VARIANT_D_STEPS } from '../../data/variantDStepConfig';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const totalSteps = VARIANT_D_STEPS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Estimate remaining time (30s per remaining step)
  const remainingSteps = totalSteps - currentStep - 1;
  const remainingTime = remainingSteps <= 0 ? 'Almost done!' : `~${Math.ceil(remainingSteps * 0.5)} min remaining`;

  return (
    <div className="flex flex-col gap-3">
      {/* Step counter and time estimate */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[#283E48]">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-[#9CA3AF]">{remainingTime}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#E2E9F9] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#3866B0] to-[#22C55E] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between">
        {VARIANT_D_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'w-8 h-8 rounded-full border-2 border-[#3866B0] bg-white'
                    : isCompleted
                    ? 'w-6 h-6 rounded-full bg-[#22C55E]'
                    : 'w-6 h-6 rounded-full bg-[#E2E9F9]'
                }`}
              >
                {isCompleted && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {isCurrent && (
                  <div className="w-3 h-3 rounded-full bg-[#3866B0]" />
                )}
              </div>

              {/* Connector line */}
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 transition-colors duration-300 ${
                    index < currentStep ? 'bg-[#22C55E]' : 'bg-[#E2E9F9]'
                  }`}
                  style={{ minWidth: '20px' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
