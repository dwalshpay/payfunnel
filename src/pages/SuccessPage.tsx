import { useEffect, useState } from 'react';
import { useFunnel } from '../context/FunnelContext';

export function SuccessPage() {
  const { state } = useFunnel();
  const { answers } = state;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger content fade-in after mount
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate estimated points (simplified version)
  const estimatedPoints = 156000;

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center p-4
        transition-opacity duration-500
        ${showContent ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        background: 'linear-gradient(135deg, #E2E9F9 0%, #F0F4FA 50%, #FFFFFF 100%)',
      }}
    >
      <div className="bg-white rounded-[12px] border border-[#F5F5F5] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] w-full max-w-[540px] p-8 text-center">
        {/* Success icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F5E9] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#00B67A]"
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
        <h1 className="text-[32px] font-bold text-[#283E48] mb-3">
          Account Created!
        </h1>

        <p className="text-[16px] text-[#6B7280] mb-6">
          Welcome aboard, {answers.registration.firstName}! Your account has been successfully created.
        </p>

        {/* Points summary card */}
        <div className="bg-[#F0F4FA] rounded-xl p-6 mb-6">
          <p className="text-[14px] text-[#6B7280] mb-2">Your estimated annual rewards</p>
          <p className="text-[48px] font-bold text-[#3866B0] leading-tight">
            {estimatedPoints.toLocaleString()}
          </p>
          <p className="text-[16px] text-[#6B7280]">points per year</p>
        </div>

        {/* Account details */}
        <div className="text-left bg-[#FAFAFA] rounded-lg p-4 mb-6">
          <h3 className="text-[14px] font-semibold text-[#283E48] mb-3">Account Details</h3>
          <div className="space-y-2 text-[14px]">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Email</span>
              <span className="text-[#283E48] font-medium">{answers.registration.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Name</span>
              <span className="text-[#283E48] font-medium">
                {answers.registration.firstName} {answers.registration.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Mobile</span>
              <span className="text-[#283E48] font-medium">{answers.registration.mobileNumber}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-4 px-6 rounded-lg bg-[#3866B0] hover:bg-[#2D5490] text-white font-semibold text-[16px] transition-colors"
        >
          Go to Dashboard
        </button>

        {/* Secondary link */}
        <p className="mt-4 text-[14px] text-[#6B7280]">
          Check your email for confirmation details
        </p>
      </div>
    </div>
  );
}
