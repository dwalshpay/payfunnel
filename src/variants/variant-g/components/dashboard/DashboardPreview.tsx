import { useVariantG, EXPENSE_VALUES } from '../../context/VariantGContext';
import {
  UsersIcon,
  WalletIcon,
  StarIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckIcon,
} from '../../../../components/icons/Icons';

function formatCurrency(num: number): string {
  if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return '$' + (num / 1000).toFixed(0) + 'K';
  }
  return '$' + num.toLocaleString();
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
}

// Sample client data
const SAMPLE_CLIENTS = [
  { name: 'Acme Construction', monthly: 45000, status: 'active' },
  { name: 'Smith Plumbing', monthly: 22000, status: 'active' },
  { name: 'Jones Medical', monthly: 18000, status: 'pending' },
];

export function DashboardPreview() {
  const { state } = useVariantG();
  const { answers, calculated } = state;

  const monthlyExpenseValue = answers.avgMonthlyExpenses
    ? EXPENSE_VALUES[answers.avgMonthlyExpenses]
    : 20000;
  const monthlyVolume = answers.clientCount * monthlyExpenseValue;

  return (
    <div className="bg-[#F5F8FC] rounded-xl p-4 border border-[#E5E7EB]">
      {/* Dashboard header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Title bar */}
        <div className="bg-[#3866B0] text-white px-4 py-3 flex items-center justify-between">
          <span className="font-semibold">pay.com.au Advisor Dashboard</span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 p-4 border-b border-[#E5E7EB]">
          <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <UsersIcon className="w-4 h-4 text-[#3866B0]" />
            </div>
            <div className="text-xl font-bold text-[#283E48]">{answers.clientCount}</div>
            <div className="text-xs text-[#6B7280]">enrolled</div>
          </div>
          <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <WalletIcon className="w-4 h-4 text-[#3866B0]" />
            </div>
            <div className="text-xl font-bold text-[#283E48]">
              {formatCurrency(monthlyVolume)}
            </div>
            <div className="text-xs text-[#6B7280]">monthly</div>
          </div>
          <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <StarIcon className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="text-xl font-bold text-[#283E48]">
              {formatNumber(calculated.annualPointsPotential)}
            </div>
            <div className="text-xs text-[#6B7280]">points</div>
          </div>
          <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <BriefcaseIcon className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="text-xl font-bold text-[#283E48]">
              ${(calculated.advisorBonusPotential / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-[#6B7280]">YTD</div>
          </div>
        </div>

        {/* Client list */}
        <div className="p-4">
          <h4 className="text-xs font-bold tracking-[0.8px] text-[#6B7280] uppercase mb-3">
            Client Portfolio
          </h4>
          <div className="space-y-2">
            {SAMPLE_CLIENTS.map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F0F4FA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E2E9F9] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#3866B0]">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-[#283E48] text-sm">{client.name}</div>
                    <div className="text-xs text-[#6B7280]">
                      {formatCurrency(client.monthly)}/mo
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {client.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-medium">
                      <CheckIcon className="w-3 h-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                      <ClockIcon className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                  <ChevronRightIcon className="w-4 h-4 text-[#9CA3AF]" />
                </div>
              </div>
            ))}
            <div className="text-center py-2">
              <span className="text-sm text-[#6B7280]">
                + {Math.max(0, answers.clientCount - 3)} more clients...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
