import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useCallback,
} from 'react';
import { VARIANT_A_TOTAL_STEPS } from '../data/variantAStepConfig';

// State types
export interface VariantAAnswers {
  // Step 1
  role: string | null;
  // Step 2
  industry: string | null;
  employees: string | null;
  // Step 3
  paymentMethods: string[];
  paymentTypes: string[];
  monthlyExpenses: number;
  // Step 4
  priorities: string[];
  redemptionOptions: string[];
  // Step 5
  partners: string[];
  // Other inputs
  otherInputs: Record<string, string>;
}

export interface VariantAState {
  currentStep: number;
  answers: VariantAAnswers;
  isLoading: boolean;
  isComplete: boolean;
  transitionMessage: string | null;
}

// Action types
type VariantAAction =
  | { type: 'SET_SINGLE_ANSWER'; field: keyof VariantAAnswers; value: string }
  | { type: 'TOGGLE_MULTI_ANSWER'; field: keyof VariantAAnswers; value: string }
  | { type: 'SET_EXPENSE'; value: number }
  | { type: 'SET_OTHER_INPUT'; field: string; value: string }
  | { type: 'NEXT_STEP'; transitionMessage?: string }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'CLEAR_TRANSITION' }
  | { type: 'COMPLETE_FUNNEL' };

// Initial state
const initialAnswers: VariantAAnswers = {
  role: null,
  industry: null,
  employees: null,
  paymentMethods: [],
  paymentTypes: [],
  monthlyExpenses: 0,
  priorities: [],
  redemptionOptions: [],
  partners: [],
  otherInputs: {},
};

const initialState: VariantAState = {
  currentStep: 0,
  answers: initialAnswers,
  isLoading: false,
  isComplete: false,
  transitionMessage: null,
};

// Reducer
function variantAReducer(state: VariantAState, action: VariantAAction): VariantAState {
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
      const field = action.field as keyof VariantAAnswers;
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

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, VARIANT_A_TOTAL_STEPS - 1),
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
        currentStep: Math.max(0, Math.min(action.step, VARIANT_A_TOTAL_STEPS - 1)),
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
interface VariantAContextValue {
  state: VariantAState;
  // Setters
  setSingleAnswer: (field: keyof VariantAAnswers, value: string) => void;
  toggleMultiAnswer: (field: keyof VariantAAnswers, value: string) => void;
  setExpense: (value: number) => void;
  setOtherInput: (field: string, value: string) => void;
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

const VariantAContext = createContext<VariantAContextValue | null>(null);

// Provider
export function VariantAProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(variantAReducer, initialState);

  const setSingleAnswer = useCallback((field: keyof VariantAAnswers, value: string) => {
    dispatch({ type: 'SET_SINGLE_ANSWER', field, value });
  }, []);

  const toggleMultiAnswer = useCallback((field: keyof VariantAAnswers, value: string) => {
    dispatch({ type: 'TOGGLE_MULTI_ANSWER', field, value });
  }, []);

  const setExpense = useCallback((value: number) => {
    dispatch({ type: 'SET_EXPENSE', value });
  }, []);

  const setOtherInput = useCallback((field: string, value: string) => {
    dispatch({ type: 'SET_OTHER_INPUT', field, value });
  }, []);

  const nextStep = useCallback((transitionMessage?: string) => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    // Shorter transition time for better UX
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
      case 0: // About You - role required
        return answers.role !== null;

      case 1: // Your Business - industry AND employees required
        return answers.industry !== null && answers.employees !== null;

      case 2: // How You Pay - at least one payment method, one payment type, and expenses
        return (
          answers.paymentMethods.length > 0 &&
          answers.paymentTypes.length > 0 &&
          answers.monthlyExpenses > 0
        );

      case 3: // Your Priorities - at least one priority and one redemption option
        return answers.priorities.length > 0 && answers.redemptionOptions.length > 0;

      case 4: // Choose Partners - at least one partner
        return answers.partners.length > 0;

      default:
        return false;
    }
  }, [state]);

  const getStepProgress = useCallback(() => {
    return {
      current: state.currentStep + 1,
      total: VARIANT_A_TOTAL_STEPS,
      percent: ((state.currentStep + 1) / VARIANT_A_TOTAL_STEPS) * 100,
    };
  }, [state.currentStep]);

  return (
    <VariantAContext.Provider
      value={{
        state,
        setSingleAnswer,
        toggleMultiAnswer,
        setExpense,
        setOtherInput,
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
    </VariantAContext.Provider>
  );
}

// Hook
export function useVariantA() {
  const context = useContext(VariantAContext);
  if (!context) {
    throw new Error('useVariantA must be used within a VariantAProvider');
  }
  return context;
}
