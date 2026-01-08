import { FormCard } from '../components/layout/FormCard';
import { NavigationBar } from '../components/layout/NavigationBar';
import { OptionList } from '../components/form/OptionList';
import { TextInput } from '../components/form/TextInput';
import { Tooltip } from '../components/form/Tooltip';
import { SkeletonLoader } from '../components/form/SkeletonLoader';
import { useFunnel } from '../context/FunnelContext';
import { STEPS, TOTAL_STEPS } from '../data/stepConfig';

export function StepPage() {
  const {
    state,
    setSingleAnswer,
    toggleMultiAnswer,
    setOtherInput,
    nextStep,
    prevStep,
    canProceed,
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

  const navigation = (
    <NavigationBar
      currentStep={currentStep}
      onBack={prevStep}
      onContinue={nextStep}
      canProceed={canProceed()}
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
          {stepConfig.type === 'input' ? (
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
