import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useCallback,
} from 'react';
import type {
  VariantFState,
  AssessmentStep,
  AssessmentScore,
  BusinessProfileAnswers,
  PaymentHabitsAnswers,
  RewardsGoalsAnswers,
} from '../types';
import { calculateScore, generateRecommendations } from '../utils/scoreCalculation';

// Initial answers
const initialBusinessProfile: BusinessProfileAnswers = {
  industry: null,
  teamSize: null,
  businessAge: null,
};

const initialPaymentHabits: PaymentHabitsAnswers = {
  monthlyExpenses: null,
  paymentMethods: [],
  painPoint: null,
};

const initialRewardsGoals: RewardsGoalsAnswers = {
  goals: [],
  airlineProgram: null,
};

// Initial state
const initialState: VariantFState = {
  currentStep: 'intro',
  answers: {
    businessProfile: initialBusinessProfile,
    paymentHabits: initialPaymentHabits,
    rewardsGoals: initialRewardsGoals,
  },
  score: null,
  recommendations: [],
  ui: {
    sectionProgress: 0,
    isCalculating: false,
    emailSubmitted: false,
    email: '',
  },
};

// Action types
type VariantFAction =
  | { type: 'SET_BUSINESS_PROFILE'; field: keyof BusinessProfileAnswers; value: string }
  | { type: 'SET_PAYMENT_HABITS'; field: keyof PaymentHabitsAnswers; value: string }
  | { type: 'TOGGLE_PAYMENT_METHOD'; value: string }
  | { type: 'SET_REWARDS_GOALS'; field: keyof RewardsGoalsAnswers; value: string }
  | { type: 'TOGGLE_GOAL'; value: string }
  | { type: 'GO_TO_STEP'; step: AssessmentStep }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREV_SECTION' }
  | { type: 'SET_CALCULATING'; isCalculating: boolean }
  | { type: 'SET_SCORE'; score: AssessmentScore; recommendations: string[] }
  | { type: 'SET_EMAIL'; email: string }
  | { type: 'SUBMIT_EMAIL' };

// Step order for navigation
const STEP_ORDER: AssessmentStep[] = ['intro', 'section1', 'section2', 'section3', 'results'];

function getNextStep(current: AssessmentStep): AssessmentStep {
  const currentIndex = STEP_ORDER.indexOf(current);
  return STEP_ORDER[Math.min(currentIndex + 1, STEP_ORDER.length - 1)];
}

function getPrevStep(current: AssessmentStep): AssessmentStep {
  const currentIndex = STEP_ORDER.indexOf(current);
  return STEP_ORDER[Math.max(currentIndex - 1, 0)];
}

