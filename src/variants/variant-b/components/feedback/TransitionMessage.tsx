import { useEffect, useState } from 'react';

interface TransitionMessageProps {
  message: string | null;
  pointsAwarded?: number;
  onComplete?: () => void;
}

export function TransitionMessage({ message, pointsAwarded, onComplete }: TransitionMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onComplete]);

  if (!message) return null;

  // Check if this is a points-related message
  const hasPoints = pointsAwarded && pointsAwarded > 0;
  const isPointsMessage = message.includes('points') || message.includes('pts');

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white rounded-2xl px-8 py-6 shadow-2xl max-w-md mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Icon - different for points vs regular messages */}
          {hasPoints || isPointsMessage ? (
            <div className="w-16 h-16 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
              <svg
                className="w-8 h-8 text-[#F59E0B]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          ) : (
            <div className="w-12 h-12 bg-[#D1FAE5] rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-[#22C55E]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          {/* Message */}
          <p className="text-lg font-medium text-[#283E48] text-center">{message}</p>

          {/* Points badge if applicable */}
          {hasPoints && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FEF3C7] rounded-full">
              <span className="text-lg font-bold text-[#92400E]">
                +{pointsAwarded.toLocaleString()}
              </span>
              <span className="text-sm text-[#B45309]">points</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline encouragement message (non-modal)
export function InlineEncouragement({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg">
      <svg
        className="w-4 h-4 text-[#22C55E] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm text-[#166534]">{text}</span>
    </div>
  );
}
