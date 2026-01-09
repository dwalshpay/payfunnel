import { useState, useEffect, useRef } from 'react';
import { useVariantB } from '../../context/VariantBContext';

export function VerificationCodeStep() {
  const { state, setRegistrationField, prevStep } = useVariantB();
  const { answers, pointsEarned } = state;
  const { registration } = answers;

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(55);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Sync code array with registration state
  useEffect(() => {
    setRegistrationField('verificationCode', code.join(''));
  }, [code, setRegistrationField]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only take the last digit
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);
    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(d => !d);
    inputRefs.current[nextEmptyIndex === -1 ? 5 : nextEmptyIndex]?.focus();
  };

  // Resend code
  const handleResend = () => {
    if (resendTimer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResendTimer(55);
    }, 1000);
  };

  const isComplete = code.every(d => d !== '');

  // Animated points display
  const [displayPoints, setDisplayPoints] = useState(0);
  useEffect(() => {
    const target = pointsEarned;
    const duration = 600;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayPoints(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [pointsEarned]);

  // Mask phone number for display
  const maskedPhone = registration.mobileNumber.replace(/(\d{4})\s?(\d{3})\s?(\d{3})/, '•••• ••• $3');

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#283E48] mb-1">Check your phone</h2>
        <p className="text-sm text-[#6B7280]">
          We sent a 6-digit code to <span className="font-medium text-[#283E48]">{maskedPhone}</span>
        </p>
      </div>

      {/* Points celebration banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#F0F7FF] to-[#E8F4FF] rounded-xl p-4 border border-[#E2E9F9]">
        <div className="absolute top-0 right-0 text-6xl opacity-10">🎉</div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide">Points earned</p>
            <p className="text-2xl font-bold text-[#3866B0]">{displayPoints.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-600 font-medium">+500 bonus</p>
            <p className="text-sm text-[#6B7280]">for verification</p>
          </div>
        </div>
      </div>

      {/* Code input */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-[#283E48] text-center">
          Enter verification code
        </label>
        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`
                w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2
                transition-all duration-200 bg-white
                ${digit
                  ? 'border-[#3866B0] text-[#283E48]'
                  : 'border-[#E0E0E0] text-slate-400'}
                focus:outline-none focus:border-[#3866B0] focus:shadow-[0_0_0_4px_rgba(56,102,176,0.15)]
              `}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Completion indicator */}
        {isComplete && (
          <div className="flex items-center justify-center gap-2 text-emerald-600 animate-fadeIn">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Code complete!</span>
          </div>
        )}
      </div>

      {/* Resend section */}
      <div className="text-center space-y-2">
        {resendTimer > 0 ? (
          <p className="text-sm text-[#9CA3AF]">
            Resend code in <span className="font-semibold text-[#283E48]">{resendTimer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-sm font-semibold text-[#3866B0] hover:text-[#2D5490] transition-colors disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        )}

        <p className="text-xs text-[#9CA3AF]">
          Didn't receive it? Check your spam folder
        </p>
      </div>

      {/* Change number link */}
      <div className="text-center pt-2">
        <button
          onClick={prevStep}
          className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors underline-offset-2 hover:underline"
        >
          Change phone number
        </button>
      </div>

      {/* Final step indicator */}
      <div className="flex items-center justify-center gap-2 py-2">
        <div className="flex gap-1">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step <= 3 ? 'bg-[#3866B0]' : 'bg-[#E0E0E0]'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-[#9CA3AF]">Final step</span>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
