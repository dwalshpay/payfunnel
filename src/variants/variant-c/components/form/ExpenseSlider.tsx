import { useState, useEffect } from 'react';
import { EXPENSE_PRESETS } from '../../data/variantCStepConfig';

interface ExpenseSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function ExpenseSlider({ value, onChange }: ExpenseSliderProps) {
  const [inputValue, setInputValue] = useState(formatNumber(value));

  useEffect(() => {
    setInputValue(formatNumber(value));
  }, [value]);

  function formatNumber(num: number): string {
    return num.toLocaleString('en-AU');
  }

  function parseInput(input: string): number {
    const cleaned = input.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = parseInput(raw);
    if (parsed !== value) {
      onChange(parsed);
    }
  };

  const handleInputBlur = () => {
    setInputValue(formatNumber(value));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseFloat(e.target.value);
    const minExp = Math.log(5000);
    const maxExp = Math.log(1000000);
    const expValue = minExp + (sliderValue / 100) * (maxExp - minExp);
    const actualValue = Math.round(Math.exp(expValue) / 1000) * 1000;
    onChange(actualValue);
  };

  const getSliderPosition = (): number => {
    if (value <= 5000) return 0;
    if (value >= 1000000) return 100;
    const minExp = Math.log(5000);
    const maxExp = Math.log(1000000);
    const valueExp = Math.log(value);
    return ((valueExp - minExp) / (maxExp - minExp)) * 100;
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-semibold text-[#6B7280]">
          $
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-full h-12 pl-8 pr-16 text-[18px] font-semibold text-[#283E48] bg-white border-2 border-[#E2E9F9] rounded-xl focus:outline-none focus:border-[#3866B0] focus:ring-2 focus:ring-[#3866B0]/20 transition-all"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-[#6B7280]">
          /month
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={getSliderPosition()}
        onChange={handleSliderChange}
        className="w-full h-2 bg-[#E2E9F9] rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:bg-[#3866B0]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:bg-[#3866B0]
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:cursor-pointer"
      />

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {EXPENSE_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
              value === preset
                ? 'bg-[#3866B0] text-white'
                : 'bg-[#F0F4F8] text-[#6B7280] hover:bg-[#E2E9F9]'
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
