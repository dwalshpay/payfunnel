import { useState } from 'react';
import { useVariantE } from '../context/VariantEContext';
import { AccuracyMeter } from './AccuracyMeter';
import { VariantELayout } from './layout/VariantELayout';

export function AccountCreationStep() {
  const {
    state,
    setFirstName,
    setLastName,
    setPassword,
    setReferralCode,
    completeFunnel,
    canProceedFromStep5,
    triggerConfetti,
  } = useVariantE();

  const { answers, calculated } = state;
  const [showPassword, setShowPassword] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation helpers
  const isFirstNameValid = answers.firstName !== null && answers.firstName.trim().length > 0;
  const isLastNameValid = answers.lastName !== null && answers.lastName.trim().length > 0;
  const isPasswordValid = answers.password !== null && answers.password.length >= 6;

  const handleSubmit = () => {
    if (canProceedFromStep5()) {
      triggerConfetti();
      setTimeout(() => {
        completeFunnel();
      }, 300);
    }
  };

  // Format points with commas
  const formattedPoints = calculated.userPoints.toLocaleString();

  return (
    <VariantELayout>
      <div className="min-h-screen bg-gradient-to-b from-[#E8EEF5] via-[#F0F4F8] to-[#F8FAFC] pb-32">
        <div className="max-w-lg mx-auto px-4 pt-6">
          {/* Header */}
          <div
            className="text-center mb-6"
            style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B67A]/10 rounded-full mb-4">
              <svg className="w-5 h-5 text-[#00B67A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-sm font-semibold text-[#00B67A]">Almost there!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#283E48] mb-2">
              Secure your rewards
            </h1>
            <p className="text-[#6B7280]">
              Create your account to start earning
            </p>
          </div>

          {/* Points summary card */}
          <div
            className="bg-gradient-to-br from-[#3866B0] to-[#2D5490] rounded-2xl p-5 mb-6 text-white relative overflow-hidden"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.1s forwards', opacity: 0 }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 font-medium">Your annual rewards</p>
                <p className="text-3xl font-bold tracking-tight mt-1">{formattedPoints} pts</p>
                <p className="text-sm text-white/70 mt-1">
                  {calculated.isAboveBenchmark ? (
                    <span className="text-[#86EFAC]">
                      +{calculated.comparisonPercentage}% above average
                    </span>
                  ) : (
                    <span>Ready to unlock</span>
                  )}
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Email confirmation (read-only) */}
          {answers.email && (
            <div
              className="bg-white/60 backdrop-blur rounded-xl p-4 mb-4 border border-[#E2E9F9]"
              style={{ animation: 'fadeInUp 0.5s ease-out 0.15s forwards', opacity: 0 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00B67A]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00B67A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#6B7280] font-medium">Email confirmed</p>
                  <p className="text-sm text-[#283E48] font-semibold truncate">{answers.email}</p>
                </div>
                <svg className="w-5 h-5 text-[#00B67A] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          )}

          {/* Form fields */}
          <div
            className="bg-white rounded-2xl shadow-lg shadow-[#3866B0]/5 border border-[#E2E9F9] p-5 mb-6"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.2s forwards', opacity: 0 }}
          >
            <div className="space-y-4">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                {/* First name */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-[#283E48]">First name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={answers.firstName || ''}
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John"
                      className={`
                        w-full h-12 px-4 pr-10 rounded-xl border-2 bg-white text-[#283E48]
                        placeholder:text-[#BDBDBD] transition-all duration-200
                        ${focusedField === 'firstName'
                          ? 'border-[#3866B0] ring-2 ring-[#3866B0]/20'
                          : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
                      `}
                    />
                    {answers.firstName && isFirstNameValid && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00B67A] flex items-center justify-center animate-scaleIn">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Last name */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-[#283E48]">Last name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={answers.lastName || ''}
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Smith"
                      className={`
                        w-full h-12 px-4 pr-10 rounded-xl border-2 bg-white text-[#283E48]
                        placeholder:text-[#BDBDBD] transition-all duration-200
                        ${focusedField === 'lastName'
                          ? 'border-[#3866B0] ring-2 ring-[#3866B0]/20'
                          : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
                      `}
                    />
                    {answers.lastName && isLastNameValid && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00B67A] flex items-center justify-center animate-scaleIn">
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
                <label className="block text-sm font-semibold text-[#283E48]">Create password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={answers.password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Minimum 6 characters"
                    className={`
                      w-full h-12 px-4 pr-20 rounded-xl border-2 bg-white text-[#283E48]
                      placeholder:text-[#BDBDBD] transition-all duration-200
                      ${focusedField === 'password'
                        ? 'border-[#3866B0] ring-2 ring-[#3866B0]/20'
                        : 'border-[#E2E9F9] hover:border-[#BDBDBD]'}
                    `}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 rounded-lg text-[#BDBDBD] hover:text-[#6B7280] hover:bg-[#F5F5F5] transition-all"
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
                    {answers.password && isPasswordValid && (
                      <div className="w-5 h-5 rounded-full bg-[#00B67A] flex items-center justify-center animate-scaleIn">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {answers.password && answers.password.length > 0 && answers.password.length < 6 && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-amber-600">
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
                  className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-[#6B7280] hover:bg-[#F8FAFC] transition-colors"
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
                <div className={`overflow-hidden transition-all duration-300 ${showReferralCode ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-4 pb-4">
                    <input
                      type="text"
                      value={answers.referralCode || ''}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                      placeholder="Enter your code"
                      className="w-full h-10 px-3 rounded-lg border-2 border-[#E2E9F9] bg-[#F8FAFC] text-[#283E48] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#3866B0] transition-colors text-sm uppercase tracking-wider font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div
            className="flex items-center justify-center gap-4 mb-6"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.25s forwards', opacity: 0 }}
          >
            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <svg className="w-4 h-4 text-[#00B67A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>256-bit SSL</span>
            </div>
            <span className="w-px h-4 bg-[#E2E9F9]" />
            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <svg className="w-4 h-4 text-[#3866B0]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Bank-level security</span>
            </div>
          </div>

          {/* Terms */}
          <p
            className="text-[11px] text-center text-[#9CA3AF] leading-relaxed mb-6"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.3s forwards', opacity: 0 }}
          >
            By creating an account, you agree to our{' '}
            <a href="#" className="text-[#3866B0] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#3866B0] hover:underline">Privacy Policy</a>
          </p>

          {/* Accuracy meter */}
          <div style={{ animation: 'fadeInUp 0.5s ease-out 0.35s forwards', opacity: 0 }}>
            <AccuracyMeter percentage={100} label="Profile complete" />
          </div>
        </div>

        {/* Fixed bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-6 px-4 safe-area-bottom">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handleSubmit}
              disabled={!canProceedFromStep5()}
              className={`
                w-full h-14 rounded-xl font-bold text-base tracking-wide transition-all duration-300
                ${canProceedFromStep5()
                  ? 'bg-gradient-to-r from-[#3866B0] to-[#5A8AD4] text-white shadow-lg shadow-[#3866B0]/30 hover:shadow-xl hover:shadow-[#3866B0]/40 active:scale-[0.98]'
                  : 'bg-[#E2E9F9] text-[#9CA3AF] cursor-not-allowed'}
              `}
            >
              Create Account & Start Earning
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
        .safe-area-bottom {
          padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </VariantELayout>
  );
}
