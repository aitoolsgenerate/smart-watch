import { useState } from 'react';
import { Watch } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function SafeImage({ src, alt, className = '', fallbackLabel }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 text-stone-500 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Watch className="w-8 h-8 mb-2 stroke-[1.5]" />
        <span className="text-xs font-medium tracking-wide uppercase">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
