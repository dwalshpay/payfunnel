import type { UnlockStatus } from '../../hooks/useValueUnlocker';

interface ValueUnlockerProps {
  unlockStatus: UnlockStatus;
}

export function ValueUnlocker({ unlockStatus }: ValueUnlockerProps) {
  const { items, totalFlightsUnlocked, pendingItems, percentComplete } = unlockStatus;

  // Don't show if no items are relevant yet
  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E9F9]">
      {/* Header with flight count */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-[#3866B0]">
            {totalFlightsUnlocked < 1
              ? totalFlightsUnlocked.toFixed(1)
              : Math.round(totalFlightsUnlocked)}
          </div>
          <div className="text-xs text-[#6B7280]">Business Class flights unlocked</div>
        </div>
        <div className="relative w-12 h-12">
          {/* Circular progress */}
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E2E9F9"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeDasharray={`${percentComplete}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-[#22C55E]">{percentComplete}%</span>
          </div>
        </div>
      </div>

      {/* Unlock items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              item.isUnlocked ? 'bg-[#D1FAE5]' : 'bg-[#F5F5F5]'
            }`}
          >
            {/* Checkmark or empty circle */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.isUnlocked ? 'bg-[#22C55E]' : 'border-2 border-[#BDBDBD]'
              }`}
            >
              {item.isUnlocked && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>

            {/* Label and message */}
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${item.isUnlocked ? 'text-[#166534]' : 'text-[#6B7280]'}`}>
                {item.message}
              </div>
            </div>

            {/* Flight bonus indicator */}
            {!item.isUnlocked && item.flightBonus > 0 && (
              <span className="text-xs font-medium text-[#F59E0B] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                +{item.flightBonus} flight{item.flightBonus !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Pending prompt */}
      {pendingItems.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#E2E9F9]">
          <div className="text-xs text-[#6B7280]">
            <span className="font-medium text-[#F59E0B]">Unlock more:</span>{' '}
            {pendingItems[0].message}
          </div>
        </div>
      )}
    </div>
  );
}
