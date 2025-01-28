import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Rating } from '@/components/RatingProduct'; // Make sure this is correctly imported
import ProductCard from '@/components/ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  body: 'This is a description of the test product.',
  price: 29.99,
  currency: 'USD',
  image: '',
  rating: 4.5,
};

test('renders product card with title, description, price, and rating', () => {
  render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

  // Check if the title is rendered
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

  // Check if the description is rendered
  expect(screen.getByText(/This is a description of the test product./i)).toBeInTheDocument();

  // Check if the price is rendered
  expect(screen.getByText(/\$29.99/i)).toBeInTheDocument();

  // Check if the rating component is rendered
  expect(screen.getByText(/4.5/i)).toBeInTheDocument();
});
