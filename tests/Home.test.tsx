import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import { Provider } from 'react-redux';
import { store } from '@/store'; // Make sure store is correctly exported

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    body: 'Description 1',
    price: 29.99,
    currency: 'USD',
    image: '',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Product 2',
    body: 'Description 2',
    price: 19.99,
    currency: 'USD',
    image: '',
    rating: 3.5,
  },
];

jest.mock('next/router', () => require('next-router-mock'));

test('renders products and allows search and sorting', async () => {
  // Render the Home component wrapped in Redux provider
  render(
    <Provider store={store}>
      <Home products={mockProducts} />
    </Provider>
  );

  // Check if products are rendered
  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();

  // Test the search functionality
  const searchInput = screen.getByPlaceholderText('Search products...');
  fireEvent.change(searchInput, { target: { value: 'Product 1' } });

  // Wait for the filtering to happen
  await waitFor(() => expect(screen.getByText(/Product 1/i)).toBeInTheDocument());
  expect(screen.queryByText(/Product 2/i)).toBeNull();

  // Test sorting by price
  const sortSelect = screen.getByLabelText(/Sort by:/);
  fireEvent.change(sortSelect, { target: { value: 'price' } });

  // Wait for the products to be sorted
  await waitFor(() => expect(screen.getByText(/\$19.99/i)).toBeInTheDocument());
  expect(screen.getByText(/\$29.99/i)).toBeInTheDocument();
});

test('renders cart information correctly', () => {
  render(
    <Provider store={store}>
      <Home products={mockProducts} />
    </Provider>
  );

  // Check if the cart information is rendered
  expect(screen.getByText(/Cart: 0 items/)).toBeInTheDocument();
});
