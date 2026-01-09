import {
  MailIcon,
  TrendingIcon,
  GiftIcon,
  TargetIcon,
  PhoneIcon,
} from '../../../../components/icons/Icons';

const BENEFITS = [
  {
    icon: MailIcon,
    title: 'Client Onboarding Tools',
    description: 'Invite links, bulk import',
    color: '#3866B0',
    bgColor: '#E2E9F9',
  },
  {
    icon: TrendingIcon,
    title: 'Portfolio Tracking Dashboard',
    description: 'Track all client payments & rewards',
    color: '#3866B0',
    bgColor: '#E2E9F9',
  },
  {
    icon: GiftIcon,
    title: 'Referral Bonuses',
    description: 'Earn on client activity across your entire portfolio',
    color: '#22C55E',
    bgColor: '#DCFCE7',
  },
  {
    icon: TargetIcon,
    title: 'Priority Support',
    description: 'Fast response for you & clients',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    icon: PhoneIcon,
    title: 'Dedicated Account Manager',
    description: 'Personal support for onboarding',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
];

export function AdvisorBenefitsGrid() {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold tracking-[0.8px] text-[#6B7280] uppercase">
        Advisor Program Benefits
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BENEFITS.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#D3DFF6] transition-colors"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: benefit.bgColor }}
              >
                <span style={{ color: benefit.color }}>
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <h4 className="font-bold text-[#283E48] mb-1">{benefit.title}</h4>
              <p className="text-sm text-[#6B7280]">{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
