export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      {/* Security badge */}
      <div className="flex items-center gap-2 text-[#6B7280]">
        <svg
          className="w-5 h-5 text-[#22C55E]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
        <span className="text-xs font-medium">256-bit encryption</span>
      </div>

      {/* Business count */}
      <div className="flex items-center gap-2 text-[#6B7280]">
        <svg
          className="w-5 h-5 text-[#3866B0]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
        </svg>
        <span className="text-xs font-medium">Trusted by 10,000+ businesses</span>
      </div>

      {/* Trustpilot */}
      <div className="flex items-center gap-1.5 text-[#6B7280]">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#00B67A"
          />
        </svg>
        <span className="text-xs font-medium">4.9/5 on Trustpilot</span>
      </div>
    </div>
  );
}

// Compact trust indicator for forms
export function TrustIndicator() {
  return (
    <div className="flex items-center gap-1.5 text-[#6B7280]">
      <svg
        className="w-4 h-4 text-[#22C55E]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
      <span className="text-xs">Your data is secure</span>
    </div>
  );
}

// Partner logos strip
export function PartnerLogosStrip() {
  return (
    <div className="flex items-center justify-center gap-6 py-4 opacity-60">
      {/* Qantas */}
      <svg className="h-6 w-auto" viewBox="0 0 100 30" fill="#E0E0E0">
        <text x="0" y="22" fontSize="16" fontWeight="bold">
          Qantas
        </text>
      </svg>
      {/* Virgin */}
      <svg className="h-6 w-auto" viewBox="0 0 100 30" fill="#E0E0E0">
        <text x="0" y="22" fontSize="16" fontWeight="bold">
          Virgin
        </text>
      </svg>
      {/* Amex */}
      <svg className="h-6 w-auto" viewBox="0 0 100 30" fill="#E0E0E0">
        <text x="0" y="22" fontSize="16" fontWeight="bold">
          Amex
        </text>
      </svg>
    </div>
  );
}
