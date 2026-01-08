import { PointsUnlocked } from '../sidebar/PointsUnlocked';
import { RewardsPreview } from '../sidebar/RewardsPreview';
import { TestimonialRotator } from '../sidebar/TestimonialRotator';
import { TrustStack } from '../sidebar/TrustStack';

interface SidebarProps {
  currentStep: number;
  pointsEarned: number;
  rewards: {
    annualRewards: number;
    confidence: 'low' | 'medium' | 'high';
  };
  industry: string | null;
}

export function Sidebar({ currentStep, pointsEarned, rewards, industry }: SidebarProps) {
  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Points unlocked - always visible */}
      <PointsUnlocked
        pointsEarned={pointsEarned}
        currentStep={currentStep}
      />

      {/* Rewards preview - visible after step 2 */}
      {currentStep >= 2 && rewards.annualRewards > 0 && (
        <RewardsPreview
          annualRewards={rewards.annualRewards}
          confidence={rewards.confidence}
        />
      )}

      {/* Testimonial rotator - always visible */}
      <TestimonialRotator industry={industry} />

      {/* Trust stack - always visible */}
      <TrustStack />
    </div>
  );
}
