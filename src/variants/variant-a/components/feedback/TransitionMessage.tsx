import { useEffect, useState } from 'react';

interface TransitionMessageProps {
  message: string | null;
  onComplete?: () => void;
}

export function TransitionMessage({ message, onComplete }: TransitionMessageProps) {
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
        <div className="flex items-center gap-4">
          {/* Success checkmark */}
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
          <p className="text-lg font-medium text-[#283E48]">{message}</p>
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
