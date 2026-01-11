import { ClockIcon, ChevronRightIcon } from '../../../components/icons/Icons';
import { useVariantF } from '../context/VariantFContext';
import { ReportPreview } from '../components/layout/ReportPreview';

export function IntroPage() {
  const { startAssessment } = useVariantF();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EEF7] via-[#EDF1F8] to-[#E5EBF5] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left column - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#283E48] tracking-tight mb-4">
                BUSINESS REWARDS ASSESSMENT
              </h1>

              <p className="text-lg text-[#6B7280] mb-8">
                Discover how much your business could be earning in rewards.
              </p>

              <div className="flex items-center gap-2 text-[#6B7280] mb-8">
                <ClockIcon className="w-5 h-5" />
                <span className="text-sm">Takes ~3 minutes</span>
              </div>

              <button
                onClick={startAssessment}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3866B0] text-white font-bold text-lg rounded-xl hover:bg-[#2D5490] transition-colors"
              >
                Start Assessment
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Right column - Report preview */}
            <div className="bg-[#F9FAFB] p-8 md:p-12">
              <ReportPreview />
            </div>
          </div>
        </div>

        {/* Trust footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            Trusted by 50,000+ Australian businesses
          </p>
        </div>
      </div>
    </div>
  );
}
