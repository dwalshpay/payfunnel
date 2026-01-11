export interface VariantAStepOption {
  id: string;
  label: string;
  icon?: string;
  hasOtherInput?: boolean;
  popular?: boolean;
}

export interface VariantAStepConfig {
  id: string;
  title: string;
  subtitle?: string;
  valueProposition: string;
  fields: string[];
  sections: {
    id: string;
    label?: string;
    type: 'single' | 'multi' | 'input' | 'slider' | 'priority';
    field: string;
    options?: VariantAStepOption[];
    inputPrefix?: string;
    inputPlaceholder?: string;
    maxSelections?: number;
  }[];
  ctaText: string;
  transitionMessage?: string;
}

// Registration step configuration
export interface VariantARegistrationStepConfig {
  id: string;
  title: string;
  subtitle?: string;
  type: 'registration';
  registrationComponent: 'AccountCreationStep' | 'MobileNumberStep' | 'VerificationCodeStep';
  ctaText: string;
}

export const VARIANT_A_STEPS: VariantAStepConfig[] = [
  // Step 1: About You (Role only - auto-advance)
  {
    id: 'about-you',
    title: "Let's personalise your experience",
    subtitle: 'Tell us about your role',
    valueProposition: 'Takes less than 2 minutes',
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
          { id: 'employee', label: 'Employee', icon: 'user' },
          { id: 'other', label: 'Other', icon: 'gift', hasOtherInput: true },
        ],
      },
    ],
    ctaText: 'Continue',
    transitionMessage: 'Great choice! This helps us personalise everything.',
  },

  // Step 2: Your Business (Industry + Size combined)
  {
    id: 'your-business',
    title: 'Help us find the best rewards for you',
    subtitle: 'Tell us about your business',
    valueProposition: 'Personalised rewards estimate coming...',
    fields: ['industry', 'employees'],
    sections: [
      {
        id: 'industry',
        label: 'Industry',
        type: 'single',
        field: 'industry',
        options: [
          { id: 'construction', label: 'Construction', icon: 'building', popular: true },
          { id: 'health', label: 'Health services', icon: 'heart' },
          { id: 'professional', label: 'Professional services', icon: 'briefcase', popular: true },
          { id: 'hospitality', label: 'Hospitality', icon: 'coffee' },
          { id: 'other', label: 'Other', icon: 'more', hasOtherInput: true },
        ],
      },
      {
        id: 'employees',
        label: 'Team size',
        type: 'single',
        field: 'employees',
        options: [
          { id: '0-10', label: '1-10' },
          { id: '10-50', label: '11-50' },
          { id: '50-100', label: '51-100' },
          { id: '100-200', label: '101-200' },
          { id: '200+', label: '200+' },
        ],
      },
    ],
    ctaText: 'Continue',
    transitionMessage: "Perfect! Now let's see how much you could earn.",
  },

  // Step 3: How You Pay (Payment Methods + Types + Expenses)
  {
    id: 'how-you-pay',
    title: 'Now for the good part',
    subtitle: 'Your potential rewards',
    valueProposition: '$0 estimated annual rewards',
    fields: ['paymentMethods', 'paymentTypes', 'monthlyExpenses'],
    sections: [
      {
        id: 'paymentMethods',
        label: 'Payment methods you use',
        type: 'multi',
        field: 'paymentMethods',
        options: [
          { id: 'amex', label: 'Amex', icon: 'amex', popular: true },
          { id: 'visa', label: 'Visa', icon: 'visa' },
          { id: 'mastercard', label: 'Mastercard', icon: 'mastercard' },
          { id: 'bank-transfer', label: 'Bank transfer', icon: 'bank' },
          { id: 'other', label: 'Other', icon: 'plus', hasOtherInput: true },
        ],
      },
      {
        id: 'paymentTypes',
        label: 'Types of payments',
        type: 'multi',
        field: 'paymentTypes',
        options: [
          { id: 'ato', label: 'ATO', icon: 'government', popular: true },
          { id: 'payroll', label: 'Payroll', icon: 'wallet', popular: true },
          { id: 'advertising', label: 'Advertising', icon: 'megaphone' },
          { id: 'suppliers', label: 'Suppliers', icon: 'truck' },
          { id: 'other', label: 'Other', icon: 'plus', hasOtherInput: true },
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
    ctaText: 'See My Rewards Estimate',
    transitionMessage: 'Amazing! {rewards} potential annual rewards unlocked!',
  },

  // Step 4: Your Priorities (Priorities + Redemption combined)
  {
    id: 'your-priorities',
    title: 'Almost there!',
    subtitle: 'What matters most to you?',
    valueProposition: 'Pick your top priorities',
    fields: ['priorities', 'redemptionOptions'],
    sections: [
      {
        id: 'priorities',
        label: 'Business priorities',
        type: 'priority',
        field: 'priorities',
        maxSelections: 3,
        options: [
          { id: 'rewards', label: 'Earning rewards', icon: 'star' },
          { id: 'cashflow', label: 'Cash flow', icon: 'trending' },
          { id: 'automation', label: 'Automated processes', icon: 'settings' },
          { id: 'security', label: 'Secure payments', icon: 'shield' },
        ],
      },
      {
        id: 'redemptionOptions',
        label: 'Reward preferences',
        type: 'multi',
        field: 'redemptionOptions',
        options: [
          { id: 'flights', label: 'Flights & travel', icon: 'plane', popular: true },
          { id: 'gift-cards', label: 'Gift cards', icon: 'gift' },
          { id: 'employee-rewards', label: 'Employee rewards', icon: 'users' },
          { id: 'luxury', label: 'Luxury goods', icon: 'diamond' },
        ],
      },
    ],
    ctaText: 'Get Personalised Recommendations',
    transitionMessage: 'Last step - choose where to send your points!',
  },

  // Step 5: Choose Partners
  {
    id: 'choose-partners',
    title: 'Choose your dream rewards partners',
    subtitle: 'Where would you like to earn points?',
    valueProposition: 'Most popular in your industry',
    fields: ['partners'],
    sections: [
      {
        id: 'partners',
        type: 'multi',
        field: 'partners',
        options: [
          { id: 'qantas', label: 'Qantas', icon: 'qantas', popular: true },
          { id: 'virgin', label: 'Virgin', icon: 'virgin', popular: true },
          { id: 'krisflyer', label: 'KrisFlyer', icon: 'krisflyer' },
          { id: 'qatar', label: 'Qatar Airways', icon: 'qatar' },
          { id: 'other', label: 'Other', icon: 'plus', hasOtherInput: true },
        ],
      },
    ],
    ctaText: 'Continue to Account Setup',
    transitionMessage: 'Great choices! Let\'s create your account.',
  },
];

// Registration steps (Steps 6-8)
export const VARIANT_A_REGISTRATION_STEPS: VariantARegistrationStepConfig[] = [
  {
    id: 'account-creation',
    title: 'Create your free account',
    subtitle: 'Start earning rewards today',
    type: 'registration',
    registrationComponent: 'AccountCreationStep',
    ctaText: 'Create Account',
  },
  {
    id: 'mobile-number',
    title: 'Verify your identity',
    subtitle: "We'll send a code to your phone",
    type: 'registration',
    registrationComponent: 'MobileNumberStep',
    ctaText: 'Send Code',
  },
  {
    id: 'verification-code',
    title: 'Enter verification code',
    subtitle: 'Check your phone for the 6-digit code',
    type: 'registration',
    registrationComponent: 'VerificationCodeStep',
    ctaText: 'Verify & Complete',
  },
];

// Total steps including registration (5 profile + 3 registration)
export const VARIANT_A_TOTAL_STEPS = VARIANT_A_STEPS.length + VARIANT_A_REGISTRATION_STEPS.length;

export const VARIANT_A_TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Business Owner',
    text: "I couldn't believe how easy it was. Set up in 5 minutes and already earning rewards on every payment.",
    rating: 5,
    industry: 'Professional Services',
  },
  {
    name: 'James T.',
    role: 'CFO',
    text: 'We saved over $15,000 in the first year through rewards alone. The ROI speaks for itself.',
    rating: 5,
    industry: 'Construction',
  },
  {
    name: 'Michelle K.',
    role: 'Accountant',
    text: 'Finally, a solution that understands business payments. The automation saves me hours every week.',
    rating: 5,
    industry: 'Health Services',
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
