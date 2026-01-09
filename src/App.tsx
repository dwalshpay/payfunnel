import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FunnelProvider, useFunnel } from './context/FunnelContext';
import { FunnelLayout } from './components/layout/FunnelLayout';
import { StepPage } from './pages/StepPage';
import { SuccessPage } from './pages/SuccessPage';
import { LandingPage } from './pages/LandingPage';
import { VariantAFunnel } from './variants/variant-a';
import { VariantBFunnel } from './variants/variant-b';
import { VariantCFunnel } from './variants/variant-c';
import { VariantDFunnel } from './variants/variant-d';
import { VariantEFunnelRoot } from './variants/variant-e';
import { VariantF } from './variants/variant-f';
import { VariantGFunnel } from './variants/variant-g';

function BaselineFunnelContent() {
  const { state } = useFunnel();

  if (state.isComplete) {
    return <SuccessPage />;
  }

  return (
    <FunnelLayout>
      <StepPage />
    </FunnelLayout>
  );
}

function BaselineFunnel() {
  return (
    <FunnelProvider>
      <BaselineFunnelContent />
    </FunnelProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/funnel/baseline" element={<BaselineFunnel />} />
        <Route path="/funnel/variant-a" element={<VariantAFunnel />} />
        <Route path="/funnel/variant-b" element={<VariantBFunnel />} />
        <Route path="/funnel/variant-c" element={<VariantCFunnel />} />
        <Route path="/funnel/variant-d" element={<VariantDFunnel />} />
        <Route path="/funnel/variant-e" element={<VariantEFunnelRoot />} />
        <Route path="/funnel/variant-f" element={<VariantF />} />
        <Route path="/funnel/variant-g" element={<VariantGFunnel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
