import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useCallback,
} from 'react';
import { calculatePoints, calculateAccuracy, calculateComparison } from '../utils/calculations';

// Constants
export const BENCHMARK_POINTS = 156000;
export const VARIANT_E_TOTAL_STEPS = 4;

// State types
export interface VariantEAnswers {
  industry: string | null;
  spend: string | null;
  email: string | null;
  teamSize: string | null;
  paymentMethods: string[];
  paymentTypes: string[];
}

export interface VariantECalculated {
  benchmarkPoints: number;
  userPoints: number;
  comparisonPercentage: number;
  isAboveBenchmark: boolean;
  accuracy: number;
}

export interface VariantEUI {
  expandedSections: string[];
  isCalculating: boolean;
  emailSubmitted: boolean;
  showConfetti: boolean;
}

export interface VariantEState {
  currentStep: 1 | 2 | 3 | 4;
  answers: VariantEAnswers;
  calculated: VariantECalculated;
  ui: VariantEUI;
  isComplete: boolean;
}

// Action types
type VariantEAction =
  | { type: 'SET_INDUSTRY'; value: string }
  | { type: 'SET_SPEND'; value: string }
  | { type: 'SET_EMAIL'; value: string }
  | { type: 'SET_TEAM_SIZE'; value: string }
  | { type: 'TOGGLE_PAYMENT_METHOD'; value: string }
  | { type: 'TOGGLE_PAYMENT_TYPE'; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: 1 | 2 | 3 | 4 }
  | { type: 'TOGGLE_SECTION'; sectionId: string }
  | { type: 'SET_CALCULATING'; isCalculating: boolean }
  | { type: 'SUBMIT_EMAIL' }
  | { type: 'TRIGGER_CONFETTI' }
  | { type: 'HIDE_CONFETTI' }
  | { type: 'COMPLETE_FUNNEL' };

// Initial state
const initialAnswers: VariantEAnswers = {
  industry: null,
  spend: null,
  email: null,
  teamSize: null,
  paymentMethods: [],
  paymentTypes: [],
};

const initialCalculated: VariantECalculated = {
  benchmarkPoints: BENCHMARK_POINTS,
  userPoints: 0,
  comparisonPercentage: 0,
  isAboveBenchmark: false,
  accuracy: 0,
};

const initialUI: VariantEUI = {
  expandedSections: [],
  isCalculating: false,
  emailSubmitted: false,
  showConfetti: false,
};

const initialState: VariantEState = {
  currentStep: 1,
  answers: initialAnswers,
  calculated: initialCalculated,
  ui: initialUI,
  isComplete: false,
};

// Helper to recalculate derived values
function recalculate(answers: VariantEAnswers): Partial<VariantECalculated> {
  if (!answers.industry || !answers.spend) {
    return {};
  }

  const userPoints = calculatePoints(
    answers.industry,
    answers.spend,
    answers.teamSize,
    answers.paymentMethods,
    answers.paymentTypes
  );

  const comparison = calculateComparison(userPoints, BENCHMARK_POINTS);
  const accuracy = calculateAccuracy(answers);

  return {
    userPoints,
    comparisonPercentage: comparison.percentage,
    isAboveBenchmark: comparison.isAbove,
    accuracy,
  };
}