// Reducer
function variantFReducer(state: VariantFState, action: VariantFAction): VariantFState {
  switch (action.type) {
    case 'SET_BUSINESS_PROFILE':
      return {
        ...state,
        answers: {
          ...state.answers,
          businessProfile: {
            ...state.answers.businessProfile,
            [action.field]: action.value,
          },
        },
      };

    case 'SET_PAYMENT_HABITS':
      return {
        ...state,
        answers: {
          ...state.answers,
          paymentHabits: {
            ...state.answers.paymentHabits,
            [action.field]: action.value,
          },
        },
      };

    case 'TOGGLE_PAYMENT_METHOD': {
      const methods = state.answers.paymentHabits.paymentMethods;
      const newMethods = methods.includes(action.value)
        ? methods.filter((m) => m !== action.value)
        : [...methods, action.value];
      return {
        ...state,
        answers: {
          ...state.answers,
          paymentHabits: {
            ...state.answers.paymentHabits,
            paymentMethods: newMethods,
          },
        },
      };
    }

    case 'SET_REWARDS_GOALS':
      return {
        ...state,
        answers: {
          ...state.answers,
          rewardsGoals: {
            ...state.answers.rewardsGoals,
            [action.field]: action.value,
          },
        },
      };

    case 'TOGGLE_GOAL': {
      const goals = state.answers.rewardsGoals.goals;
      const newGoals = goals.includes(action.value)
        ? goals.filter((g) => g !== action.value)
        : [...goals, action.value];
      return {
        ...state,
        answers: {
          ...state.answers,
          rewardsGoals: {
            ...state.answers.rewardsGoals,
            goals: newGoals,
          },
        },
      };
    }

    case 'GO_TO_STEP': {
      const stepIndex = STEP_ORDER.indexOf(action.step);
      const progress = ((stepIndex) / (STEP_ORDER.length - 1)) * 100;
      return {
        ...state,
        currentStep: action.step,
        ui: {
          ...state.ui,
          sectionProgress: progress,
        },
      };
    }

    case 'NEXT_SECTION': {
      const nextStep = getNextStep(state.currentStep);
      const stepIndex = STEP_ORDER.indexOf(nextStep);
      const progress = ((stepIndex) / (STEP_ORDER.length - 1)) * 100;
      return {
        ...state,
        currentStep: nextStep,
        ui: {
          ...state.ui,
          sectionProgress: progress,
        },
      };
    }

    case 'PREV_SECTION': {
      const prevStep = getPrevStep(state.currentStep);
      const stepIndex = STEP_ORDER.indexOf(prevStep);
      const progress = ((stepIndex) / (STEP_ORDER.length - 1)) * 100;
      return {
        ...state,
        currentStep: prevStep,
        ui: {
          ...state.ui,
          sectionProgress: progress,
        },
      };
    }

    case 'SET_CALCULATING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isCalculating: action.isCalculating,
        },
      };

    case 'SET_SCORE':
      return {
        ...state,
        score: action.score,
        recommendations: action.recommendations,
        ui: {
          ...state.ui,
          isCalculating: false,
        },
      };

    case 'SET_EMAIL':
      return {
        ...state,
        ui: {
          ...state.ui,
          email: action.email,
        },
      };

    case 'SUBMIT_EMAIL':
      return {
        ...state,
        ui: {
          ...state.ui,
          emailSubmitted: true,
        },
      };

    default:
      return state;
  }
}

// Context value type
interface VariantFContextValue {
  state: VariantFState;
  // Business Profile setters
  setIndustry: (value: string) => void;
  setTeamSize: (value: string) => void;
  setBusinessAge: (value: string) => void;
  // Payment Habits setters
  setMonthlyExpenses: (value: string) => void;
  togglePaymentMethod: (value: string) => void;
  setPainPoint: (value: string) => void;
  // Rewards Goals setters
  toggleGoal: (value: string) => void;
  setAirlineProgram: (value: string) => void;
  // Navigation
  startAssessment: () => void;
  nextSection: () => void;
  prevSection: () => void;
  goToStep: (step: AssessmentStep) => void;
  // Results
  calculateResults: () => void;
  // Email
  setEmail: (email: string) => void;
  submitEmail: () => void;
  // Validation
  canProceedSection1: () => boolean;
  canProceedSection2: () => boolean;
  canProceedSection3: () => boolean;
  getSectionProgress: () => { current: number; total: number };
}

const VariantFContext = createContext<VariantFContextValue | null>(null);

