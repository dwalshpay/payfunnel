import { PointsUnlocked } from '../sidebar/PointsUnlocked';
import { RewardsPreview } from '../sidebar/RewardsPreview';
import { TestimonialRotator } from '../sidebar/TestimonialRotator';
import { YoullUnlock } from '../sidebar/YoullUnlock';

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

      {/* You'll unlock - always visible */}
      <YoullUnlock />

      {/* Testimonial rotator - always visible */}
      <TestimonialRotator industry={industry} />
    </div>
  );
}
