import { useMemo } from 'react';
import {
  DESTINATIONS,
  type Destination,
  getAffordableDestinations,
  getBestValueDestination,
} from '../data/destinationData';

interface DestinationResult {
  destination: Destination;
  flights: number;
  hotelNights: number;
}

interface DestinationConverterOutput {
  // Best destination you can afford
  bestDestination: Destination | null;
  // Number of return flights to best destination
  flightsToDestination: number;
  // All affordable destinations
  affordableDestinations: Destination[];
  // Specific destination breakdowns
  toMelbourne: DestinationResult | null;
  toBali: DestinationResult | null;
  toTokyo: DestinationResult | null;
  toLondon: DestinationResult | null;
  // Summary text for display
  summaryText: string;
  // Hotel nights at Accor properties (using 2:1 transfer rate, avg 15k points/night)
  hotelNights: number;
}

// Qantas points needed for common routes (return economy from Sydney)
const ROUTE_POINTS: Record<string, number> = {
  melbourne: 16000,
  bali: 36000,
  tokyo: 60000,
  singapore: 45000,
  london: 104000,
  losangeles: 72000,
};

export function useDestinationConverter(
  qantasPointsEquivalent: number,
  hotelPoints?: number
): DestinationConverterOutput {
  return useMemo(() => {
    // Get affordable destinations
    const affordable = getAffordableDestinations(qantasPointsEquivalent);
    const best = getBestValueDestination(qantasPointsEquivalent);

    // Calculate flights to best destination
    const flightsToDestination = best
      ? Math.floor(qantasPointsEquivalent / best.qantasPointsRequired)
      : 0;

    // Calculate specific destinations
    const calculateDestination = (id: string): DestinationResult | null => {
      const dest = DESTINATIONS.find((d) => d.id === id);
      if (!dest) return null;
      const flights = Math.floor(qantasPointsEquivalent / dest.qantasPointsRequired);
      const hotelNights = hotelPoints
        ? Math.floor(hotelPoints / dest.hotelPointsPerNight)
        : 0;
      return { destination: dest, flights, hotelNights };
    };

    const toMelbourne = calculateDestination('melbourne');
    const toBali = calculateDestination('bali');
    const toTokyo = calculateDestination('tokyo');
    const toLondon = calculateDestination('london');

    // Calculate hotel nights (using Accor average of 15k points per night)
    const actualHotelPoints = hotelPoints || qantasPointsEquivalent; // Use Qantas equivalent if no specific hotel points
    const avgHotelPointsPerNight = 15000;
    const hotelNights = Math.floor(actualHotelPoints / avgHotelPointsPerNight);

    // Generate summary text
    let summaryText = 'Start earning to unlock destinations!';
    if (best) {
      if (flightsToDestination >= 2) {
        summaryText = `${flightsToDestination} return flights to ${best.name}`;
      } else if (flightsToDestination === 1) {
        summaryText = `1 return flight to ${best.name}`;
      } else {
        // Show progress to first flight
        const progress = Math.round(
          (qantasPointsEquivalent / best.qantasPointsRequired) * 100
        );
        summaryText = `${progress}% towards a flight to ${best.name}`;
      }
    } else if (qantasPointsEquivalent > 0) {
      // Not enough for any destination yet
      const cheapestDest = DESTINATIONS.reduce((a, b) =>
        a.qantasPointsRequired < b.qantasPointsRequired ? a : b
      );
      const progress = Math.round(
        (qantasPointsEquivalent / cheapestDest.qantasPointsRequired) * 100
      );
      summaryText = `${progress}% towards ${cheapestDest.name}`;
    }

    return {
      bestDestination: best,
      flightsToDestination,
      affordableDestinations: affordable,
      toMelbourne,
      toBali,
      toTokyo,
      toLondon,
      summaryText,
      hotelNights,
    };
  }, [qantasPointsEquivalent, hotelPoints]);
}

// Simple one-liner for quick calculations
export function getFlightCount(
  qantasPoints: number,
  destination: 'melbourne' | 'bali' | 'tokyo' | 'singapore' | 'london' | 'losangeles'
): number {
  return Math.floor(qantasPoints / ROUTE_POINTS[destination]);
}

// Format destination output for display
export function formatDestinationSummary(
  qantasPoints: number
): { emoji: string; text: string; subtext: string } {
  if (qantasPoints >= 104000) {
    const flights = Math.floor(qantasPoints / 104000);
    return {
      emoji: '🇬🇧',
      text: `${flights} return flight${flights > 1 ? 's' : ''} to London`,
      subtext: 'Business class upgrades available',
    };
  }
  if (qantasPoints >= 60000) {
    const flights = Math.floor(qantasPoints / 60000);
    return {
      emoji: '🗼',
      text: `${flights} return flight${flights > 1 ? 's' : ''} to Tokyo`,
      subtext: 'Experience Japan',
    };
  }
  if (qantasPoints >= 36000) {
    const flights = Math.floor(qantasPoints / 36000);
    return {
      emoji: '🌴',
      text: `${flights} return flight${flights > 1 ? 's' : ''} to Bali`,
      subtext: 'Tropical getaway',
    };
  }
  if (qantasPoints >= 16000) {
    const flights = Math.floor(qantasPoints / 16000);
    return {
      emoji: '🏙️',
      text: `${flights} return flight${flights > 1 ? 's' : ''} to Melbourne`,
      subtext: 'Domestic escape',
    };
  }

  // Not enough for a flight yet
  const progress = Math.round((qantasPoints / 16000) * 100);
  return {
    emoji: '✈️',
    text: `${progress}% towards your first flight`,
    subtext: 'Keep earning!',
  };
}
