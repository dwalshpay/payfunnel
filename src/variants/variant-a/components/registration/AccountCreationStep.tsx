import { useState } from 'react';
import { useVariantA, type RegistrationData } from '../../context/VariantAContext';
import { useRewardsCalculator } from '../../hooks/useRewardsCalculator';

export function AccountCreationStep() {
  const { state, setRegistrationField } = useVariantA();
  const { answers } = state;
  const { registration } = answers;
  const [showPassword, setShowPassword] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);

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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Rewards highlight banner */}
      <div className="bg-gradient-to-r from-[#3866B0]/10 via-[#3866B0]/5 to-transparent rounded-2xl p-4 border border-[#3866B0]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3866B0]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#3866B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#6B7280]">Your estimated annual points</p>
            <p className="text-xl font-bold text-[#3866B0]">{rewards.formattedPoints}</p>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#283E48]">
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              value={registration.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@company.com"
              className="w-full h-12 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-[#283E48] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3866B0]/10 focus:border-[#3866B0] transition-all"
            />
            {registration.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isEmailValid ? (
                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
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
            <label className="block text-sm font-medium text-[#283E48]">
              First name
            </label>
            <div className="relative">
              <input
                type="text"
                value={registration.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="John"
                className="w-full h-12 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-[#283E48] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3866B0]/10 focus:border-[#3866B0] transition-all"
              />
              {registration.firstName && isFirstNameValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Last name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#283E48]">
              Last name
            </label>
            <div className="relative">
              <input
                type="text"
                value={registration.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Smith"
                className="w-full h-12 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-[#283E48] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3866B0]/10 focus:border-[#3866B0] transition-all"
              />
              {registration.lastName && isLastNameValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#283E48]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={registration.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full h-12 px-4 pr-20 rounded-xl border border-slate-200 bg-white text-[#283E48] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3866B0]/10 focus:border-[#3866B0] transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
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
                <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          {registration.password && !isPasswordValid && (
            <p className="text-xs text-amber-600 mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Referral code accordion */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowReferralCode(!showReferralCode)}
            className="w-full px-4 py-3 flex items-center justify-between text-sm text-[#6B7280] hover:bg-slate-50 transition-colors"
          >
            <span>Have a referral code?</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showReferralCode ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {showReferralCode && (
            <div className="px-4 pb-4 animate-slideDown">
              <input
                type="text"
                value={registration.referralCode}
                onChange={(e) => handleChange('referralCode', e.target.value.toUpperCase())}
                placeholder="Enter code"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#283E48] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3866B0]/10 focus:border-[#3866B0] transition-all text-sm uppercase"
              />
            </div>
          )}
        </div>
      </div>

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 py-3 text-sm text-[#6B7280]">
        <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>Your data is protected with 256-bit encryption</span>
      </div>

      {/* Terms */}
      <p className="text-xs text-center text-[#9CA3AF] leading-relaxed">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-[#3866B0] hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-[#3866B0] hover:underline">Privacy Policy</a>
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
