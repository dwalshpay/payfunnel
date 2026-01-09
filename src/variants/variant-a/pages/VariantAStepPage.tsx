import { useVariantA } from '../context/VariantAContext';
import { VARIANT_A_STEPS, VARIANT_A_REGISTRATION_STEPS, VARIANT_A_TOTAL_STEPS } from '../data/variantAStepConfig';
import { useRewardsCalculator } from '../hooks/useRewardsCalculator';
import { StepIndicator } from '../components/layout/StepIndicator';
import { ValueMeter } from '../components/layout/ValueMeter';
import { SmartOptionGrid, SizeSelector } from '../components/form/SmartOptionGrid';
import { ExpenseSlider } from '../components/form/ExpenseSlider';
import { TransitionMessage } from '../components/feedback/TransitionMessage';
import { TrustIndicator } from '../components/feedback/TrustBadges';
import { AccountCreationStep, MobileNumberStep, VerificationCodeStep } from '../components/registration';

export function VariantAStepPage() {
  const {
    state,
    setSingleAnswer,
    toggleMultiAnswer,
    setExpense,
    nextStep,
    prevStep,
    completeFunnel,
    clearTransition,
    canProceed,
  } = useVariantA();

  const { currentStep, answers, isLoading, transitionMessage } = state;

  // Determine if we're on a profile step or registration step
  const isRegistrationStep = currentStep >= VARIANT_A_STEPS.length;
  const registrationStepIndex = currentStep - VARIANT_A_STEPS.length;

  // Get the appropriate step config
  const stepConfig = isRegistrationStep
    ? null
    : VARIANT_A_STEPS[currentStep];

  const registrationStepConfig = isRegistrationStep
    ? VARIANT_A_REGISTRATION_STEPS[registrationStepIndex]
    : null;

  // Calculate rewards for display
  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  const handleContinue = () => {
    if (currentStep === VARIANT_A_TOTAL_STEPS - 1) {
      completeFunnel();
    } else if (isRegistrationStep) {
      // No transition message for registration steps
      nextStep();
    } else {
      // Replace {rewards} placeholder in transition message
      const message = stepConfig?.transitionMessage?.replace(
        '{rewards}',
        rewards.formattedRewards
      );
      nextStep(message);
    }
  };

  // Render registration component based on step
  const renderRegistrationComponent = () => {
    if (!registrationStepConfig) return null;

    switch (registrationStepConfig.registrationComponent) {
      case 'AccountCreationStep':
        return <AccountCreationStep />;
      case 'MobileNumberStep':
        return <MobileNumberStep />;
      case 'VerificationCodeStep':
        return <VerificationCodeStep />;
      default:
        return null;
    }
  };

  const handleSingleSelect = (field: string, value: string) => {
    setSingleAnswer(field as keyof typeof answers, value);

    // Auto-advance on step 1 (role selection)
    if (currentStep === 0 && stepConfig) {
      setTimeout(() => {
        nextStep(stepConfig.transitionMessage);
      }, 300);
    }
  };

  const handleMultiSelect = (field: string, value: string) => {
    toggleMultiAnswer(field as keyof typeof answers, value);
  };

  // Render section based on type
  const renderSection = (section: (typeof VARIANT_A_STEPS)[0]['sections'][0]) => {
    const { id, type, field, options, label, maxSelections } = section;

    switch (type) {
      case 'single':
        if (field === 'employees') {
          return (
            <div key={id} className="flex flex-col gap-3">
              {label && (
                <label className="text-sm font-medium text-[#6B7280]">{label}</label>
              )}
              <SizeSelector
                options={options || []}
                selectedValue={answers[field as keyof typeof answers] as string}
                onSelect={(value) => handleSingleSelect(field, value)}
              />
            </div>
          );
        }
        return (
          <div key={id} className="flex flex-col gap-3">
            {label && (
              <label className="text-sm font-medium text-[#6B7280]">{label}</label>
            )}
            <SmartOptionGrid
              options={options || []}
              selectedValues={answers[field as keyof typeof answers] as string}
              onSelect={(value) => handleSingleSelect(field, value)}
            />
          </div>
        );

      case 'multi':
      case 'priority':
        return (
          <div key={id} className="flex flex-col gap-3">
            {label && (
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#6B7280]">{label}</label>
                {maxSelections && (
                  <span className="text-xs text-[#9CA3AF]">
                    Select up to {maxSelections}
                  </span>
                )}
              </div>
            )}
            <SmartOptionGrid
              options={options || []}
              selectedValues={answers[field as keyof typeof answers] as string[]}
              isMulti={true}
              onSelect={(value) => handleMultiSelect(field, value)}
            />
          </div>
        );

      case 'slider':
        return (
          <div key={id} className="flex flex-col gap-3">
            {label && (
              <label className="text-sm font-medium text-[#6B7280]">{label}</label>
            )}
            <ExpenseSlider
              value={answers.monthlyExpenses}
              onChange={setExpense}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Get title and subtitle for current step
  const title = isRegistrationStep ? registrationStepConfig?.title : stepConfig?.title;
  const subtitle = isRegistrationStep ? registrationStepConfig?.subtitle : stepConfig?.subtitle;
  const ctaText = isRegistrationStep ? registrationStepConfig?.ctaText : stepConfig?.ctaText;

  return (
    <>
      {/* Transition message overlay */}
      <TransitionMessage message={transitionMessage} onComplete={clearTransition} />

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-xl border border-[#F5F5F5] overflow-hidden">
        {/* Progress indicator */}
        <div className="px-8 pt-6 pb-4 border-b border-[#F5F5F5]">
          <StepIndicator currentStep={currentStep} totalSteps={VARIANT_A_TOTAL_STEPS} />
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[28px] font-bold text-[#283E48] leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-[16px] text-[#6B7280]">{subtitle}</p>
            )}
          </div>

          {/* Registration steps */}
          {isRegistrationStep ? (
            <div className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              {renderRegistrationComponent()}
            </div>
          ) : (
            <>
              {/* Value proposition / Rewards meter for step 3 */}
              {currentStep === 2 && (
                <div className="mb-6">
                  <ValueMeter
                    value={rewards.annualRewards}
                    confidence={rewards.confidence}
                  />
                </div>
              )}

              {/* Form sections */}
              <div
                className={`flex flex-col gap-6 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {stepConfig?.sections.map(renderSection)}
              </div>

              {/* Helper text */}
              {stepConfig?.valueProposition && currentStep !== 2 && (
                <p className="mt-4 text-sm text-[#9CA3AF] text-center">
                  {stepConfig.valueProposition}
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer with navigation */}
        <div className="px-8 py-6 bg-[#FAFBFC] border-t border-[#F5F5F5]">
          <div className="flex items-center gap-4">
            {/* Back button */}
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="w-14 h-14 flex items-center justify-center rounded-xl border border-[#E0E0E0] text-[#6B7280] hover:bg-[#F5F5F5] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Continue button */}
            <button
              onClick={handleContinue}
              disabled={!canProceed() || isLoading}
              className={`flex-1 h-14 rounded-xl font-bold text-[16px] tracking-wide transition-all duration-200 ${
                canProceed() && !isLoading
                  ? 'bg-[#3866B0] text-white hover:bg-[#2D5490] shadow-lg shadow-[#3866B0]/20'
                  : 'bg-[#E0E0E0] text-[#9CA3AF] cursor-not-allowed'
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                </span>
              ) : (
                ctaText
              )}
            </button>
          </div>

          {/* Trust indicator */}
          <div className="mt-4 flex justify-center">
            <TrustIndicator />
          </div>
        </div>
      </div>
    </>
  );
}
