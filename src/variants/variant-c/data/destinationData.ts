// Destination data for the "Your rewards can get you..." visualizer
export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'domestic' | 'asia' | 'europe' | 'americas' | 'middle-east';
  // Points required for return economy flight from Sydney
  qantasPointsRequired: number;
  // Average hotel night cost in points (Accor/Marriott)
  hotelPointsPerNight: number;
  // Display info
  emoji: string;
  tagline: string;
  flightHours: number;
}

export const DESTINATIONS: Destination[] = [
  // Domestic
  {
    id: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    region: 'domestic',
    qantasPointsRequired: 16000,
    hotelPointsPerNight: 8000,
    emoji: '🏙️',
    tagline: 'Coffee & culture',
    flightHours: 1.5,
  },
  {
    id: 'goldcoast',
    name: 'Gold Coast',
    country: 'Australia',
    region: 'domestic',
    qantasPointsRequired: 16000,
    hotelPointsPerNight: 10000,
    emoji: '🏖️',
    tagline: 'Sun & surf',
    flightHours: 1.5,
  },
  // Asia
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia',
    qantasPointsRequired: 36000,
    hotelPointsPerNight: 12000,
    emoji: '🌴',
    tagline: 'Tropical paradise',
    flightHours: 6,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'asia',
    qantasPointsRequired: 60000,
    hotelPointsPerNight: 20000,
    emoji: '🗼',
    tagline: 'Tech meets tradition',
    flightHours: 9.5,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    region: 'asia',
    qantasPointsRequired: 45000,
    hotelPointsPerNight: 15000,
    emoji: '🌆',
    tagline: 'Garden city',
    flightHours: 8,
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    region: 'asia',
    qantasPointsRequired: 45000,
    hotelPointsPerNight: 10000,
    emoji: '🛕',
    tagline: 'Street food & temples',
    flightHours: 9,
  },
  // Europe
  {
    id: 'london',
    name: 'London',
    country: 'UK',
    region: 'europe',
    qantasPointsRequired: 104000,
    hotelPointsPerNight: 25000,
    emoji: '🇬🇧',
    tagline: 'Historic charm',
    flightHours: 22,
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'europe',
    qantasPointsRequired: 104000,
    hotelPointsPerNight: 22000,
    emoji: '🗼',
    tagline: 'City of lights',
    flightHours: 22,
  },
  // Americas
  {
    id: 'losangeles',
    name: 'Los Angeles',
    country: 'USA',
    region: 'americas',
    qantasPointsRequired: 72000,
    hotelPointsPerNight: 20000,
    emoji: '🌴',
    tagline: 'Hollywood dreams',
    flightHours: 14,
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    region: 'americas',
    qantasPointsRequired: 84000,
    hotelPointsPerNight: 30000,
    emoji: '🗽',
    tagline: 'The Big Apple',
    flightHours: 20,
  },
  // Middle East
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    region: 'middle-east',
    qantasPointsRequired: 78000,
    hotelPointsPerNight: 25000,
    emoji: '🏗️',
    tagline: 'Luxury & adventure',
    flightHours: 14,
  },
];

// Get destinations affordable with given Qantas points
export function getAffordableDestinations(qantasPoints: number): Destination[] {
  return DESTINATIONS
    .filter((d) => d.qantasPointsRequired <= qantasPoints)
    .sort((a, b) => b.qantasPointsRequired - a.qantasPointsRequired);
}

// Calculate how many return flights to a destination
export function calculateFlights(
  qantasPoints: number,
  destinationId: string
): number {
  const destination = DESTINATIONS.find((d) => d.id === destinationId);
  if (!destination) return 0;
  return Math.floor(qantasPoints / destination.qantasPointsRequired);
}

// Calculate hotel nights at a destination
export function calculateHotelNights(
  hotelPoints: number,
  destinationId: string
): number {
  const destination = DESTINATIONS.find((d) => d.id === destinationId);
  if (!destination) return 0;
  return Math.floor(hotelPoints / destination.hotelPointsPerNight);
}

// Get the best value destination (most expensive you can afford)
export function getBestValueDestination(
  qantasPoints: number
): Destination | null {
  const affordable = getAffordableDestinations(qantasPoints);
  return affordable.length > 0 ? affordable[0] : null;
}

// Get destinations by region
export function getDestinationsByRegion(
  region: Destination['region']
): Destination[] {
  return DESTINATIONS.filter((d) => d.region === region);
}
