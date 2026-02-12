import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice.js';
import cartReducer from '../store/cartSlice.js';
import App from '../App.jsx';

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer
    }
  });

  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('Vintessa App', () => {
  it('renders the hero headline', () => {
    renderWithStore();
    expect(
      screen.getByRole('heading', {
        name: /wine that tastes like a midnight conversation/i
      })
    ).toBeInTheDocument();
  });

  it('adds items to the cellar cart', () => {
    renderWithStore();

    expect(screen.getByText(/0 bottles/i)).toBeInTheDocument();

    const addButtons = screen.getAllByRole('button', { name: /add to cellar/i });
    fireEvent.click(addButtons[0]);

    expect(screen.getByText(/1 bottles/i)).toBeInTheDocument();
  });
});
