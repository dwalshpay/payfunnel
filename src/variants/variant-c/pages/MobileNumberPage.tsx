import { useState } from 'react';
import { useVariantC } from '../context/VariantCContext';
import { useRewardsCalculator } from '../hooks/useRewardsCalculator';

export function MobileNumberPage() {
  const { state, setRegistrationField, nextStep, canProceed } = useVariantC();
  const { answers, isLoading } = state;
  const { registration } = answers;
  const [isFocused, setIsFocused] = useState(false);

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('61')) {
      // International format: +61 4XX XXX XXX
      if (digits.length <= 2) return '+' + digits;
      if (digits.length <= 5) return '+61 ' + digits.slice(2);
      if (digits.length <= 8) return '+61 ' + digits.slice(2, 5) + ' ' + digits.slice(5);
      return '+61 ' + digits.slice(2, 5) + ' ' + digits.slice(5, 8) + ' ' + digits.slice(8, 11);
    } else if (digits.startsWith('0')) {
      // Local format: 04XX XXX XXX
      if (digits.length <= 4) return digits;
      if (digits.length <= 7) return digits.slice(0, 4) + ' ' + digits.slice(4);
      return digits.slice(0, 4) + ' ' + digits.slice(4, 7) + ' ' + digits.slice(7, 10);
    }
    return value;
  };

  const handleChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setRegistrationField('mobileNumber', formatted);
  };

  // Validation
  const mobileRegex = /^(\+?61|0)4\d{8}$/;
  const isValid = mobileRegex.test(registration.mobileNumber.replace(/\s/g, ''));

  const handleContinue = () => {
    if (canProceed()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with phone illustration */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#3866B0]/10 to-[#3866B0]/5 flex items-center justify-center">
          <svg className="w-10 h-10 text-[#3866B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[14px] text-[#6B7280]">We'll send you a verification code</p>
      </div>

      {/* Rewards reminder */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F0F7FF] border border-[#E2E9F9] rounded-full">
        <svg className="w-4 h-4 text-[#3866B0]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span className="font-semibold text-[#3866B0]">{rewards.formattedPoints}</span>
        <span className="text-[#6B7280] text-sm">ready to claim</span>
      </div>

      {/* Phone input */}
      <div className="space-y-2">
        <label className="block text-[14px] font-semibold text-[#283E48]">
          Australian mobile number
        </label>
        <div className="relative">
          {/* Country flag */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <span className="text-xl">🇦🇺</span>
            <span className="text-[#283E48] font-medium">+61</span>
            <div className="w-px h-6 bg-[#E2E9F9]" />
          </div>

          <input
            type="tel"
            value={registration.mobileNumber.replace(/^\+?61\s?/, '')}
            onChange={(e) => handleChange('0' + e.target.value.replace(/^0/, ''))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="4XX XXX XXX"
            className={`
              w-full h-14 pl-32 pr-14 rounded-xl border-2 bg-white text-[#283E48]
              text-lg font-medium tracking-wider
              placeholder:text-[#9CA3AF] transition-all duration-200
              ${isFocused
                ? 'border-[#3866B0] shadow-[0_0_0_4px_rgba(56,102,176,0.1)]'
                : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
            `}
          />

          {/* Validation indicator */}
          {registration.mobileNumber.length > 5 && (
            <div className={`
              absolute right-4 top-1/2 -translate-y-1/2
              w-7 h-7 rounded-full flex items-center justify-center
              transition-all duration-300
              ${isValid ? 'bg-[#22C55E]' : 'bg-[#E2E9F9]'}
            `}>
              {isValid ? (
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
            </div>
          )}
        </div>

        <p className="text-xs text-[#9CA3AF] mt-2">
          Format: 04XX XXX XXX
        </p>
      </div>

      {/* Info card */}
      <div className="bg-[#F0F7FF] rounded-xl p-4 border border-[#E2E9F9]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#3866B0]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#3866B0]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#283E48]">Why verify?</p>
            <p className="text-[13px] text-[#6B7280] mt-0.5">
              Mobile verification helps secure your account and enables instant notifications about your rewards
            </p>
          </div>
        </div>
      </div>

      {/* Double-dip rewards preview */}
      <div className="bg-gradient-to-r from-[#FAFBFC] to-white rounded-xl p-4 border border-[#F5F5F5]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide font-medium">Double-dip breakdown</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[14px] font-semibold text-[#283E48]">
                {rewards.doubleDip.creditCardPoints.toLocaleString()} card pts
              </span>
              <span className="text-[#9CA3AF]">+</span>
              <span className="text-[14px] font-semibold text-[#3866B0]">
                {rewards.doubleDip.payRewardsPoints.toLocaleString()} PayRewards
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DCFCE7] rounded-full">
            <svg className="w-3.5 h-3.5 text-[#22C55E]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-semibold text-[#166534]">Almost there!</span>
          </div>
        </div>
      </div>

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
        Send Verification Code
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

      {/* Privacy note */}
      <p className="text-[11px] text-center text-[#9CA3AF]">
        We'll only use your number for account verification and important updates
      </p>
    </div>
  );
}
