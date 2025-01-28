import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: Product[] = await res.json();

  const products = data.map((item) => ({
    id: item.id,
    title: item.title || 'Untitled Product',
    body: item.body || 'No description available',
    price: Math.random() * 100,
    currency: 'USD',
    image: '',
    rating: Math.random() * 5,
  }));

  return { props: { products } };
};

const Home = ({ products }: { products: Product[] }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState<'price' | 'rating' | ''>(''); // Add state for sorting
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (term: string) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Sorting function
  const handleSort = (order: 'price' | 'rating' | '') => {
    setSortOrder(order);
    let sortedProducts = [...filteredProducts];

    if (order === 'price') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'rating') {
      sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold">E-Commerce Store</h1>
        <div>Cart: {cart.totalItems} items (${cart.totalPrice.toFixed(2)})</div>
      </header>
      <main className="mt-20">
        <SearchBar onSearch={handleSearch} />

        {/* Sorting Controls */}
        <div className="my-4">
          <label className="mr-2">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value as 'price' | 'rating' | '')}
            className="p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => dispatch(addToCart(product))}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
