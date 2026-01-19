import { VariantBAProvider, useVariantBA } from './context/VariantBAContext';
import { VariantBALayout } from './components/layout/VariantBALayout';
import { VariantBAStepPage } from './pages/VariantBAStepPage';
import { SuccessPage } from './pages/SuccessPage';

function VariantBAContent() {
  const { state } = useVariantBA();

  return (
    <VariantBALayout>
      {state.isComplete ? <SuccessPage /> : <VariantBAStepPage />}
    </VariantBALayout>
  );
}

export function VariantBAFunnel() {
  return (
    <VariantBAProvider>
      <VariantBAContent />
    </VariantBAProvider>
  );
}
