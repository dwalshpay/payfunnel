export interface VariantDStepOption {
  id: string;
  label: string;
  icon?: string;
  hasOtherInput?: boolean;
  popular?: boolean;
  highlight?: string; // Special highlight text (e.g., "Full points on tax")
}

export interface VariantDStepConfig {
  id: string;
  title: string;
  subtitle: string;
  fields: string[];
  sections: {
    id: string;
    label?: string;
    type: 'single' | 'multi' | 'slider';
    field: string;
    options?: VariantDStepOption[];
    inputPrefix?: string;
    inputPlaceholder?: string;
    compact?: boolean; // For size selector style
  }[];
  ctaText: string;
  transitionMessage?: string;
  autoAdvance?: boolean;
}

export const VARIANT_D_STEPS: VariantDStepConfig[] = [
  // Step 1: Quick Start (Role only - auto-advance)
  {
    id: 'quick-start',
    title: "Let's unlock your business rewards",
    subtitle: 'Takes 2 minutes. See how much you could earn.',
    fields: ['role'],
    sections: [
      {
        id: 'role',
        type: 'single',
        field: 'role',
        options: [
          { id: 'business-owner', label: 'Business owner', icon: 'briefcase' },
          { id: 'executive', label: 'Executive / Manager', icon: 'users' },
          { id: 'accountant', label: 'Accountant', icon: 'calculator' },
          { id: 'bookkeeper', label: 'Bookkeeper', icon: 'book' },
          { id: 'other', label: 'Other', icon: 'more', hasOtherInput: true },
        ],
      },
    ],
    ctaText: 'Continue',
    transitionMessage: "Great! Let's see what your business could earn.",
    autoAdvance: true,
  },

  // Step 2: Business Profile (Industry + Size + Expenses combined)
  {
    id: 'business-profile',
    title: 'See what your business could earn',
    subtitle: "We'll calculate your personalized rewards estimate",
    fields: ['industry', 'employees', 'monthlyExpenses'],
    sections: [
      {
        id: 'industry',
        label: 'Your industry',
        type: 'single',
        field: 'industry',
        options: [
          { id: 'construction', label: 'Construction', icon: 'building', popular: true },
          { id: 'health', label: 'Health services', icon: 'heart' },
          { id: 'professional', label: 'Professional services', icon: 'briefcase', popular: true },
          { id: 'hospitality', label: 'Hospitality', icon: 'coffee' },
          { id: 'trades', label: 'Trades', icon: 'truck' },
          { id: 'other', label: 'Other', icon: 'more', hasOtherInput: true },
        ],
      },
      {
        id: 'employees',
        label: 'Team size',
        type: 'single',
        field: 'employees',
        compact: true,
        options: [
          { id: '1-10', label: '1-10' },
          { id: '11-50', label: '11-50' },
          { id: '51-100', label: '51-100' },
          { id: '101-200', label: '101-200' },
          { id: '200+', label: '200+' },
        ],
      },
      {
        id: 'monthlyExpenses',
        label: 'Monthly business expenses',
        type: 'slider',
        field: 'monthlyExpenses',
        inputPrefix: '$',
        inputPlaceholder: '50,000',
      },
    ],
    ctaText: 'Calculate My Rewards',
    transitionMessage: '{flights} Business Class flights unlocked!',
  },

  // Step 3: Payment Optimization
  {
    id: 'payment-optimization',
    title: 'Maximize your rewards',
    subtitle: 'Tell us how you pay to unlock your full potential',
    fields: ['paymentMethods', 'paymentTypes'],
    sections: [
      {
        id: 'paymentMethods',
        label: 'Payment methods you use',
        type: 'multi',
        field: 'paymentMethods',
        options: [
          { id: 'amex', label: 'Amex', icon: 'amex', popular: true, highlight: 'Highest rewards rate' },
          { id: 'visa', label: 'Visa', icon: 'visa' },
          { id: 'mastercard', label: 'Mastercard', icon: 'mastercard' },
          { id: 'bank-transfer', label: 'Bank transfer', icon: 'bank' },
        ],
      },
      {
        id: 'paymentTypes',
        label: 'Types of payments',
        type: 'multi',
        field: 'paymentTypes',
        options: [
          { id: 'ato', label: 'ATO / Tax', icon: 'government', popular: true, highlight: 'Full points on tax' },
          { id: 'payroll', label: 'Payroll', icon: 'wallet' },
          { id: 'suppliers', label: 'Suppliers', icon: 'truck', popular: true },
          { id: 'superannuation', label: 'Super', icon: 'shield' },
          { id: 'rent', label: 'Rent', icon: 'building' },
          { id: 'other', label: 'Other', icon: 'plus', hasOtherInput: true },
        ],
      },
    ],
    ctaText: 'See My Full Potential',
    transitionMessage: "You're in the top 20% of earners! One more step...",
  },

  // Step 4: Claim Rewards
  {
    id: 'claim-rewards',
    title: 'Claim your rewards partners',
    subtitle: 'Transfer points to 16 airlines and hotels',
    fields: ['partners', 'redemptionPreference'],
    sections: [
      {
        id: 'partners',
        label: 'Where would you like to earn points?',
        type: 'multi',
        field: 'partners',
        options: [
          { id: 'qantas', label: 'Qantas', icon: 'qantas', popular: true },
          { id: 'virgin', label: 'Virgin Australia', icon: 'virgin', popular: true },
          { id: 'krisflyer', label: 'Singapore KrisFlyer', icon: 'krisflyer' },
          { id: 'qatar', label: 'Qatar Airways', icon: 'qatar' },
          { id: 'velocity', label: 'Velocity', icon: 'virgin' },
          { id: 'other', label: 'Other partners', icon: 'plus', hasOtherInput: true },
        ],
      },
      {
        id: 'redemptionPreference',
        label: 'How would you like to use your rewards?',
        type: 'multi',
        field: 'redemptionPreference',
        options: [
          { id: 'flights', label: 'Flights & upgrades', icon: 'plane', popular: true },
          { id: 'hotels', label: 'Hotels', icon: 'building' },
          { id: 'invoices', label: 'Pay invoices', icon: 'wallet', highlight: 'Only at pay.com.au' },
          { id: 'gift-cards', label: 'Gift cards', icon: 'gift' },
        ],
      },
    ],
    ctaText: 'Unlock My Rewards',
  },
];

