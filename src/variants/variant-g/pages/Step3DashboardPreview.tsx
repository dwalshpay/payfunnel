import { useVariantG } from '../context/VariantGContext';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';
import { AdvisorBenefitsGrid } from '../components/dashboard/AdvisorBenefitsGrid';

export function Step3DashboardPreview() {
  const { nextStep, prevStep, getStepProgress } = useVariantG();
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
            Your Advisor Dashboard
          </p>
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#283E48] leading-tight">
            Here's what you'll get access to
          </h2>
          <p className="text-[#6B7280] mt-2">
            A complete suite of tools to manage your client portfolio
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mb-8">
          <DashboardPreview />
        </div>

        {/* Benefits Grid */}
        <div className="mb-8">
          <AdvisorBenefitsGrid />
        </div>

        {/* Navigation */}
        <div className="pt-6 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              className="text-[#6B7280] hover:text-[#3866B0] font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-8 py-3 rounded-xl font-bold transition-all duration-200 bg-[#3866B0] text-white hover:bg-[#2D5490] hover:scale-[1.02] shadow-lg shadow-[#3866B0]/20"
            >
              Get Advisor Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
