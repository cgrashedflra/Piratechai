import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 'md',
  showCount = true
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base font-semibold' : 'text-sm font-semibold';

  return (
    <div id="rating-stars-wrapper" className="inline-flex items-center gap-1.5 text-slate-800">
      <Star className={`${iconSize} fill-amber-400 text-amber-400 flex-shrink-0`} />
      <span className={textSize}>{rating.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className="text-slate-500 text-xs font-normal">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};
