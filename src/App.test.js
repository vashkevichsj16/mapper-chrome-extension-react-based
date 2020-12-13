import { render, screen } from '@testing-library/react';
import PopupApp from './popup/PopupApp';

test('renders learn react link', () => {
  render(<PopupApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
