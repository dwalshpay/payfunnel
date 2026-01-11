import { useVariantF } from '../context/VariantFContext';
import { TIER_CONFIGS } from '../types';
import { ScoreCircle } from '../components/results/ScoreCircle';
import { BenchmarkBars } from '../components/results/BenchmarkBars';
import { RecommendationsList } from '../components/results/RecommendationsList';
import { DoubleDipBreakdown } from '../components/results/DoubleDipBreakdown';
import { EmailCapture } from '../components/results/EmailCapture';
import { businessProfileQuestions } from '../data/questionConfig';

export function ResultsPage() {
  const {
    state,
    setEmail,
    submitEmail,
  } = useVariantF();

  const { score, recommendations, answers, ui } = state;

  // This shouldn't happen, but handle null score gracefully
  if (!score) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8EEF7] via-[#EDF1F8] to-[#E5EBF5] py-12 px-4 flex items-center justify-center">
        <p className="text-[#6B7280]">Calculating your results...</p>
      </div>
    );
  }

  const tierConfig = TIER_CONFIGS[score.tier];

  // Get industry label for benchmark comparison
  const industryOption = businessProfileQuestions[0].options.find(
    (o) => o.id === answers.businessProfile.industry
  );
  const industryLabel = industryOption?.label ?? 'your industry';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EEF7] via-[#EDF1F8] to-[#E5EBF5] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-[#E5E7EB]">
            <h1 className="text-2xl font-bold text-[#283E48] tracking-tight">
              YOUR BUSINESS REWARDS ASSESSMENT
            </h1>
          </div>

          {/* Score section */}
          <div className="px-8 py-8 border-b border-[#E5E7EB]">
            <h2 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-6 text-center">
              Rewards Potential Score
            </h2>

            <ScoreCircle
              score={score.total}
              tier={score.tier}
              percentile={score.percentile}
              animate={true}
              className="mb-8"
            />

            {/* Tier description */}
            <div
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: tierConfig.backgroundColor }}
            >
              <p
                className="font-bold mb-1"
                style={{ color: tierConfig.accentColor }}
              >
                {tierConfig.label}
              </p>
              <p className="text-sm text-[#283E48]">{tierConfig.description}</p>
            </div>
          </div>

          {/* Benchmark section */}
          <div className="px-8 py-8 border-b border-[#E5E7EB]">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Annual potential */}
              <div>
                <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-4">
                  Annual Potential
                </h3>
                <div className="bg-[#F9FAFB] rounded-xl p-6">
                  <p className="text-3xl font-bold text-[#3866B0] mb-1">
                    {score.annualPoints.toLocaleString('en-AU')} points
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    ~${score.annualValue.toLocaleString('en-AU')} value
                  </p>
                </div>
              </div>

              {/* Industry benchmark */}
              <div>
                <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-4">
                  Industry Benchmark
                </h3>
                <BenchmarkBars
                  userScore={score.total}
                  industryLabel={industryLabel}
                  animate={true}
                />
              </div>
            </div>
          </div>

          {/* Recommendations section */}
          {recommendations.length > 0 && (
            <div className="px-8 py-8 border-b border-[#E5E7EB]">
              <RecommendationsList recommendations={recommendations} />
            </div>
          )}

          {/* Double-dip breakdown */}
          <div className="px-8 py-8 border-b border-[#E5E7EB]">
            <DoubleDipBreakdown annualPoints={score.annualPoints} />
          </div>

          {/* Email capture */}
          <div className="px-8 py-8">
            <EmailCapture
              tier={score.tier}
              score={score.total}
              email={ui.email}
              emailSubmitted={ui.emailSubmitted}
              onEmailChange={setEmail}
              onSubmit={submitEmail}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            Trusted by 50,000+ Australian businesses
          </p>
        </div>
      </div>
    </div>
  );
}
