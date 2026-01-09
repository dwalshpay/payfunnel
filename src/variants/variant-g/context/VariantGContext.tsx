import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useCallback,
} from 'react';

// Registration data type
export interface AdvisorRegistrationData {
  practiceName: string;
  name: string;
  email: string;
  phone: string;
  abn: string;
}

// Portfolio calculator results
export interface PortfolioCalculation {
  annualPortfolioVolume: number;
  annualPointsPotential: number;
  equivalentFlights: number;
  equivalentHotelNights: number;
  advisorBonusPotential: number;
}

// State types
export interface VariantGAnswers {
  // Step 1: Portfolio Overview
  clientCount: number;
  avgMonthlyExpenses: 'low' | 'medium' | 'high' | 'very_high' | null;

  // Step 2: Client Mix
  industries: string[];
  clientType: 'sole_traders' | 'smes' | 'mid_market' | 'mixed' | null;

  // Step 4: Registration
  registration: AdvisorRegistrationData;
}

export interface VariantGState {
  currentStep: 'entry' | 1 | 2 | 3 | 4 | 'success';
  answers: VariantGAnswers;
  calculated: PortfolioCalculation;
  isLoading: boolean;
  isComplete: boolean;
  errors: Record<string, string>;
}

// Expense value mappings
export const EXPENSE_VALUES: Record<string, number> = {
  low: 7500,
  medium: 20000,
  high: 52500,
  very_high: 100000,
};

// Industry multipliers
export const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  construction: 1.3,
  trades: 1.2,
  professional: 1.0,
  healthcare: 1.0,
  retail: 0.9,
  property: 1.2,
  other: 1.0,
};

// Client type multipliers
export const CLIENT_TYPE_MULTIPLIERS: Record<string, number> = {
  sole_traders: 0.8,
  smes: 1.0,
  mid_market: 1.3,
  mixed: 1.1,
};

// Action types
type VariantGAction =
  | { type: 'SET_CLIENT_COUNT'; value: number }
  | { type: 'SET_AVG_EXPENSES'; value: 'low' | 'medium' | 'high' | 'very_high' }
  | { type: 'TOGGLE_INDUSTRY'; value: string }
  | { type: 'SET_CLIENT_TYPE'; value: 'sole_traders' | 'smes' | 'mid_market' | 'mixed' }
  | { type: 'SET_REGISTRATION_FIELD'; field: keyof AdvisorRegistrationData; value: string }
  | { type: 'START_FUNNEL' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: 'entry' | 1 | 2 | 3 | 4 | 'success' }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'COMPLETE_FUNNEL' }
  | { type: 'SET_ERROR'; field: string; message: string }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'RECALCULATE' };

// Calculate portfolio rewards
function calculatePortfolioRewards(answers: VariantGAnswers): PortfolioCalculation {
  const { clientCount, avgMonthlyExpenses, industries, clientType } = answers;

  if (!avgMonthlyExpenses) {
    return {
      annualPortfolioVolume: 0,
      annualPointsPotential: 0,
      equivalentFlights: 0,
      equivalentHotelNights: 0,
      advisorBonusPotential: 0,
    };
  }

  // Base calculation
  const monthlyExpenseValue = EXPENSE_VALUES[avgMonthlyExpenses];
  const annualVolume = clientCount * monthlyExpenseValue * 12;

  // Industry multiplier (weighted average if multiple selected)
  let industryMultiplier = 1.0;
  if (industries.length > 0) {
    const totalMultiplier = industries.reduce(
      (sum, ind) => sum + (INDUSTRY_MULTIPLIERS[ind] || 1.0),
      0
    );
    industryMultiplier = totalMultiplier / industries.length;
  }

  // Client type multiplier
  const clientTypeMultiplier = CLIENT_TYPE_MULTIPLIERS[clientType || 'mixed'];

  // Final calculation
  const adjustedVolume = annualVolume * industryMultiplier * clientTypeMultiplier;
  const annualPointsPotential = Math.round(adjustedVolume);

  return {
    annualPortfolioVolume: Math.round(adjustedVolume),
    annualPointsPotential,
    equivalentFlights: Math.floor(annualPointsPotential / 80000),
    equivalentHotelNights: Math.floor(annualPointsPotential / 25000),
    advisorBonusPotential: Math.round(adjustedVolume * 0.002),
  };
}

