import { VariantCProvider, useVariantC } from './context/VariantCContext';
import { VariantCLayout } from './components/layout/VariantCLayout';
import { HeroPage } from './pages/HeroPage';
import { UnlockRewardsPage } from './pages/UnlockRewardsPage';
import { PersonalizeRewardsPage } from './pages/PersonalizeRewardsPage';
import { ClaimPartnersPage } from './pages/ClaimPartnersPage';
import { SuccessPage } from './pages/SuccessPage';

function VariantCContent() {
  const { state } = useVariantC();
  const { currentStep, isComplete } = state;

  // Render current step
  const renderStep = () => {
    if (isComplete || currentStep === 4) {
      return <SuccessPage />;
    }

    switch (currentStep) {
      case 0:
        return <HeroPage />;
      case 1:
        return <UnlockRewardsPage />;
      case 2:
        return <PersonalizeRewardsPage />;
      case 3:
        return <ClaimPartnersPage />;
      default:
        return <HeroPage />;
    }
  };

  // Hero page has its own layout
  if (currentStep === 0) {
    return renderStep();
  }

  // Other steps use the split layout
  return <VariantCLayout>{renderStep()}</VariantCLayout>;
}

export function VariantCFunnel() {
  return (
    <VariantCProvider>
      <VariantCContent />
    </VariantCProvider>
  );
}
