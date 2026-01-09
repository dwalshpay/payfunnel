import { useEffect, useState, useRef } from 'react';
import { BENCHMARK_POINTS } from '../utils/calculations';
import { PlaneIcon, HotelIcon, GiftIcon, StarIcon } from '../../../components/icons/Icons';

interface AnchorRevealProps {
  benchmarkPoints?: number;
  onContinue: () => void;
}

const valueTranslations = [
  { Icon: PlaneIcon, text: '4 return Business Class flights to London' },
  { Icon: HotelIcon, text: '80 nights at premium hotels' },
  { Icon: GiftIcon, text: '$10,500 in gift cards' },
];

export function AnchorReveal({
  benchmarkPoints = BENCHMARK_POINTS,
  onContinue,
}: AnchorRevealProps) {
  const [countedPoints, setCountedPoints] = useState(0);
  const [isCountComplete, setIsCountComplete] = useState(false);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated count-up effect
  useEffect(() => {
    const duration = 1400;
    const startTime = Date.now();
    const startDelay = 400;

    const timeout = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - startDelay;
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(benchmarkPoints * eased);
        setCountedPoints(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsCountComplete(true);
          setTimeout(() => setIsTranslationVisible(true), 200);
        }
      };

      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timeout);
  }, [benchmarkPoints]);

  // Rotate through value translations
  useEffect(() => {
    if (!isCountComplete) return;

    const interval = setInterval(() => {
      setIsTranslationVisible(false);
      setTimeout(() => {
        setCurrentTranslationIndex((prev) => (prev + 1) % valueTranslations.length);
        setIsTranslationVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [isCountComplete]);

  const currentTranslation = valueTranslations[currentTranslationIndex];

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #003C80 0%, #1e3a5f 40%, #0f2744 100%)',
      }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle radial glow behind points */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,102,176,0.4) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
        }}
      />

      {/* Main content card */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">
        {/* Pre-headline */}
        <p
          className="text-[#D3DFF6] text-sm md:text-base font-medium tracking-wide mb-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]"
          style={{ fontFamily: "'Europa', system-ui, sans-serif" }}
        >
          Australian businesses earn an average of
        </p>

        {/* Points display */}
        <div className="relative mb-4">
          {/* Star decorations */}
          <span
            className={`
              absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2
              transition-all duration-500
              ${isCountComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
            `}
          >
            <StarIcon className="w-6 h-6 md:w-8 md:h-8 text-[#D3DFF6]" />
          </span>
          <span
            className={`
              absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2
              transition-all duration-500
              ${isCountComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
            `}
          >
            <StarIcon className="w-6 h-6 md:w-8 md:h-8 text-[#D3DFF6]" />
          </span>

          {/* The big number */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tabular-nums"
            style={{
              fontFamily: "'Europa', system-ui, sans-serif",
              textShadow: isCountComplete
                ? '0 0 60px rgba(211, 223, 246, 0.4), 0 4px 20px rgba(0,0,0,0.3)'
                : '0 4px 20px rgba(0,0,0,0.3)',
              transition: 'text-shadow 0.5s ease-out',
            }}
          >
            {countedPoints.toLocaleString()}
          </h1>
          <p className="text-[#D3DFF6] text-lg md:text-xl font-medium mt-1 tracking-wide">
            points
          </p>
          <p className="text-[#D3DFF6]/60 text-sm mt-1">per year</p>
        </div>

        {/* Animated divider line */}
        <div
          className={`
            w-24 h-px mx-auto my-6 bg-gradient-to-r from-transparent via-[#D3DFF6]/50 to-transparent
            transition-all duration-700
            ${isCountComplete ? 'opacity-100 w-32' : 'opacity-0 w-16'}
          `}
        />

        {/* Value translation with rotation */}
        <div
          className={`
            h-12 flex items-center justify-center transition-all duration-300
            ${isTranslationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          <p className="text-[#D3DFF6]/80 text-base md:text-lg flex items-center gap-2">
            <currentTranslation.Icon className="w-5 h-5" />
            <span>That's {currentTranslation.text}</span>
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onContinue}
          className={`
            relative mt-8 w-full max-w-sm mx-auto
            px-8 py-4 md:py-5
            bg-[#3866B0] hover:bg-[#2D5490]
            text-white font-bold text-lg md:text-xl
            rounded-xl
            transform transition-all duration-300
            hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,102,176,0.4)]
            active:scale-[0.98]
            opacity-0 animate-[fadeInUp_0.6s_ease-out_1.2s_forwards]
            overflow-hidden
            group
          `}
          style={{ fontFamily: "'Europa', system-ui, sans-serif" }}
        >
          {/* Button shimmer effect */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite',
            }}
          />

          <span className="relative flex items-center justify-center gap-2">
            See What YOU Could Earn
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>

        {/* Subtle pulse animation on CTA */}
        <div
          className={`
            absolute inset-0 pointer-events-none
            ${isCountComplete ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}
          `}
        />
      </div>

      {/* Floating plane decoration using SVG icon */}
      <div
        className="absolute bottom-20 right-8 md:right-16 opacity-20 animate-[floatPlane_8s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        <PlaneIcon className="w-12 h-12 text-white" />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(5px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(3px); }
        }
        @keyframes floatPlane {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
