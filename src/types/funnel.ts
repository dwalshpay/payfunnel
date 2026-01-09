export interface RegistrationData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  referralCode: string;
  mobileNumber: string;
  verificationCode: string;
}

export interface FunnelAnswers {
  role: string | null;
  industry: string | null;
  employees: string | null;
  paymentMethods: string[];
  paymentTypes: string[];
  monthlyExpenses: string;
  priorities: string[];
  redemptionOptions: string[];
  partners: string[];
  otherInputs: Record<string, string>;
  registration: RegistrationData;
}

export interface FunnelState {
  currentStep: number;
  answers: FunnelAnswers;
  isLoading: boolean;
  isComplete: boolean;
}

export type FunnelAction =
  | { type: 'SET_SINGLE_ANSWER'; field: keyof FunnelAnswers; value: string }
  | { type: 'SET_MULTI_ANSWER'; field: keyof FunnelAnswers; value: string[] }
  | { type: 'SET_OTHER_INPUT'; field: string; value: string }
  | { type: 'SET_REGISTRATION_FIELD'; field: keyof RegistrationData; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'COMPLETE_FUNNEL' };

export interface StepOption {
  id: string;
  label: string;
  icon?: string;
  hasOtherInput?: boolean;
}

export interface StepConfig {
  id: string;
  title: string;
  subtitle?: string;
  selectLabel: string;
  type: 'single' | 'multi' | 'input' | 'registration';
  field: keyof FunnelAnswers;
  options?: StepOption[];
  inputLabel?: string;
  inputPrefix?: string;
  hasTooltip?: boolean;
  tooltipText?: string;
  registrationComponent?: 'AccountCreationForm' | 'MobileNumberInput' | 'VerificationCodeInput';
}
