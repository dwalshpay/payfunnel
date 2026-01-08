import { TOTAL_STEPS } from '../../data/stepConfig';

interface ProgressDotsProps {
  currentStep: number;
}

export function ProgressDots({ currentStep }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentStep
              ? 'w-6 bg-[--color-primary]'
              : index < currentStep
              ? 'w-2 bg-[--color-primary]'
              : 'w-2 bg-[--color-border]'
          }`}
        />
      ))}
    </div>
  );
}
