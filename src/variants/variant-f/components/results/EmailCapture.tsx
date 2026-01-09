import { useState } from 'react';
import { MailIcon, CheckIcon } from '../../../../components/icons/Icons';
import type { Tier } from '../../types';

interface EmailCaptureProps {
  tier: Tier;
  score: number;
  email: string;
  emailSubmitted: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  className?: string;
}

// Get tier-specific colors
const getTierColors = (tier: Tier) => {
  switch (tier) {
    case 'gold':
      return {
        bg: 'bg-[#FEF3C7]',
        accent: 'text-[#F59E0B]',
        border: 'border-[#F59E0B]',
      };
    case 'silver':
      return {
        bg: 'bg-[#E0E7FF]',
        accent: 'text-[#3866B0]',
        border: 'border-[#3866B0]',
      };
    case 'bronze':
      return {
        bg: 'bg-[#F3F4F6]',
        accent: 'text-[#6B7280]',
        border: 'border-[#6B7280]',
      };
  }
};

export function EmailCapture({
  tier,
  score,
  email,
  emailSubmitted,
  onEmailChange,
  onSubmit,
  className = '',
}: EmailCaptureProps) {
  const [isFocused, setIsFocused] = useState(false);
  const tierColors = getTierColors(tier);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      onSubmit();
    }
  };

  const handleStrategyCall = () => {
    window.location.href = `mailto:sales@pay.com.au?subject=Strategy%20Call%20Request%20-%20Score%20${score}`;
  };

  if (emailSubmitted) {
    return (
      <div
        className={`rounded-xl p-6 text-center ${tierColors.bg} ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center mx-auto mb-3">
          <CheckIcon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[#283E48] mb-2">
          You're all set!
        </h3>
        <p className="text-sm text-[#6B7280]">
          We've sent your full report to {email}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-6 ${tierColors.bg} ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <MailIcon className={`w-5 h-5 ${tierColors.accent}`} />
        <h3 className="text-base font-bold text-[#283E48]">
          Where should we send your full report?
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="email@business.com"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-[#283E48] placeholder-[#9CA3AF] text-base transition-all ${
              isFocused
                ? 'border-[#3866B0] ring-2 ring-[#3866B0]/20'
                : 'border-[#E5E7EB]'
            }`}
          />
          {isValidEmail && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckIcon className="w-5 h-5 text-[#22C55E]" />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {tier === 'gold' && (
            <button
              type="button"
              onClick={handleStrategyCall}
              className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all hover:bg-white/50 ${tierColors.border} ${tierColors.accent}`}
            >
              Schedule a Strategy Call
            </button>
          )}

          <button
            type="submit"
            disabled={!isValidEmail}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm text-white transition-all ${
              isValidEmail
                ? 'bg-[#3866B0] hover:bg-[#2D5490]'
                : 'bg-[#BDBDBD] cursor-not-allowed'
            }`}
          >
            {tier === 'gold' ? 'Create Premium Account' : tier === 'silver' ? 'Create Account' : 'Create Free Account'}
          </button>
        </div>
      </form>
    </div>
  );
}
