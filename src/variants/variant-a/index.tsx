import { VariantAProvider, useVariantA } from './context/VariantAContext';
import { VariantALayout } from './components/layout/VariantALayout';
import { VariantAStepPage } from './pages/VariantAStepPage';
import { SuccessPage } from './pages/SuccessPage';

function VariantAContent() {
  const { state } = useVariantA();

  return (
    <VariantALayout>
      {state.isComplete ? <SuccessPage /> : <VariantAStepPage />}
    </VariantALayout>
  );
}

export function VariantAFunnel() {
  return (
    <VariantAProvider>
      <VariantAContent />
    </VariantAProvider>
  );
}
