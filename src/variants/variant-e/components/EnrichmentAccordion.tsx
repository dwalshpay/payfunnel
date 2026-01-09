import { useState, useEffect } from 'react';
import { UsersIcon, CreditCardIcon, ClipboardIcon } from '../../../components/icons/Icons';

interface EnrichmentOption {
  id: string;
  label: string;
}

interface EnrichmentSection {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  type: 'single' | 'multi';
  options: EnrichmentOption[];
}

interface EnrichmentAccordionProps {
  sections?: EnrichmentSection[];
  values: Record<string, string | string[]>;
  onChange: (sectionId: string, value: string | string[]) => void;
  onComplete: () => void;
  onSkip: () => void;
  currentPoints: number;
  accuracy: number;
}

const defaultSections: EnrichmentSection[] = [
  {
    id: 'teamSize',
    icon: UsersIcon,
    title: 'Team size',
    type: 'single',
    options: [
      { id: 'solo', label: 'Just me' },
      { id: 'small', label: '2-10 employees' },
      { id: 'medium', label: '11-50 employees' },
      { id: 'large', label: '50+ employees' },
    ],
  },
  {
    id: 'paymentMethods',
    icon: CreditCardIcon,
    title: 'Payment methods you use',
    type: 'multi',
    options: [
      { id: 'amex', label: 'American Express' },
      { id: 'visa', label: 'Visa' },
      { id: 'mastercard', label: 'Mastercard' },
      { id: 'bank_transfer', label: 'Bank Transfer' },
    ],
  },
  {
    id: 'paymentTypes',
    icon: ClipboardIcon,
    title: 'Types of payments',
    type: 'multi',
    options: [
      { id: 'suppliers', label: 'Supplier invoices' },
      { id: 'ato', label: 'ATO / Tax payments' },
      { id: 'payroll', label: 'Staff payroll' },
      { id: 'rent', label: 'Business rent' },
      { id: 'insurance', label: 'Insurance' },
    ],
  },
];

export function EnrichmentAccordion({
  sections = defaultSections,
  values,
  onChange,
  onComplete,
  onSkip,
  currentPoints,
  accuracy,
}: EnrichmentAccordionProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [animatingPoints, setAnimatingPoints] = useState(false);
  const [displayPoints, setDisplayPoints] = useState(currentPoints);

  // Animate points changes
  useEffect(() => {
    if (currentPoints !== displayPoints) {
      setAnimatingPoints(true);
      const duration = 400;
      const startTime = Date.now();
      const startValue = displayPoints;
      const endValue = currentPoints;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (endValue - startValue) * eased);
        setDisplayPoints(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatingPoints(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [currentPoints, displayPoints]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isSectionComplete = (section: EnrichmentSection): boolean => {
    const value = values[section.id];
    if (section.type === 'single') {
      return typeof value === 'string' && value !== '';
    }
    return Array.isArray(value) && value.length > 0;
  };

  const handleOptionSelect = (section: EnrichmentSection, optionId: string) => {
    if (section.type === 'single') {
      onChange(section.id, optionId);
    } else {
      const current = (values[section.id] as string[]) || [];
      const newValue = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      onChange(section.id, newValue);
    }
  };

  const allComplete = sections.every(isSectionComplete);

  return (
    <div
      className="min-h-[100dvh] flex flex-col pb-32"
      style={{
        background: 'linear-gradient(180deg, #E8EEF5 0%, #F0F4F8 100%)',
      }}
    >
      {/* Header with live points */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0] py-4 px-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6B7280] uppercase tracking-wide font-medium">
              Your estimate
            </p>
            <p
              className={`
                text-2xl font-bold tabular-nums
                transition-colors duration-300
                ${animatingPoints ? 'text-[#00B67A]' : 'text-[#283E48]'}
              `}
            >
              {displayPoints.toLocaleString()} pts
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B7280] uppercase tracking-wide font-medium">Accuracy</p>
            <p className="text-2xl font-bold text-[#3866B0] tabular-nums">{accuracy}%</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-lg mx-auto">
          {/* Section header */}
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#283E48] mb-1">
              Refine your estimate
            </h2>
            <p className="text-[#6B7280]">Each section increases accuracy</p>
          </div>

          {/* Accordion sections */}
          <div className="space-y-3">
            {sections.map((section, index) => {
              const isExpanded = expandedSections.includes(section.id);
              const isComplete = isSectionComplete(section);
              const currentValue = values[section.id];
              const IconComponent = section.icon;

              return (
                <div
                  key={section.id}
                  className={`
                    rounded-xl border-2 overflow-hidden
                    transition-all duration-300
                    opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]
                    ${
                      isComplete
                        ? 'bg-[#E8F5E9] border-[#00B67A]/30'
                        : 'bg-white border-[#E0E0E0]'
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isComplete ? 'bg-[#00B67A]/10' : 'bg-[#D3DFF6]'}`}>
                        <IconComponent className={`w-4 h-4 ${isComplete ? 'text-[#00B67A]' : 'text-[#3866B0]'}`} />
                      </div>
                      <span
                        className={`font-semibold ${
                          isComplete ? 'text-[#00B67A]' : 'text-[#283E48]'
                        }`}
                      >
                        {section.title}
                      </span>
                      {isComplete && (
                        <div className="w-5 h-5 rounded-full bg-[#00B67A] flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <svg
                      className={`
                        w-5 h-5 text-[#6B7280] transition-transform duration-300
                        ${isExpanded ? 'rotate-180' : ''}
                      `}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Expandable content */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="px-4 pb-4 space-y-2">
                      {section.options.map((option) => {
                        const isSelected =
                          section.type === 'single'
                            ? currentValue === option.id
                            : Array.isArray(currentValue) && currentValue.includes(option.id);

                        return (
                          <button
                            key={option.id}
                            onClick={() => handleOptionSelect(section, option.id)}
                            className={`
                              w-full flex items-center gap-3 px-4 py-3 rounded-lg
                              border-2 transition-all duration-200 text-left
                              ${
                                isSelected
                                  ? 'bg-[#D3DFF6] border-[#3866B0]'
                                  : 'bg-[#F5F5F5] border-transparent hover:bg-[#E8EEF5] hover:border-[#E0E0E0]'
                              }
                            `}
                          >
                            {/* Selection indicator */}
                            <div
                              className={`
                                w-5 h-5 flex-shrink-0 ${section.type === 'single' ? 'rounded-full' : 'rounded-md'}
                                border-2 flex items-center justify-center
                                transition-all duration-200
                                ${
                                  isSelected
                                    ? 'border-[#3866B0] bg-[#3866B0]'
                                    : 'border-[#BDBDBD]'
                                }
                              `}
                            >
                              {isSelected && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`
                                font-medium
                                ${isSelected ? 'text-[#003C80]' : 'text-[#283E48]'}
                              `}
                            >
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E0E0E0] py-4 px-4"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={allComplete ? onComplete : onSkip}
            className={`
              w-full py-4 px-6 rounded-xl font-bold text-lg
              transition-all duration-300 active:scale-[0.98]
              ${
                allComplete
                  ? 'bg-[#00B67A] hover:bg-[#00A36C] text-white shadow-lg hover:shadow-xl hover:shadow-[#00B67A]/25'
                  : 'bg-[#E0E0E0] hover:bg-[#BDBDBD] text-[#283E48]'
              }
            `}
          >
            {allComplete ? 'Create Account with Full Estimate' : 'Skip & Create Account'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
