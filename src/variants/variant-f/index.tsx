import { VariantFProvider } from './context/VariantFContext';
import { VariantFFunnel } from './VariantFFunnel';

export function VariantF() {
  return (
    <VariantFProvider>
      <VariantFFunnel />
    </VariantFProvider>
  );
}

export default VariantF;

// Re-export types and utilities for external use
export * from './types';
export { calculateScore, generateRecommendations, routeLead } from './utils/scoreCalculation';
