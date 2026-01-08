import { useMemo } from 'react';
import type { VariantDAnswers, VariantDRewards } from '../context/VariantDContext';
import { FLIGHT_CONVERSIONS } from '../data/variantDStepConfig';

// Credit card points rate per dollar spent
const CARD_RATES: Record<string, number> = {
  amex: 1.5, // 1.5 points per dollar
  visa: 1.0,
  mastercard: 1.0,
  'bank-transfer': 0, // No CC points for bank transfer
};

// PayRewards rate per dollar (at 1pt/$1 option)
const PAY_REWARDS_RATE = 1.0;

// Industry multipliers for total rewards
const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  construction: 1.2,
  professional: 1.1,
  health: 1.0,
  hospitality: 0.9,
  trades: 1.1,
  other: 1.0,
};

// Size multipliers
const SIZE_MULTIPLIERS: Record<string, number> = {
  '1-10': 0.9,
  '11-50': 1.0,
  '51-100': 1.1,
  '101-200': 1.2,
  '200+': 1.3,
};

// Payment type bonuses (some payments are higher value)
const PAYMENT_TYPE_BONUSES: Record<string, number> = {
  ato: 1.3, // ATO payments are high value, no reduced points
  payroll: 1.0,
  suppliers: 1.1,
  superannuation: 1.2,
  rent: 1.0,
  other: 1.0,
};

// Point to dollar value (approximate)
const POINT_VALUE = 0.015; // 1.5 cents per point

export function useDoubleDipCalculator(answers: VariantDAnswers): VariantDRewards {
  return useMemo(() => {
    const { monthlyExpenses, paymentMethods, paymentTypes, industry, employees } = answers;

    // If no expenses, return zero rewards
    if (!monthlyExpenses || monthlyExpenses <= 0) {
      return {
        creditCardPoints: 0,
        creditCardValue: 0,
        payRewardsPoints: 0,
        payRewardsValue: 0,
        totalPoints: 0,
        totalValue: 0,
        businessClassFlights: 0,
        confidence: 'low',
      };
    }

    // Calculate average credit card rate based on selected methods
    let avgCardRate = 0;
    if (paymentMethods.length > 0) {
      const rates = paymentMethods.map((m) => CARD_RATES[m] || 0);
      avgCardRate = rates.reduce((a, b) => a + b, 0) / rates.length;
    } else {
      avgCardRate = 1.0; // Default assumption
    }

    // Calculate payment type bonus
    let paymentTypeBonus = 1.0;
    if (paymentTypes.length > 0) {
      const bonuses = paymentTypes.map((t) => PAYMENT_TYPE_BONUSES[t] || 1.0);
      paymentTypeBonus = bonuses.reduce((a, b) => a + b, 0) / bonuses.length;
    }

    // Industry and size multipliers
    const industryMultiplier = INDUSTRY_MULTIPLIERS[industry || 'other'] || 1.0;
    const sizeMultiplier = SIZE_MULTIPLIERS[employees || '1-10'] || 1.0;

    // Annual expenses
    const annualExpenses = monthlyExpenses * 12;

    // Credit card points calculation
    // Assuming ~70% of expenses go through credit card
    const cardSpend = annualExpenses * 0.7;
    const creditCardPoints = Math.round(cardSpend * avgCardRate * paymentTypeBonus);
    const creditCardValue = creditCardPoints * POINT_VALUE;

    // PayRewards calculation (on all expenses)
    const payRewardsPoints = Math.round(
      annualExpenses * PAY_REWARDS_RATE * industryMultiplier * sizeMultiplier
    );
    const payRewardsValue = payRewardsPoints * POINT_VALUE;

    // Total
    const totalPoints = creditCardPoints + payRewardsPoints;
    const totalValue = creditCardValue + payRewardsValue;

    // Convert to business class flights (using short-haul as default)
    const businessClassFlights = totalPoints / FLIGHT_CONVERSIONS.shortHaul.points;

    // Confidence level based on data completeness
    let dataPoints = 0;
    if (industry) dataPoints++;
    if (employees) dataPoints++;
    if (monthlyExpenses > 0) dataPoints++;
    if (paymentMethods.length > 0) dataPoints++;
    if (paymentTypes.length > 0) dataPoints++;

    let confidence: 'low' | 'medium' | 'high' = 'low';
    if (dataPoints >= 4) confidence = 'high';
    else if (dataPoints >= 2) confidence = 'medium';

    return {
      creditCardPoints,
      creditCardValue,
      payRewardsPoints,
      payRewardsValue,
      totalPoints,
      totalValue,
      businessClassFlights: Math.round(businessClassFlights * 10) / 10, // Round to 1 decimal
      confidence,
    };
  }, [answers]);
}

// Helper to format points for display
export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${Math.round(points / 1000)}k`;
  }
  return points.toLocaleString();
}

// Helper to format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Helper to get flight destination based on selected partners
export function getFlightDestination(partners: string[]): string {
  if (partners.includes('qantas') || partners.includes('virgin')) {
    return 'Sydney - Singapore';
  }
  if (partners.includes('krisflyer')) {
    return 'Sydney - Singapore';
  }
  if (partners.includes('qatar')) {
    return 'Sydney - Doha';
  }
  return 'Sydney - Singapore';
}
