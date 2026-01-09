import { useState } from 'react';
import { useVariantC, type RegistrationData } from '../context/VariantCContext';
import { useRewardsCalculator } from '../hooks/useRewardsCalculator';

export function AccountCreationPage() {
  const { state, setRegistrationField, nextStep, canProceed } = useVariantC();
  const { answers, isLoading } = state;
  const { registration } = answers;
  const [showPassword, setShowPassword] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  // Validation helpers
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(registration.email);
  const isFirstNameValid = registration.firstName.trim().length > 0;
  const isLastNameValid = registration.lastName.trim().length > 0;
  const isPasswordValid = registration.password.length >= 6;

  const handleChange = (field: keyof RegistrationData, value: string) => {
    setRegistrationField(field, value);
  };

  const handleContinue = () => {
    if (canProceed()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-5">
      {/* Rewards summary banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#3866B0] to-[#5B8AD0] rounded-2xl p-4 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80 font-medium">Your annual rewards</p>
            <p className="text-2xl font-bold tracking-tight">{rewards.formattedPoints}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Confidence</p>
            <div className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${
                rewards.confidence === 'high' ? 'bg-[#86EFAC]' :
                rewards.confidence === 'medium' ? 'bg-[#FCD34D]' : 'bg-white/50'
              }`} />
              <span className="text-sm font-semibold capitalize">{rewards.confidence}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F0F7FF] border border-[#E2E9F9] rounded-full text-sm font-medium text-[#3866B0]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Secure your rewards</span>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-[14px] font-semibold text-[#283E48]">
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              value={registration.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="you@company.com"
              className={`
                w-full h-12 px-4 pr-12 rounded-xl border-2 bg-white text-[#283E48]
                placeholder:text-[#9CA3AF] transition-all duration-200
                ${focusedField === 'email'
                  ? 'border-[#3866B0] shadow-[0_0_0_4px_rgba(56,102,176,0.1)]'
                  : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
              `}
            />
            {registration.email && (
              <div className={`
                absolute right-4 top-1/2 -translate-y-1/2
                w-5 h-5 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isEmailValid ? 'bg-[#22C55E]' : 'bg-red-400'}
              `}>
                {isEmailValid ? (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          {/* First name */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-semibold text-[#283E48]">First name</label>
            <div className="relative">
              <input
                type="text"
                value={registration.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                placeholder="John"
                className={`
                  w-full h-12 px-4 pr-10 rounded-xl border-2 bg-white text-[#283E48]
                  placeholder:text-[#9CA3AF] transition-all duration-200
                  ${focusedField === 'firstName'
                    ? 'border-[#3866B0] shadow-[0_0_0_4px_rgba(56,102,176,0.1)]'
                    : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
                `}
              />
              {registration.firstName && isFirstNameValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Last name */}
          <div className="space-y-1.5">
            <label className="block text-[14px] font-semibold text-[#283E48]">Last name</label>
            <div className="relative">
              <input
                type="text"
                value={registration.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Smith"
                className={`
                  w-full h-12 px-4 pr-10 rounded-xl border-2 bg-white text-[#283E48]
                  placeholder:text-[#9CA3AF] transition-all duration-200
                  ${focusedField === 'lastName'
                    ? 'border-[#3866B0] shadow-[0_0_0_4px_rgba(56,102,176,0.1)]'
                    : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
                `}
              />
              {registration.lastName && isLastNameValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[14px] font-semibold text-[#283E48]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={registration.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="Minimum 6 characters"
              className={`
                w-full h-12 px-4 pr-24 rounded-xl border-2 bg-white text-[#283E48]
                placeholder:text-[#9CA3AF] transition-all duration-200
                ${focusedField === 'password'
                  ? 'border-[#3866B0] shadow-[0_0_0_4px_rgba(56,102,176,0.1)]'
                  : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
              `}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F0F4F8] transition-all"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
              {registration.password && isPasswordValid && (
                <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {registration.password && registration.password.length > 0 && registration.password.length < 6 && (
            <div className="flex items-center gap-1.5 mt-1.5 text-[#F59E0B]">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs font-medium">Password must be at least 6 characters</span>
            </div>
          )}
        </div>

        {/* Referral code accordion */}
        <div className="border-2 border-[#E2E9F9] rounded-xl overflow-hidden hover:border-[#BDBDBD] transition-colors">
          <button
            type="button"
            onClick={() => setShowReferralCode(!showReferralCode)}
            className="w-full px-4 py-3 flex items-center justify-between text-[13px] font-medium text-[#6B7280] hover:bg-[#FAFBFC] transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Have a referral code? Get bonus points!</span>
            </div>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${showReferralCode ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-200 ${showReferralCode ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 pb-4">
              <input
                type="text"
                value={registration.referralCode}
                onChange={(e) => handleChange('referralCode', e.target.value.toUpperCase())}
                placeholder="Enter your code"
                className="w-full h-11 px-3 rounded-lg border-2 border-[#E2E9F9] bg-[#FAFBFC] text-[#283E48] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3866B0] transition-colors text-sm uppercase tracking-wider font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
          <svg className="w-4 h-4 text-[#22C55E]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>256-bit SSL</span>
        </div>
        <span className="text-[#E2E9F9]">|</span>
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
          <svg className="w-4 h-4 text-[#3866B0]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Bank-level security</span>
        </div>
      </div>

      {/* Terms */}
      <p className="text-[11px] text-center text-[#9CA3AF] leading-relaxed">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-[#3866B0] hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-[#3866B0] hover:underline">Privacy Policy</a>
      </p>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!canProceed() || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-[15px] transition-all ${
          canProceed() && !isLoading
            ? 'bg-[#3866B0] hover:bg-[#2D5490] text-white shadow-md hover:shadow-lg'
            : 'bg-[#E2E9F9] text-[#9CA3AF] cursor-not-allowed'
        }`}
      >
        Continue
        <svg
          className="inline-block ml-2 w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
