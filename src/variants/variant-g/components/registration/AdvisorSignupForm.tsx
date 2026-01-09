import { useVariantG } from '../../context/VariantGContext';

export function AdvisorSignupForm() {
  const { state, setRegistrationField } = useVariantG();
  const { registration } = state.answers;
  const { errors } = state;

  const handleChange = (field: keyof typeof registration) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationField(field, e.target.value);
  };

  return (
    <div className="space-y-5">
      {/* Practice Name */}
      <div>
        <label
          htmlFor="practiceName"
          className="block text-[14px] font-bold text-[#283E48] mb-2"
        >
          Practice/firm name
        </label>
        <input
          type="text"
          id="practiceName"
          value={registration.practiceName}
          onChange={handleChange('practiceName')}
          placeholder="Smith & Co Accounting"
          className={`
            w-full px-4 py-3 rounded-xl border transition-colors
            ${errors.practiceName ? 'border-red-500' : 'border-[#E5E7EB]'}
            focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]
            placeholder:text-[#BDBDBD]
          `}
        />
        {errors.practiceName && (
          <p className="mt-1 text-sm text-red-500">{errors.practiceName}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-[14px] font-bold text-[#283E48] mb-2"
        >
          Your name
        </label>
        <input
          type="text"
          id="name"
          value={registration.name}
          onChange={handleChange('name')}
          placeholder="Sarah Smith"
          className={`
            w-full px-4 py-3 rounded-xl border transition-colors
            ${errors.name ? 'border-red-500' : 'border-[#E5E7EB]'}
            focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]
            placeholder:text-[#BDBDBD]
          `}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-[14px] font-bold text-[#283E48] mb-2"
        >
          Work email
        </label>
        <input
          type="email"
          id="email"
          value={registration.email}
          onChange={handleChange('email')}
          placeholder="sarah@smithco.com.au"
          className={`
            w-full px-4 py-3 rounded-xl border transition-colors
            ${errors.email ? 'border-red-500' : 'border-[#E5E7EB]'}
            focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]
            placeholder:text-[#BDBDBD]
          `}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-[14px] font-bold text-[#283E48] mb-2"
        >
          Phone number
        </label>
        <input
          type="tel"
          id="phone"
          value={registration.phone}
          onChange={handleChange('phone')}
          placeholder="03 9xxx xxxx"
          className={`
            w-full px-4 py-3 rounded-xl border transition-colors
            ${errors.phone ? 'border-red-500' : 'border-[#E5E7EB]'}
            focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]
            placeholder:text-[#BDBDBD]
          `}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* ABN (optional) */}
      <div>
        <label
          htmlFor="abn"
          className="block text-[14px] font-bold text-[#283E48] mb-2"
        >
          Practice ABN{' '}
          <span className="font-normal text-[#6B7280]">(optional)</span>
        </label>
        <input
          type="text"
          id="abn"
          value={registration.abn}
          onChange={handleChange('abn')}
          placeholder="XX XXX XXX XXX"
          className="
            w-full px-4 py-3 rounded-xl border border-[#E5E7EB] transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#3866B0]/20 focus:border-[#3866B0]
            placeholder:text-[#BDBDBD]
          "
        />
      </div>

      {/* Terms */}
      <p className="text-sm text-[#6B7280]">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-[#3866B0] hover:underline">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-[#3866B0] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
