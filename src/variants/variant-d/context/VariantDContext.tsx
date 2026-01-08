import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useCallback,
} from 'react';
import { VARIANT_D_TOTAL_STEPS, INDUSTRY_DEFAULTS } from '../data/variantDStepConfig';

// State types
export interface VariantDAnswers {
  // Step 1
  role: string | null;
  // Step 2
  industry: string | null;
  employees: string | null;
  monthlyExpenses: number;
  // Step 3
  paymentMethods: string[];
  paymentTypes: string[];
  // Step 4
  partners: string[];
  redemptionPreference: string[];
  // Other inputs
  otherInputs: Record<string, string>;
}

export interface VariantDRewards {
  creditCardPoints: number;
  creditCardValue: number;
  payRewardsPoints: number;
  payRewardsValue: number;
  totalPoints: number;
  totalValue: number;
  businessClassFlights: number;
  confidence: 'low' | 'medium' | 'high';
}

export interface VariantDState {
  currentStep: number;
  answers: VariantDAnswers;
  rewards: VariantDRewards;
  isLoading: boolean;
  isComplete: boolean;
  transitionMessage: string | null;
}

// Action types
type VariantDAction =
  | { type: 'SET_SINGLE_ANSWER'; field: keyof VariantDAnswers; value: string }
  | { type: 'TOGGLE_MULTI_ANSWER'; field: keyof VariantDAnswers; value: string }
  | { type: 'SET_EXPENSE'; value: number }
  | { type: 'SET_OTHER_INPUT'; field: string; value: string }
  | { type: 'APPLY_SMART_DEFAULTS'; industry: string }
  | { type: 'UPDATE_REWARDS'; rewards: VariantDRewards }
  | { type: 'NEXT_STEP'; transitionMessage?: string }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'CLEAR_TRANSITION' }
  | { type: 'COMPLETE_FUNNEL' };

// Initial state
const initialAnswers: VariantDAnswers = {
  role: null,
  industry: null,
  employees: null,
  monthlyExpenses: 0,
  paymentMethods: [],
  paymentTypes: [],
  partners: [],
  redemptionPreference: [],
  otherInputs: {},
};

const initialRewards: VariantDRewards = {
  creditCardPoints: 0,
  creditCardValue: 0,
  payRewardsPoints: 0,
  payRewardsValue: 0,
  totalPoints: 0,
  totalValue: 0,
  businessClassFlights: 0,
  confidence: 'low',
};

const initialState: VariantDState = {
  currentStep: 0,
  answers: initialAnswers,
  rewards: initialRewards,
  isLoading: false,
  isComplete: false,
  transitionMessage: null,
};

