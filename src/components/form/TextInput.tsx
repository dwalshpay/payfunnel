interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  placeholder?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  prefix,
  placeholder,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[--color-text-muted]">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-text-muted] font-medium">
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-4 rounded-xl border border-[--color-border] text-[--color-text-dark] placeholder-[--color-text-light] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all text-lg ${
            prefix ? 'pl-8 pr-4' : 'px-4'
          }`}
        />
      </div>
    </div>
  );
}
