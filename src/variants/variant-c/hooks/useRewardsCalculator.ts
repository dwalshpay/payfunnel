import { useMemo } from 'react';

interface RewardsInput {
  monthlyExpenses: number;
  paymentMethods: string[];
  industry: string | null;
  employees: string | null;
}

interface DoubleDipBreakdown {
  // Credit card rewards (estimated based on avg card rates)
  creditCardPoints: number;
  creditCardValue: number; // AUD value
  // PayRewards points
  payRewardsPoints: number;
  payRewardsValue: number; // AUD value
  // Combined
  totalPoints: number;
  totalValue: number;
  // For display
  qantasPointsEquivalent: number; // Using 2:1 transfer rate
}

interface RewardsOutput {
  annualRewards: number;
  formattedRewards: string;
  pointsPerMonth: number;
  confidence: 'low' | 'medium' | 'high';
  // Double-dip breakdown (Variant-C unique)
  doubleDip: DoubleDipBreakdown;
}

// Industry multipliers
const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  construction: 1.2,
  trades: 1.1,
  professional: 1.1,
  health: 1.0,
  hospitality: 0.9,
  other: 1.0,
};

// Company size multipliers
const SIZE_MULTIPLIERS: Record<string, number> = {
  '1-10': 0.8,
  '11-50': 1.0,
  '51-100': 1.2,
  '101-200': 1.4,
  '200+': 1.6,
};

// Payment method credit card rewards rates (what users earn from their CC)
const CC_REWARDS_RATES: Record<string, number> = {
  amex: 0.02, // 2 points per $ (high-end Amex)
  visa: 0.01, // 1 point per $
  mastercard: 0.01, // 1 point per $
  'bank-transfer': 0, // No CC rewards
  other: 0.005,
};

// PayRewards earning rate (at 1% fee tier = 1 point per $)
const PAY_REWARDS_RATE = 0.01; // 1 point per $1

// Point valuations (cents per point)
const CC_POINT_VALUE = 0.5; // 0.5c per CC point
const PAY_REWARDS_POINT_VALUE = 0.5; // 0.5c per PayRewards point

export function useRewardsCalculator(input: RewardsInput): RewardsOutput {
  return useMemo(() => {
    const { monthlyExpenses, paymentMethods, industry, employees } = input;

    // Base case
    if (!monthlyExpenses || monthlyExpenses <= 0) {
      return {
        annualRewards: 0,
        formattedRewards: '$0',
        pointsPerMonth: 0,
        confidence: 'low',
        doubleDip: {
          creditCardPoints: 0,
          creditCardValue: 0,
          payRewardsPoints: 0,
          payRewardsValue: 0,
          totalPoints: 0,
          totalValue: 0,
          qantasPointsEquivalent: 0,
        },
      };
    }

    // Apply multipliers
    const industryMultiplier = industry
      ? INDUSTRY_MULTIPLIERS[industry] || 1.0
      : 1.0;
    const sizeMultiplier = employees
      ? SIZE_MULTIPLIERS[employees] || 1.0
      : 1.0;

    // Calculate credit card rewards
    let avgCCRate = 0.01; // Default 1%
    if (paymentMethods.length > 0) {
      const ccMethods = paymentMethods.filter((m) => m !== 'bank-transfer');
      if (ccMethods.length > 0) {
        const totalRate = ccMethods.reduce(
          (sum, method) => sum + (CC_REWARDS_RATES[method] || 0.01),
          0
        );
        avgCCRate = totalRate / ccMethods.length;
      }
    }

    // Calculate what portion is paid by card vs bank transfer
    const hasCardPayment = paymentMethods.some((m) => m !== 'bank-transfer');
    const hasBankTransfer = paymentMethods.includes('bank-transfer');
    let cardPortion = 1.0;
    if (hasCardPayment && hasBankTransfer) {
      cardPortion = 0.7; // Assume 70% card, 30% bank transfer
    } else if (!hasCardPayment && hasBankTransfer) {
      cardPortion = 0;
    }

    // Annual calculations
    const annualExpenses = monthlyExpenses * 12 * industryMultiplier * sizeMultiplier;
    const cardExpenses = annualExpenses * cardPortion;
    const allExpenses = annualExpenses;

    // Credit card points (only on card portion)
    const creditCardPoints = Math.round(cardExpenses * avgCCRate);
    const creditCardValue = creditCardPoints * CC_POINT_VALUE / 100;

    // PayRewards points (on ALL payments through pay.com.au)
    const payRewardsPoints = Math.round(allExpenses * PAY_REWARDS_RATE);
    const payRewardsValue = payRewardsPoints * PAY_REWARDS_POINT_VALUE / 100;

    // Totals
    const totalPoints = creditCardPoints + payRewardsPoints;
    const totalValue = creditCardValue + payRewardsValue;

    // Qantas equivalent (using 2:1 transfer rate for PayRewards)
    // CC points are usually already Qantas-equivalent
    const qantasPointsEquivalent = creditCardPoints + Math.floor(payRewardsPoints / 2);

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

    // Format total value
    const formattedRewards = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalValue);

    return {
      annualRewards: Math.round(totalValue),
      formattedRewards,
      pointsPerMonth: Math.round(totalPoints / 12),
      confidence,
      doubleDip: {
        creditCardPoints,
        creditCardValue: Math.round(creditCardValue),
        payRewardsPoints,
        payRewardsValue: Math.round(payRewardsValue),
        totalPoints,
        totalValue: Math.round(totalValue),
        qantasPointsEquivalent,
      },
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
  annualValue: number;
  formatted: string;
  qantasPoints: number;
} {
  const annualExpenses = monthlyExpenses * 12;

  // Assume average CC rate of 1.5% and PayRewards at 1%
  const ccPoints = annualExpenses * 0.015;
  const payRewardsPoints = annualExpenses * 0.01;

  const ccValue = ccPoints * 0.5 / 100;
  const payRewardsValue = payRewardsPoints * 0.5 / 100;
  const totalValue = ccValue + payRewardsValue;

  const qantasPoints = Math.round(ccPoints + payRewardsPoints / 2);

  return {
    annualValue: Math.round(totalValue),
    formatted: new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalValue),
    qantasPoints,
  };
}

// Format large numbers
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-AU').format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
