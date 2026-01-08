import { useMemo } from 'react';

interface RewardsInput {
  monthlyExpenses: number;
  paymentMethods: string[];
  industry: string | null;
  employees: string | null;
}

interface RewardsOutput {
  annualRewards: number;
  formattedRewards: string;
  pointsPerMonth: number;
  confidence: 'low' | 'medium' | 'high';
}

// Industry multipliers (some industries have higher average transaction values)
const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  construction: 1.2,
  professional: 1.1,
  health: 1.0,
  hospitality: 0.9,
  other: 1.0,
};

// Company size multipliers
const SIZE_MULTIPLIERS: Record<string, number> = {
  '0-10': 0.8,
  '10-50': 1.0,
  '50-100': 1.2,
  '100-200': 1.4,
  '200+': 1.6,
};

// Payment method bonuses (Amex typically has higher rewards)
const PAYMENT_METHOD_BONUSES: Record<string, number> = {
  amex: 0.03, // 3% rewards rate
  visa: 0.015,
  mastercard: 0.015,
  'bank-transfer': 0.01,
  other: 0.01,
};

export function useRewardsCalculator(input: RewardsInput): RewardsOutput {
  return useMemo(() => {
    const { monthlyExpenses, paymentMethods, industry, employees } = input;

    // Base calculation
    if (!monthlyExpenses || monthlyExpenses <= 0) {
      return {
        annualRewards: 0,
        formattedRewards: '$0',
        pointsPerMonth: 0,
        confidence: 'low',
      };
    }

    // Calculate average rewards rate based on payment methods
    let avgRewardsRate = 0.015; // Default 1.5%
    if (paymentMethods.length > 0) {
      const totalRate = paymentMethods.reduce((sum, method) => {
        return sum + (PAYMENT_METHOD_BONUSES[method] || 0.01);
      }, 0);
      avgRewardsRate = totalRate / paymentMethods.length;
    }

    // Apply industry multiplier
    const industryMultiplier = industry ? INDUSTRY_MULTIPLIERS[industry] || 1.0 : 1.0;

    // Apply size multiplier
    const sizeMultiplier = employees ? SIZE_MULTIPLIERS[employees] || 1.0 : 1.0;

    // Calculate annual rewards
    const monthlyRewards = monthlyExpenses * avgRewardsRate * industryMultiplier * sizeMultiplier;
    const annualRewards = Math.round(monthlyRewards * 12);

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

    // Format the rewards value
    const formattedRewards = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(annualRewards);

    return {
      annualRewards,
      formattedRewards,
      pointsPerMonth: Math.round(monthlyRewards),
      confidence,
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
