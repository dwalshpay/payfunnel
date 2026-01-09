import { CheckIcon, LockIcon } from '../../../../components/icons/Icons';
import { useVariantF } from '../../context/VariantFContext';
import type { AssessmentStep } from '../../types';

interface SectionItem {
  id: AssessmentStep;
  label: string;
  sectionNumber: 1 | 2 | 3;
}

const SECTIONS: SectionItem[] = [
  { id: 'section1', label: 'Business Profile', sectionNumber: 1 },
  { id: 'section2', label: 'Payment Habits', sectionNumber: 2 },
  { id: 'section3', label: 'Rewards Goals', sectionNumber: 3 },
];

interface SectionProgressProps {
  className?: string;
}

export function SectionProgress({ className = '' }: SectionProgressProps) {
  const { state, getSectionProgress } = useVariantF();
  const { current, total } = getSectionProgress();
  const isCalculating = state.ui.isCalculating;

  const getSectionStatus = (sectionNumber: number): 'completed' | 'current' | 'upcoming' => {
    if (sectionNumber < current) return 'completed';
    if (sectionNumber === current) return 'current';
    return 'upcoming';
  };

  return (
    <div className={`bg-white rounded-xl border border-[#F5F5F5] p-6 ${className}`}>
      <h3 className="text-sm font-bold text-[#283E48] mb-4">Assessment Progress</h3>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const status = getSectionStatus(section.sectionNumber);

          return (
            <div
              key={section.id}
              className={`flex items-center gap-3 ${
                status === 'upcoming' ? 'opacity-50' : ''
              }`}
            >
              {/* Status indicator */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  status === 'completed'
                    ? 'bg-[#22C55E]'
                    : status === 'current'
                      ? 'bg-[#3866B0]'
                      : 'border-2 border-[#E5E7EB]'
                }`}
              >
                {status === 'completed' && (
                  <CheckIcon className="w-3 h-3 text-white" />
                )}
                {status === 'current' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm ${
                  status === 'current'
                    ? 'font-bold text-[#283E48]'
                    : status === 'completed'
                      ? 'text-[#283E48]'
                      : 'text-[#6B7280]'
                }`}
              >
                {section.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB] my-5" />

      {/* Locked report preview */}
      <div className="flex items-center gap-2 text-[#6B7280]">
        <LockIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Your Assessment Report</span>
      </div>
      <p className="text-xs text-[#9CA3AF] mt-1 ml-6">
        Unlocks after completion
      </p>

      {/* Score building animation */}
      <div className="mt-4 p-3 bg-[#E2E9F9] rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#3866B0]">
            {isCalculating ? 'Calculating your final score...' : current > 0 ? 'Score building...' : 'Start to see your score'}
          </span>
        </div>
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3866B0] rounded-full transition-all duration-500"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
        {current > 0 && !isCalculating && (
          <p className="text-xs text-[#3866B0] mt-2">
            Looking good...
          </p>
        )}
      </div>
    </div>
  );
}
