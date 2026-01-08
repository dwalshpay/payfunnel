import { useMemo } from 'react';
import { VARIANT_D_TESTIMONIALS } from '../../data/variantDStepConfig';

interface IndustryTestimonialProps {
  industry: string | null;
}

export function IndustryTestimonial({ industry }: IndustryTestimonialProps) {
  // Get testimonial matching industry, or fallback to first one
  const testimonial = useMemo(() => {
    if (industry) {
      const match = VARIANT_D_TESTIMONIALS.find((t) => t.industry === industry);
      if (match) return match;
    }
    return VARIANT_D_TESTIMONIALS[0];
  }, [industry]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E9F9]">
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-[#F59E0B]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-[#283E48] leading-relaxed mb-4">
        "{testimonial.text}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3866B0] to-[#2D5490] flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-[#283E48] text-sm">{testimonial.name}</div>
          <div className="text-xs text-[#6B7280]">
            {testimonial.role} - {testimonial.industry.charAt(0).toUpperCase() + testimonial.industry.slice(1)}
          </div>
        </div>
      </div>

      {/* Trustpilot badge - compact */}
      <div className="mt-4 pt-3 border-t border-[#E2E9F9]">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#00B67A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs text-[#6B7280]">
            <span className="font-bold text-[#00B67A]">Excellent</span> on Trustpilot
          </span>
        </div>
      </div>
    </div>
  );
}
