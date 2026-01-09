import { useVariantG } from '../context/VariantGContext';
import { IndustryCheckboxGrid } from '../components/form/IndustryCheckboxGrid';
import { ClientTypeSelector } from '../components/form/ClientTypeSelector';

export function Step2ClientMix() {
  const { nextStep, prevStep, canProceed, getStepProgress } = useVariantG();
  const progress = getStepProgress();

  return (
    <div className="bg-white rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-[#E2E9F9]">
        <div
          className="h-full bg-[#3866B0] transition-all duration-300"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.8px] text-[#3866B0] uppercase mb-2">
            Client Industries
          </p>
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#283E48] leading-tight">
            Tell us about your client mix
          </h2>
          <p className="text-[#6B7280] mt-2">
            Different industries have different rewards potential
          </p>
        </div>

        {/* Form fields */}
        <div className="space-y-8">
          <IndustryCheckboxGrid />
          <ClientTypeSelector />
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              className="text-[#6B7280] hover:text-[#3866B0] font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`
                px-8 py-3 rounded-xl font-bold transition-all duration-200
                ${
                  canProceed()
                    ? 'bg-[#3866B0] text-white hover:bg-[#2D5490] hover:scale-[1.02] shadow-lg shadow-[#3866B0]/20'
                    : 'bg-[#E5E7EB] text-[#BDBDBD] cursor-not-allowed'
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
