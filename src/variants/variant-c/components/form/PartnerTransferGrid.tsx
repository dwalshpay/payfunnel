import { PARTNERS, getPopularPartnersForIndustry } from '../../data/partnerTransferRates';

interface PartnerTransferGridProps {
  selected: string[];
  onToggle: (partnerId: string) => void;
  industry: string | null;
}

export function PartnerTransferGrid({
  selected,
  onToggle,
  industry,
}: PartnerTransferGridProps) {
  // Get popular partners for the selected industry
  const popularPartnerIds = industry
    ? getPopularPartnersForIndustry(industry).map((p) => p.id)
    : [];

  // Sort partners: popular first, then airlines, then hotels
  const sortedPartners = [...PARTNERS].sort((a, b) => {
    const aPopular = popularPartnerIds.includes(a.id) ? 0 : 1;
    const bPopular = popularPartnerIds.includes(b.id) ? 0 : 1;
    if (aPopular !== bPopular) return aPopular - bPopular;
    if (a.type !== b.type) return a.type === 'airline' ? -1 : 1;
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Airlines */}
      <div>
        <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
          Airlines
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {sortedPartners
            .filter((p) => p.type === 'airline')
            .map((partner) => {
              const isSelected = selected.includes(partner.id);
              const isPopular = popularPartnerIds.includes(partner.id);
              return (
                <button
                  key={partner.id}
                  onClick={() => onToggle(partner.id)}
                  className={`relative p-3 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-[#3866B0] bg-[#F0F7FF]'
                      : 'border-[#E2E9F9] bg-white hover:border-[#3866B0]/30'
                  }`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      Top pick
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {/* Checkbox */}
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#3866B0] border-[#3866B0]'
                          : 'border-[#D1D5DB] bg-white'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
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

                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[13px] font-semibold truncate ${
                          isSelected ? 'text-[#3866B0]' : 'text-[#283E48]'
                        }`}
                      >
                        {partner.shortName}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        {partner.transferRate}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {/* Hotels */}
      <div>
        <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
          Hotels
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sortedPartners
            .filter((p) => p.type === 'hotel')
            .map((partner) => {
              const isSelected = selected.includes(partner.id);
              const isPopular = popularPartnerIds.includes(partner.id);
              return (
                <button
                  key={partner.id}
                  onClick={() => onToggle(partner.id)}
                  className={`relative p-3 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-[#3866B0] bg-[#F0F7FF]'
                      : 'border-[#E2E9F9] bg-white hover:border-[#3866B0]/30'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      Top pick
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#3866B0] border-[#3866B0]'
                          : 'border-[#D1D5DB] bg-white'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
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

                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[13px] font-semibold truncate ${
                          isSelected ? 'text-[#3866B0]' : 'text-[#283E48]'
                        }`}
                      >
                        {partner.shortName}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        {partner.transferRate}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
