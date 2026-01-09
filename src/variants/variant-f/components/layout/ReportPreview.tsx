interface ReportPreviewProps {
  className?: string;
}

export function ReportPreview({ className = '' }: ReportPreviewProps) {
  return (
    <div className={`bg-[#E2E9F9] rounded-xl p-6 ${className}`}>
      <p className="text-sm font-bold text-[#283E48] mb-4">
        Your report will include:
      </p>

      <ul className="space-y-2">
        {[
          'Rewards Potential Score',
          'Industry benchmark comparison',
          'Payment optimization tips',
          'Partner recommendations',
        ].map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-[#283E48]">
            <svg
              className="w-4 h-4 text-[#22C55E] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      {/* Sample report card */}
      <div className="mt-6 bg-white rounded-lg p-4 shadow-sm relative overflow-hidden">
        <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-3">
          Sample Report Preview
        </p>

        {/* Score circle mockup */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            {/* Background circle */}
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#3866B0"
                strokeWidth="3"
                strokeDasharray="82 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[#283E48]">87</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-[#283E48]">TOP 15%</p>
            <p className="text-xs text-[#6B7280]">of businesses</p>
          </div>
        </div>

        {/* Blurred content below */}
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-[#E5E7EB] rounded-full w-full" />
          <div className="h-2 bg-[#E5E7EB] rounded-full w-3/4" />
          <div className="h-2 bg-[#E5E7EB] rounded-full w-5/6" />
        </div>

        {/* Fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
}
