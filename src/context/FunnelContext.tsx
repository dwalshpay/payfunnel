import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { FunnelState, FunnelAction, FunnelAnswers } from '../types/funnel';
import { TOTAL_STEPS } from '../data/stepConfig';

const initialAnswers: FunnelAnswers = {
  role: null,
  industry: null,
  employees: null,
  paymentMethods: [],
  paymentTypes: [],
  monthlyExpenses: '',
  priorities: [],
  redemptionOptions: [],
  partners: [],
  otherInputs: {},
};

const initialState: FunnelState = {
  currentStep: 0,
  answers: initialAnswers,
  isLoading: false,
};

function funnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case 'SET_SINGLE_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.field]: action.value,
        },
      };
    case 'SET_MULTI_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.field]: action.value,
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
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.value,
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.step, TOTAL_STEPS - 1)),
      };
    default:
      return state;
  }
}

interface FunnelContextValue {
  state: FunnelState;
  dispatch: React.Dispatch<FunnelAction>;
  setSingleAnswer: (field: keyof FunnelAnswers, value: string) => void;
  setMultiAnswer: (field: keyof FunnelAnswers, value: string[]) => void;
  toggleMultiAnswer: (field: keyof FunnelAnswers, value: string) => void;
  setOtherInput: (field: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: () => boolean;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(funnelReducer, initialState);

  const setSingleAnswer = (field: keyof FunnelAnswers, value: string) => {
    dispatch({ type: 'SET_SINGLE_ANSWER', field, value });
  };

  const setMultiAnswer = (field: keyof FunnelAnswers, value: string[]) => {
    dispatch({ type: 'SET_MULTI_ANSWER', field, value });
  };

  const toggleMultiAnswer = (field: keyof FunnelAnswers, value: string) => {
    const currentValues = state.answers[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    dispatch({ type: 'SET_MULTI_ANSWER', field, value: newValues });
  };

  const setOtherInput = (field: string, value: string) => {
    dispatch({ type: 'SET_OTHER_INPUT', field, value });
  };

  const nextStep = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    setTimeout(() => {
      dispatch({ type: 'NEXT_STEP' });
      dispatch({ type: 'SET_LOADING', value: false });
    }, 500);
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const goToStep = (step: number) => {
    dispatch({ type: 'GO_TO_STEP', step });
  };

  const canProceed = (): boolean => {
    const { currentStep, answers } = state;
    const fields: (keyof FunnelAnswers)[] = [
      'role',
      'industry',
      'employees',
      'paymentMethods',
      'paymentTypes',
      'monthlyExpenses',
      'priorities',
      'redemptionOptions',
      'partners',
    ];
    const field = fields[currentStep];
    const value = answers[field];

    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null;
  };

  return (
    <FunnelContext.Provider
      value={{
        state,
        dispatch,
        setSingleAnswer,
        setMultiAnswer,
        toggleMultiAnswer,
        setOtherInput,
        nextStep,
        prevStep,
        goToStep,
        canProceed,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
}

export function useFunnel() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
}
