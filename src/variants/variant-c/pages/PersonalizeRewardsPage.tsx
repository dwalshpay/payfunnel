import { useVariantC } from '../context/VariantCContext';
import { PaymentMethodCards } from '../components/form/PaymentMethodCards';
import { MultiSelectGrid } from '../components/form/MultiSelectGrid';
import {
  PAYMENT_TYPE_OPTIONS,
  REDEMPTION_OPTIONS,
} from '../data/variantCStepConfig';

export function PersonalizeRewardsPage() {
  const { state, toggleMultiAnswer, nextStep, canProceed } = useVariantC();
  const { answers, isLoading } = state;

  const handleContinue = () => {
    if (canProceed()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment methods */}
      <div>
        <label className="block text-[14px] font-semibold text-[#283E48] mb-1">
          How do you currently pay business expenses?
        </label>
        <p className="text-[13px] text-[#6B7280] mb-3">
          Select all that apply
        </p>
        <PaymentMethodCards
          selected={answers.paymentMethods}
          onToggle={(method) => toggleMultiAnswer('paymentMethods', method)}
        />
      </div>

      {/* Payment types */}
      <div>
        <label className="block text-[14px] font-semibold text-[#283E48] mb-1">
          What types of payments do you make?
        </label>
        <p className="text-[13px] text-[#6B7280] mb-3">
          Select your main payment categories
        </p>
        <MultiSelectGrid
          options={PAYMENT_TYPE_OPTIONS}
          selected={answers.paymentTypes}
          onToggle={(type) => toggleMultiAnswer('paymentTypes', type)}
          columns={3}
        />
      </div>

      {/* Redemption preferences */}
      <div>
        <label className="block text-[14px] font-semibold text-[#283E48] mb-1">
          What would you like to use your rewards for?
        </label>
        <p className="text-[13px] text-[#6B7280] mb-3">
          This helps us recommend the best partners
        </p>
        <MultiSelectGrid
          options={REDEMPTION_OPTIONS}
          selected={answers.redemptionOptions}
          onToggle={(option) => toggleMultiAnswer('redemptionOptions', option)}
          columns={2}
        />
      </div>

      {/* Invoice redemption highlight */}
      {answers.redemptionOptions.includes('invoices') && (
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] rounded-xl p-4 border border-[#F59E0B]/30">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#92400E]">
                Great choice!
              </div>
              <div className="text-[13px] text-[#B45309]">
                You can use PayRewards to pay your business invoices - this unique
                feature is only available with pay.com.au
              </div>
            </div>
          </div>
        </div>
      )}

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
        See What I Can Get
      </button>
    </div>
  );
}
