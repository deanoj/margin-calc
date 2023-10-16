import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cost price', () => {
  render(<App />);
  const linkElement = screen.getByText(/Cost price/i);
  expect(linkElement).toBeInTheDocument();
});
