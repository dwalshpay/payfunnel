export interface VariantBStepOption {
  id: string;
  label: string;
  icon?: string;
  hasOtherInput?: boolean;
  popular?: boolean;
}

export interface VariantBStepConfig {
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
    options?: VariantBStepOption[];
    inputPrefix?: string;
    inputPlaceholder?: string;
    maxSelections?: number;
  }[];
  ctaText: string;
  transitionMessage?: string;
  pointsAwarded?: number;
  // Registration step fields
  isRegistration?: boolean;
  registrationComponent?: 'AccountCreationStep' | 'MobileNumberStep' | 'VerificationCodeStep';
}

export const VARIANT_B_STEPS: VariantBStepConfig[] = [
  // Step 1: About You (Role only - auto-advance)
  {
    id: 'about-you',
    title: "Let's personalize your experience",
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
    transitionMessage: '500 bonus points added to your account!',
    pointsAwarded: 500,
  },

  // Step 2: Your Business (Industry + Size combined)
  {
    id: 'your-business',
    title: 'Help us find the best rewards for you',
    subtitle: 'Tell us about your business',
    valueProposition: 'Personalized rewards estimate coming...',
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
    ctaText: 'Unlock My Rewards Estimate',
    transitionMessage: '1,000 more points unlocked! See your rewards...',
    pointsAwarded: 1000,
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
    ctaText: 'See What I\'ve Earned',
    transitionMessage: 'You\'ve unlocked {rewards} in potential rewards!',
    pointsAwarded: 2000,
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
    ctaText: 'Almost There',
    transitionMessage: 'Last step - choose your rewards partners!',
    pointsAwarded: 500,
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
    ctaText: 'Secure My Rewards',
    transitionMessage: 'Great choices! Now let\'s secure your account...',
    pointsAwarded: 500,
  },

  // Step 6: Account Creation (Registration)
  {
    id: 'account-creation',
    title: 'Create your free account',
    subtitle: 'Secure your rewards and start earning',
    valueProposition: 'Takes 30 seconds',
    fields: ['registration'],
    sections: [],
    ctaText: 'Create Account',
    transitionMessage: 'Account created! One more step to verify...',
    pointsAwarded: 1000,
    isRegistration: true,
    registrationComponent: 'AccountCreationStep',
  },

  // Step 7: Mobile Number (Registration)
  {
    id: 'mobile-number',
    title: 'Verify your identity',
    subtitle: 'Quick mobile verification for security',
    valueProposition: 'Earn 500 bonus points',
    fields: ['registration'],
    sections: [],
    ctaText: 'Send Verification Code',
    transitionMessage: 'Code sent! Check your phone...',
    pointsAwarded: 0,
    isRegistration: true,
    registrationComponent: 'MobileNumberStep',
  },

  // Step 8: Verification Code (Registration)
  {
    id: 'verification-code',
    title: 'Enter verification code',
    subtitle: 'Check your phone for the 6-digit code',
    valueProposition: 'Almost done!',
    fields: ['registration'],
    sections: [],
    ctaText: 'Verify & Complete',
    pointsAwarded: 500,
    isRegistration: true,
    registrationComponent: 'VerificationCodeStep',
  },
];

export const VARIANT_B_TOTAL_STEPS = VARIANT_B_STEPS.length; // Now 8 steps

export const VARIANT_B_TESTIMONIALS = [
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

// Industry-specific defaults for smart pre-selection
export const INDUSTRY_DEFAULTS: Record<string, { paymentMethods: string[]; paymentTypes: string[] }> = {
  construction: {
    paymentMethods: ['bank-transfer', 'visa'],
    paymentTypes: ['ato', 'suppliers'],
  },
  health: {
    paymentMethods: ['visa', 'mastercard'],
    paymentTypes: ['payroll', 'suppliers'],
  },
  professional: {
    paymentMethods: ['amex', 'bank-transfer'],
    paymentTypes: ['ato', 'advertising'],
  },
  hospitality: {
    paymentMethods: ['visa', 'mastercard'],
    paymentTypes: ['payroll', 'suppliers'],
  },
  other: {
    paymentMethods: ['visa'],
    paymentTypes: ['ato'],
  },
};