// Reducer
function variantDReducer(state: VariantDState, action: VariantDAction): VariantDState {
  switch (action.type) {
    case 'SET_SINGLE_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.field]: action.value,
        },
      };

    case 'TOGGLE_MULTI_ANSWER': {
      const field = action.field as keyof VariantDAnswers;
      const currentValues = state.answers[field] as string[];
      const newValues = currentValues.includes(action.value)
        ? currentValues.filter((v) => v !== action.value)
        : [...currentValues, action.value];
      return {
        ...state,
        answers: {
          ...state.answers,
          [field]: newValues,
        },
      };
    }

    case 'SET_EXPENSE':
      return {
        ...state,
        answers: {
          ...state.answers,
          monthlyExpenses: action.value,
        },
      };

    case 'SET_OTHER_INPUT':
      return {
        ...state,
        answers: {
          ...state.answers,
          otherInputs: {
            ...state.answers.otherInputs,
            [action.field]: action.value,
          },
        },
      };

    case 'APPLY_SMART_DEFAULTS': {
      const defaults = INDUSTRY_DEFAULTS[action.industry];
      if (!defaults) return state;
      return {
        ...state,
        answers: {
          ...state.answers,
          paymentMethods: defaults.paymentMethods,
          paymentTypes: defaults.paymentTypes,
        },
      };
    }

    case 'UPDATE_REWARDS':
      return {
        ...state,
        rewards: action.rewards,
      };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, VARIANT_D_TOTAL_STEPS - 1),
        transitionMessage: action.transitionMessage || null,
        isLoading: false,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        transitionMessage: null,
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.step, VARIANT_D_TOTAL_STEPS - 1)),
        transitionMessage: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case 'CLEAR_TRANSITION':
      return {
        ...state,
        transitionMessage: null,
      };

    case 'COMPLETE_FUNNEL':
      return {
        ...state,
        isComplete: true,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Context
interface VariantDContextValue {
  state: VariantDState;
  // Setters
  setSingleAnswer: (field: keyof VariantDAnswers, value: string) => void;
  toggleMultiAnswer: (field: keyof VariantDAnswers, value: string) => void;
  setExpense: (value: number) => void;
  setOtherInput: (field: string, value: string) => void;
  applySmartDefaults: (industry: string) => void;
  updateRewards: (rewards: VariantDRewards) => void;
  // Navigation
  nextStep: (transitionMessage?: string) => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeFunnel: () => void;
  clearTransition: () => void;
  // Validation
  canProceed: () => boolean;
  getStepProgress: () => { current: number; total: number; percent: number };
}

const VariantDContext = createContext<VariantDContextValue | null>(null);

// Provider
export function VariantDProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(variantDReducer, initialState);

  const setSingleAnswer = useCallback((field: keyof VariantDAnswers, value: string) => {
    dispatch({ type: 'SET_SINGLE_ANSWER', field, value });
  }, []);

  const toggleMultiAnswer = useCallback((field: keyof VariantDAnswers, value: string) => {
    dispatch({ type: 'TOGGLE_MULTI_ANSWER', field, value });
  }, []);

  const setExpense = useCallback((value: number) => {
    dispatch({ type: 'SET_EXPENSE', value });
  }, []);

  const setOtherInput = useCallback((field: string, value: string) => {
    dispatch({ type: 'SET_OTHER_INPUT', field, value });
  }, []);

  const applySmartDefaults = useCallback((industry: string) => {
    dispatch({ type: 'APPLY_SMART_DEFAULTS', industry });
  }, []);

  const updateRewards = useCallback((rewards: VariantDRewards) => {
    dispatch({ type: 'UPDATE_REWARDS', rewards });
  }, []);

  const nextStep = useCallback((transitionMessage?: string) => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    setTimeout(() => {
      dispatch({ type: 'NEXT_STEP', transitionMessage });
    }, 200);
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'GO_TO_STEP', step });
  }, []);

  const completeFunnel = useCallback(() => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_FUNNEL' });
    }, 300);
  }, []);

  const clearTransition = useCallback(() => {
    dispatch({ type: 'CLEAR_TRANSITION' });
  }, []);

  const canProceed = useCallback((): boolean => {
    const { currentStep, answers } = state;

    switch (currentStep) {
      case 0: // Quick Start - role required
        return answers.role !== null;

      case 1: // Business Profile - industry, employees, and expenses required
        return (
          answers.industry !== null &&
          answers.employees !== null &&
          answers.monthlyExpenses > 0
        );

      case 2: // Payment Optimization - at least one payment method and one payment type
        return answers.paymentMethods.length > 0 && answers.paymentTypes.length > 0;

      case 3: // Claim Rewards - at least one partner
        return answers.partners.length > 0;

      default:
        return false;
    }
  }, [state]);

  const getStepProgress = useCallback(() => {
    return {
      current: state.currentStep + 1,
      total: VARIANT_D_TOTAL_STEPS,
      percent: ((state.currentStep + 1) / VARIANT_D_TOTAL_STEPS) * 100,
    };
  }, [state.currentStep]);

  return (
    <VariantDContext.Provider
      value={{
        state,
        setSingleAnswer,
        toggleMultiAnswer,
        setExpense,
        setOtherInput,
        applySmartDefaults,
        updateRewards,
        nextStep,
        prevStep,
        goToStep,
        completeFunnel,
        clearTransition,
        canProceed,
        getStepProgress,
      }}
    >
      {children}
    </VariantDContext.Provider>
  );
}

// Hook
export function useVariantD() {
  const context = useContext(VariantDContext);
  if (!context) {
    throw new Error('useVariantD must be used within a VariantDProvider');
  }
  return context;
}
