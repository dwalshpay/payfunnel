import { VariantEProvider } from './context/VariantEContext';
import { VariantELayout } from './components/layout/VariantELayout';
import { VariantEFunnel } from './VariantEFunnel';

function VariantEContent() {
  return (
    <VariantELayout>
      <VariantEFunnel />
    </VariantELayout>
  );
}

export function VariantEFunnelRoot() {
  return (
    <VariantEProvider>
      <VariantEContent />
    </VariantEProvider>
  );
}

// Export for convenience
export { useVariantE } from './context/VariantEContext';
