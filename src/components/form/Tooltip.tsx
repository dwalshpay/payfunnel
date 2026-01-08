import { useState } from 'react';
import { InfoIcon } from '../icons/Icons';

interface TooltipProps {
  text: string;
}

export function Tooltip({ text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="text-[--color-text-light] hover:text-[--color-text-muted] transition-colors"
      >
        <InfoIcon className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-[--color-border] text-sm text-[--color-text-muted]">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[--color-border] transform rotate-45" />
          {text}
        </div>
      )}
    </div>
  );
}
