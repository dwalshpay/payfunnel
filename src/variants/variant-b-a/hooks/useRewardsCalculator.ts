import { useMemo } from 'react';

interface RewardsInput {
  monthlyExpenses: number;
  paymentMethods: string[];
  industry: string | null;
  employees: string | null;
}

interface RewardsOutput {
  annualPoints: number;
  formattedPoints: string;
  pointsPerMonth: number;
  confidence: 'low' | 'medium' | 'high';
  // Legacy fields for compatibility
  annualRewards: number;
  formattedRewards: string;
}

// Points rate: 2 points per dollar
const POINTS_PER_DOLLAR = 2;

export function useRewardsCalculator(input: RewardsInput): RewardsOutput {
  return useMemo(() => {
    const { monthlyExpenses, paymentMethods, industry, employees } = input;

    // Base calculation
    if (!monthlyExpenses || monthlyExpenses <= 0) {
      return {
        annualPoints: 0,
        formattedPoints: '0 pts',
        pointsPerMonth: 0,
        confidence: 'low',
        annualRewards: 0,
        formattedRewards: '0 pts',
      };
    }

    // Calculate points: 2 points per dollar
    const monthlyPoints = monthlyExpenses * POINTS_PER_DOLLAR;
    const annualPoints = Math.round(monthlyPoints * 12);

    // Determine confidence level based on data completeness
    let confidence: 'low' | 'medium' | 'high' = 'low';
    const dataPoints = [
      monthlyExpenses > 0,
      paymentMethods.length > 0,
      industry !== null,
      employees !== null,
    ].filter(Boolean).length;

    if (dataPoints >= 4) confidence = 'high';
    else if (dataPoints >= 2) confidence = 'medium';

    // Format the points value with commas
    const formattedPoints = new Intl.NumberFormat('en-AU').format(annualPoints) + ' pts';

    return {
      annualPoints,
      formattedPoints,
      pointsPerMonth: Math.round(monthlyPoints),
      confidence,
      // Legacy compatibility
      annualRewards: annualPoints,
      formattedRewards: formattedPoints,
    };
  }, [input.monthlyExpenses, input.paymentMethods, input.industry, input.employees]);
}

// Utility to format large numbers with commas
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Parse currency string back to number
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^0-9.-]+/g, '');
  return parseInt(cleaned, 10) || 0;
}
