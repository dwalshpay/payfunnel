import type { VariantEAnswers } from '../context/VariantEContext';

export const BENCHMARK_POINTS = 1056000;

// Industry multipliers (some industries have higher payment volumes)
const industryMultipliers: Record<string, number> = {
  construction: 1.5,
  trades: 1.3,
  professional: 1.2,
  healthcare: 1.1,
  retail: 1.0,
  other: 1.0,
};

// Spend multipliers
const spendMultipliers: Record<string, number> = {
  low: 0.15, // Under $10K
  medium: 0.5, // $10K - $50K
  high: 1.0, // $50K - $100K
  very_high: 2.0, // $100K - $250K
  enterprise: 4.0, // $250K+
};

// Team size multipliers
const teamSizeMultipliers: Record<string, number> = {
  solo: 0.8,
  small: 1.0, // 2-10 employees
  medium: 1.2, // 11-50 employees
  large: 1.5, // 50+ employees
};

// Payment method bonuses (additive percentages)
const paymentMethodBonuses: Record<string, number> = {
  amex: 0.2, // +20%
  visa: 0.1, // +10%
  mastercard: 0.1, // +10%
  bank_transfer: 0.05, // +5%
};

// Payment type bonuses (additive percentages)
const paymentTypeBonuses: Record<string, number> = {
  suppliers: 0.15, // +15%
  ato: 0.15, // +15%
  payroll: 0.1, // +10%
  rent: 0.1, // +10%
  insurance: 0.05, // +5%
};

export function calculatePoints(
  industry: string,
  spend: string,
  teamSize: string | null = null,
  paymentMethods: string[] = [],
  paymentTypes: string[] = []
): number {
  // Base calculation
  let points = BENCHMARK_POINTS;

  // Apply industry multiplier
  points *= industryMultipliers[industry] || 1.0;

  // Apply spend multiplier
  points *= spendMultipliers[spend] || 1.0;

  // Apply team size multiplier if provided
  if (teamSize) {
    points *= teamSizeMultipliers[teamSize] || 1.0;
  }

  // Apply payment method bonuses
  const methodBonus = paymentMethods.reduce((sum, method) => {
    return sum + (paymentMethodBonuses[method] || 0);
  }, 0);
  points *= 1 + methodBonus;

  // Apply payment type bonuses
  const typeBonus = paymentTypes.reduce((sum, type) => {
    return sum + (paymentTypeBonuses[type] || 0);
  }, 0);
  points *= 1 + typeBonus;

  return Math.round(points);
}

export function calculateComparison(
  userPoints: number,
  benchmark: number
): { percentage: number; isAbove: boolean } {
  const diff = ((userPoints - benchmark) / benchmark) * 100;
  return {
    percentage: Math.abs(Math.round(diff)),
    isAbove: diff > 0,
  };
}

export function calculateAccuracy(answers: VariantEAnswers): number {
  let accuracy = 0;

  // Step 1 viewed (implicit)
  accuracy += 10;

  // Step 2 selections
  if (answers.industry) accuracy += 15;
  if (answers.spend) accuracy += 15;

  // Step 3 email provided
  if (answers.email) accuracy += 25;

  // Step 4 enrichment
  if (answers.teamSize) accuracy += 10;
  if (answers.paymentMethods.length > 0) accuracy += 15;
  if (answers.paymentTypes.length > 0) accuracy += 10;

  return Math.min(accuracy, 100);
}

// Value translations for points
export function getValueTranslations(points: number): {
  flights: number;
  hotelNights: number;
  giftCardValue: number;
} {
  // Approximate conversions:
  // - Business class flight to Bali/Singapore: ~78,000 points
  // - Marriott night: ~20,000 points
  // - Gift card: 1 point = $0.01 value
  return {
    flights: Math.floor(points / 78000),
    hotelNights: Math.floor(points / 13000),
    giftCardValue: Math.round(points / 100),
  };
}

// Note: Rotating value translations for the anchor screen are now handled
// directly in AnchorReveal.tsx with icon components
