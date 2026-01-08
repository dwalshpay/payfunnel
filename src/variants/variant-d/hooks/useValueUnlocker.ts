import { useMemo } from 'react';
import type { VariantDAnswers, VariantDRewards } from '../context/VariantDContext';

export interface UnlockItem {
  id: string;
  label: string;
  isUnlocked: boolean;
  flightBonus: number;
  message: string;
}

export interface UnlockStatus {
  items: UnlockItem[];
  totalFlightsUnlocked: number;
  potentialFlights: number;
  pendingItems: UnlockItem[];
  percentComplete: number;
}

export function useValueUnlocker(
  answers: VariantDAnswers,
  rewards: VariantDRewards,
  currentStep: number
): UnlockStatus {
  return useMemo(() => {
    const items: UnlockItem[] = [
      {
        id: 'industry',
        label: 'Industry profile',
        isUnlocked: answers.industry !== null,
        flightBonus: 0.3,
        message: answers.industry ? 'Industry rewards active' : 'Select your industry',
      },
      {
        id: 'expenses',
        label: 'Monthly expenses',
        isUnlocked: answers.monthlyExpenses > 0,
        flightBonus: 1.0,
        message: answers.monthlyExpenses > 0 ? 'Base calculation complete' : 'Enter monthly expenses',
      },
      {
        id: 'ato',
        label: 'ATO payments',
        isUnlocked: answers.paymentTypes.includes('ato'),
        flightBonus: 0.5,
        message: answers.paymentTypes.includes('ato')
          ? 'Full ATO points unlocked'
          : 'Add ATO payments',
      },
      {
        id: 'amex',
        label: 'Amex card',
        isUnlocked: answers.paymentMethods.includes('amex'),
        flightBonus: 0.4,
        message: answers.paymentMethods.includes('amex')
          ? 'Premium rate active'
          : 'Use Amex for highest rate',
      },
      {
        id: 'partners',
        label: 'Reward partners',
        isUnlocked: answers.partners.length > 0,
        flightBonus: 0,
        message: answers.partners.length > 0 ? 'Ready to transfer' : 'Choose your partners',
      },
    ];

    // Filter items relevant to current step
    const relevantItems = items.filter((item) => {
      if (currentStep === 1) {
        return ['industry', 'expenses'].includes(item.id);
      }
      if (currentStep === 2) {
        return ['industry', 'expenses', 'ato', 'amex'].includes(item.id);
      }
      return true;
    });

    const unlockedItems = relevantItems.filter((item) => item.isUnlocked);
    const pendingItems = relevantItems.filter((item) => !item.isUnlocked);

    // Use actual flights from rewards if available, otherwise estimate
    const totalFlightsUnlocked = rewards.businessClassFlights || 0;

    // Calculate potential (what they could get)
    const potentialBonus = pendingItems.reduce((sum, item) => sum + item.flightBonus, 0);
    const potentialFlights = totalFlightsUnlocked + potentialBonus;

    const percentComplete =
      relevantItems.length > 0
        ? Math.round((unlockedItems.length / relevantItems.length) * 100)
        : 0;

    return {
      items: relevantItems,
      totalFlightsUnlocked,
      potentialFlights,
      pendingItems,
      percentComplete,
    };
  }, [answers, rewards, currentStep]);
}

// Helper to format flight count for display
export function formatFlights(flights: number): string {
  if (flights < 1) {
    return flights.toFixed(1);
  }
  return Math.round(flights).toString();
}

// Get contextual unlock message based on pending items
export function getUnlockPrompt(pendingItems: UnlockItem[]): string | null {
  if (pendingItems.length === 0) return null;

  // Prioritize high-value unlocks
  const highValue = pendingItems.find((item) => ['ato', 'amex'].includes(item.id));
  if (highValue) {
    return `Unlock ${highValue.flightBonus > 0 ? `+${highValue.flightBonus}` : ''} more by: ${highValue.message}`;
  }

  return pendingItems[0].message;
}
