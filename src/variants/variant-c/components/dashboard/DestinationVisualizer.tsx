
interface DestinationVisualizerProps {
  destinations: {
    bestDestination: {
      id: string;
      name: string;
      country: string;
      emoji: string;
      tagline: string;
      qantasPointsRequired: number;
    } | null;
    flightsToDestination: number;
    affordableDestinations: Array<{
      id: string;
      name: string;
      emoji: string;
      qantasPointsRequired: number;
    }>;
    summaryText: string;
    hotelNights: number;
  };
}

export function DestinationVisualizer({
  destinations,
}: DestinationVisualizerProps) {
  const { bestDestination, flightsToDestination, affordableDestinations, hotelNights } =
    destinations;

  // Show top 3 affordable destinations
  const topDestinations = affordableDestinations.slice(0, 3);

  if (!bestDestination && affordableDestinations.length === 0) {
    // Not enough points yet - show progress
    return (
      <div className="bg-white rounded-xl p-4 border border-[#F5F5F5] shadow-sm">
        <div className="text-center">
          <div className="text-[32px] mb-2">✈️</div>
          <div className="text-[14px] font-semibold text-[#283E48] mb-1">
            Keep going!
          </div>
          <div className="text-[13px] text-[#6B7280]">
            Add more details to see what destinations you can reach
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#F5F5F5] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#F0F7FF] to-[#E8F4FF] border-b border-[#E2E9F9]">
        <div className="text-[13px] font-semibold text-[#3866B0]">
          Your rewards can get you...
        </div>
      </div>

      {/* Main destination */}
      {bestDestination && (
        <div className="p-4 border-b border-[#F5F5F5]">
          <div className="flex items-center gap-4">
            <div className="text-[40px]">{bestDestination.emoji}</div>
            <div className="flex-1">
              <div className="text-[18px] font-bold text-[#283E48]">
                {flightsToDestination >= 1
                  ? `${flightsToDestination} return flight${
                      flightsToDestination > 1 ? 's' : ''
                    } to ${bestDestination.name}`
                  : `${bestDestination.name}`}
              </div>
              <div className="text-[13px] text-[#6B7280]">
                {bestDestination.tagline} • {bestDestination.country}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other affordable destinations */}
      {topDestinations.length > 1 && (
        <div className="px-4 py-3">
          <div className="text-[12px] text-[#6B7280] mb-2">Or reach:</div>
          <div className="flex flex-wrap gap-2">
            {topDestinations.slice(1).map((dest) => (
              <div
                key={dest.id}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F0F4F8] rounded-full"
              >
                <span className="text-[14px]">{dest.emoji}</span>
                <span className="text-[12px] font-medium text-[#6B7280]">
                  {dest.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotel nights */}
      {hotelNights > 0 && (
        <div className="px-4 py-3 bg-[#FAFBFC] border-t border-[#F5F5F5]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F0F4F8] flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#6B7280]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#283E48]">
                ~{hotelNights} hotel nights
              </div>
              <div className="text-[12px] text-[#6B7280]">
                At Accor or Marriott properties
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
