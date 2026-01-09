import type { QuestionConfig } from '../types';

// Section 1: Business Profile Questions
export const businessProfileQuestions: QuestionConfig[] = [
  {
    id: 'industry',
    question: 'What industry is your business in?',
    type: 'dropdown',
    required: true,
    options: [
      { id: 'construction', label: 'Construction', points: 20, icon: 'building' },
      { id: 'trades', label: 'Trades & Services', points: 18, icon: 'wrench' },
      { id: 'property', label: 'Property & Development', points: 18, icon: 'building' },
      { id: 'professional', label: 'Professional Services', points: 12, icon: 'briefcase' },
      { id: 'healthcare', label: 'Healthcare & Medical', points: 12, icon: 'hospital' },
      { id: 'retail', label: 'Retail & E-commerce', points: 10, icon: 'package' },
      { id: 'hospitality', label: 'Hospitality & Food', points: 10, icon: 'coffee' },
      { id: 'manufacturing', label: 'Manufacturing', points: 15, icon: 'settings' },
      { id: 'transport', label: 'Transport & Logistics', points: 15, icon: 'truck' },
      { id: 'other', label: 'Other', points: 10, icon: 'more' },
    ],
  },
  {
    id: 'teamSize',
    question: 'How many people work in your business?',
    type: 'single',
    required: true,
    options: [
      { id: 'solo', label: 'Just me', points: 5, icon: 'user' },
      { id: 'small', label: '2-10 employees', points: 10, icon: 'users' },
      { id: 'medium', label: '11-50 employees', points: 15, icon: 'users' },
      { id: 'large', label: '51-100 employees', points: 18, icon: 'users' },
      { id: 'enterprise', label: '100+ employees', points: 20, icon: 'users' },
    ],
  },
  {
    id: 'businessAge',
    question: 'How long has your business been operating?',
    type: 'single',
    required: true,
    options: [
      { id: 'new', label: 'Less than 1 year', points: 5 },
      { id: 'young', label: '1-3 years', points: 10 },
      { id: 'established', label: '3-10 years', points: 15 },
      { id: 'mature', label: '10+ years', points: 15 },
    ],
  },
];

// Section 2: Payment Habits Questions
export const paymentHabitsQuestions: QuestionConfig[] = [
  {
    id: 'monthlyExpenses',
    question: 'What are your estimated monthly business expenses?',
    type: 'single',
    required: true,
    options: [
      { id: 'under_5k', label: 'Under $5,000', points: 5 },
      { id: '5k_20k', label: '$5,000 - $20,000', points: 12 },
      { id: '20k_50k', label: '$20,000 - $50,000', points: 20 },
      { id: '50k_100k', label: '$50,000 - $100,000', points: 28 },
      { id: 'over_100k', label: '$100,000+', points: 35 },
    ],
  },
  {
    id: 'paymentMethods',
    question: 'How do you currently pay most business expenses?',
    helperText: 'Select all that apply',
    type: 'multi',
    required: true,
    options: [
      { id: 'credit_card', label: 'Credit card', points: 5, icon: 'credit-card' },
      { id: 'bank_transfer', label: 'Bank transfer', points: 3, icon: 'bank' },
      { id: 'bpay', label: 'BPAY', points: 2 },
      { id: 'checks', label: 'Cheques', points: 2 },
      { id: 'cash', label: 'Cash', points: 1, icon: 'wallet' },
    ],
  },
  {
    id: 'painPoint',
    question: "What's your biggest payment challenge?",
    helperText: 'This helps us tailor your recommendations',
    type: 'single',
    required: true,
    options: [
      { id: 'no_card_acceptance', label: "Suppliers don't accept credit cards", points: 25, qualification: 'high' },
      { id: 'ato_reduced', label: 'ATO/tax payments earn reduced points', points: 22, qualification: 'high' },
      { id: 'cash_flow', label: 'Cash flow timing is difficult', points: 18, qualification: 'medium' },
      { id: 'multiple_methods', label: 'Managing multiple payment methods', points: 12, qualification: 'low' },
      { id: 'no_challenges', label: 'No major challenges', points: 5, qualification: 'low' },
    ],
  },
];

// Section 3: Rewards Goals Questions
export const rewardsGoalsQuestions: QuestionConfig[] = [
  {
    id: 'goals',
    question: 'What would you like to do with rewards points?',
    helperText: 'Select all that apply',
    type: 'multi',
    required: true,
    options: [
      { id: 'flights', label: 'Business Class flights', points: 10, icon: 'plane' },
      { id: 'hotels', label: 'Hotel stays', points: 8, icon: 'hotel' },
      { id: 'cash_back', label: 'Cash back / offset business invoices', points: 6, icon: 'wallet' },
      { id: 'gift_cards', label: 'Gift cards', points: 4, icon: 'gift' },
      { id: 'equipment', label: 'Equipment/items for the business', points: 5, icon: 'package' },
    ],
  },
  {
    id: 'airlineProgram',
    question: 'Do you have a preferred airline program?',
    type: 'dropdown',
    required: false,
    options: [
      { id: 'qantas', label: 'Qantas Frequent Flyer', points: 0 },
      { id: 'velocity', label: 'Virgin Velocity', points: 0 },
      { id: 'krisflyer', label: 'Singapore KrisFlyer', points: 0 },
      { id: 'emirates', label: 'Emirates Skywards', points: 0 },
      { id: 'other', label: 'Other / None', points: 0 },
    ],
  },
];

// Score thresholds for point-to-value calculations
export const EXPENSE_MULTIPLIERS: Record<string, number> = {
  under_5k: 2500,
  '5k_20k': 12500,
  '20k_50k': 35000,
  '50k_100k': 75000,
  over_100k: 150000,
};

// Points per dollar spent (1.5 points per dollar average)
export const POINTS_PER_DOLLAR = 1.5;

// PayRewards bonus multiplier (additional 0.5 points per dollar)
export const PAY_REWARDS_MULTIPLIER = 0.5;

// Value per point (in cents)
export const VALUE_PER_POINT = 0.01; // $0.01 per point
