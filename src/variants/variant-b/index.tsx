import { VariantBProvider, useVariantB } from './context/VariantBContext';
import { VariantBLayout } from './components/layout/VariantBLayout';
import { VariantBStepPage } from './pages/VariantBStepPage';
import { SuccessPage } from './pages/SuccessPage';

function VariantBContent() {
  const { state } = useVariantB();

  return (
    <VariantBLayout>
      {state.isComplete ? <SuccessPage /> : <VariantBStepPage />}
    </VariantBLayout>
  );
}

export function VariantBFunnel() {
  return (
    <VariantBProvider>
      <VariantBContent />
    </VariantBProvider>
  );
}
