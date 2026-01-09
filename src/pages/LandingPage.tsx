import { Link } from 'react-router-dom';
import { Logo } from '../components/layout/Logo';

interface VariantCardProps {
  title: string;
  description: string;
  to: string;
  status: 'active' | 'coming-soon';
  badge?: string;
  badgeColor?: string;
}

function VariantCard({ title, description, to, status, badge, badgeColor = 'bg-[#3866B0]' }: VariantCardProps) {
  const isActive = status === 'active';

  if (!isActive) {
    return (
      <div className="bg-white/50 rounded-xl border border-[#E0E0E0] p-6 flex flex-col gap-4 opacity-60">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-[#283E48]">{title}</h3>
          <span className="text-xs font-medium text-[#6B7280] bg-[#F5F5F5] px-2 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
        <p className="text-[14px] text-[#6B7280] leading-relaxed">{description}</p>
        <div className="mt-auto pt-4">
          <span className="inline-block px-6 py-3 rounded-full bg-[#E0E0E0] text-[#9CA3AF] font-bold text-[14px] cursor-not-allowed">
            View Variant
          </span>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className="bg-white rounded-xl border border-[#F5F5F5] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-4 hover:shadow-[0px_3px_10px_1px_rgba(0,0,0,0.1)] transition-shadow"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-bold text-[#283E48]">{title}</h3>
        <span className={`text-xs font-medium text-white ${badgeColor} px-2 py-1 rounded-full`}>
          {badge || 'Active'}
        </span>
      </div>
      <p className="text-[14px] text-[#6B7280] leading-relaxed">{description}</p>
      <div className="mt-auto pt-4">
        <span className="inline-block px-6 py-3 rounded-full bg-[#3866B0] text-white font-bold text-[14px] hover:bg-[#2D5490] transition-colors">
          View Variant
        </span>
      </div>
    </Link>
  );
}

export function LandingPage() {
  const variants: VariantCardProps[] = [
    {
      title: 'Baseline (Figma Recreation)',
      description:
        'Pixel-perfect recreation of the original pay.com.au signup funnel design from Figma. This serves as our control variant for A/B testing.',
      to: '/funnel/baseline',
      status: 'active',
      badge: 'Baseline',
    },
    {
      title: 'Variant A - High Converting',
      description:
        '5-step optimized flow with dynamic rewards calculator, value-driven CTAs, and celebration success page. 25-40% expected conversion lift.',
      to: '/funnel/variant-a',
      status: 'active',
      badge: 'New',
      badgeColor: 'bg-[#22C55E]',
    },
    {
      title: 'Variant B - Desktop Optimized',
      description:
        'Two-column desktop layout with sidebar featuring points unlocked urgency, rotating testimonials, trust signals, and persistent rewards preview.',
      to: '/funnel/variant-b',
      status: 'active',
      badge: 'New',
      badgeColor: 'bg-[#F59E0B]',
    },
    {
      title: 'Variant C - Rewards First',
      description:
        'Value-first funnel with interactive hero calculator showing rewards before asking questions. 3-step flow with double-dip visualization and destination converter.',
      to: '/funnel/variant-c',
      status: 'active',
      badge: 'New',
      badgeColor: 'bg-[#EC4899]',
    },
    {
      title: 'Variant D - Double-Dip Focus',
      description:
        'Desktop-focused 4-step flow with sidebar education. Emphasizes double-dip value prop, shows Business Class flights unlocked, industry testimonials, and rotating unique value props.',
      to: '/funnel/variant-d',
      status: 'active',
      badge: 'New',
      badgeColor: 'bg-[#8B5CF6]',
    },
    {
      title: 'Variant E - Reward Anchor',
      description:
        'Flips the traditional funnel by leading with the payoff. Shows 156K benchmark points first, then quick 2-question profile, personalized results with confetti celebration, and optional enrichment.',
      to: '/funnel/variant-e',
      status: 'active',
      badge: 'New',
      badgeColor: 'bg-[#F97316]',
    },
    {
      title: 'Variant F - Business Assessment',
      description:
        'Professional diagnostic approach with 3-section assessment. Captures business profile, payment habits, and rewards goals to deliver a scored report with personalized recommendations and tier-based CTAs.',
      to: '/funnel/variant-f',
      status: 'active',
      badge: 'New',
      badgeColor: 'bg-[#06B6D4]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8EEF5] to-[#F0F4F8]">
      {/* Header */}
      <header className="h-16 px-6 flex items-center border-b border-[rgba(0,0,0,0.12)] bg-white">
        <Logo />
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-[36px] font-bold text-[#283E48] leading-tight mb-4">
            Signup Funnel Variants
          </h1>
          <p className="text-[18px] text-[#6B7280] max-w-2xl mx-auto">
            Explore different design iterations of the pay.com.au onboarding flow.
            Each variant tests different conversion optimization strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variants.map((variant) => (
            <VariantCard key={variant.to} {...variant} />
          ))}
        </div>

        <div className="mt-16 p-6 bg-white rounded-xl border border-[#F5F5F5]">
          <h2 className="text-[18px] font-bold text-[#283E48] mb-4">
            Design Principles
          </h2>
          <ul className="space-y-2 text-[14px] text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="text-[#3866B0] mt-1">•</span>
              <span>Each variant is self-contained and swappable for A/B testing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3866B0] mt-1">•</span>
              <span>Mobile-first, responsive implementation with WCAG 2.1 AA compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3866B0] mt-1">•</span>
              <span>Focus on conversion optimization: clarity, trust signals, friction reduction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3866B0] mt-1">•</span>
              <span>Document rationale and best practice source for each design change</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
