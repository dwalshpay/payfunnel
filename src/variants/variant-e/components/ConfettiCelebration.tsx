import { useEffect, useState } from 'react';

interface ConfettiCelebrationProps {
  trigger: boolean;
  duration?: number;
  intensity?: 'low' | 'medium' | 'high';
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

// Brand-aligned colors
const colors = [
  '#3866B0', // Primary Blue
  '#5A8AD4', // Light Blue
  '#D3DFF6', // Primary Light
  '#00B67A', // Trustpilot Green
  '#003C80', // Primary Dark
  '#E8EEF5', // Background
];

export function ConfettiCelebration({
  trigger,
  duration = 3000,
  intensity = 'medium',
  onComplete,
}: ConfettiCelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100;

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);

      // Generate particles
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          rotation: Math.random() * 360,
          delay: Math.random() * 500,
        });
      }
      setParticles(newParticles);

      // Clean up after duration
      const timeout = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [trigger, isActive, particleCount, duration, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confettiFall ${2 + Math.random()}s ease-out forwards`,
            animationDelay: `${particle.delay}ms`,
            opacity: 0,
          }}
        />
      ))}

      {/* Burst effect from center */}
      {intensity !== 'low' && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(12)].map((_, i) => (
            <div
              key={`burst-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: colors[i % colors.length],
                animation: `confettiBurst 0.8s ease-out forwards`,
                animationDelay: `${i * 30}ms`,
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: '50% 100px',
              }}
            />
          ))}
        </div>
      )}

      {/* CSS-only sparkle effects instead of emojis */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 60}%`,
            animation: `sparkle 0.6s ease-out forwards`,
            animationDelay: `${200 + i * 100}ms`,
            opacity: 0,
          }}
        >
          <svg className="w-6 h-6 text-[#3866B0]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2 6.5L20.5 10l-6.5 2L12 18.5 10 12l-6.5-2L10 8.5 12 2z" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes confettiFall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          10% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg) scale(0.5);
          }
        }
        @keyframes confettiBurst {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-150px) scale(0);
          }
        }
        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-15deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
}