// Provider
export function VariantFProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(variantFReducer, initialState);

  // Business Profile setters
  const setIndustry = useCallback((value: string) => {
    dispatch({ type: 'SET_BUSINESS_PROFILE', field: 'industry', value });
  }, []);

  const setTeamSize = useCallback((value: string) => {
    dispatch({ type: 'SET_BUSINESS_PROFILE', field: 'teamSize', value });
  }, []);

  const setBusinessAge = useCallback((value: string) => {
    dispatch({ type: 'SET_BUSINESS_PROFILE', field: 'businessAge', value });
  }, []);

  // Payment Habits setters
  const setMonthlyExpenses = useCallback((value: string) => {
    dispatch({ type: 'SET_PAYMENT_HABITS', field: 'monthlyExpenses', value });
  }, []);

  const togglePaymentMethod = useCallback((value: string) => {
    dispatch({ type: 'TOGGLE_PAYMENT_METHOD', value });
  }, []);

  const setPainPoint = useCallback((value: string) => {
    dispatch({ type: 'SET_PAYMENT_HABITS', field: 'painPoint', value });
  }, []);

  // Rewards Goals setters
  const toggleGoal = useCallback((value: string) => {
    dispatch({ type: 'TOGGLE_GOAL', value });
  }, []);

  const setAirlineProgram = useCallback((value: string) => {
    dispatch({ type: 'SET_REWARDS_GOALS', field: 'airlineProgram', value });
  }, []);

  // Navigation
  const startAssessment = useCallback(() => {
    dispatch({ type: 'GO_TO_STEP', step: 'section1' });
  }, []);

  const nextSection = useCallback(() => {
    dispatch({ type: 'NEXT_SECTION' });
  }, []);

  const prevSection = useCallback(() => {
    dispatch({ type: 'PREV_SECTION' });
  }, []);

  const goToStep = useCallback((step: AssessmentStep) => {
    dispatch({ type: 'GO_TO_STEP', step });
  }, []);

  // Calculate results
  const calculateResults = useCallback(() => {
    dispatch({ type: 'SET_CALCULATING', isCalculating: true });

    // Simulate calculation delay for effect
    setTimeout(() => {
      const score = calculateScore(state.answers);
      const recommendations = generateRecommendations(state.answers);
      dispatch({ type: 'SET_SCORE', score, recommendations });
      dispatch({ type: 'GO_TO_STEP', step: 'results' });
    }, 1500);
  }, [state.answers]);

  // Email
  const setEmail = useCallback((email: string) => {
    dispatch({ type: 'SET_EMAIL', email });
  }, []);

  const submitEmail = useCallback(() => {
    dispatch({ type: 'SUBMIT_EMAIL' });
  }, []);

  // Validation
  const canProceedSection1 = useCallback(() => {
    const { businessProfile } = state.answers;
    return (
      businessProfile.industry !== null &&
      businessProfile.teamSize !== null &&
      businessProfile.businessAge !== null
    );
  }, [state.answers]);

  const canProceedSection2 = useCallback(() => {
    const { paymentHabits } = state.answers;
    return (
      paymentHabits.monthlyExpenses !== null &&
      paymentHabits.paymentMethods.length > 0 &&
      paymentHabits.painPoint !== null
    );
  }, [state.answers]);

  const canProceedSection3 = useCallback(() => {
    const { rewardsGoals } = state.answers;
    return rewardsGoals.goals.length > 0;
  }, [state.answers]);

  const getSectionProgress = useCallback(() => {
    const stepIndex = STEP_ORDER.indexOf(state.currentStep);
    // Sections are 1-3 (intro is 0, results is 4)
    if (stepIndex === 0) return { current: 0, total: 3 };
    if (stepIndex >= 4) return { current: 3, total: 3 };
    return { current: stepIndex, total: 3 };
  }, [state.currentStep]);

  return (
    <VariantFContext.Provider
      value={{
        state,
        setIndustry,
        setTeamSize,
        setBusinessAge,
        setMonthlyExpenses,
        togglePaymentMethod,
        setPainPoint,
        toggleGoal,
        setAirlineProgram,
        startAssessment,
        nextSection,
        prevSection,
        goToStep,
        calculateResults,
        setEmail,
        submitEmail,
        canProceedSection1,
        canProceedSection2,
        canProceedSection3,
        getSectionProgress,
      }}
    >
      {children}
    </VariantFContext.Provider>
  );
}

// Hook
export function useVariantF() {
  const context = useContext(VariantFContext);
  if (!context) {
    throw new Error('useVariantF must be used within a VariantFProvider');
  }
  return context;
}
