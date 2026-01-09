import { useVariantG } from '../context/VariantGContext';
import {
  CheckIcon,
  ChevronRightIcon,
  CalendarIcon,
  LinkIcon,
  MailIcon,
} from '../../../components/icons/Icons';

export function SuccessPage() {
  const { state } = useVariantG();
  const { registration } = state.answers;

  const firstName = registration.name.split(' ')[0] || 'there';

  const nextSteps = [
    {
      title: 'Access your dashboard',
      description: 'View your portfolio and client management tools',
      action: 'Go to Dashboard',
      icon: ChevronRightIcon,
    },
    {
      title: 'Book your onboarding call',
      description: "We'll help you roll out to your first clients",
      action: 'Schedule Call',
      icon: CalendarIcon,
    },
    {
      title: 'Get your client invite link',
      description: 'Share with clients to onboard them',
      action: 'Copy Invite Link',
      icon: LinkIcon,
    },
  ];

  const emailItems = [
    'Dashboard access link',
    'Client pitch deck (PDF)',
    'Getting started guide',
  ];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-[640px] bg-white rounded-xl p-8 md:p-12 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_1px_3px_1px_rgba(0,0,0,0.05)] text-center">
        {/* Success icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#DCFCE7] flex items-center justify-center">
          <CheckIcon className="w-8 h-8 text-[#166534]" />
        </div>

        {/* Welcome message */}
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#283E48] mb-2">
          Welcome to pay.com.au, {firstName}!
        </h1>
        <p className="text-lg text-[#6B7280] mb-8">Your advisor account is ready.</p>

        {/* Divider */}
        <div className="w-full h-px bg-[#E5E7EB] mb-8" />

        {/* Next Steps */}
        <div className="text-left mb-8">
          <h2 className="text-xs font-bold tracking-[0.8px] text-[#6B7280] uppercase mb-4">
            Next Steps
          </h2>
          <div className="space-y-4">
            {nextSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#E2E9F9] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-[#3866B0]">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#283E48]">{step.title}</h3>
                      <p className="text-sm text-[#6B7280]">{step.description}</p>
                    </div>
                  </div>
                  <button className="ml-9 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F0F4FA] text-[#3866B0] font-medium hover:bg-[#E2E9F9] transition-colors">
                    <Icon className="w-4 h-4" />
                    {step.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E5E7EB] mb-8" />

        {/* Email follow-up */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-3">
            <MailIcon className="w-4 h-4 text-[#6B7280]" />
            <span className="text-sm text-[#6B7280]">Check your email for:</span>
          </div>
          <ul className="space-y-2 ml-6">
            {emailItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-[#283E48]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3866B0]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