// Initial state
const initialAnswers: VariantGAnswers = {
  clientCount: 25,
  avgMonthlyExpenses: null,
  industries: [],
  clientType: null,
  registration: {
    practiceName: '',
    name: '',
    email: '',
    phone: '',
    abn: '',
  },
};

const initialState: VariantGState = {
  currentStep: 'entry',
  answers: initialAnswers,
  calculated: calculatePortfolioRewards(initialAnswers),
  isLoading: false,
  isComplete: false,
  errors: {},
};

// Step order for navigation
const STEP_ORDER: Array<'entry' | 1 | 2 | 3 | 4 | 'success'> = ['entry', 1, 2, 3, 4, 'success'];

// Reducer
function variantGReducer(state: VariantGState, action: VariantGAction): VariantGState {
  switch (action.type) {
    case 'SET_CLIENT_COUNT': {
      const newAnswers = { ...state.answers, clientCount: action.value };
      return {
        ...state,
        answers: newAnswers,
        calculated: calculatePortfolioRewards(newAnswers),
      };
    }

    case 'SET_AVG_EXPENSES': {
      const newAnswers = { ...state.answers, avgMonthlyExpenses: action.value };
      return {
        ...state,
        answers: newAnswers,
        calculated: calculatePortfolioRewards(newAnswers),
      };
    }

    case 'TOGGLE_INDUSTRY': {
      const currentIndustries = state.answers.industries;
      const newIndustries = currentIndustries.includes(action.value)
        ? currentIndustries.filter((i) => i !== action.value)
        : [...currentIndustries, action.value];
      const newAnswers = { ...state.answers, industries: newIndustries };
      return {
        ...state,
        answers: newAnswers,
        calculated: calculatePortfolioRewards(newAnswers),
      };
    }

    case 'SET_CLIENT_TYPE': {
      const newAnswers = { ...state.answers, clientType: action.value };
      return {
        ...state,
        answers: newAnswers,
        calculated: calculatePortfolioRewards(newAnswers),
      };
    }

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

    case 'START_FUNNEL':
      return {
        ...state,
        currentStep: 1,
      };

    case 'NEXT_STEP': {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep);
      const nextStep = STEP_ORDER[Math.min(currentIndex + 1, STEP_ORDER.length - 1)];
      return {
        ...state,
        currentStep: nextStep,
        isLoading: false,
      };
    }

    case 'PREV_STEP': {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep);
      const prevStep = STEP_ORDER[Math.max(currentIndex - 1, 0)];
      return {
        ...state,
        currentStep: prevStep,
      };
    }

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.step,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case 'COMPLETE_FUNNEL':
      return {
        ...state,
        currentStep: 'success',
        isComplete: true,
        isLoading: false,
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };

    case 'CLEAR_ERROR': {
      const { [action.field]: _, ...remainingErrors } = state.errors;
      return {
        ...state,
        errors: remainingErrors,
      };
    }

    case 'RECALCULATE':
      return {
        ...state,
        calculated: calculatePortfolioRewards(state.answers),
      };

    default:
      return state;
  }
}

// Context value type
interface VariantGContextValue {
  state: VariantGState;
  // Setters
  setClientCount: (value: number) => void;
  setAvgExpenses: (value: 'low' | 'medium' | 'high' | 'very_high') => void;
  toggleIndustry: (value: string) => void;
  setClientType: (value: 'sole_traders' | 'smes' | 'mid_market' | 'mixed') => void;
  setRegistrationField: (field: keyof AdvisorRegistrationData, value: string) => void;
  // Navigation
  startFunnel: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: 'entry' | 1 | 2 | 3 | 4 | 'success') => void;
  completeFunnel: () => void;
  // Validation
  canProceed: () => boolean;
  getStepProgress: () => { current: number; total: number; percent: number };
  // Errors
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
}

