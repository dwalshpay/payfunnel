export function Logo() {
  return (
    <div className="flex items-center">
      {/* pay.com.au logo - matching Figma design */}
      <svg
        width="164"
        height="32"
        viewBox="0 0 164 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Icon - circular P shape */}
        <circle cx="16" cy="16" r="16" fill="#3866B0"/>
        <path
          d="M11 8v16M11 8h6c2.761 0 5 2.239 5 5s-2.239 5-5 5h-6"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dot on top right */}
        <circle cx="24" cy="8" r="3" fill="#00B67A"/>

        {/* Text - pay.com.au */}
        <text x="40" y="22" fill="#283E48" fontSize="18" fontWeight="700" fontFamily="Europa, system-ui, sans-serif">
          pay.com.au
        </text>
      </svg>
    </div>
  );
}
