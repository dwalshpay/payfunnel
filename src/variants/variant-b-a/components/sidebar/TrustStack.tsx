export function TrustStack() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#F5F5F5] shadow-sm">
      {/* Trust badges */}
      <div className="space-y-3">
        {/* Security */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-[#22C55E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#283E48]">Bank-level encryption</p>
            <p className="text-xs text-[#6B7280]">Bank-level security</p>
          </div>
        </div>

        {/* Trust count */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E0E7FF] flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-[#3866B0]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#283E48]">50,000+ businesses</p>
            <p className="text-xs text-[#6B7280]">Trust us with their payments</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-[#F59E0B]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#283E48]">4.9/5 rating</p>
            <p className="text-xs text-[#6B7280]">On Trustpilot</p>
          </div>
        </div>
      </div>

      {/* Partner logos */}
      <div className="mt-4 pt-4 border-t border-[#F5F5F5]">
        <p className="text-xs text-[#9CA3AF] text-center mb-3">Rewards partners</p>
        <div className="flex items-center justify-center gap-4 opacity-60">
          {/* Qantas logo placeholder */}
          <div className="w-16 h-6 bg-[#E0E0E0] rounded flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#6B7280]">QANTAS</span>
          </div>
          {/* Virgin logo placeholder */}
          <div className="w-14 h-6 bg-[#E0E0E0] rounded flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#6B7280]">VIRGIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
