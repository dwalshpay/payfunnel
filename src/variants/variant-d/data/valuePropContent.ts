// Unique value propositions for sidebar rotator
export const VALUE_PROPOSITIONS = [
  {
    id: 'ato-points',
    title: 'Full Points on ATO',
    description: 'Most cards earn nothing on tax payments. With pay.com.au, earn full points on every ATO payment.',
    icon: 'government',
    highlightColor: '#22C55E', // green
  },
  {
    id: 'interest-free',
    title: '55 Days Interest-Free',
    description: 'Pay suppliers now, settle later. Improve your cash flow without losing rewards.',
    icon: 'trending',
    highlightColor: '#3866B0', // blue
  },
  {
    id: 'invoice-redemption',
    title: 'Pay Invoices with Points',
    description: 'Only pay.com.au lets you redeem points to pay your business bills. No flights needed.',
    icon: 'wallet',
    highlightColor: '#F59E0B', // amber
  },
];

// Trust signals for footer
export const TRUST_SIGNALS = [
  {
    id: 'pci',
    label: 'PCI DSS Certified',
    icon: 'shield',
  },
  {
    id: 'businesses',
    label: '50,000+ businesses',
    icon: 'users',
  },
  {
    id: 'australian',
    label: 'Australian company',
    icon: 'check',
  },
];

// Unlock items for value unlocker component
export const UNLOCK_ITEMS = [
  {
    id: 'industry',
    label: 'Industry profile',
    unlockedMessage: 'Industry rewards unlocked',
    pendingMessage: 'Select your industry',
    flightBonus: 0.5, // Half a flight
  },
  {
    id: 'expenses',
    label: 'Monthly expenses',
    unlockedMessage: 'Expense calculation complete',
    pendingMessage: 'Enter monthly expenses',
    flightBonus: 1,
  },
  {
    id: 'ato',
    label: 'ATO payments',
    unlockedMessage: 'Full ATO points added',
    pendingMessage: 'Add ATO payments',
    flightBonus: 0.5,
  },
  {
    id: 'amex',
    label: 'Amex card',
    unlockedMessage: 'Premium rewards rate',
    pendingMessage: 'Use Amex for highest rate',
    flightBonus: 0.5,
  },
  {
    id: 'partners',
    label: 'Reward partners',
    unlockedMessage: 'Partners selected',
    pendingMessage: 'Choose your partners',
    flightBonus: 0,
  },
];

// Double-dip explainer content
export const DOUBLE_DIP_CONTENT = {
  title: 'Double-Dip Rewards',
  subtitle: 'Earn twice on every payment',
  creditCardLabel: 'Credit card points',
  payRewardsLabel: 'PayRewards bonus',
  totalLabel: 'Business Class flights/year',
  emptyStateMessage: 'Enter your details to see your potential',
};

// Destination examples based on partner selection
export const PARTNER_DESTINATIONS: Record<string, { domestic: string; international: string }> = {
  qantas: {
    domestic: 'Sydney - Melbourne',
    international: 'Sydney - Singapore',
  },
  virgin: {
    domestic: 'Brisbane - Sydney',
    international: 'Sydney - Bali',
  },
  krisflyer: {
    domestic: 'Sydney - Melbourne',
    international: 'Sydney - Singapore',
  },
  qatar: {
    domestic: 'Sydney - Melbourne',
    international: 'Sydney - Doha',
  },
  velocity: {
    domestic: 'Melbourne - Gold Coast',
    international: 'Melbourne - Fiji',
  },
  default: {
    domestic: 'Sydney - Melbourne',
    international: 'Sydney - Singapore',
  },
};
