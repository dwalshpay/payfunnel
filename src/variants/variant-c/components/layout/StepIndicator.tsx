interface StepIndicatorProps {
  currentStep: number; // 1-3 (not 0, hero is separate)
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-3">
      {/* Progress bar */}
      <div className="flex items-center gap-1.5">
        {steps.map((step) => (
          <div key={step} className="flex items-center">
            {/* Step dot */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                step < currentStep
                  ? 'bg-[#22C55E]' // Completed
                  : step === currentStep
                  ? 'bg-[#3866B0] ring-2 ring-[#3866B0]/30' // Current
                  : 'bg-[#E2E9F9]' // Upcoming
              }`}
            >
              {step < currentStep && (
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Connector line */}
            {step < totalSteps && (
              <div
                className={`w-8 md:w-12 h-0.5 mx-1 transition-all duration-300 ${
                  step < currentStep ? 'bg-[#22C55E]' : 'bg-[#E2E9F9]'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step counter */}
      <span className="text-[13px] text-[#6B7280] whitespace-nowrap">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
}
