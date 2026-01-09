import { useRef, useState, useEffect } from 'react';
import type { RegistrationData } from '../../types/funnel';

interface VerificationCodeInputProps {
  registration: RegistrationData;
  onFieldChange: (field: keyof RegistrationData, value: string) => void;
  onCancel: () => void;
}

export function VerificationCodeInput({
  registration,
  onFieldChange,
  onCancel,
}: VerificationCodeInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [resendTimer, setResendTimer] = useState(55);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Sync digits to verification code
  useEffect(() => {
    const code = digits.join('');
    onFieldChange('verificationCode', code);
  }, [digits, onFieldChange]);

  // Initialize from existing value
  useEffect(() => {
    if (registration.verificationCode) {
      const existingDigits = registration.verificationCode.split('').slice(0, 6);
      setDigits([...existingDigits, ...Array(6 - existingDigits.length).fill('')]);
    }
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.slice(-1);
    if (digit && !/^\d$/.test(digit)) return;

    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newDigits = [...pastedData.split(''), ...Array(6 - pastedData.length).fill('')];
      setDigits(newDigits);
      // Focus the input after the last pasted digit
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    // Reset timer and clear digits
    setResendTimer(55);
    setCanResend(false);
    setDigits(Array(6).fill(''));
    inputRefs.current[0]?.focus();
    // In a real app, this would trigger an API call to resend the code
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Headline */}
      <div className="pb-2">
        <h1 className="text-[28px] font-bold text-[#283E48] leading-[1.2] tracking-[0.2px]">
          Enter your mobile number to receive your verification code
        </h1>
        <p className="text-[16px] text-[#6B7280] mt-3">
          We'll send you a code in the next step to verify your number.
        </p>
      </div>

      {/* 6-digit code input */}
      <div className="flex justify-center gap-3" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-[24px] font-semibold text-[#283E48] border border-[#E5E7EB] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]"
          />
        ))}
      </div>

      {/* Resend section */}
      <div className="text-center">
        <p className="text-[14px] text-[#283E48]">Didn't receive the code?</p>
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-[14px] text-[#3866B0] hover:underline mt-1"
          >
            Resend code
          </button>
        ) : (
          <p className="text-[13px] text-[#6B7280] mt-1">
            Resend code in {resendTimer} seconds
          </p>
        )}
      </div>

      {/* Cancel link */}
      <div className="text-center">
        <button
          type="button"
          onClick={onCancel}
          className="text-[14px] text-[#3866B0] hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
