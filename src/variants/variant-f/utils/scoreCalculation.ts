import type { AssessmentAnswers, AssessmentScore, Tier, LeadRoute } from '../types';
import {
  businessProfileQuestions,
  paymentHabitsQuestions,
  rewardsGoalsQuestions,
  EXPENSE_MULTIPLIERS,
  POINTS_PER_DOLLAR,
  PAY_REWARDS_MULTIPLIER,
  VALUE_PER_POINT,
} from '../data/questionConfig';

// Helper to find points for a selected option
function getPointsForOption(questionId: string, optionId: string, questions: typeof businessProfileQuestions): number {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return 0;
  const option = question.options.find((o) => o.id === optionId);
  return option?.points ?? 0;
}

// Helper to sum points for multi-select options
function getPointsForMultiSelect(questionId: string, optionIds: string[], questions: typeof businessProfileQuestions): number {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return 0;
  return optionIds.reduce((sum, id) => {
    const option = question.options.find((o) => o.id === id);
    return sum + (option?.points ?? 0);
  }, 0);
}

/**
 * Calculate the assessment score based on answers
 */
export function calculateScore(answers: AssessmentAnswers): AssessmentScore {
  const { businessProfile, paymentHabits, rewardsGoals } = answers;
  let rawScore = 0;

  // Section 1: Business Profile (max ~55 points)
  if (businessProfile.industry) {
    rawScore += getPointsForOption('industry', businessProfile.industry, businessProfileQuestions);
  }
  if (businessProfile.teamSize) {
    rawScore += getPointsForOption('teamSize', businessProfile.teamSize, businessProfileQuestions);
  }
  if (businessProfile.businessAge) {
    rawScore += getPointsForOption('businessAge', businessProfile.businessAge, businessProfileQuestions);
  }

  // Section 2: Payment Habits (max ~73 points)
  if (paymentHabits.monthlyExpenses) {
    rawScore += getPointsForOption('monthlyExpenses', paymentHabits.monthlyExpenses, paymentHabitsQuestions);
  }
  rawScore += getPointsForMultiSelect('paymentMethods', paymentHabits.paymentMethods, paymentHabitsQuestions);
  if (paymentHabits.painPoint) {
    rawScore += getPointsForOption('painPoint', paymentHabits.painPoint, paymentHabitsQuestions);
  }

  // Section 3: Rewards Goals (max ~38 points)
  rawScore += getPointsForMultiSelect('goals', rewardsGoals.goals, rewardsGoalsQuestions);

  // Max possible raw score is approximately 166 points
  const maxRawScore = 166;

  // Normalize to 0-100
  const normalizedScore = Math.min(Math.round((rawScore / maxRawScore) * 100), 100);

  // Ensure minimum score of 35 for anyone who completes the assessment
  const finalScore = Math.max(normalizedScore, 35);

  // Determine tier
  let tier: Tier;
  if (finalScore >= 90) tier = 'gold';
  else if (finalScore >= 70) tier = 'silver';
  else tier = 'bronze';

  // Calculate percentile (higher score = lower percentile = better)
  const percentile = Math.max(5, 100 - finalScore);

  // Calculate annual points
  const monthlyExpenseValue = paymentHabits.monthlyExpenses
    ? EXPENSE_MULTIPLIERS[paymentHabits.monthlyExpenses] ?? 25000
    : 25000;

  // Annual expenses
  const annualExpenses = monthlyExpenseValue * 12;

  // Credit card points (1.5 points per dollar on eligible expenses, assume 70% eligible)
  const creditCardPoints = Math.round(annualExpenses * 0.7 * POINTS_PER_DOLLAR);

  // PayRewards bonus (0.5 points per dollar on all expenses)
  const payRewardsPoints = Math.round(annualExpenses * PAY_REWARDS_MULTIPLIER);

  // Total annual points
  const annualPoints = creditCardPoints + payRewardsPoints;

  // Dollar value
  const annualValue = Math.round(annualPoints * VALUE_PER_POINT);

  return {
    total: finalScore,
    tier,
    percentile,
    annualPoints,
    annualValue,
  };
}

/**
 * Generate personalized recommendations based on answers
 */
export function generateRecommendations(answers: AssessmentAnswers): string[] {
  const { paymentHabits, rewardsGoals } = answers;
  const recommendations: string[] = [];

  // Based on pain point
  if (paymentHabits.painPoint === 'no_card_acceptance') {
    recommendations.push(
      'Pay suppliers via pay.com.au with your credit card, even when they only accept bank transfers'
    );
  }

  if (paymentHabits.painPoint === 'ato_reduced') {
    recommendations.push(
      'Pay ATO bills through pay.com.au to earn full points (instead of reduced category points)'
    );
  }

  if (paymentHabits.painPoint === 'cash_flow') {
    recommendations.push(
      'Use your credit card float to extend payment terms by up to 55 days, improving cash flow'
    );
  }

  // Based on goals
  if (rewardsGoals.goals.includes('flights')) {
    const preferredAirline = rewardsGoals.airlineProgram === 'qantas'
      ? 'Qantas Frequent Flyer'
      : rewardsGoals.airlineProgram === 'velocity'
        ? 'Virgin Velocity'
        : rewardsGoals.airlineProgram === 'krisflyer'
          ? 'Singapore KrisFlyer'
          : rewardsGoals.airlineProgram === 'emirates'
            ? 'Emirates Skywards'
            : 'your preferred airline program';

    recommendations.push(
      `Transfer PayRewards to ${preferredAirline} for maximum flight redemption value`
    );
  }

  if (rewardsGoals.goals.includes('cash_back')) {
    recommendations.push(
      'Use PayRewards to offset business invoices directly - unique to pay.com.au'
    );
  }

  if (rewardsGoals.goals.includes('hotels')) {
    recommendations.push(
      'Redeem points for hotel stays through our travel partners for exceptional value'
    );
  }

  // Based on payment methods
  if (paymentHabits.paymentMethods.includes('bank_transfer')) {
    recommendations.push(
      "Earn PayRewards on bank transfers too - get rewarded on payments you're already making"
    );
  }

  // Limit to 4 recommendations
  return recommendations.slice(0, 4);
}

/**
 * Determine lead routing based on score and answers
 */
export function routeLead(score: number, answers: AssessmentAnswers): LeadRoute {
  const { paymentHabits } = answers;

  // Gold tier with high-intent pain point
  if (
    score >= 90 &&
    ['no_card_acceptance', 'ato_reduced'].includes(paymentHabits.painPoint ?? '')
  ) {
    return { tier: 'gold', action: 'sales_call', priority: 'high' };
  }

  // Gold tier without specific pain point
  if (score >= 90) {
    return { tier: 'gold', action: 'premium_onboard', priority: 'high' };
  }

  // Silver tier
  if (score >= 70) {
    return { tier: 'silver', action: 'standard_onboard', priority: 'medium' };
  }

  // Bronze tier
  return { tier: 'bronze', action: 'self_serve', priority: 'low' };
}

/**
 * Calculate tangible reward examples based on points
 */
export function getRewardExamples(annualPoints: number): { flights: number; hotelNights: number } {
  // Business class flight to Asia ~80,000 points
  const flights = Math.floor(annualPoints / 80000);

  // Premium hotel night ~20,000 points
  const hotelNights = Math.floor(annualPoints / 20000);

  return { flights, hotelNights };
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-AU');
}

/**
 * Format currency
 */
export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}
