import { VARIANT_B_STEPS } from '../../data/variantBStepConfig';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const stepConfig = VARIANT_B_STEPS[currentStep];
  const stepsRemaining = totalSteps - currentStep;
  const secondsRemaining = stepsRemaining * 30;
  const timeDisplay = secondsRemaining >= 60
    ? `~${Math.ceil(secondsRemaining / 60)} min`
    : `~${secondsRemaining} sec`;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Step counter and time estimate */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[#283E48]">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-[#6B7280]">
          {timeDisplay} remaining
        </span>
      </div>

      {/* Progress bar with step markers */}
      <div className="relative">
        {/* Background track */}
        <div className="h-2 bg-[#E2E9F9] rounded-full overflow-hidden">
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-[#3866B0] to-[#5B8AD0] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="absolute inset-0 flex items-center justify-between px-0">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index < currentStep
                  ? 'bg-[#3866B0] border-[#3866B0]' // Completed
                  : index === currentStep
                  ? 'bg-white border-[#3866B0] scale-125' // Current
                  : 'bg-[#E2E9F9] border-[#E2E9F9]' // Upcoming
              }`}
            >
              {index < currentStep && (
                <svg
                  className="w-full h-full text-white p-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current step name */}
      <div className="text-center">
        <span className="text-xs font-medium text-[#3866B0] uppercase tracking-wider">
          {stepConfig?.id.replace(/-/g, ' ')}
        </span>
      </div>
    </div>
  );
}
