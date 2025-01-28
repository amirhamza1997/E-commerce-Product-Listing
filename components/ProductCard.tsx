import { Product } from '@/types';
import { Rating } from './RatingProduct';

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) => {
    const formatPrice = (price: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
};

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={product.image ? product.image : '../public/image.png'}
        alt={product.title}
        className="h-48 w-full object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600 text-sm mt-1">
        {product.body.substring(0, 100)}
      </p>
      <div className="mt-2">
        <span className="text-xl font-bold">{formatPrice(product.price, product.currency)}</span>
      </div>
      <div className="mt-2">
        <Rating rating={product.rating} />
      </div>
    </div>
  );
};

export default ProductCard;
