import { useState, useEffect } from 'react';
import { VALUE_PROPOSITIONS } from '../../data/valuePropContent';
import { iconMap } from '../../../../components/icons/Icons';

const ROTATION_INTERVAL = 5000; // 5 seconds

export function UniqueValuePropRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % VALUE_PROPOSITIONS.length);
        setIsTransitioning(false);
      }, 300);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const currentProp = VALUE_PROPOSITIONS[currentIndex];
  const IconComponent = iconMap[currentProp.icon];

  // Map highlight colors to Tailwind classes
  const getColorClasses = (color: string) => {
    switch (color) {
      case '#22C55E':
        return { bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]' };
      case '#3866B0':
        return { bg: 'bg-[#3866B0]/10', text: 'text-[#3866B0]' };
      case '#F59E0B':
        return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]' };
      default:
        return { bg: 'bg-[#3866B0]/10', text: 'text-[#3866B0]' };
    }
  };

  const colorClasses = getColorClasses(currentProp.highlightColor);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E9F9]">
      {/* Content with fade transition */}
      <div
        className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Icon and title */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses.bg}`}>
            {IconComponent && (
              <IconComponent className={`w-5 h-5 ${colorClasses.text}`} />
            )}
          </div>
          <h3 className="font-bold text-[#283E48]">{currentProp.title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-[#6B7280] leading-relaxed">{currentProp.description}</p>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {VALUE_PROPOSITIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 200);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-[#3866B0] w-4'
                : 'bg-[#E2E9F9] hover:bg-[#BDBDBD]'
            }`}
            aria-label={`View proposition ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
