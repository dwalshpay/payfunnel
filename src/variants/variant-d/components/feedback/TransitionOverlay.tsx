import { useEffect, useState } from 'react';

interface TransitionOverlayProps {
  message: string | null;
  onComplete: () => void;
}

export function TransitionOverlay({ message, onComplete }: TransitionOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300); // Wait for fade out
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [message, onComplete]);

  if (!message) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Success checkmark */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D1FAE5] flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[#22C55E]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Message */}
        <p className="text-lg font-semibold text-[#283E48]">{message}</p>
      </div>
    </div>
  );
}
