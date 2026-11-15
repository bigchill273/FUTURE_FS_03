import { useState } from 'react';
import { Utensils } from 'lucide-react';
import { BLAZE_IMAGES, type BlazeImageKey } from '../data/blazeImages';

interface DishImageProps {
  imageKey: BlazeImageKey;
  alt: string;
  className?: string;
}

export function DishImage({ imageKey, alt, className = '' }: DishImageProps) {
  const [failed, setFailed] = useState(false);
  const src = BLAZE_IMAGES[imageKey];

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F0ECE4] to-[#E5DFD3] text-[#112A22]/60 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Utensils className="h-7 w-7 mb-1.5 opacity-60" />
        <span className="text-xs font-medium px-3 text-center line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
