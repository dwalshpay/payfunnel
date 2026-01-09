import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useCallback,
} from 'react';
import { VARIANT_B_TOTAL_STEPS, INDUSTRY_DEFAULTS } from '../data/variantBStepConfig';

// Registration data type
export interface RegistrationData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  referralCode: string;
  mobileNumber: string;
  verificationCode: string;
}

// State types
export interface VariantBAnswers {
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
  // Registration (Steps 6-8)
  registration: RegistrationData;
}

export interface VariantBState {
  currentStep: number;
  answers: VariantBAnswers;
  isLoading: boolean;
  isComplete: boolean;
  transitionMessage: string | null;
  // Points tracking
  pointsEarned: number;
  pointsAnimation: {
    show: boolean;
    amount: number;
  };
}

// Action types
type VariantBAction =
  | { type: 'SET_SINGLE_ANSWER'; field: keyof VariantBAnswers; value: string }
  | { type: 'TOGGLE_MULTI_ANSWER'; field: keyof VariantBAnswers; value: string }
  | { type: 'SET_EXPENSE'; value: number }
  | { type: 'SET_OTHER_INPUT'; field: string; value: string }
  | { type: 'SET_REGISTRATION_FIELD'; field: keyof RegistrationData; value: string }
  | { type: 'NEXT_STEP'; transitionMessage?: string; pointsAwarded?: number }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'CLEAR_TRANSITION' }
  | { type: 'COMPLETE_FUNNEL' }
  | { type: 'HIDE_POINTS_ANIMATION' }
  | { type: 'APPLY_SMART_DEFAULTS'; industry: string };

// Initial state
const initialAnswers: VariantBAnswers = {
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
  registration: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    referralCode: '',
    mobileNumber: '',
    verificationCode: '',
  },
};

const initialState: VariantBState = {
  currentStep: 0,
  answers: initialAnswers,
  isLoading: false,
  isComplete: false,
  transitionMessage: null,
  pointsEarned: 0,
  pointsAnimation: {
    show: false,
    amount: 0,
  },
};

// Reducer
function variantBReducer(state: VariantBState, action: VariantBAction): VariantBState {
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
      const field = action.field as keyof VariantBAnswers;
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

    case 'SET_REGISTRATION_FIELD':
      return {
        ...state,
        answers: {
          ...state.answers,
          registration: {
            ...state.answers.registration,
            [action.field]: action.value,
          },
        },
      };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, VARIANT_B_TOTAL_STEPS - 1),
        transitionMessage: action.transitionMessage || null,
        isLoading: false,
        pointsEarned: state.pointsEarned + (action.pointsAwarded || 0),
        pointsAnimation: action.pointsAwarded
          ? { show: true, amount: action.pointsAwarded }
          : state.pointsAnimation,
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
        currentStep: Math.max(0, Math.min(action.step, VARIANT_B_TOTAL_STEPS - 1)),
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

    case 'HIDE_POINTS_ANIMATION':
      return {
        ...state,
        pointsAnimation: { show: false, amount: 0 },
      };

    case 'COMPLETE_FUNNEL':
      return {
        ...state,
        isComplete: true,
        isLoading: false,
      };

    case 'APPLY_SMART_DEFAULTS': {
      const defaults = INDUSTRY_DEFAULTS[action.industry] || INDUSTRY_DEFAULTS.other;
      return {
        ...state,
        answers: {
          ...state.answers,
          paymentMethods:
            state.answers.paymentMethods.length === 0
              ? defaults.paymentMethods
              : state.answers.paymentMethods,
          paymentTypes:
            state.answers.paymentTypes.length === 0
              ? defaults.paymentTypes
              : state.answers.paymentTypes,
        },
      };
    }

    default:
      return state;
  }
}

// Context
interface VariantBContextValue {
  state: VariantBState;
  // Setters
  setSingleAnswer: (field: keyof VariantBAnswers, value: string) => void;
  toggleMultiAnswer: (field: keyof VariantBAnswers, value: string) => void;
  setExpense: (value: number) => void;
  setOtherInput: (field: string, value: string) => void;
  setRegistrationField: (field: keyof RegistrationData, value: string) => void;
  // Navigation
  nextStep: (transitionMessage?: string, pointsAwarded?: number) => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeFunnel: () => void;
  clearTransition: () => void;
  hidePointsAnimation: () => void;
  applySmartDefaults: (industry: string) => void;
  // Validation
  canProceed: () => boolean;
  getStepProgress: () => { current: number; total: number; percent: number };
}

const VariantBContext = createContext<VariantBContextValue | null>(null);

// Provider
export function VariantBProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(variantBReducer, initialState);

  const setSingleAnswer = useCallback((field: keyof VariantBAnswers, value: string) => {
    dispatch({ type: 'SET_SINGLE_ANSWER', field, value });
  }, []);

  const toggleMultiAnswer = useCallback((field: keyof VariantBAnswers, value: string) => {
    dispatch({ type: 'TOGGLE_MULTI_ANSWER', field, value });
  }, []);

  const setExpense = useCallback((value: number) => {
    dispatch({ type: 'SET_EXPENSE', value });
  }, []);

  const setOtherInput = useCallback((field: string, value: string) => {
    dispatch({ type: 'SET_OTHER_INPUT', field, value });
  }, []);

  const setRegistrationField = useCallback((field: keyof RegistrationData, value: string) => {
    dispatch({ type: 'SET_REGISTRATION_FIELD', field, value });
  }, []);

  const nextStep = useCallback((transitionMessage?: string, pointsAwarded?: number) => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    // Shorter transition time for better UX
    setTimeout(() => {
      dispatch({ type: 'NEXT_STEP', transitionMessage, pointsAwarded });
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

  const hidePointsAnimation = useCallback(() => {
    dispatch({ type: 'HIDE_POINTS_ANIMATION' });
  }, []);

  const applySmartDefaults = useCallback((industry: string) => {
    dispatch({ type: 'APPLY_SMART_DEFAULTS', industry });
  }, []);

  const canProceed = useCallback((): boolean => {
    const { currentStep, answers } = state;
    const { registration } = answers;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Australian mobile number regex
    const mobileRegex = /^(\+?61|0)4\d{8}$/;

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

      case 5: // Account Creation - email, name, password required
        return (
          emailRegex.test(registration.email) &&
          registration.firstName.trim().length > 0 &&
          registration.lastName.trim().length > 0 &&
          registration.password.length >= 6
        );

      case 6: // Mobile Number - valid Australian mobile
        return mobileRegex.test(registration.mobileNumber.replace(/\s/g, ''));

      case 7: // Verification Code - 6 digits
        return registration.verificationCode.length === 6;

      default:
        return false;
    }
  }, [state]);

  const getStepProgress = useCallback(() => {
    return {
      current: state.currentStep + 1,
      total: VARIANT_B_TOTAL_STEPS,
      percent: ((state.currentStep + 1) / VARIANT_B_TOTAL_STEPS) * 100,
    };
  }, [state.currentStep]);

  return (
    <VariantBContext.Provider
      value={{
        state,
        setSingleAnswer,
        toggleMultiAnswer,
        setExpense,
        setOtherInput,
        setRegistrationField,
        nextStep,
        prevStep,
        goToStep,
        completeFunnel,
        clearTransition,
        hidePointsAnimation,
        applySmartDefaults,
        canProceed,
        getStepProgress,
      }}
    >
      {children}
    </VariantBContext.Provider>
  );
}

// Hook
export function useVariantB() {
  const context = useContext(VariantBContext);
  if (!context) {
    throw new Error('useVariantB must be used within a VariantBProvider');
  }
  return context;
}
