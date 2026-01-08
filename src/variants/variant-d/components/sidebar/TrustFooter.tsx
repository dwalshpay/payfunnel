import { TRUST_SIGNALS } from '../../data/valuePropContent';

export function TrustFooter() {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl p-4 border border-[#E2E9F9]">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#6B7280]">
        {TRUST_SIGNALS.map((signal, index) => (
          <div key={signal.id} className="flex items-center gap-1.5">
            {signal.id === 'pci' && (
              <svg className="w-4 h-4 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {signal.id === 'businesses' && (
              <svg className="w-4 h-4 text-[#3866B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {signal.id === 'australian' && (
              <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span className="font-medium">{signal.label}</span>
            {index < TRUST_SIGNALS.length - 1 && (
              <span className="text-[#E2E9F9] ml-2">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
