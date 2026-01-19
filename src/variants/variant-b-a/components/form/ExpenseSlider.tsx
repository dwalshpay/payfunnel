import { useState, useEffect } from 'react';
import { EXPENSE_PRESETS } from '../../data/variantBAStepConfig';

interface ExpenseSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function ExpenseSlider({ value, onChange }: ExpenseSliderProps) {
  const [inputValue, setInputValue] = useState(value > 0 ? value.toLocaleString() : '');
  const [isFocused, setIsFocused] = useState(false);

  // Sync input when value changes externally
  useEffect(() => {
    if (!isFocused && value > 0) {
      setInputValue(value.toLocaleString());
    }
  }, [value, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(raw, 10) || 0;
    setInputValue(num > 0 ? num.toLocaleString() : '');
    onChange(num);
  };

  const handlePresetClick = (preset: number) => {
    setInputValue(preset.toLocaleString());
    onChange(preset);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value > 0) {
      setInputValue(value.toLocaleString());
    }
  };

  // Calculate slider position (logarithmic scale for better UX)
  const minLog = Math.log(5000);
  const maxLog = Math.log(1000000);
  const sliderValue = value > 0 ? ((Math.log(value) - minLog) / (maxLog - minLog)) * 100 : 0;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    const logValue = minLog + (percent / 100) * (maxLog - minLog);
    const actualValue = Math.round(Math.exp(logValue) / 1000) * 1000; // Round to nearest 1000
    setInputValue(actualValue.toLocaleString());
    onChange(actualValue);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input field */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-lg font-medium">
          $
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder="Enter amount"
          className={`w-full pl-8 pr-4 py-4 text-lg font-semibold rounded-xl border-2 transition-all duration-200 outline-none ${
            isFocused
              ? 'border-[#3866B0] ring-4 ring-[#3866B0]/10'
              : value > 0
              ? 'border-[#3866B0] bg-[#F0F7FF]'
              : 'border-[#E0E0E0] hover:border-[#BDBDBD]'
          }`}
        />
        {value > 0 && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
            /month
          </span>
        )}
      </div>

      {/* Slider */}
      <div className="px-1">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-[#E2E9F9] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:bg-[#3866B0]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-[#3866B0]/30
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:bg-[#3866B0]
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0"
          style={{
            background: `linear-gradient(to right, #3866B0 0%, #3866B0 ${sliderValue}%, #E2E9F9 ${sliderValue}%, #E2E9F9 100%)`,
          }}
        />
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {EXPENSE_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handlePresetClick(preset.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              value === preset.value
                ? 'bg-[#3866B0] text-white'
                : 'bg-[#F0F4F8] text-[#6B7280] hover:bg-[#E2E9F9] hover:text-[#283E48]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
