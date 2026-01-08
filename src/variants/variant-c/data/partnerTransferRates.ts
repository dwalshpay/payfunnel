// All 16 transfer partners from pay.com.au with their transfer rates
export interface Partner {
  id: string;
  name: string;
  shortName: string;
  type: 'airline' | 'hotel';
  transferRate: string; // e.g., "2:1" means 2 PayRewards = 1 partner point
  transferRateNumeric: number; // For calculations: PayRewards needed per 1 partner point
  pointsName: string; // e.g., "Qantas Points", "KrisFlyer Miles"
  logo?: string;
  popular?: boolean;
  popularFor?: string[]; // Industries this partner is popular with
}

export const PARTNERS: Partner[] = [
  // Airlines
  {
    id: 'qantas',
    name: 'Qantas Business Rewards',
    shortName: 'Qantas',
    type: 'airline',
    transferRate: '2:1',
    transferRateNumeric: 2,
    pointsName: 'Qantas Points',
    popular: true,
    popularFor: ['construction', 'professional', 'trades'],
  },
  {
    id: 'virgin',
    name: 'Virgin Australia Velocity',
    shortName: 'Virgin',
    type: 'airline',
    transferRate: '2:1',
    transferRateNumeric: 2,
    pointsName: 'Velocity Points',
    popular: true,
    popularFor: ['hospitality', 'health'],
  },
  {
    id: 'krisflyer',
    name: 'Singapore Airlines KrisFlyer',
    shortName: 'KrisFlyer',
    type: 'airline',
    transferRate: '2.5:1',
    transferRateNumeric: 2.5,
    pointsName: 'KrisFlyer Miles',
    popular: true,
    popularFor: ['professional'],
  },
  {
    id: 'qatar',
    name: 'Qatar Airways Privilege Club',
    shortName: 'Qatar',
    type: 'airline',
    transferRate: '3:1',
    transferRateNumeric: 3,
    pointsName: 'Avios',
  },
  {
    id: 'emirates',
    name: 'Emirates Skywards',
    shortName: 'Emirates',
    type: 'airline',
    transferRate: '2.5:1',
    transferRateNumeric: 2.5,
    pointsName: 'Skywards Miles',
  },
  {
    id: 'cathay',
    name: 'Cathay Asia Miles',
    shortName: 'Cathay',
    type: 'airline',
    transferRate: '2.5:1',
    transferRateNumeric: 2.5,
    pointsName: 'Asia Miles',
  },
  {
    id: 'etihad',
    name: 'Etihad Guest',
    shortName: 'Etihad',
    type: 'airline',
    transferRate: '2.5:1',
    transferRateNumeric: 2.5,
    pointsName: 'Etihad Miles',
  },
  {
    id: 'malaysia',
    name: 'Malaysia Airlines Enrich',
    shortName: 'Malaysia',
    type: 'airline',
    transferRate: '3:1',
    transferRateNumeric: 3,
    pointsName: 'Enrich Miles',
  },
  {
    id: 'airnz',
    name: 'Air New Zealand Airpoints',
    shortName: 'Air NZ',
    type: 'airline',
    transferRate: '100:1',
    transferRateNumeric: 100,
    pointsName: 'Airpoints Dollars',
  },
  {
    id: 'jal',
    name: 'Japan Airlines',
    shortName: 'JAL',
    type: 'airline',
    transferRate: '3:1',
    transferRateNumeric: 3,
    pointsName: 'JAL Mileage',
  },
  {
    id: 'chinasouthern',
    name: 'China Southern',
    shortName: 'China Southern',
    type: 'airline',
    transferRate: '3:1',
    transferRateNumeric: 3,
    pointsName: 'Sky Pearl Miles',
  },
  {
    id: 'aeroplan',
    name: 'Aeroplan (Air Canada)',
    shortName: 'Aeroplan',
    type: 'airline',
    transferRate: '2.5:1',
    transferRateNumeric: 2.5,
    pointsName: 'Aeroplan Points',
  },
  {
    id: 'ba',
    name: 'British Airways Executive Club',
    shortName: 'British Airways',
    type: 'airline',
    transferRate: '3:1',
    transferRateNumeric: 3,
    pointsName: 'Avios',
  },
  {
    id: 'virginatlantic',
    name: 'Virgin Atlantic Flying Club',
    shortName: 'Virgin Atlantic',
    type: 'airline',
    transferRate: '2.5:1',
    transferRateNumeric: 2.5,
    pointsName: 'Flying Club Miles',
  },
  // Hotels
  {
    id: 'accor',
    name: 'Accor Live Limitless',
    shortName: 'Accor',
    type: 'hotel',
    transferRate: '2:1',
    transferRateNumeric: 2,
    pointsName: 'ALL Points',
    popular: true,
    popularFor: ['hospitality', 'professional'],
  },
  {
    id: 'marriott',
    name: 'Marriott Bonvoy',
    shortName: 'Marriott',
    type: 'hotel',
    transferRate: '3:1',
    transferRateNumeric: 3,
    pointsName: 'Bonvoy Points',
    popular: true,
  },
];

// Get partners by type
export function getAirlinePartners(): Partner[] {
  return PARTNERS.filter((p) => p.type === 'airline');
}

export function getHotelPartners(): Partner[] {
  return PARTNERS.filter((p) => p.type === 'hotel');
}

// Get popular partners for an industry
export function getPopularPartnersForIndustry(industry: string): Partner[] {
  return PARTNERS.filter(
    (p) => p.popular && p.popularFor?.includes(industry)
  );
}

// Get partner by ID
export function getPartnerById(id: string): Partner | undefined {
  return PARTNERS.find((p) => p.id === id);
}

// Calculate partner points from PayRewards
export function calculatePartnerPoints(
  payRewardsPoints: number,
  partnerId: string
): number {
  const partner = getPartnerById(partnerId);
  if (!partner) return 0;
  return Math.floor(payRewardsPoints / partner.transferRateNumeric);
}
