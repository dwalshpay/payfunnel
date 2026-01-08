import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';

interface NavigationBarProps {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
  canProceed: boolean;
  isLoading: boolean;
  isLastStep?: boolean;
}

export function NavigationBar({
  currentStep,
  onBack,
  onContinue,
  canProceed,
  isLoading,
  isLastStep: _isLastStep = false,
}: NavigationBarProps) {
  return (
    <div className="relative">
      {/* Divider line */}
      <div className="flex items-center justify-center py-3">
        <div className="w-full h-px bg-[#E0E0E0]" />
      </div>

      {/* Button container with shadow */}
      <div className="flex items-center gap-2.5 p-4 rounded-t-3xl shadow-[0px_3px_10px_1px_rgba(0,0,0,0.1),0px_4px_12px_1px_rgba(0,0,0,0.1)]">
        {/* Back button - square with border */}
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className={`flex items-center justify-center w-16 h-14 rounded-xl border transition-all bg-white ${
            currentStep === 0
              ? 'border-[rgba(0,0,0,0.12)] text-[#BDBDBD] cursor-not-allowed'
              : 'border-[rgba(0,0,0,0.12)] text-[#283E48] hover:bg-[#F5F5F5]'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Confirm/Continue button */}
        <button
          onClick={onContinue}
          disabled={!canProceed || isLoading}
          className={`flex-1 h-14 rounded-xl font-bold text-[16px] tracking-[0.8px] transition-all ${
            canProceed && !isLoading
              ? 'bg-[#3866B0] text-white hover:bg-[#2D5490]'
              : 'bg-[#BDBDBD] text-[rgba(0,0,0,0.54)] cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          ) : (
            'Confirm'
          )}
        </button>
      </div>
    </div>
  );
}
