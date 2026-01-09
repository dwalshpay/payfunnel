import { useState } from 'react';
import type { RegistrationData } from '../../types/funnel';

interface AccountCreationFormProps {
  registration: RegistrationData;
  onFieldChange: (field: keyof RegistrationData, value: string) => void;
  estimatedPoints?: number;
}

export function AccountCreationForm({
  registration,
  onFieldChange,
  estimatedPoints = 156000,
}: AccountCreationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = (field: keyof RegistrationData) => {
    if (field === 'email' && registration.email && !validateEmail(registration.email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFieldValid = (field: keyof RegistrationData, value: string): boolean => {
    if (!value) return false;
    if (field === 'email') return validateEmail(value);
    return value.trim().length > 0;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Headline */}
      <div className="pb-2">
        <h1 className="text-[28px] font-bold text-[#283E48] leading-[1.2] tracking-[0.2px]">
          <span className="italic">Create your free account to start</span>
          <br />
          <span className="italic">earning </span>
          <span className="text-[#3866B0] italic">{estimatedPoints.toLocaleString()}</span>
          <span className="italic"> points</span>
        </h1>
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-medium text-[#283E48]">Email</label>
        <div className="relative">
          <input
            type="email"
            value={registration.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="Enter email"
            className={`
              w-full px-4 py-3 rounded-lg border text-[16px] text-[#283E48]
              placeholder:text-[#9CA3AF] transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]
              ${errors.email ? 'border-red-400' : 'border-[#E5E7EB]'}
            `}
          />
          {isFieldValid('email', registration.email) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-[#3866B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Name fields - side by side */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-medium text-[#283E48]">First name (legal)</label>
          <div className="relative">
            <input
              type="text"
              value={registration.firstName}
              onChange={(e) => onFieldChange('firstName', e.target.value)}
              placeholder="First name"
              className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[16px] text-[#283E48] placeholder:text-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]"
            />
            {isFieldValid('firstName', registration.firstName) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-[#3866B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-medium text-[#283E48]">Last name (legal)</label>
          <div className="relative">
            <input
              type="text"
              value={registration.lastName}
              onChange={(e) => onFieldChange('lastName', e.target.value)}
              placeholder="Last name"
              className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[16px] text-[#283E48] placeholder:text-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]"
            />
            {isFieldValid('lastName', registration.lastName) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-[#3866B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-medium text-[#283E48]">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={registration.password}
            onChange={(e) => onFieldChange('password', e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 pr-12 rounded-lg border border-[#E5E7EB] text-[16px] text-[#283E48] placeholder:text-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#283E48] transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-2 text-[#6B7280]">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-[13px]">Protected with same security as major banks</span>
      </div>

      {/* Referral code accordion */}
      <div className="border-t border-[#E5E7EB] pt-4">
        <button
          type="button"
          onClick={() => setShowReferral(!showReferral)}
          className="w-full flex items-center justify-between text-[#283E48] font-medium"
        >
          <span>Referral code (Optional)</span>
          <svg
            className={`w-5 h-5 transition-transform ${showReferral ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showReferral && (
          <div className="mt-3">
            <input
              type="text"
              value={registration.referralCode}
              onChange={(e) => onFieldChange('referralCode', e.target.value)}
              placeholder="Enter your 6-digit referral code"
              className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[16px] text-[#283E48] placeholder:text-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]"
            />
          </div>
        )}
      </div>

      {/* Terms and conditions */}
      <p className="text-[13px] text-[#6B7280] leading-relaxed">
        By continuing, I agree to the{' '}
        <a href="/terms" className="text-[#3866B0] hover:underline">
          Terms & Conditions
        </a>{' '}
        and the{' '}
        <a href="/privacy" className="text-[#3866B0] hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
