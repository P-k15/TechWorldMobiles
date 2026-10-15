import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';

export default function PhoneImage({ src, alt = 'Smartphone', className = '', fallbackBrand = '' }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#F5F5F2] text-[#69727C] border border-[#E2E5E8] rounded p-4 select-none ${className}`}>
        <div className="w-10 h-10 rounded bg-white border border-[#E2E5E8] flex items-center justify-center mb-1.5 shadow-2xs">
          <Smartphone className="w-5 h-5 text-[#E85D2A]" />
        </div>
        <span className="text-[11px] font-bold text-[#20252B] tracking-wider uppercase">
          {fallbackBrand || 'TechWorldMobiles'}
        </span>
        <span className="text-[10px] text-[#69727C] text-center line-clamp-1 mt-0.5">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-cover object-center transition-opacity duration-200 ${className}`}
    />
  );
}