// Reducer
function variantEReducer(state: VariantEState, action: VariantEAction): VariantEState {
  switch (action.type) {
    case 'SET_INDUSTRY': {
      const newAnswers = { ...state.answers, industry: action.value };
      return {
        ...state,
        answers: newAnswers,
        calculated: { ...state.calculated, ...recalculate(newAnswers) },
      };
    }

    case 'SET_SPEND': {
      const newAnswers = { ...state.answers, spend: action.value };
      return {
        ...state,
        answers: newAnswers,
        calculated: { ...state.calculated, ...recalculate(newAnswers) },
      };
    }

    case 'SET_EMAIL':
      return {
        ...state,
        answers: { ...state.answers, email: action.value },
      };

    case 'SET_TEAM_SIZE': {
      const newAnswers = { ...state.answers, teamSize: action.value };
      return {
        ...state,
        answers: newAnswers,
        calculated: { ...state.calculated, ...recalculate(newAnswers) },
      };
    }

    case 'TOGGLE_PAYMENT_METHOD': {
      const current = state.answers.paymentMethods;
      const newMethods = current.includes(action.value)
        ? current.filter((m) => m !== action.value)
        : [...current, action.value];
      const newAnswers = { ...state.answers, paymentMethods: newMethods };
      return {
        ...state,
        answers: newAnswers,
        calculated: { ...state.calculated, ...recalculate(newAnswers) },
      };
    }

    case 'TOGGLE_PAYMENT_TYPE': {
      const current = state.answers.paymentTypes;
      const newTypes = current.includes(action.value)
        ? current.filter((t) => t !== action.value)
        : [...current, action.value];
      const newAnswers = { ...state.answers, paymentTypes: newTypes };
      return {
        ...state,
        answers: newAnswers,
        calculated: { ...state.calculated, ...recalculate(newAnswers) },
      };
    }

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, VARIANT_E_TOTAL_STEPS) as 1 | 2 | 3 | 4,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1) as 1 | 2 | 3 | 4,
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.step,
      };

    case 'TOGGLE_SECTION': {
      const sections = state.ui.expandedSections;
      const newSections = sections.includes(action.sectionId)
        ? sections.filter((s) => s !== action.sectionId)
        : [...sections, action.sectionId];
      return {
        ...state,
        ui: { ...state.ui, expandedSections: newSections },
      };
    }

    case 'SET_CALCULATING':
      return {
        ...state,
        ui: { ...state.ui, isCalculating: action.isCalculating },
      };

    case 'SUBMIT_EMAIL':
      return {
        ...state,
        ui: { ...state.ui, emailSubmitted: true },
      };

    case 'TRIGGER_CONFETTI':
      return {
        ...state,
        ui: { ...state.ui, showConfetti: true },
      };

    case 'HIDE_CONFETTI':
      return {
        ...state,
        ui: { ...state.ui, showConfetti: false },
      };

    case 'COMPLETE_FUNNEL':
      return {
        ...state,
        isComplete: true,
      };

    default:
      return state;
  }
}

// Context interface
interface VariantEContextValue {
  state: VariantEState;
  // Setters
  setIndustry: (value: string) => void;
  setSpend: (value: string) => void;
  setEmail: (value: string) => void;
  setTeamSize: (value: string) => void;
  togglePaymentMethod: (value: string) => void;
  togglePaymentType: (value: string) => void;
  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: 1 | 2 | 3 | 4) => void;
  // UI
  toggleSection: (sectionId: string) => void;
  submitEmail: () => void;
  triggerConfetti: () => void;
  hideConfetti: () => void;
  completeFunnel: () => void;
  // Validation
  canProceedFromStep2: () => boolean;
}

const VariantEContext = createContext<VariantEContextValue | null>(null);

// Provider
export function VariantEProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(variantEReducer, initialState);

  const setIndustry = useCallback((value: string) => {
    dispatch({ type: 'SET_INDUSTRY', value });
  }, []);

  const setSpend = useCallback((value: string) => {
    dispatch({ type: 'SET_SPEND', value });
  }, []);

  const setEmail = useCallback((value: string) => {
    dispatch({ type: 'SET_EMAIL', value });
  }, []);

  const setTeamSize = useCallback((value: string) => {
    dispatch({ type: 'SET_TEAM_SIZE', value });
  }, []);

  const togglePaymentMethod = useCallback((value: string) => {
    dispatch({ type: 'TOGGLE_PAYMENT_METHOD', value });
  }, []);

  const togglePaymentType = useCallback((value: string) => {
    dispatch({ type: 'TOGGLE_PAYMENT_TYPE', value });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const goToStep = useCallback((step: 1 | 2 | 3 | 4) => {
    dispatch({ type: 'GO_TO_STEP', step });
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    dispatch({ type: 'TOGGLE_SECTION', sectionId });
  }, []);

  const submitEmail = useCallback(() => {
    dispatch({ type: 'SUBMIT_EMAIL' });
  }, []);

  const triggerConfetti = useCallback(() => {
    dispatch({ type: 'TRIGGER_CONFETTI' });
  }, []);

  const hideConfetti = useCallback(() => {
    dispatch({ type: 'HIDE_CONFETTI' });
  }, []);

  const completeFunnel = useCallback(() => {
    dispatch({ type: 'COMPLETE_FUNNEL' });
  }, []);

  const canProceedFromStep2 = useCallback((): boolean => {
    return state.answers.industry !== null && state.answers.spend !== null;
  }, [state.answers.industry, state.answers.spend]);

  return (
    <VariantEContext.Provider
      value={{
        state,
        setIndustry,
        setSpend,
        setEmail,
        setTeamSize,
        togglePaymentMethod,
        togglePaymentType,
        nextStep,
        prevStep,
        goToStep,
        toggleSection,
        submitEmail,
        triggerConfetti,
        hideConfetti,
        completeFunnel,
        canProceedFromStep2,
      }}
    >
      {children}
    </VariantEContext.Provider>
  );
}

// Hook
export function useVariantE() {
  const context = useContext(VariantEContext);
  if (!context) {
    throw new Error('useVariantE must be used within a VariantEProvider');
  }
  return context;
}
