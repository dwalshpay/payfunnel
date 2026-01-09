interface SpendBucket {
  id: string;
  label: string;
  sublabel?: string;
  multiplier: number;
}

interface SpendBucketsProps {
  buckets?: SpendBucket[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const defaultBuckets: SpendBucket[] = [
  { id: 'low', label: 'Under $10K', sublabel: 'per month', multiplier: 0.15 },
  { id: 'medium', label: '$10K - $50K', sublabel: 'per month', multiplier: 0.5 },
  { id: 'high', label: '$50K - $100K', sublabel: 'per month', multiplier: 1.0 },
  { id: 'very_high', label: '$100K - $250K', sublabel: 'per month', multiplier: 2.0 },
  { id: 'enterprise', label: '$250K+', sublabel: 'per month', multiplier: 4.0 },
];

export function SpendBuckets({
  buckets = defaultBuckets,
  selected,
  onSelect,
}: SpendBucketsProps) {
  return (
    <div className="flex flex-col gap-3">
      {buckets.map((bucket, index) => {
        const isSelected = selected === bucket.id;

        return (
          <button
            key={bucket.id}
            onClick={() => onSelect(bucket.id)}
            className={`
              relative group
              flex items-center justify-between
              px-5 py-4
              rounded-xl
              border-2 transition-all duration-200
              text-left
              opacity-0 animate-[fadeInRight_0.4s_ease-out_forwards]
              ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.15)]'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
              }
            `}
            style={{
              animationDelay: `${200 + index * 80}ms`,
            }}
          >
            {/* Radio circle */}
            <div className="flex items-center gap-4">
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  transition-all duration-200
                  ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 group-hover:border-slate-400'
                  }
                `}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white animate-[scaleIn_0.15s_ease-out]" />
                )}
              </div>

              {/* Label */}
              <div>
                <span
                  className={`
                    block text-base md:text-lg font-semibold
                    transition-colors duration-200
                    ${isSelected ? 'text-blue-700' : 'text-slate-700'}
                  `}
                >
                  {bucket.label}
                </span>
                {bucket.sublabel && (
                  <span className="text-xs text-slate-400">{bucket.sublabel}</span>
                )}
              </div>
            </div>

            {/* Multiplier badge */}
            <div
              className={`
                px-2.5 py-1 rounded-full text-xs font-bold
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }
              `}
            >
              {bucket.multiplier}x
            </div>
          </button>
        );
      })}

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export { defaultBuckets as spendBuckets };
