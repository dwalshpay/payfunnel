import { TESTIMONIALS } from '../../data/stepConfig';

function TrustpilotLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Trustpilot star and text */}
      <div className="flex items-center gap-1">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00B67A"/>
        </svg>
        <span className="text-sm font-bold text-[#191919]">Trustpilot</span>
      </div>
      {/* 5 star rating */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  name,
  text,
  isFocused = false,
}: {
  name: string;
  text: string;
  rating: number;
  isFocused?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl p-4 flex flex-col justify-between transition-all ${
        isFocused
          ? 'w-[400px] h-[200px]'
          : 'w-[380px] h-[180px] opacity-50'
      }`}
    >
      <div className="flex flex-col gap-1">
        <p className="font-bold text-[16px] text-[#283E48] leading-[1.2] tracking-[0.3px]">{name}</p>
        <p className="text-[14px] text-[#283E48] leading-[1.6]">{text}</p>
      </div>
      <TrustpilotLogo />
    </div>
  );
}

export function TestimonialSidebar() {
  return (
    <div className="h-[760px] flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-12 py-12">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            {...testimonial}
            isFocused={index === 1}
          />
        ))}
      </div>
    </div>
  );
}