export const VARIANT_D_TOTAL_STEPS = VARIANT_D_STEPS.length;

// Testimonials with industry matching
export const VARIANT_D_TESTIMONIALS = [
  {
    name: 'James T.',
    role: 'Director',
    industry: 'construction',
    text: 'We earned 3 Business Class flights to Bali in our first year just on supplier payments.',
    rating: 5,
    annualRewards: 180000, // points
  },
  {
    name: 'Sarah M.',
    role: 'Practice Manager',
    industry: 'health',
    text: "The double-dip on payroll is incredible. We're flying the whole team to the Gold Coast conference.",
    rating: 5,
    annualRewards: 120000,
  },
  {
    name: 'Michael K.',
    role: 'CFO',
    industry: 'professional',
    text: 'Full points on our quarterly ATO payments alone covers business class to Singapore.',
    rating: 5,
    annualRewards: 200000,
  },
  {
    name: 'Lisa W.',
    role: 'Owner',
    industry: 'hospitality',
    text: 'Finally earning proper rewards on all those supplier invoices. 2 flights unlocked in 6 months.',
    rating: 5,
    annualRewards: 95000,
  },
  {
    name: 'Dave R.',
    role: 'Owner',
    industry: 'trades',
    text: 'As a sparky, I had no idea I could earn points on materials. Now I fly business to visit family.',
    rating: 5,
    annualRewards: 75000,
  },
];

// Expense slider presets
export const EXPENSE_PRESETS = [
  { value: 10000, label: '$10k' },
  { value: 25000, label: '$25k' },
  { value: 50000, label: '$50k' },
  { value: 100000, label: '$100k' },
  { value: 250000, label: '$250k' },
  { value: 500000, label: '$500k+' },
];

// Industry-specific smart defaults for payment methods/types
export const INDUSTRY_DEFAULTS: Record<string, { paymentMethods: string[]; paymentTypes: string[] }> = {
  construction: {
    paymentMethods: ['bank-transfer', 'visa'],
    paymentTypes: ['suppliers', 'ato'],
  },
  health: {
    paymentMethods: ['visa', 'mastercard'],
    paymentTypes: ['payroll', 'suppliers'],
  },
  professional: {
    paymentMethods: ['amex', 'bank-transfer'],
    paymentTypes: ['ato', 'rent'],
  },
  hospitality: {
    paymentMethods: ['visa', 'mastercard'],
    paymentTypes: ['payroll', 'suppliers'],
  },
  trades: {
    paymentMethods: ['bank-transfer', 'visa'],
    paymentTypes: ['suppliers', 'ato'],
  },
};

// Flight conversion rates (points needed for business class)
export const FLIGHT_CONVERSIONS = {
  domestic: { points: 36000, label: 'Domestic', example: 'Sydney - Melbourne' },
  shortHaul: { points: 60000, label: 'Asia', example: 'Sydney - Singapore' },
  longHaul: { points: 100000, label: 'International', example: 'Sydney - London' },
};
