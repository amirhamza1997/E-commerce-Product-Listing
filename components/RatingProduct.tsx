import { FaStar, FaRegStar } from "react-icons/fa";

export const Rating = ({ rating }: { rating: number }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: filledStars }).map((_, idx) => (
        <FaStar key={idx} className="text-yellow-500" />
      ))}
      {halfStar && <FaStar className="text-yellow-500 opacity-50" />}
      {Array.from({ length: emptyStars }).map((_, idx) => (
        <FaRegStar key={idx} className="text-gray-400" />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};
