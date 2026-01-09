import { useVariantA } from '../../context/VariantAContext';
import { useRewardsCalculator } from '../../hooks/useRewardsCalculator';

export function MobileNumberStep() {
  const { state, setRegistrationField } = useVariantA();
  const { answers } = state;
  const { registration } = answers;

  const rewards = useRewardsCalculator({
    monthlyExpenses: answers.monthlyExpenses,
    paymentMethods: answers.paymentMethods,
    industry: answers.industry,
    employees: answers.employees,
  });

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as 04XX XXX XXX
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
  };

  const handleChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setRegistrationField('mobileNumber', formatted);
  };

  // Validation
  const mobileRegex = /^(\+?61|0)4\d{8}$/;
  const isValid = mobileRegex.test(registration.mobileNumber.replace(/\s/g, ''));
  const hasStartedTyping = registration.mobileNumber.length > 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header illustration */}
      <div className="flex justify-center mb-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3866B0]/10 to-[#3866B0]/5 flex items-center justify-center">
          <svg className="w-10 h-10 text-[#3866B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Explanation */}
      <div className="text-center space-y-2">
        <p className="text-[#6B7280]">
          We'll send a verification code to confirm your identity and keep your account secure.
        </p>
      </div>

      {/* Phone input */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-[#283E48]">
          Mobile number
        </label>
        <div className="relative">
          {/* Australian flag prefix */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <span className="text-lg">&#127462;&#127482;</span>
            <span className="text-[#283E48] font-medium">+61</span>
            <div className="w-px h-5 bg-slate-200" />
          </div>
          <input
            type="tel"
            value={registration.mobileNumber}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="0412 345 678"
            maxLength={12}
            className="w-full h-14 pl-24 pr-12 rounded-xl border border-slate-200 bg-white text-[#283E48] text-lg placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3866B0]/10 focus:border-[#3866B0] transition-all"
          />
          {hasStartedTyping && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isValid ? (
                <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Australian mobile numbers only (04XX XXX XXX)
        </p>
      </div>

      {/* Rewards preview - keeping engagement */}
      <div className="bg-gradient-to-r from-slate-50 to-transparent rounded-xl p-4 border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3866B0]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#3866B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-[#6B7280]">Almost there! Your points are waiting</p>
            <p className="text-lg font-bold text-[#3866B0]">{rewards.formattedPoints}/year</p>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-2 text-xs text-[#9CA3AF]">
        <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>
          We'll only use your number for account verification and important updates.
          No spam, ever.
        </span>
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
