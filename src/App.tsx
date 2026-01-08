import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FunnelProvider } from './context/FunnelContext';
import { FunnelLayout } from './components/layout/FunnelLayout';
import { StepPage } from './pages/StepPage';
import { LandingPage } from './pages/LandingPage';
import { VariantAFunnel } from './variants/variant-a';
import { VariantBFunnel } from './variants/variant-b';
import { VariantCFunnel } from './variants/variant-c';
import { VariantDFunnel } from './variants/variant-d';

function BaselineFunnel() {
  return (
    <FunnelProvider>
      <FunnelLayout>
        <StepPage />
      </FunnelLayout>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
