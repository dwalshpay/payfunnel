import type { RegistrationData } from '../../types/funnel';

interface MobileNumberInputProps {
  registration: RegistrationData;
  onFieldChange: (field: keyof RegistrationData, value: string) => void;
}

export function MobileNumberInput({
  registration,
  onFieldChange,
}: MobileNumberInputProps) {
  const validateAustralianNumber = (number: string): boolean => {
    // Remove spaces and dashes for validation
    const cleaned = number.replace(/[\s-]/g, '');
    // Australian mobile numbers: 04XX XXX XXX (10 digits starting with 04)
    // Or with country code: +614XX XXX XXX
    const mobileRegex = /^(?:\+61|0)4\d{8}$/;
    return mobileRegex.test(cleaned);
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits except leading +
    let cleaned = value.replace(/[^\d+]/g, '');

    // If starts with +61, format as international
    if (cleaned.startsWith('+61')) {
      const rest = cleaned.slice(3);
      if (rest.length <= 3) return `+61 ${rest}`;
      if (rest.length <= 6) return `+61 ${rest.slice(0, 3)} ${rest.slice(3)}`;
      return `+61 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6, 9)}`;
    }

    // Standard 04XX format
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onFieldChange('mobileNumber', formatted);
  };

  const isValid = validateAustralianNumber(registration.mobileNumber);

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

      {/* Mobile number field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-medium text-[#283E48]">Mobile number</label>
        <div className="relative">
          <input
            type="tel"
            value={registration.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[16px] text-[#283E48] placeholder:text-[#9CA3AF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]"
          />
          {isValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-[#3866B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        <p className="text-[13px] text-[#6B7280]">
          Please enter a valid Australian number.
        </p>
      </div>
    </div>
  );
}
