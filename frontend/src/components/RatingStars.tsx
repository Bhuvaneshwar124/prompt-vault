import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  currentRating?: number;
  onRate?: (stars: number) => void;
  readOnly?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  currentRating = 0,
  onRate,
  readOnly = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hoverRating || currentRating) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onRate && onRate(star)}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            className={`p-0.5 rounded-md transition-colors ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                active ? 'text-amber-400 fill-amber-400' : 'text-slate-700 fill-slate-900'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
