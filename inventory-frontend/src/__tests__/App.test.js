import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App'; 

test('renders Login component when path is /login', () => {
  render(
    <BrowserRouter initialEntries={['/login']}>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/login/)).toBeInTheDocument();
});

