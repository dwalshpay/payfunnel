import { useState } from 'react';
import { OptionItem } from './OptionItem';
import { OtherInput } from './OtherInput';
import type { StepOption } from '../../types/funnel';

interface OptionListProps {
  options: StepOption[];
  selectedValues: string | string[] | null;
  isMulti: boolean;
  onSelect: (value: string) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function OptionList({
  options,
  selectedValues,
  isMulti,
  onSelect,
  otherValue = '',
  onOtherChange,
}: OptionListProps) {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const isSelected = (id: string): boolean => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(id);
    }
    return selectedValues === id;
  };

  const handleSelect = (option: StepOption) => {
    onSelect(option.id);
    if (option.hasOtherInput) {
      if (isMulti) {
        setShowOtherInput(!isSelected(option.id) ? true : showOtherInput);
      } else {
        setShowOtherInput(true);
      }
    } else if (!isMulti) {
      setShowOtherInput(false);
    }
  };

  const otherOption = options.find((o) => o.hasOtherInput);
  const isOtherSelected = otherOption ? isSelected(otherOption.id) : false;

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <OptionItem
          key={option.id}
          id={option.id}
          label={option.label}
          icon={option.icon}
          isSelected={isSelected(option.id)}
          isMulti={isMulti}
          onClick={() => handleSelect(option)}
        />
      ))}

      {isOtherSelected && onOtherChange && (
        <OtherInput
          value={otherValue}
          onChange={onOtherChange}
          placeholder="Please specify..."
        />
      )}
    </div>
  );
}
