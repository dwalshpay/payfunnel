import { VariantDProvider, useVariantD } from './context/VariantDContext';
import { VariantDLayout } from './components/layout/VariantDLayout';
import { VariantDStepPage } from './pages/VariantDStepPage';
import { SuccessPage } from './pages/SuccessPage';

function VariantDContent() {
  const { state } = useVariantD();

  return (
    <VariantDLayout>
      {state.isComplete ? <SuccessPage /> : <VariantDStepPage />}
    </VariantDLayout>
  );
}

export function VariantDFunnel() {
  return (
    <VariantDProvider>
      <VariantDContent />
    </VariantDProvider>
  );
}