const VariantGContext = createContext<VariantGContextValue | null>(null);

// Provider
export function VariantGProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(variantGReducer, initialState);

  const setClientCount = useCallback((value: number) => {
    dispatch({ type: 'SET_CLIENT_COUNT', value });
  }, []);

  const setAvgExpenses = useCallback((value: 'low' | 'medium' | 'high' | 'very_high') => {
    dispatch({ type: 'SET_AVG_EXPENSES', value });
  }, []);

  const toggleIndustry = useCallback((value: string) => {
    dispatch({ type: 'TOGGLE_INDUSTRY', value });
  }, []);

  const setClientType = useCallback((value: 'sole_traders' | 'smes' | 'mid_market' | 'mixed') => {
    dispatch({ type: 'SET_CLIENT_TYPE', value });
  }, []);

  const setRegistrationField = useCallback(
    (field: keyof AdvisorRegistrationData, value: string) => {
      dispatch({ type: 'SET_REGISTRATION_FIELD', field, value });
    },
    []
  );

  const startFunnel = useCallback(() => {
    dispatch({ type: 'START_FUNNEL' });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    setTimeout(() => {
      dispatch({ type: 'NEXT_STEP' });
    }, 200);
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const goToStep = useCallback((step: 'entry' | 1 | 2 | 3 | 4 | 'success') => {
    dispatch({ type: 'GO_TO_STEP', step });
  }, []);

  const completeFunnel = useCallback(() => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_FUNNEL' });
    }, 300);
  }, []);

  const setError = useCallback((field: string, message: string) => {
    dispatch({ type: 'SET_ERROR', field, message });
  }, []);

  const clearError = useCallback((field: string) => {
    dispatch({ type: 'CLEAR_ERROR', field });
  }, []);

  const canProceed = useCallback((): boolean => {
    const { currentStep, answers } = state;
    const { registration } = answers;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?61|0)[2-9]\d{8}$/;

    switch (currentStep) {
      case 'entry':
        return true;

      case 1: // Portfolio Overview
        return answers.clientCount >= 5 && answers.avgMonthlyExpenses !== null;

      case 2: // Client Mix
        return answers.industries.length > 0 && answers.clientType !== null;

      case 3: // Dashboard Preview (no input required)
        return true;

      case 4: // Advisor Signup
        return (
          registration.practiceName.trim().length > 0 &&
          registration.name.trim().length > 0 &&
          emailRegex.test(registration.email) &&
          phoneRegex.test(registration.phone.replace(/\s/g, ''))
        );

      default:
        return false;
    }
  }, [state]);

  const getStepProgress = useCallback(() => {
    const stepNumber =
      state.currentStep === 'entry'
        ? 0
        : state.currentStep === 'success'
          ? 5
          : state.currentStep;
    return {
      current: stepNumber,
      total: 4,
      percent: (stepNumber / 4) * 100,
    };
  }, [state.currentStep]);

  return (
    <VariantGContext.Provider
      value={{
        state,
        setClientCount,
        setAvgExpenses,
        toggleIndustry,
        setClientType,
        setRegistrationField,
        startFunnel,
        nextStep,
        prevStep,
        goToStep,
        completeFunnel,
        canProceed,
        getStepProgress,
        setError,
        clearError,
      }}
    >
      {children}
    </VariantGContext.Provider>
  );
}

// Hook
export function useVariantG() {
  const context = useContext(VariantGContext);
  if (!context) {
    throw new Error('useVariantG must be used within a VariantGProvider');
  }
  return context;
}
