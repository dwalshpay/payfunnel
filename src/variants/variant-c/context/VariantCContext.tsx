import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from 'react';

// Answer types
export interface VariantCAnswers {
  // Step 1: Unlock Your Rewards
  industry: string | null;
  monthlyExpenses: number;
  // Step 2: Personalize Your Rewards
  paymentMethods: string[];
  paymentTypes: string[];
  redemptionOptions: string[];
  // Step 3: Claim Your Partners
  partners: string[];
  employees: string | null;
  // Other inputs
  otherInputs: Record<string, string>;
}

export interface VariantCState {
  // Current step (0 = hero, 1-3 = form steps)
  currentStep: number;
  // User answers
  answers: VariantCAnswers;
  // Hero expense preview (before starting funnel)
  heroExpensePreview: number;
  // UI states
  isLoading: boolean;
  isComplete: boolean;
  showLossAversion: boolean;
}

type VariantCAction =
  | { type: 'SET_HERO_PREVIEW'; expense: number }
  | { type: 'SET_SINGLE_ANSWER'; field: keyof VariantCAnswers; value: string | number | null }
  | { type: 'TOGGLE_MULTI_ANSWER'; field: keyof VariantCAnswers; value: string }
  | { type: 'SET_EXPENSE'; value: number }
  | { type: 'SET_OTHER_INPUT'; field: string; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'START_FUNNEL' }
  | { type: 'COMPLETE_FUNNEL' }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SHOW_LOSS_AVERSION' }
  | { type: 'HIDE_LOSS_AVERSION' }
  | { type: 'APPLY_SMART_DEFAULTS'; industry: string };

const initialState: VariantCState = {
  currentStep: 0, // Start at hero
  answers: {
    industry: null,
    monthlyExpenses: 0,
    paymentMethods: [],
    paymentTypes: [],
    redemptionOptions: [],
    partners: [],
    employees: null,
    otherInputs: {},
  },
  heroExpensePreview: 50000, // Default hero preview
  isLoading: false,
  isComplete: false,
  showLossAversion: false,
};

// Smart defaults based on industry
const INDUSTRY_DEFAULTS: Record<string, Partial<VariantCAnswers>> = {
  construction: {
    paymentMethods: ['visa', 'bank-transfer'],
    paymentTypes: ['suppliers', 'ato', 'super'],
  },
  trades: {
    paymentMethods: ['visa', 'bank-transfer'],
    paymentTypes: ['suppliers', 'ato', 'insurance'],
  },
  professional: {
    paymentMethods: ['amex', 'bank-transfer'],
    paymentTypes: ['ato', 'super', 'advertising'],
  },
  health: {
    paymentMethods: ['visa', 'mastercard'],
    paymentTypes: ['suppliers', 'payroll', 'insurance'],
  },
  hospitality: {
    paymentMethods: ['visa', 'mastercard'],
    paymentTypes: ['suppliers', 'payroll', 'rent'],
  },
};

function reducer(state: VariantCState, action: VariantCAction): VariantCState {
  switch (action.type) {
    case 'SET_HERO_PREVIEW':
      return {
        ...state,
        heroExpensePreview: action.expense,
      };

    case 'SET_SINGLE_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.field]: action.value,
        },
      };

    case 'TOGGLE_MULTI_ANSWER': {
      const currentArray = state.answers[action.field] as string[];
      const newArray = currentArray.includes(action.value)
        ? currentArray.filter((v) => v !== action.value)
        : [...currentArray, action.value];
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.field]: newArray,
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
        currentStep: Math.min(state.currentStep + 1, 4), // 0-3 + success
        isLoading: false,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.step,
      };

    case 'START_FUNNEL':
      return {
        ...state,
        currentStep: 1,
        answers: {
          ...state.answers,
          monthlyExpenses: state.heroExpensePreview,
        },
      };

    case 'COMPLETE_FUNNEL':
      return {
        ...state,
        isComplete: true,
        currentStep: 4,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.value,
      };

    case 'SHOW_LOSS_AVERSION':
      return {
        ...state,
        showLossAversion: true,
      };

    case 'HIDE_LOSS_AVERSION':
      return {
        ...state,
        showLossAversion: false,
      };

    case 'APPLY_SMART_DEFAULTS': {
      const defaults = INDUSTRY_DEFAULTS[action.industry] || {};
      return {
        ...state,
        answers: {
          ...state.answers,
          ...defaults,
        },
      };
    }

    default:
      return state;
  }
}

// Validation helpers
function canProceed(state: VariantCState): boolean {
  const { currentStep, answers } = state;

  switch (currentStep) {
    case 0: // Hero - can always proceed
      return true;
    case 1: // Unlock Your Rewards
      return answers.industry !== null && answers.monthlyExpenses > 0;
    case 2: // Personalize Your Rewards
      return (
        answers.paymentMethods.length > 0 &&
        answers.paymentTypes.length > 0
      );
    case 3: // Claim Your Partners
      return answers.partners.length > 0;
    default:
      return false;
  }
}

// Context
interface VariantCContextValue {
  state: VariantCState;
  dispatch: Dispatch<VariantCAction>;
  canProceed: () => boolean;
  // Convenience actions
  setHeroPreview: (expense: number) => void;
  setSingleAnswer: (field: keyof VariantCAnswers, value: string | number | null) => void;
  toggleMultiAnswer: (field: keyof VariantCAnswers, value: string) => void;
  setExpense: (value: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  startFunnel: () => void;
  completeFunnel: () => void;
  applySmartDefaults: (industry: string) => void;
}

const VariantCContext = createContext<VariantCContextValue | null>(null);

export function VariantCProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: VariantCContextValue = {
    state,
    dispatch,
    canProceed: () => canProceed(state),
    setHeroPreview: (expense) => dispatch({ type: 'SET_HERO_PREVIEW', expense }),
    setSingleAnswer: (field, value) =>
      dispatch({ type: 'SET_SINGLE_ANSWER', field, value }),
    toggleMultiAnswer: (field, value) =>
      dispatch({ type: 'TOGGLE_MULTI_ANSWER', field, value }),
    setExpense: (value) => dispatch({ type: 'SET_EXPENSE', value }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    startFunnel: () => dispatch({ type: 'START_FUNNEL' }),
    completeFunnel: () => dispatch({ type: 'COMPLETE_FUNNEL' }),
    applySmartDefaults: (industry) =>
      dispatch({ type: 'APPLY_SMART_DEFAULTS', industry }),
  };

  return (
    <VariantCContext.Provider value={value}>
      {children}
    </VariantCContext.Provider>
  );
}

export function useVariantC(): VariantCContextValue {
  const context = useContext(VariantCContext);
  if (!context) {
    throw new Error('useVariantC must be used within a VariantCProvider');
  }
  return context;
}
