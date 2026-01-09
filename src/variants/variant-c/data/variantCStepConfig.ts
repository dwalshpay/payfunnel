// Step configuration for Variant-C (3 steps + hero)
export interface StepOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  popular?: boolean;
  popularFor?: string[];
}

export interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  fields: string[];
  ctaText: string;
  backText?: string;
  showIndustryComparison?: boolean;
  showDestinationVisualizer?: boolean;
}

// Industry options with icons
export const INDUSTRY_OPTIONS: StepOption[] = [
  {
    id: 'construction',
    label: 'Construction',
    icon: 'building',
    description: 'Building, contracting, development',
    popular: true,
  },
  {
    id: 'trades',
    label: 'Trades',
    icon: 'tools',
    description: 'Plumbing, electrical, carpentry',
    popular: true,
  },
  {
    id: 'professional',
    label: 'Professional Services',
    icon: 'briefcase',
    description: 'Legal, accounting, consulting',
  },
  {
    id: 'health',
    label: 'Healthcare',
    icon: 'heart',
    description: 'Medical, dental, allied health',
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    icon: 'coffee',
    description: 'Restaurants, cafes, hotels',
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'star',
    description: 'Other industries',
  },
];

// Payment method options
export const PAYMENT_METHOD_OPTIONS: StepOption[] = [
  {
    id: 'amex',
    label: 'American Express',
    icon: 'amex',
    description: 'Highest rewards potential',
    popular: true,
  },
  {
    id: 'visa',
    label: 'Visa',
    icon: 'visa',
    description: 'Lowest processing fees',
    popular: true,
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: 'mastercard',
    description: 'Widely accepted',
  },
  {
    id: 'bank-transfer',
    label: 'Bank Transfer',
    icon: 'bank',
    description: 'Earn PayRewards only',
  },
];

// Payment type options
export const PAYMENT_TYPE_OPTIONS: StepOption[] = [
  {
    id: 'ato',
    label: 'ATO / Tax',
    icon: 'calculator',
    description: 'Full points on tax payments',
    popular: true,
  },
  {
    id: 'super',
    label: 'Superannuation',
    icon: 'shield',
    description: 'Staff super contributions',
  },
  {
    id: 'suppliers',
    label: 'Suppliers',
    icon: 'truck',
    description: 'Invoices & materials',
    popular: true,
  },
  {
    id: 'payroll',
    label: 'Payroll',
    icon: 'users',
    description: 'Staff wages & salaries',
  },
  {
    id: 'rent',
    label: 'Business Rent',
    icon: 'building',
    description: 'Office & warehouse rent',
  },
  {
    id: 'advertising',
    label: 'Advertising',
    icon: 'megaphone',
    description: 'Marketing & ads',
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: 'shield',
    description: 'Business insurance',
  },
];

// Redemption preference options
export const REDEMPTION_OPTIONS: StepOption[] = [
  {
    id: 'flights',
    label: 'Flights & Travel',
    icon: 'plane',
    description: 'Business class upgrades, holidays',
    popular: true,
  },
  {
    id: 'hotels',
    label: 'Hotels & Stays',
    icon: 'building',
    description: 'Luxury hotel nights',
  },
  {
    id: 'invoices',
    label: 'Pay Invoices',
    icon: 'receipt',
    description: 'Use points to pay bills (Unique!)',
    popular: true,
  },
  {
    id: 'giftcards',
    label: 'Gift Cards',
    icon: 'gift',
    description: 'Major retailers',
  },
];

// Team size options
export const TEAM_SIZE_OPTIONS: StepOption[] = [
  { id: '1-10', label: '1-10 employees' },
  { id: '11-50', label: '11-50 employees' },
  { id: '51-100', label: '51-100 employees' },
  { id: '101-200', label: '101-200 employees' },
  { id: '200+', label: '200+ employees' },
];

// Step configurations
export const STEPS: StepConfig[] = [
  {
    id: 'unlock-rewards',
    title: 'Unlock Your Rewards',
    subtitle: 'See what your business could earn',
    fields: ['industry', 'monthlyExpenses'],
    ctaText: 'See My Full Rewards',
    showIndustryComparison: true,
  },
  {
    id: 'personalize-rewards',
    title: 'Personalize Your Rewards',
    subtitle: 'Tell us how you pay to maximize earnings',
    fields: ['paymentMethods', 'paymentTypes', 'redemptionOptions'],
    ctaText: 'See What I Can Get',
    backText: 'Back',
    showDestinationVisualizer: true,
  },
  {
    id: 'claim-partners',
    title: 'Choose Your Partners',
    subtitle: 'Select where to transfer your rewards',
    fields: ['partners', 'employees'],
    ctaText: 'Continue to Secure Your Rewards',
    backText: 'Back',
  },
  {
    id: 'create-account',
    title: 'Secure Your Rewards',
    subtitle: 'Create your account to lock in your earnings',
    fields: ['email', 'firstName', 'lastName', 'password', 'referralCode'],
    ctaText: 'Continue',
    backText: 'Back',
  },
  {
    id: 'mobile-number',
    title: 'Verify Your Mobile',
    subtitle: 'Add your mobile number for account security',
    fields: ['mobileNumber'],
    ctaText: 'Send Verification Code',
    backText: 'Back',
  },
  {
    id: 'verify-code',
    title: 'Enter Verification Code',
    subtitle: 'Check your phone for the 6-digit code',
    fields: ['verificationCode'],
    ctaText: 'Complete & See My Dashboard',
    backText: 'Change Number',
  },
];

// Industry averages for social proof (annual rewards in AUD)
export const INDUSTRY_AVERAGES: Record<string, number> = {
  construction: 15000,
  trades: 11000,
  professional: 12000,
  health: 10000,
  hospitality: 8000,
  other: 9000,
};

// Expense slider presets
export const EXPENSE_PRESETS = [10000, 25000, 50000, 100000, 250000, 500000];

// Testimonials for social proof
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  industry: string;
  annualRewards: number;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The double-dip rewards changed everything for us. We're earning on every supplier payment now.",
    author: 'Michael Chen',
    role: 'Director',
    industry: 'construction',
    annualRewards: 18500,
    rating: 5,
  },
  {
    quote: 'Finally earning full points on our ATO payments. The Qantas transfers are fantastic.',
    author: 'Sarah Williams',
    role: 'Practice Manager',
    industry: 'professional',
    annualRewards: 14200,
    rating: 5,
  },
  {
    quote: 'Being able to pay invoices with our points is a game changer. No other platform offers this.',
    author: 'James O\'Brien',
    role: 'Owner',
    industry: 'trades',
    annualRewards: 9800,
    rating: 5,
  },
  {
    quote: 'We switched from paying suppliers direct. Now earning rewards on every payment.',
    author: 'Emma Thompson',
    role: 'Finance Manager',
    industry: 'health',
    annualRewards: 12100,
    rating: 5,
  },
];

// Get testimonials for a specific industry
export function getTestimonialsForIndustry(industry: string): Testimonial[] {
  const industryTestimonials = TESTIMONIALS.filter(
    (t) => t.industry === industry
  );
  if (industryTestimonials.length > 0) return industryTestimonials;
  return TESTIMONIALS.slice(0, 2); // Return first 2 as default
}

export const TOTAL_STEPS = 6;
