import { useState, useEffect } from 'react';
import { EXPENSE_PRESETS } from '../../data/variantCStepConfig';

interface ExpenseSliderHeroProps {
  value: number;
  onChange: (value: number) => void;
}

export function ExpenseSliderHero({ value, onChange }: ExpenseSliderHeroProps) {
  const [inputValue, setInputValue] = useState(formatNumber(value));

  // Sync input display when value changes externally
  useEffect(() => {
    setInputValue(formatNumber(value));
  }, [value]);

  // Format number with commas
  function formatNumber(num: number): string {
    return num.toLocaleString('en-AU');
  }

  // Parse input value
  function parseInput(input: string): number {
    const cleaned = input.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = parseInput(raw);
    if (parsed !== value) {
      onChange(parsed);
    }
  };

  // Handle input blur - format the value
  const handleInputBlur = () => {
    setInputValue(formatNumber(value));
  };

  // Handle slider change (logarithmic scale for better UX)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseFloat(e.target.value);
    // Convert from log scale: 0-100 -> 5000-1000000
    const minExp = Math.log(5000);
    const maxExp = Math.log(1000000);
    const expValue = minExp + (sliderValue / 100) * (maxExp - minExp);
    const actualValue = Math.round(Math.exp(expValue) / 1000) * 1000;
    onChange(actualValue);
  };

  // Convert value to slider position (log scale)
  const getSliderPosition = (): number => {
    if (value <= 5000) return 0;
    if (value >= 1000000) return 100;
    const minExp = Math.log(5000);
    const maxExp = Math.log(1000000);
    const valueExp = Math.log(value);
    return ((valueExp - minExp) / (maxExp - minExp)) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Input field */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[24px] font-bold text-[#3866B0]">
          $
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-full h-16 pl-10 pr-4 text-[28px] font-bold text-[#283E48] bg-white border-2 border-[#3866B0] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#3866B0]/20 transition-all text-center"
          placeholder="50,000"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#6B7280]">
          /month
        </span>
      </div>

      {/* Slider */}
      <div className="px-1">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={getSliderPosition()}
          onChange={handleSliderChange}
          className="w-full h-2 bg-[#E2E9F9] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:bg-[#3866B0]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:bg-[#3866B0]
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-[12px] text-[#6B7280]">
          <span>$5k</span>
          <span>$1M+</span>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {EXPENSE_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
              value === preset
                ? 'bg-[#3866B0] text-white'
                : 'bg-white text-[#6B7280] hover:bg-[#F0F4F8] border border-[#E2E9F9]'
            }`}
          >
            ${preset >= 1000 ? `${preset / 1000}k` : preset}
            {preset === 500000 && '+'}
          </button>
        ))}
      </div>
    </div>
  );
}
