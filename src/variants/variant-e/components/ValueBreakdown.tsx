import { getValueTranslations } from '../utils/calculations';
import { PlaneIcon, HotelIcon, GiftIcon } from '../../../components/icons/Icons';

interface ValueBreakdownProps {
  points: number;
  showItems?: ('flights' | 'hotels' | 'giftcards')[];
}

const iconComponents = {
  flights: PlaneIcon,
  hotels: HotelIcon,
  giftcards: GiftIcon,
};

export function ValueBreakdown({
  points,
  showItems = ['flights', 'hotels', 'giftcards'],
}: ValueBreakdownProps) {
  const values = getValueTranslations(points);

  const items = [
    {
      key: 'flights' as const,
      value: values.flights,
      unit: 'Business Class flights to Singapore',
    },
    {
      key: 'hotels' as const,
      value: values.hotelNights,
      unit: 'nights at Marriott properties',
    },
    {
      key: 'giftcards' as const,
      value: `$${values.giftCardValue.toLocaleString()}`,
      unit: 'in gift cards',
      isMonetary: true,
    },
  ].filter((item) => showItems.includes(item.key));

  return (
    <div className="rounded-xl bg-white border border-[#E0E0E0] overflow-hidden shadow-card">
      <div className="px-4 py-3 border-b border-[#E0E0E0]">
        <p className="text-sm font-semibold text-[#283E48]">That's worth:</p>
      </div>
      <div className="divide-y divide-[#E0E0E0]">
        {items.map((item, index) => {
          const IconComponent = iconComponents[item.key];
          return (
            <div
              key={item.key}
              className="flex items-center gap-3 px-4 py-3.5 opacity-0 animate-[fadeInLeft_0.4s_ease-out_forwards]"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#D3DFF6] flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 text-[#3866B0]" />
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-lg md:text-xl font-bold text-[#283E48]">
                  {item.value}
                </span>
                <span className="text-sm text-[#6B7280]">{item.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
