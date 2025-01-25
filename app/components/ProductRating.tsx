interface ProductRatingProps {
  rating: number;
  totalReviews?: number;
}

export default function ProductRating({
  rating,
  totalReviews,
}: ProductRatingProps) {
  const maxStars = 5;

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, index) => (
          <svg
            data-testid={index < rating ? "star-filled" : "star-empty"}
            aria-label={index < rating ? "star-filled" : "star-empty"}
            role="img"
            key={index}
            className={`size-4 shrink-0 ${
              index < rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="false"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
