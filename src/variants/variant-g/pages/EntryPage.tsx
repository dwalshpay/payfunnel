import { useVariantG } from '../context/VariantGContext';
import { BuildingIcon, StarIcon } from '../../../components/icons/Icons';

export function EntryPage() {
  const { startFunnel } = useVariantG();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-[640px] bg-white rounded-xl p-8 md:p-12 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)]">
        {/* Main Headline */}
        <h1 className="text-[32px] md:text-[40px] font-bold text-[#283E48] leading-tight mb-6">
          How much are your clients
          <br />
          leaving on the table?
        </h1>

        {/* Divider */}
        <div className="w-full h-px bg-[#E5E7EB] mb-6" />

        {/* Supporting stat */}
        <p className="text-lg text-[#6B7280] mb-6">
          Australian businesses miss out on{' '}
          <span className="font-semibold text-[#3866B0]">$2.3B in rewards</span> annually by
          paying expenses via bank transfer.
        </p>

        {/* CTA lead-in */}
        <p className="text-lg font-medium text-[#283E48] mb-6">
          See what <span className="text-[#3866B0]">YOUR</span> client portfolio could be
          earning.
        </p>

        {/* CTA Button */}
        <button
          onClick={startFunnel}
          className="w-full bg-[#3866B0] hover:bg-[#2D5490] text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#3866B0]/20"
        >
          Calculate Portfolio Rewards
        </button>

        {/* Divider */}
        <div className="w-full h-px bg-[#E5E7EB] my-8" />

        {/* Social Proof */}
        <div className="flex items-center gap-2 text-[#6B7280] mb-6">
          <BuildingIcon className="w-5 h-5 text-[#3866B0]" />
          <span className="font-medium">
            Join 2,000+ accounting practices using pay.com.au
          </span>
        </div>

        {/* Testimonial */}
        <div className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB]">
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            ))}
          </div>
          <p className="text-[#283E48] italic mb-3">
            "pay.com.au has become a key differentiator for our practice. Clients love it."
          </p>
          <p className="text-sm text-[#6B7280]">
            — Partner, Melbourne accounting firm
          </p>
        </div>
      </div>
    </div>
  );
}
