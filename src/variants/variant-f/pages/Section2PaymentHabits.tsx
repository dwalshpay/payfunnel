import { ChevronRightIcon, CheckIcon } from '../../../components/icons/Icons';
import { iconMap } from '../../../components/icons/Icons';
import { useVariantF } from '../context/VariantFContext';
import { paymentHabitsQuestions } from '../data/questionConfig';
import { SectionProgress } from '../components/layout/SectionProgress';

export function Section2PaymentHabits() {
  const {
    state,
    setMonthlyExpenses,
    togglePaymentMethod,
    setPainPoint,
    nextSection,
    prevSection,
    canProceedSection2,
  } = useVariantF();

  const { paymentHabits } = state.answers;

  const canProceed = canProceedSection2();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8EEF5] to-[#F0F4F8] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          {/* Main form */}
          <div className="bg-white rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] p-8">
            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#3866B0] mb-1">
                SECTION 2 OF 3
              </p>
              <h1 className="text-2xl font-bold text-[#283E48] mb-4">
                Payment Habits
              </h1>

              {/* Progress bar */}
              <div className="h-2 bg-[#E2E9F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3866B0] rounded-full transition-all duration-300"
                  style={{ width: '66%' }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {/* Monthly expenses */}
              <div>
                <label className="block text-sm font-medium text-[#283E48] mb-3">
                  {paymentHabitsQuestions[0].question}
                </label>
                <div className="space-y-2">
                  {paymentHabitsQuestions[0].options.map((option) => {
                    const isSelected = paymentHabits.monthlyExpenses === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setMonthlyExpenses(option.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[#3866B0] bg-[#3866B0]/5'
                            : 'border-[#E5E7EB] bg-white hover:border-[#3866B0]/50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-[#3866B0] bg-[#3866B0]'
                              : 'border-[#D1D5DB]'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
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

              {/* Payment methods (multi-select) */}
              <div>
                <label className="block text-sm font-medium text-[#283E48] mb-1">
                  {paymentHabitsQuestions[1].question}
                </label>
                {paymentHabitsQuestions[1].helperText && (
                  <p className="text-sm text-[#6B7280] mb-3">
                    {paymentHabitsQuestions[1].helperText}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {paymentHabitsQuestions[1].options.map((option) => {
                    const isSelected = paymentHabits.paymentMethods.includes(option.id);
                    const IconComponent = option.icon ? iconMap[option.icon] : null;

                    return (
                      <button
                        key={option.id}
                        onClick={() => togglePaymentMethod(option.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
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
                            className={`w-5 h-5 flex-shrink-0 ${
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

              {/* Pain point (key qualifier) */}
              <div className="p-4 rounded-xl border-2 border-[#E2E9F9] bg-[#F9FAFB]">
                <label className="block text-sm font-medium text-[#283E48] mb-1">
                  {paymentHabitsQuestions[2].question}
                </label>
                {paymentHabitsQuestions[2].helperText && (
                  <p className="text-sm text-[#6B7280] mb-3">
                    {paymentHabitsQuestions[2].helperText}
                  </p>
                )}
                <div className="space-y-2">
                  {paymentHabitsQuestions[2].options.map((option) => {
                    const isSelected = paymentHabits.painPoint === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setPainPoint(option.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[#3866B0] bg-white'
                            : 'border-transparent bg-white hover:border-[#3866B0]/30'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-[#3866B0] bg-[#3866B0]'
                              : 'border-[#D1D5DB]'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
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
            </div>

            {/* Navigation buttons */}
            <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex gap-3">
              <button
                onClick={prevSection}
                className="px-6 py-4 rounded-xl font-bold text-base border-2 border-[#E5E7EB] text-[#283E48] hover:bg-[#F5F5F5] transition-all"
              >
                Back
              </button>
              <button
                onClick={nextSection}
                disabled={!canProceed}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-all ${
                  canProceed
                    ? 'bg-[#3866B0] text-white hover:bg-[#2D5490]'
                    : 'bg-[#BDBDBD] text-white/70 cursor-not-allowed'
                }`}
              >
                Continue to Section 3
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
