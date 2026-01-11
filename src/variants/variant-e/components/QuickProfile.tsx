import { QuickIndustryGrid } from './QuickIndustryGrid';
import { SpendBuckets } from './SpendBuckets';

interface QuickProfileProps {
  selectedIndustry: string | null;
  selectedSpend: string | null;
  onIndustrySelect: (id: string) => void;
  onSpendSelect: (id: string) => void;
  onCalculate: () => void;
  accuracy: number;
}

export function QuickProfile({
  selectedIndustry,
  selectedSpend,
  onIndustrySelect,
  onSpendSelect,
  onCalculate,
  accuracy,
}: QuickProfileProps) {
  const canContinue = selectedIndustry !== null && selectedSpend !== null;

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #E8EEF5 0%, #F0F4F8 100%)',
      }}
    >
      {/* Header with progress hint */}
      <div className="pt-6 pb-4 px-6 text-center">
        <p className="text-[#6B7280] text-sm font-medium">
          Just 2 quick questions to personalise your estimate
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 md:px-6 pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Two column layout on desktop */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Industry section */}
            <div className="flex-1 lg:flex-[1.2]">
              <h2 className="text-lg md:text-xl font-bold text-[#283E48] mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#D3DFF6] text-[#3866B0] text-sm font-bold flex items-center justify-center">
                  1
                </span>
                What type of business?
              </h2>
              <QuickIndustryGrid
                selected={selectedIndustry}
                onSelect={onIndustrySelect}
              />
            </div>

            {/* Spend section */}
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-[#283E48] mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#D3DFF6] text-[#3866B0] text-sm font-bold flex items-center justify-center">
                  2
                </span>
                Your monthly expenses?
              </h2>
              <SpendBuckets selected={selectedSpend} onSelect={onSpendSelect} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Accuracy meter integrated above button */}
        <div className="bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4 px-4">
          <div className="max-w-md mx-auto">
            {/* Mini accuracy indicator */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex-1 h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3866B0] to-[#5A8AD4] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
              <span className="text-xs font-medium text-[#6B7280] tabular-nums w-12 text-right">
                {accuracy}%
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={onCalculate}
              disabled={!canContinue}
              className={`
                w-full py-4 px-6 rounded-xl
                font-bold text-lg
                transition-all duration-300
                ${
                  canContinue
                    ? 'bg-[#3866B0] hover:bg-[#2D5490] text-white shadow-lg hover:shadow-xl hover:shadow-[#3866B0]/25 active:scale-[0.98]'
                    : 'bg-[#BDBDBD] text-white cursor-not-allowed'
                }
              `}
            >
              <span className="flex items-center justify-center gap-2">
                {canContinue ? (
                  <>
                    Calculate My Rewards
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                    Select both to continue
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
