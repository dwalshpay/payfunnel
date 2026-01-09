import { useState, useEffect, useRef } from 'react';
import { useVariantA } from '../../context/VariantAContext';

export function VerificationCodeStep() {
  const { state, setRegistrationField, prevStep } = useVariantA();
  const { answers } = state;
  const { registration } = answers;

  const [resendTimer, setResendTimer] = useState(55);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize the code as array for individual inputs
  const codeDigits = registration.verificationCode.split('').concat(Array(6).fill('')).slice(0, 6);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept digits
    const digit = value.replace(/\D/g, '').slice(-1);

    // Update the full code
    const newDigits = [...codeDigits];
    newDigits[index] = digit;
    const newCode = newDigits.join('').slice(0, 6);
    setRegistrationField('verificationCode', newCode);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!codeDigits[index] && index > 0) {
        // If current is empty, go back and clear previous
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...codeDigits];
        newDigits[index - 1] = '';
        setRegistrationField('verificationCode', newDigits.join(''));
      }
    }
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    setRegistrationField('verificationCode', pastedData);

    // Focus the appropriate input
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(55);
      setCanResend(false);
      // Here you would trigger the actual resend API call
    }
  };

  const handleCancel = () => {
    // Clear verification code and go back to mobile number step
    setRegistrationField('verificationCode', '');
    prevStep();
  };

  // Format phone number for display
  const maskedPhone = registration.mobileNumber.replace(/(\d{4})\s?(\d{3})\s?(\d{3})/, '$1 *** $3');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header illustration */}
      <div className="flex justify-center mb-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3866B0]/10 to-[#3866B0]/5 flex items-center justify-center relative">
          <svg className="w-10 h-10 text-[#3866B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          {/* Animated pulse */}
          <div className="absolute inset-0 rounded-full bg-[#3866B0]/10 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Instruction text */}
      <div className="text-center space-y-2">
        <p className="text-[#6B7280]">
          We've sent a 6-digit code to
        </p>
        <p className="font-semibold text-[#283E48]">{maskedPhone}</p>
      </div>

      {/* OTP input grid */}
      <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={codeDigits[index]}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`
              w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl
              border-2 transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-[#3866B0]/10 focus:border-[#3866B0]
              ${codeDigits[index]
                ? 'border-[#3866B0] bg-[#3866B0]/5 text-[#3866B0]'
                : 'border-slate-200 bg-white text-[#283E48]'
              }
            `}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {/* Resend section */}
      <div className="text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-[#3866B0] font-medium hover:underline transition-all"
          >
            Resend code
          </button>
        ) : (
          <p className="text-sm text-[#9CA3AF]">
            Resend code in{' '}
            <span className="font-semibold text-[#6B7280]">{resendTimer}s</span>
          </p>
        )}
      </div>

      {/* Cancel link */}
      <div className="text-center">
        <button
          onClick={handleCancel}
          className="text-sm text-[#6B7280] hover:text-[#3866B0] transition-colors"
        >
          Cancel and change number
        </button>
      </div>

      {/* Help text */}
      <div className="bg-slate-50 rounded-xl p-4 text-center">
        <p className="text-sm text-[#6B7280]">
          Didn't receive the code? Check your spam folder or try a different number.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
