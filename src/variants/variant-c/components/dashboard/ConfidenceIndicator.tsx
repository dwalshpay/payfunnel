interface ConfidenceIndicatorProps {
  confidence: 'low' | 'medium' | 'high';
  currentStep: number;
}

export function ConfidenceIndicator({
  confidence,
  currentStep,
}: ConfidenceIndicatorProps) {
  const getMessage = () => {
    if (confidence === 'high') {
      return 'High confidence estimate';
    }
    if (confidence === 'medium') {
      return 'Add payment details for better accuracy';
    }
    return 'Answer more questions to refine';
  };

  const getNextAction = () => {
    switch (currentStep) {
      case 1:
        return 'Add payment methods to improve estimate';
      case 2:
        return 'Select your partners to finalize';
      case 3:
        return 'Almost there!';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Confidence dots */}
        <div className="flex gap-1">
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              confidence !== 'low' ? 'bg-white' : 'bg-white/30'
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              confidence === 'medium' || confidence === 'high'
                ? 'bg-white'
                : 'bg-white/30'
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              confidence === 'high' ? 'bg-white' : 'bg-white/30'
            }`}
          />
        </div>
        <span className="text-[12px] opacity-80">{getMessage()}</span>
      </div>

      {/* Completion indicator */}
      {confidence !== 'high' && (
        <div className="text-[11px] opacity-60 hidden md:block">
          {getNextAction()}
        </div>
      )}
    </div>
  );
}
