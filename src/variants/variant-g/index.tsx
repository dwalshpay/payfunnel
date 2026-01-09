import { VariantGProvider, useVariantG } from './context/VariantGContext';
import { VariantGLayout } from './components/layout/VariantGLayout';
import { VariantGStepPage } from './pages/VariantGStepPage';
import { SuccessPage } from './pages/SuccessPage';

function VariantGContent() {
  const { state } = useVariantG();
  const { currentStep, isComplete } = state;

  // Show calculator sidebar on steps 1-4 (not entry or success)
  const showCalculator =
    currentStep !== 'entry' &&
    currentStep !== 'success' &&
    currentStep !== 3 && // Step 3 has full-width dashboard preview
    currentStep !== 4; // Step 4 has its own sidebar

  return (
    <VariantGLayout showCalculator={showCalculator}>
      {isComplete ? <SuccessPage /> : <VariantGStepPage />}
    </VariantGLayout>
  );
}

export function VariantGFunnel() {
  return (
    <VariantGProvider>
      <VariantGContent />
    </VariantGProvider>
  );
}
