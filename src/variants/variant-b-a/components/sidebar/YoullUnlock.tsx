const BENEFITS = [
  { label: 'Points on ATO & supplier payments' },
  { label: 'Access to 12+ airline partners' },
  { label: 'Real-time payment tracking', subtitle: '(see rewards as they accumulate)' },
  { label: 'Exclusive member rates' },
];

export function YoullUnlock() {
  return (
    <div className="bg-white rounded-2xl border border-[#F5F5F5] shadow-sm p-5">
      <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
        You'll Unlock
      </h3>

      <div className="flex flex-col gap-3">
        {BENEFITS.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* Checkmark icon */}
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="w-5 h-5 text-[#22C55E]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <span className="text-sm text-[#283E48] leading-tight">
                {benefit.label}
              </span>
              {benefit.subtitle && (
                <span className="text-xs text-[#9CA3AF] mt-0.5">{benefit.subtitle}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
