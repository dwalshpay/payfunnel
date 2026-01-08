import { useEffect, useRef } from 'react';

const PARTNERS = [
  'Qantas',
  'Virgin Australia',
  'Singapore Airlines',
  'Qatar Airways',
  'Emirates',
  'Cathay Pacific',
  'Etihad',
  'Malaysia Airlines',
  'Air NZ',
  'JAL',
  'British Airways',
  'Virgin Atlantic',
  'Aeroplan',
  'Accor Hotels',
  'Marriott Bonvoy',
  'China Southern',
];

export function PartnerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      // Reset when we've scrolled half the content (since we duplicate)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate partners for seamless loop
  const allPartners = [...PARTNERS, ...PARTNERS];

  return (
    <div className="relative overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#EEF2F8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#EEF2F8] to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden py-2"
        style={{ scrollBehavior: 'auto' }}
      >
        {allPartners.map((partner, index) => (
          <div
            key={`${partner}-${index}`}
            className="flex-shrink-0 px-4 py-2 bg-white rounded-full border border-[#E2E9F9] text-[13px] font-medium text-[#6B7280] whitespace-nowrap shadow-sm"
          >
            {partner}
          </div>
        ))}
      </div>

      {/* Partner count badge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
        <div className="bg-[#3866B0] text-white px-3 py-1.5 rounded-l-full text-[12px] font-bold shadow-lg">
          16 Partners
        </div>
      </div>
    </div>
  );
}
