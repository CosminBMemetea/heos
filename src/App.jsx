import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeAll, removeOne, clearCart } from './store/cartSlice.js';
import './App.css';

const formatMoney = (value) => `$${value.toFixed(2)}`;

const ratingToStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return `${'★'.repeat(full)}${half ? '½' : ''}`;
};

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.items);

  const cartSummary = useMemo(() => {
    const entries = Object.entries(cartItems);
    const items = entries
      .map(([id, qty]) => {
        const product = products.find((item) => item.id === id);
        if (!product) return null;
        return {
          ...product,
          qty,
          lineTotal: product.price * qty
        };
      })
      .filter(Boolean);

    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.lineTotal, 0);

    return { items, totalItems, totalPrice };
  }, [cartItems, products]);

  return (
    <div className="app">
      <header className="top-bar">
        <div className="brand">
          <span className="brand-icon">V</span>
          <div>
            <p className="brand-title">Vintessa</p>
            <p className="brand-sub">A curated wine atelier</p>
          </div>
        </div>
        <nav className="nav">
          <button type="button" className="nav-pill">Collections</button>
          <button type="button" className="nav-pill">Cellar Club</button>
          <button type="button" className="nav-pill">Reserve</button>
        </nav>
        <div className="cart-mini">
          <p className="cart-mini-label">Cellar</p>
          <p className="cart-mini-count">{cartSummary.totalItems} bottles</p>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">Winter release · Limited allocations</p>
          <h1>Wine that tastes like a midnight conversation.</h1>
          <p className="hero-sub">
            Discover small-batch vintages selected by sommeliers, shipped cold, and paired with stories worth sharing.
          </p>
          <div className="hero-actions">
            <button type="button" className="primary">Build My Case</button>
            <button type="button" className="ghost">Take the Tour</button>
          </div>
          <div className="hero-metrics">
            <div>
              <p className="metric-value">82</p>
              <p className="metric-label">Craft wineries</p>
            </div>
            <div>
              <p className="metric-value">24h</p>
              <p className="metric-label">Temperature control</p>
            </div>
            <div>
              <p className="metric-value">4.9</p>
              <p className="metric-label">Avg. rating</p>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="bottle-card">
            <div className="bottle-neck" />
            <div className="bottle-body">
              <span>Limited Reserve</span>
              <h3>Crimson Echo</h3>
              <p>Single-vineyard Syrah · 2018</p>
            </div>
          </div>
          <div className="floating-notes">
            <span>Black cherry</span>
            <span>Cedar smoke</span>
            <span>Velvet finish</span>
          </div>
        </div>
      </section>

      <section className="grid-layout">
        <div className="catalog">
          <div className="section-title">
            <h2>Featured cellar</h2>
            <p>Each bottle is handpicked, score-checked, and poured in small allocations.</p>
          </div>
          <div className="product-grid">
            {products.map((wine) => (
              <article key={wine.id} className="product-card">
                <div className="product-top">
                  <div>
                    <p className="product-title">{wine.name}</p>
                    <p className="product-meta">{wine.region} · {wine.year}</p>
                  </div>
                  <span className="product-price">{formatMoney(wine.price)}</span>
                </div>
                <div className="product-rating">
                  <span>{ratingToStars(wine.rating)}</span>
                  <span className="rating-number">{wine.rating.toFixed(1)}</span>
                </div>
                <p className="product-notes">{wine.notes}</p>
                <div className="product-actions">
                  <button type="button" className="primary" onClick={() => dispatch(addToCart(wine.id))}>
                    Add to Cellar
                  </button>
                  <button type="button" className="ghost" onClick={() => dispatch(removeAll(wine.id))}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="cart">
          <div className="section-title">
            <h2>Your cellar case</h2>
            <p>Personalized tasting flights curated in real time.</p>
          </div>
          <div className="cart-list">
            {cartSummary.items.length === 0 ? (
              <div className="cart-empty">
                <p>Nothing in the cellar yet.</p>
                <span>Pick a bottle to start building your case.</span>
              </div>
            ) : (
              cartSummary.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <p className="cart-name">{item.name}</p>
                    <p className="cart-meta">{item.region} · {item.year}</p>
                    <p className="cart-qty">Qty: {item.qty}</p>
                  </div>
                  <div className="cart-actions">
                    <p className="cart-total">{formatMoney(item.lineTotal)}</p>
                    <div>
                      <button type="button" className="ghost small" onClick={() => dispatch(removeOne(item.id))}>
                        -
                      </button>
                      <button type="button" className="ghost small" onClick={() => dispatch(addToCart(item.id))}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <div>
              <p className="summary-label">Total bottles</p>
              <p className="summary-value">{cartSummary.totalItems}</p>
            </div>
            <div>
              <p className="summary-label">Estimated total</p>
              <p className="summary-value">{formatMoney(cartSummary.totalPrice)}</p>
            </div>
          </div>
          <div className="cart-actions-footer">
            <button type="button" className="primary" disabled={cartSummary.totalItems === 0}>
              Reserve shipment
            </button>
            <button type="button" className="ghost" onClick={() => dispatch(clearCart())}>
              Clear cellar
            </button>
          </div>
          <div className="cart-note">
            <p>Shipping on February 12, 2026 with temperature-controlled delivery.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default App;
