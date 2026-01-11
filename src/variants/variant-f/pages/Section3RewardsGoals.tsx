import { ChevronRightIcon, CheckIcon } from '../../../components/icons/Icons';
import { iconMap } from '../../../components/icons/Icons';
import { useVariantF } from '../context/VariantFContext';
import { rewardsGoalsQuestions } from '../data/questionConfig';
import { SectionProgress } from '../components/layout/SectionProgress';

export function Section3RewardsGoals() {
  const {
    state,
    toggleGoal,
    setAirlineProgram,
    prevSection,
    calculateResults,
    canProceedSection3,
  } = useVariantF();

  const { rewardsGoals } = state.answers;
  const { isCalculating } = state.ui;

  const canProceed = canProceedSection3();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EEF7] via-[#EDF1F8] to-[#E5EBF5] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          {/* Main form */}
          <div className="bg-white rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] p-8">
            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#3866B0] mb-1">
                SECTION 3 OF 3
              </p>
              <h1 className="text-2xl font-bold text-[#283E48] mb-4">
                Rewards Goals
              </h1>

              {/* Progress bar */}
              <div className="h-2 bg-[#E2E9F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3866B0] rounded-full transition-all duration-300"
                  style={{ width: '90%' }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {/* Goals (multi-select) */}
              <div>
                <label className="block text-sm font-medium text-[#283E48] mb-1">
                  {rewardsGoalsQuestions[0].question}
                </label>
                {rewardsGoalsQuestions[0].helperText && (
                  <p className="text-sm text-[#6B7280] mb-3">
                    {rewardsGoalsQuestions[0].helperText}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {rewardsGoalsQuestions[0].options.map((option) => {
                    const isSelected = rewardsGoals.goals.includes(option.id);
                    const IconComponent = option.icon ? iconMap[option.icon] : null;

                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleGoal(option.id)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[#3866B0] bg-[#3866B0]/5'
                            : 'border-[#E5E7EB] bg-white hover:border-[#3866B0]/50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-[#3866B0] bg-[#3866B0]'
                              : 'border-[#D1D5DB]'
                          }`}
                        >
                          {isSelected && (
                            <CheckIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                        {IconComponent && (
                          <IconComponent
                            className={`w-6 h-6 flex-shrink-0 ${
                              isSelected ? 'text-[#3866B0]' : 'text-[#6B7280]'
                            }`}
                          />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? 'text-[#3866B0]' : 'text-[#283E48]'
                          }`}
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Airline program (optional) */}
              <div>
                <label className="block text-sm font-medium text-[#283E48] mb-1">
                  {rewardsGoalsQuestions[1].question}
                </label>
                <p className="text-sm text-[#6B7280] mb-3">Optional</p>
                <select
                  value={rewardsGoals.airlineProgram ?? ''}
                  onChange={(e) => setAirlineProgram(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#283E48] text-base focus:outline-none focus:border-[#3866B0] focus:ring-2 focus:ring-[#3866B0]/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <option value="">Select a program (optional)...</option>
                  {rewardsGoalsQuestions[1].options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex gap-3">
              <button
                onClick={prevSection}
                disabled={isCalculating}
                className="px-6 py-4 rounded-xl font-bold text-base border-2 border-[#E5E7EB] text-[#283E48] hover:bg-[#F5F5F5] transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={calculateResults}
                disabled={!canProceed || isCalculating}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-all ${
                  canProceed && !isCalculating
                    ? 'bg-[#3866B0] text-white hover:bg-[#2D5490]'
                    : 'bg-[#BDBDBD] text-white/70 cursor-not-allowed'
                }`}
              >
                {isCalculating ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Calculating...
                  </>
                ) : (
                  <>
                    Get My Assessment
                    <ChevronRightIcon className="w-5 h-5" />
                  </>
                )}
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
