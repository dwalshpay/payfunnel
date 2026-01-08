interface LogoProps {
  className?: string;
}

export function QantasLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#E31837" />
      <path
        d="M8 16l4-4 4 4-4 4-4-4zm8-4l4 4-4 4-4-4 4-4z"
        fill="white"
      />
    </svg>
  );
}

export function VirginLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#CC0000" />
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="bold"
      >
        V
      </text>
    </svg>
  );
}

export function KrisflyerLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#00256C" />
      <path
        d="M10 16l6-6 6 6-6 6-6-6z"
        fill="#FFD700"
      />
    </svg>
  );
}

export function QatarLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#5C0632" />
      <path
        d="M12 12h8v8h-8z"
        fill="#C4A661"
      />
    </svg>
  );
}

export function AmexLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="6" width="28" height="20" rx="2" fill="#006FCF" />
      <text
        x="16"
        y="19"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="bold"
      >
        AMEX
      </text>
    </svg>
  );
}

export function VisaLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="6" width="28" height="20" rx="2" fill="#1A1F71" />
      <text
        x="16"
        y="19"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="bold"
        fontStyle="italic"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="16" r="8" fill="#EB001B" />
      <circle cx="20" cy="16" r="8" fill="#F79E1B" />
      <path
        d="M16 10a8 8 0 0 0 0 12 8 8 0 0 0 0-12z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export const partnerLogoMap: Record<string, React.ComponentType<LogoProps>> = {
  qantas: QantasLogo,
  virgin: VirginLogo,
  krisflyer: KrisflyerLogo,
  qatar: QatarLogo,
  amex: AmexLogo,
  visa: VisaLogo,
  mastercard: MastercardLogo,
};
