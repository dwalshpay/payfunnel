import { CheckIcon } from '../../../../components/icons/Icons';

interface RecommendationsListProps {
  recommendations: string[];
  className?: string;
}

export function RecommendationsList({
  recommendations,
  className = '',
}: RecommendationsListProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-sm font-bold text-[#283E48] uppercase tracking-wider mb-3">
        Personalized Recommendations
      </h3>
      <p className="text-sm text-[#6B7280] mb-4">
        Based on your profile, here's how to maximize rewards:
      </p>

      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckIcon className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-[#283E48]">{recommendation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
