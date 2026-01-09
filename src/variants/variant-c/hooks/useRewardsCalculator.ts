import { useMemo } from 'react';

interface RewardsInput {
  monthlyExpenses: number;
  paymentMethods: string[];
  industry: string | null;
  employees: string | null;
}

interface DoubleDipBreakdown {
  // Credit card rewards: 2.25 points per dollar
  creditCardPoints: number;
  // PayRewards points: 2 points per dollar
  payRewardsPoints: number;
  // Combined total points
  totalPoints: number;
}

interface RewardsOutput {
  annualPoints: number;
  formattedPoints: string;
  pointsPerMonth: number;
  confidence: 'low' | 'medium' | 'high';
  // Double-dip breakdown (Variant-C unique)
  doubleDip: DoubleDipBreakdown;
  // Legacy fields for compatibility
  annualRewards: number;
  formattedRewards: string;
}

// Points rates
const CREDIT_CARD_POINTS_PER_DOLLAR = 2.25;
const PAY_REWARDS_POINTS_PER_DOLLAR = 2;

export function useRewardsCalculator(input: RewardsInput): RewardsOutput {
  return useMemo(() => {
    const { monthlyExpenses, paymentMethods, industry, employees } = input;

    // Base case
    if (!monthlyExpenses || monthlyExpenses <= 0) {
      return {
        annualPoints: 0,
        formattedPoints: '0 pts',
        pointsPerMonth: 0,
        confidence: 'low',
        doubleDip: {
          creditCardPoints: 0,
          payRewardsPoints: 0,
          totalPoints: 0,
        },
        annualRewards: 0,
        formattedRewards: '0 pts',
      };
    }

    // Annual expenses (simple calculation)
    const annualExpenses = monthlyExpenses * 12;

    // Credit card points: 2.25 points per dollar
    const creditCardPoints = Math.round(annualExpenses * CREDIT_CARD_POINTS_PER_DOLLAR);

    // PayRewards points: 2 points per dollar
    const payRewardsPoints = Math.round(annualExpenses * PAY_REWARDS_POINTS_PER_DOLLAR);

    // Total points (double-dip)
    const totalPoints = creditCardPoints + payRewardsPoints;

    // Confidence level
    let confidence: 'low' | 'medium' | 'high' = 'low';
    const dataPoints = [
      monthlyExpenses > 0,
      paymentMethods.length > 0,
      industry !== null,
      employees !== null,
    ].filter(Boolean).length;

    if (dataPoints >= 4) confidence = 'high';
    else if (dataPoints >= 2) confidence = 'medium';

    // Format total points
    const formattedPoints = new Intl.NumberFormat('en-AU').format(totalPoints) + ' pts';

    return {
      annualPoints: totalPoints,
      formattedPoints,
      pointsPerMonth: Math.round(totalPoints / 12),
      confidence,
      doubleDip: {
        creditCardPoints,
        payRewardsPoints,
        totalPoints,
      },
      // Legacy compatibility
      annualRewards: totalPoints,
      formattedRewards: formattedPoints,
    };
  }, [
    input.monthlyExpenses,
    input.paymentMethods,
    input.industry,
    input.employees,
  ]);
}

// Quick calculator for hero (expenses only)
export function calculateHeroRewards(monthlyExpenses: number): {
  annualPoints: number;
  formatted: string;
  creditCardPoints: number;
  payRewardsPoints: number;
} {
  const annualExpenses = monthlyExpenses * 12;

  // Credit card: 2.25 pts per dollar, PayRewards: 2 pts per dollar
  const creditCardPoints = Math.round(annualExpenses * CREDIT_CARD_POINTS_PER_DOLLAR);
  const payRewardsPoints = Math.round(annualExpenses * PAY_REWARDS_POINTS_PER_DOLLAR);
  const totalPoints = creditCardPoints + payRewardsPoints;

  return {
    annualPoints: totalPoints,
    formatted: new Intl.NumberFormat('en-AU').format(totalPoints) + ' pts',
    creditCardPoints,
    payRewardsPoints,
  };
}

// Format large numbers
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-AU').format(value);
}

export function formatPoints(value: number): string {
  return new Intl.NumberFormat('en-AU').format(value) + ' pts';
}
