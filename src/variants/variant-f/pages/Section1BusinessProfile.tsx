import { ChevronRightIcon } from '../../../components/icons/Icons';
import { iconMap } from '../../../components/icons/Icons';
import { useVariantF } from '../context/VariantFContext';
import { businessProfileQuestions } from '../data/questionConfig';
import { SectionProgress } from '../components/layout/SectionProgress';

export function Section1BusinessProfile() {
  const {
    state,
    setIndustry,
    setTeamSize,
    setBusinessAge,
    nextSection,
    canProceedSection1,
  } = useVariantF();

  const { businessProfile } = state.answers;

  const canProceed = canProceedSection1();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EEF7] via-[#EDF1F8] to-[#E5EBF5] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          {/* Main form */}
          <div className="bg-white rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] p-8">
            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#3866B0] mb-1">
                SECTION 1 OF 3
              </p>
              <h1 className="text-2xl font-bold text-[#283E48] mb-4">
                Business Profile
              </h1>

              {/* Progress bar */}
              <div className="h-2 bg-[#E2E9F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3866B0] rounded-full transition-all duration-300"
                  style={{ width: '33%' }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {/* Industry dropdown */}
              <div>
                <label className="block text-sm font-medium text-[#283E48] mb-3">
                  {businessProfileQuestions[0].question}
                </label>
                <select
                  value={businessProfile.industry ?? ''}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#283E48] text-base focus:outline-none focus:border-[#3866B0] focus:ring-2 focus:ring-[#3866B0]/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <option value="">Select your industry...</option>
                  {businessProfileQuestions[0].options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team size buttons */}
              <div>
                <label className="block text-sm font-medium text-[#283E48] mb-3">
                  {businessProfileQuestions[1].question}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {businessProfileQuestions[1].options.map((option) => {
                    const isSelected = businessProfile.teamSize === option.id;
                    const IconComponent = option.icon ? iconMap[option.icon] : null;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setTeamSize(option.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[#3866B0] bg-[#3866B0] text-white'
                            : 'border-[#E5E7EB] bg-white text-[#283E48] hover:border-[#3866B0]/50'
                        }`}
                      >
                        {IconComponent && (
                          <IconComponent
                            className={`w-5 h-5 flex-shrink-0 ${
                              isSelected ? 'text-white' : 'text-[#6B7280]'
                            }`}
                          />
                        )}
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Business age buttons */}
              <div>
                <label className="block text-sm font-medium text-[#283E48] mb-3">
                  {businessProfileQuestions[2].question}
                </label>
                <div className="flex flex-wrap gap-3">
                  {businessProfileQuestions[2].options.map((option) => {
                    const isSelected = businessProfile.businessAge === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setBusinessAge(option.id)}
                        className={`px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-[#3866B0] bg-[#3866B0] text-white'
                            : 'border-[#E5E7EB] bg-white text-[#283E48] hover:border-[#3866B0]/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Continue button */}
            <div className="mt-10 pt-6 border-t border-[#E5E7EB]">
              <button
                onClick={nextSection}
                disabled={!canProceed}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-all ${
                  canProceed
                    ? 'bg-[#3866B0] text-white hover:bg-[#2D5490]'
                    : 'bg-[#BDBDBD] text-white/70 cursor-not-allowed'
                }`}
              >
                Continue to Section 2
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden md:block">
            <SectionProgress />
          </div>
        </div>
      </div>
    </div>
  );
}
