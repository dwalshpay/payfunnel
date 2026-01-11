// Score options with points for each question
export interface ScoreOption {
  id: string;
  label: string;
  points: number;
}

// Section 1: Business Profile
export interface BusinessProfileAnswers {
  industry: string | null;
  teamSize: string | null;
  businessAge: string | null;
}

// Section 2: Payment Habits
export interface PaymentHabitsAnswers {
  monthlyExpenses: string | null;
  paymentMethods: string[];
  painPoint: string | null;
}

// Section 3: Rewards Goals
export interface RewardsGoalsAnswers {
  goals: string[];
  airlineProgram: string | null;
}

// All assessment answers
export interface AssessmentAnswers {
  businessProfile: BusinessProfileAnswers;
  paymentHabits: PaymentHabitsAnswers;
  rewardsGoals: RewardsGoalsAnswers;
}

// Tier types
export type Tier = 'gold' | 'silver' | 'bronze';

// Assessment score result
export interface AssessmentScore {
  total: number;          // 0-100
  tier: Tier;
  percentile: number;     // Top X%
  annualPoints: number;
  annualValue: number;    // Dollar value
}

// Lead routing
export interface LeadRoute {
  tier: Tier;
  action: 'sales_call' | 'premium_onboard' | 'standard_onboard' | 'self_serve';
  priority: 'high' | 'medium' | 'low';
}

// Assessment step
export type AssessmentStep = 'intro' | 'section1' | 'section2' | 'section3' | 'results';

// Full state
export interface VariantFState {
  currentStep: AssessmentStep;
  answers: AssessmentAnswers;
  score: AssessmentScore | null;
  recommendations: string[];
  ui: {
    sectionProgress: number;
    isCalculating: boolean;
    emailSubmitted: boolean;
    email: string;
  };
}

// Question config types
export interface QuestionOption {
  id: string;
  label: string;
  points: number;
  icon?: string;
  qualification?: 'high' | 'medium' | 'low';
}

export interface QuestionConfig {
  id: string;
  question: string;
  type: 'single' | 'multi' | 'dropdown';
  options: QuestionOption[];
  required?: boolean;
  helperText?: string;
}

// Tier display config
export interface TierConfig {
  tier: Tier;
  label: string;
  description: string;
  accentColor: string;
  backgroundColor: string;
  icon: string;
}

export const TIER_CONFIGS: Record<Tier, TierConfig> = {
  gold: {
    tier: 'gold',
    label: 'EXCEPTIONAL REWARDS POTENTIAL',
    description: "Your business is perfectly positioned to maximise rewards. You're in the top 10% of Australian businesses.",
    accentColor: '#F59E0B',
    backgroundColor: '#FEF3C7',
    icon: 'trophy',
  },
  silver: {
    tier: 'silver',
    label: 'STRONG REWARDS POTENTIAL',
    description: "Your business has significant rewards opportunity. You're in the top 20% of Australian businesses.",
    accentColor: '#3866B0',
    backgroundColor: '#E0E7FF',
    icon: 'star',
  },
  bronze: {
    tier: 'bronze',
    label: 'REWARDS OPPORTUNITY IDENTIFIED',
    description: "We've found ways to improve your rewards earning. Let's get you started.",
    accentColor: '#6B7280',
    backgroundColor: '#F3F4F6',
    icon: 'trending',
  },
};
