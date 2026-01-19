import { useEffect, useState } from 'react';
import { VARIANT_BA_TESTIMONIALS } from '../../data/variantBAStepConfig';

interface TestimonialRotatorProps {
  industry: string | null;
}

export function TestimonialRotator({ industry }: TestimonialRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sort testimonials to prioritize matching industry
  const sortedTestimonials = [...VARIANT_BA_TESTIMONIALS].sort((a, b) => {
    if (industry) {
      const aMatch = a.industry.toLowerCase().includes(industry.toLowerCase());
      const bMatch = b.industry.toLowerCase().includes(industry.toLowerCase());
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
    }
    return 0;
  });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sortedTestimonials.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [sortedTestimonials.length]);

  const testimonial = sortedTestimonials[currentIndex];

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#F5F5F5] shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-[#3866B0]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
        </svg>
        <span className="text-sm font-medium text-[#6B7280]">What others say</span>
      </div>

      {/* Testimonial content */}
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Stars */}
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'text-[#F59E0B]' : 'text-[#E5E7EB]'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-[#283E48] leading-relaxed mb-3">
          "{testimonial.text}"
        </p>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm text-[#283E48]">{testimonial.name}</p>
            <p className="text-xs text-[#6B7280]">{testimonial.role}</p>
          </div>
          <span className="text-xs text-[#9CA3AF] bg-[#F5F5F5] px-2 py-1 rounded-full">
            {testimonial.industry}
          </span>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {sortedTestimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(i);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === currentIndex ? 'bg-[#3866B0]' : 'bg-[#E5E7EB] hover:bg-[#BDBDBD]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
