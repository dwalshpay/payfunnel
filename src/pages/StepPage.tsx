import { FormCard } from '../components/layout/FormCard';
import { NavigationBar } from '../components/layout/NavigationBar';
import { OptionList } from '../components/form/OptionList';
import { TextInput } from '../components/form/TextInput';
import { Tooltip } from '../components/form/Tooltip';
import { SkeletonLoader } from '../components/form/SkeletonLoader';
import { useFunnel } from '../context/FunnelContext';
import { STEPS, TOTAL_STEPS } from '../data/stepConfig';
import {
  AccountCreationForm,
  MobileNumberInput,
  VerificationCodeInput,
} from '../components/registration';

export function StepPage() {
  const {
    state,
    setSingleAnswer,
    toggleMultiAnswer,
    setOtherInput,
    setRegistrationField,
    nextStep,
    prevStep,
    goToStep,
    canProceed,
    completeFunnel,
  } = useFunnel();

  const { currentStep, answers, isLoading } = state;
  const stepConfig = STEPS[currentStep];

  const handleSingleSelect = (value: string) => {
    setSingleAnswer(stepConfig.field, value);
  };

  const handleMultiSelect = (value: string) => {
    toggleMultiAnswer(stepConfig.field, value);
  };

  const handleInputChange = (value: string) => {
    setSingleAnswer(stepConfig.field, value);
  };

  const handleOtherInputChange = (value: string) => {
    setOtherInput(`${stepConfig.field}_other`, value);
  };

  const getCurrentValue = (): string | string[] | null => {
    return answers[stepConfig.field] as string | string[] | null;
  };

  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const isRegistrationStep = stepConfig.type === 'registration';

  // Custom validation for registration steps
  const canProceedRegistration = (): boolean => {
    const { registration } = answers;

    if (stepConfig.registrationComponent === 'AccountCreationForm') {
      // Validate account creation form
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        emailRegex.test(registration.email) &&
        registration.firstName.trim().length > 0 &&
        registration.lastName.trim().length > 0 &&
        registration.password.length >= 6
      );
    }

    if (stepConfig.registrationComponent === 'MobileNumberInput') {
      // Validate Australian mobile number
      const cleaned = registration.mobileNumber.replace(/[\s-]/g, '');
      const mobileRegex = /^(?:\+61|0)4\d{8}$/;
      return mobileRegex.test(cleaned);
    }

    if (stepConfig.registrationComponent === 'VerificationCodeInput') {
      // Validate 6-digit code
      return registration.verificationCode.length === 6;
    }

    return false;
  };

  const handleContinue = () => {
    if (isLastStep) {
      completeFunnel();
    } else {
      nextStep();
    }
  };

  const canProceedCurrent = isRegistrationStep ? canProceedRegistration() : canProceed();

  const navigation = (
    <NavigationBar
      currentStep={currentStep}
      onBack={prevStep}
      onContinue={handleContinue}
      canProceed={canProceedCurrent}
      isLoading={isLoading}
      isLastStep={isLastStep}
    />
  );

  return (
    <FormCard currentStep={currentStep} navigation={navigation}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Header - matches Figma typography */}
          <div className="flex flex-col gap-3 pb-3">
            <h1 className="text-[28px] font-bold text-[#283E48] leading-[1.2] tracking-[0.2px]">
              {stepConfig.title}
            </h1>
            {stepConfig.subtitle && (
              <p className="text-[18px] font-bold text-[#283E48] leading-[1.2] tracking-[0.2px]">
                {stepConfig.subtitle}
              </p>
            )}
          </div>

          {/* Select label with tooltip */}
          {stepConfig.selectLabel && (
            <div className="flex items-center gap-2 mb-4 pl-3">
              <span className="text-[16px] font-bold text-[#283E48] leading-[1.2] tracking-[0.3px]">
                {stepConfig.selectLabel}
              </span>
              {stepConfig.hasTooltip && stepConfig.tooltipText && (
                <Tooltip text={stepConfig.tooltipText} />
              )}
            </div>
          )}

          {/* Content based on step type */}
          {stepConfig.type === 'registration' ? (
            // Registration components
            stepConfig.registrationComponent === 'AccountCreationForm' ? (
              <AccountCreationForm
                registration={answers.registration}
                onFieldChange={setRegistrationField}
                estimatedPoints={156000}
              />
            ) : stepConfig.registrationComponent === 'MobileNumberInput' ? (
              <MobileNumberInput
                registration={answers.registration}
                onFieldChange={setRegistrationField}
              />
            ) : stepConfig.registrationComponent === 'VerificationCodeInput' ? (
              <VerificationCodeInput
                registration={answers.registration}
                onFieldChange={setRegistrationField}
                onCancel={() => goToStep(currentStep - 1)}
              />
            ) : null
          ) : stepConfig.type === 'input' ? (
            <TextInput
              label={stepConfig.inputLabel || ''}
              value={(answers[stepConfig.field] as string) || ''}
              onChange={handleInputChange}
              prefix={stepConfig.inputPrefix}
              placeholder="0"
            />
          ) : (
            <OptionList
              options={stepConfig.options || []}
              selectedValues={getCurrentValue()}
              isMulti={stepConfig.type === 'multi'}
              onSelect={
                stepConfig.type === 'multi' ? handleMultiSelect : handleSingleSelect
              }
              otherValue={answers.otherInputs[`${stepConfig.field}_other`] || ''}
              onOtherChange={handleOtherInputChange}
            />
          )}
        </>
      )}
    </FormCard>
  );
}
