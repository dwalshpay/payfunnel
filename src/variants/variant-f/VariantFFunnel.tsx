import { useVariantF } from './context/VariantFContext';
import { IntroPage } from './pages/IntroPage';
import { Section1BusinessProfile } from './pages/Section1BusinessProfile';
import { Section2PaymentHabits } from './pages/Section2PaymentHabits';
import { Section3RewardsGoals } from './pages/Section3RewardsGoals';
import { ResultsPage } from './pages/ResultsPage';

export function VariantFFunnel() {
  const { state } = useVariantF();
  const { currentStep } = state;

  switch (currentStep) {
    case 'intro':
      return <IntroPage />;
    case 'section1':
      return <Section1BusinessProfile />;
    case 'section2':
      return <Section2PaymentHabits />;
    case 'section3':
      return <Section3RewardsGoals />;
    case 'results':
      return <ResultsPage />;
    default:
      return <IntroPage />;
  }
}
