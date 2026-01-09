import { useEffect, useState } from 'react';

interface BenchmarkBarsProps {
  userScore: number;
  industryAverage?: number;
  allBusinessAverage?: number;
  industryLabel?: string;
  animate?: boolean;
  className?: string;
}

export function BenchmarkBars({
  userScore,
  industryAverage = 55,
  allBusinessAverage = 45,
  industryLabel = 'Industry',
  animate = true,
  className = '',
}: BenchmarkBarsProps) {
  const [displayWidths, setDisplayWidths] = useState({
    user: animate ? 0 : userScore,
    industry: animate ? 0 : industryAverage,
    all: animate ? 0 : allBusinessAverage,
  });

  useEffect(() => {
    if (!animate) return;

    const timer = setTimeout(() => {
      setDisplayWidths({
        user: userScore,
        industry: industryAverage,
        all: allBusinessAverage,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [userScore, industryAverage, allBusinessAverage, animate]);

  const bars = [
    {
      label: 'You',
      value: userScore,
      displayWidth: displayWidths.user,
      color: '#3866B0',
      textColor: '#3866B0',
    },
    {
      label: `Avg ${industryLabel}`,
      value: industryAverage,
      displayWidth: displayWidths.industry,
      color: '#D3DFF6',
      textColor: '#6B7280',
    },
    {
      label: 'All businesses',
      value: allBusinessAverage,
      displayWidth: displayWidths.all,
      color: 'rgba(0,0,0,0.12)',
      textColor: '#9CA3AF',
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {bars.map((bar, index) => (
        <div key={bar.label} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span
              className={`font-medium ${index === 0 ? 'font-bold' : ''}`}
              style={{ color: bar.textColor }}
            >
              {bar.label}
            </span>
            <span
              className="text-sm"
              style={{ color: bar.textColor }}
            >
              {bar.value}
            </span>
          </div>
          <div className="h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${bar.displayWidth}%`,
                backgroundColor: bar.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
