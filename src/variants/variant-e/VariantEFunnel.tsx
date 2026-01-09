import { useVariantE } from './context/VariantEContext';
import { AnchorReveal } from './components/AnchorReveal';
import { QuickProfile } from './components/QuickProfile';
import { RewardComparison } from './components/RewardComparison';
import { EnrichmentAccordion } from './components/EnrichmentAccordion';
import { SuccessPage } from './pages/SuccessPage';
import { BENCHMARK_POINTS } from './utils/calculations';

export function VariantEFunnel() {
  const {
    state,
    setIndustry,
    setSpend,
    setEmail,
    setTeamSize,
    togglePaymentMethod,
    togglePaymentType,
    nextStep,
    goToStep,
    submitEmail,
    completeFunnel,
  } = useVariantE();

  const { currentStep, answers, calculated, ui, isComplete } = state;

  // Show success page when complete
  if (isComplete) {
    return <SuccessPage />;
  }

  // Step 1: Anchor reveal
  if (currentStep === 1) {
    return (
      <AnchorReveal
        benchmarkPoints={BENCHMARK_POINTS}
        onContinue={() => nextStep()}
      />
    );
  }

  // Step 2: Quick profile (industry + spend)
  if (currentStep === 2) {
    return (
      <QuickProfile
        selectedIndustry={answers.industry}
        selectedSpend={answers.spend}
        onIndustrySelect={setIndustry}
        onSpendSelect={setSpend}
        onCalculate={() => nextStep()}
        accuracy={calculated.accuracy}
      />
    );
  }

  // Step 3: Reward comparison with email capture
  if (currentStep === 3) {
    return (
      <RewardComparison
        userPoints={calculated.userPoints}
        benchmarkPoints={calculated.benchmarkPoints}
        comparisonPercentage={calculated.comparisonPercentage}
        isAboveBenchmark={calculated.isAboveBenchmark}
        accuracy={calculated.accuracy}
        email={answers.email || ''}
        onEmailChange={setEmail}
        onEmailSubmit={() => {
          submitEmail();
          goToStep(4);
        }}
        onExpand={() => goToStep(4)}
        emailSubmitted={ui.emailSubmitted}
      />
    );
  }

  // Step 4: Optional enrichment
  if (currentStep === 4) {
    return (
      <EnrichmentAccordion
        values={{
          teamSize: answers.teamSize || '',
          paymentMethods: answers.paymentMethods,
          paymentTypes: answers.paymentTypes,
        }}
        onChange={(sectionId, value) => {
          if (sectionId === 'teamSize' && typeof value === 'string') {
            setTeamSize(value);
          } else if (sectionId === 'paymentMethods' && Array.isArray(value)) {
            // Clear and re-add
            answers.paymentMethods.forEach((m) => {
              if (!value.includes(m)) togglePaymentMethod(m);
            });
            value.forEach((m) => {
              if (!answers.paymentMethods.includes(m)) togglePaymentMethod(m);
            });
          } else if (sectionId === 'paymentTypes' && Array.isArray(value)) {
            // Clear and re-add
            answers.paymentTypes.forEach((t) => {
              if (!value.includes(t)) togglePaymentType(t);
            });
            value.forEach((t) => {
              if (!answers.paymentTypes.includes(t)) togglePaymentType(t);
            });
          }
        }}
        onComplete={completeFunnel}
        onSkip={completeFunnel}
        currentPoints={calculated.userPoints}
        accuracy={calculated.accuracy}
      />
    );
  }

  return null;
}
