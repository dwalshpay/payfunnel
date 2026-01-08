interface OtherInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function OtherInput({ value, onChange, placeholder }: OtherInputProps) {
  return (
    <div className="mt-2 pl-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-[--color-border] text-[--color-text-dark] placeholder-[--color-text-light] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all"
      />
    </div>
  );
}
