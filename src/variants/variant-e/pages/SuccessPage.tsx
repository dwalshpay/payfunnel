import { useEffect, useState } from 'react';
import { useVariantE } from '../context/VariantEContext';
import { getValueTranslations } from '../utils/calculations';
import { ConfettiCelebration } from '../components/ConfettiCelebration';
import { PlaneIcon, HotelIcon, GiftIcon } from '../../../components/icons/Icons';

export function SuccessPage() {
  const { state } = useVariantE();
  const { calculated, answers } = state;
  const [showConfetti, setShowConfetti] = useState(false);

  const values = getValueTranslations(calculated.userPoints);

  useEffect(() => {
    // Trigger celebration on mount
    setTimeout(() => setShowConfetti(true), 300);
  }, []);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(180deg, #E8F5E9 0%, #F1F8F2 50%, #F0F4F8 100%)',
      }}
    >
      <ConfettiCelebration
        trigger={showConfetti}
        intensity="high"
        duration={4000}
        onComplete={() => setShowConfetti(false)}
      />

      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="mb-6 opacity-0 animate-[scaleIn_0.5s_ease-out_0.2s_forwards]">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#00B67A] flex items-center justify-center shadow-lg shadow-[#00B67A]/30">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#283E48] mb-3 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.3s_forwards]">
          {answers.firstName ? `Welcome, ${answers.firstName}!` : "You're all set!"}
        </h1>

        <p className="text-lg text-[#6B7280] mb-8 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.4s_forwards]">
          Your personalised rewards estimate is ready
        </p>

        {/* Points summary card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-[#283E48]/5 border border-[#E0E0E0] p-6 md:p-8 mb-8 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.5s_forwards]">
          <div className="text-center mb-6">
            <p className="text-sm text-[#6B7280] mb-1">Your annual rewards potential</p>
            <p className="text-4xl md:text-5xl font-bold text-[#00B67A] tabular-nums">
              {calculated.userPoints.toLocaleString()}
            </p>
            <p className="text-[#6B7280]">points per year</p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent my-6" />

          {/* Value breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D3DFF6] flex items-center justify-center">
                  <PlaneIcon className="w-5 h-5 text-[#3866B0]" />
                </div>
                <span className="text-[#6B7280]">Business Class flights</span>
              </div>
              <span className="font-bold text-[#283E48]">{values.flights}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D3DFF6] flex items-center justify-center">
                  <HotelIcon className="w-5 h-5 text-[#3866B0]" />
                </div>
                <span className="text-[#6B7280]">Hotel nights</span>
              </div>
              <span className="font-bold text-[#283E48]">{values.hotelNights}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D3DFF6] flex items-center justify-center">
                  <GiftIcon className="w-5 h-5 text-[#3866B0]" />
                </div>
                <span className="text-[#6B7280]">Gift card value</span>
              </div>
              <span className="font-bold text-[#283E48]">${values.giftCardValue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Details sent confirmation */}
        {answers.email && (
          <p className="text-sm text-[#6B7280] mb-8 opacity-0 animate-[fadeIn_0.5s_ease-out_0.6s_forwards]">
            Details sent to <strong className="text-[#283E48]">{answers.email}</strong>
          </p>
        )}

        {/* CTA */}
        <button
          onClick={() => window.location.href = '/'}
          className="w-full max-w-sm mx-auto py-4 px-6 rounded-xl bg-[#3866B0] hover:bg-[#2D5490] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-[#3866B0]/25 transition-all duration-300 active:scale-[0.98] opacity-0 animate-[fadeInUp_0.5s_ease-out_0.7s_forwards]"
        >
          Get Started Now
        </button>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
