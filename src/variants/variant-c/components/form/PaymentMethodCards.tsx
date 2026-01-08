import { PAYMENT_METHOD_OPTIONS } from '../../data/variantCStepConfig';

interface PaymentMethodCardsProps {
  selected: string[];
  onToggle: (method: string) => void;
}

export function PaymentMethodCards({
  selected,
  onToggle,
}: PaymentMethodCardsProps) {
  return (
    <div className="space-y-3">
      {PAYMENT_METHOD_OPTIONS.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => onToggle(option.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              isSelected
                ? 'border-[#3866B0] bg-[#F0F7FF]'
                : 'border-[#E2E9F9] bg-white hover:border-[#3866B0]/30'
            }`}
          >
            {/* Checkbox */}
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected
                  ? 'bg-[#3866B0] border-[#3866B0]'
                  : 'border-[#D1D5DB] bg-white'
              }`}
            >
              {isSelected && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Card icon placeholder */}
            <div
              className={`w-12 h-8 rounded flex items-center justify-center text-[11px] font-bold ${
                option.id === 'amex'
                  ? 'bg-[#006FCF] text-white'
                  : option.id === 'visa'
                  ? 'bg-[#1A1F71] text-white'
                  : option.id === 'mastercard'
                  ? 'bg-gradient-to-r from-[#EB001B] to-[#F79E1B] text-white'
                  : 'bg-[#F0F4F8] text-[#6B7280]'
              }`}
            >
              {option.id === 'amex' && 'AMEX'}
              {option.id === 'visa' && 'VISA'}
              {option.id === 'mastercard' && 'MC'}
              {option.id === 'bank-transfer' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Text */}
            <div className="flex-1">
              <div
                className={`text-[14px] font-semibold ${
                  isSelected ? 'text-[#3866B0]' : 'text-[#283E48]'
                }`}
              >
                {option.label}
              </div>
              {option.description && (
                <div className="text-[12px] text-[#6B7280]">
                  {option.description}
                </div>
              )}
            </div>

            {/* Popular badge */}
            {option.popular && (
              <div className="bg-[#F59E0B]/10 text-[#B45309] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                Popular
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
