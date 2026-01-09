import { useVariantG } from '../context/VariantGContext';
import { EntryPage } from './EntryPage';
import { Step1PortfolioOverview } from './Step1PortfolioOverview';
import { Step2ClientMix } from './Step2ClientMix';
import { Step3DashboardPreview } from './Step3DashboardPreview';
import { Step4AdvisorSignup } from './Step4AdvisorSignup';

export function VariantGStepPage() {
  const { state } = useVariantG();
  const { currentStep } = state;

  switch (currentStep) {
    case 'entry':
      return <EntryPage />;
    case 1:
      return <Step1PortfolioOverview />;
    case 2:
      return <Step2ClientMix />;
    case 3:
      return <Step3DashboardPreview />;
    case 4:
      return <Step4AdvisorSignup />;
    default:
      return <EntryPage />;
  }
}
