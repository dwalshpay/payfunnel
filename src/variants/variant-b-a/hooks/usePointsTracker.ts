import { useMemo } from 'react';
import type { VariantBAAnswers } from '../context/VariantBAContext';

interface PointsTrackerInput {
  currentStep: number;
  answers: VariantBAAnswers;
}

interface PointsTrackerOutput {
  totalPoints: number;
  formattedPoints: string;
  pointsThisStep: number;
  pointsMessage: string;
  progressPercentage: number;
}

// Base points for completing each step
const STEP_POINTS = [500, 1000, 2000, 500, 500];

// Bonus points based on monthly expenses (scales with value)
function calculateExpenseBonus(monthlyExpenses: number): number {
  if (monthlyExpenses <= 0) return 0;
  // Cap at 5000 bonus points for high spenders
  return Math.min(Math.round(monthlyExpenses / 10), 5000);
}

export function usePointsTracker(input: PointsTrackerInput): PointsTrackerOutput {
  return useMemo(() => {
    const { currentStep, answers } = input;

    let totalPoints = 0;
    let pointsThisStep = 0;

    // Calculate points for completed steps
    for (let i = 0; i < currentStep; i++) {
      totalPoints += STEP_POINTS[i] || 0;
    }

    // Add points for current step if applicable
    if (currentStep < STEP_POINTS.length) {
      pointsThisStep = STEP_POINTS[currentStep];
    }

    // Add expense bonus after step 3
    if (currentStep >= 3 && answers.monthlyExpenses > 0) {
      totalPoints += calculateExpenseBonus(answers.monthlyExpenses);
    }

    // Format points with commas
    const formattedPoints = new Intl.NumberFormat('en-AU').format(totalPoints);

    // Generate contextual message
    let pointsMessage = '';
    if (currentStep === 0) {
      pointsMessage = 'Complete this step to earn 500 points';
    } else if (currentStep < 5) {
      pointsMessage = `${formattedPoints} points earned - keep going!`;
    } else {
      pointsMessage = `${formattedPoints} points ready to claim!`;
    }

    // Calculate progress percentage (0-100)
    const maxPossiblePoints = STEP_POINTS.reduce((a, b) => a + b, 0) + 5000; // Including max expense bonus
    const progressPercentage = Math.min((totalPoints / maxPossiblePoints) * 100, 100);

    return {
      totalPoints,
      formattedPoints,
      pointsThisStep,
      pointsMessage,
      progressPercentage,
    };
  }, [input.currentStep, input.answers]);
}

// Helper to format points with animation-friendly output
export function formatPointsForDisplay(points: number): string {
  return new Intl.NumberFormat('en-AU').format(points);
}
