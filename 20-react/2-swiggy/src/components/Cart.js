import React from "react";

function Cart() {
  return (
    <div className="page cart-page">
      <section className="page-hero cart-hero">
        <div className="page-hero-content">
          <p className="eyebrow">Your cart</p>
          <h1>Almost there.</h1>
          <p className="subtext">
            Review items, apply offers, and checkout in seconds.
          </p>
        </div>
        <div className="page-hero-card cart-hero-card">
          <div className="promo">
            <span className="chip">Limited offer</span>
            <h3>Save 15% on orders above Rs 299</h3>
            <p className="subtext">
              Use code <strong>HUNGRY15</strong> at checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="cart-grid">
        <div className="cart-items">
          <div className="section-title">
            <h2>Items</h2>
            <span>3 items</span>
          </div>

          <article className="cart-item">
            <div className="cart-item-media"></div>
            <div className="cart-item-info">
              <h3>Urban Spice House</h3>
              <p className="cart-item-subtext">
                Paneer biryani with raita
              </p>
              <div className="cart-tags">
                <span className="chip is-soft">Veg</span>
                <span className="chip is-soft">Medium spice</span>
              </div>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
              <span className="price">Rs 249</span>
            </div>
          </article>

          <article className="cart-item">
            <div className="cart-item-media"></div>
            <div className="cart-item-info">
              <h3>Bowl & Co.</h3>
              <p className="cart-item-subtext">
                Power salad with avocado
              </p>
              <div className="cart-tags">
                <span className="chip is-soft">Healthy</span>
                <span className="chip is-soft">Gluten free</span>
              </div>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button type="button">-</button>
                <span>2</span>
                <button type="button">+</button>
              </div>
              <span className="price">Rs 358</span>
            </div>
          </article>

          <article className="cart-item">
            <div className="cart-item-media"></div>
            <div className="cart-item-info">
              <h3>Cafe Cacao</h3>
              <p className="cart-item-subtext">Cold brew with almond milk</p>
              <div className="cart-tags">
                <span className="chip is-soft">Beverage</span>
                <span className="chip is-soft">Sugar free</span>
              </div>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
              <span className="price">Rs 129</span>
            </div>
          </article>
        </div>

        <aside className="cart-summary">
          <h2>Bill details</h2>
          <div className="summary-row">
            <span>Item total</span>
            <span>Rs 736</span>
          </div>
          <div className="summary-row">
            <span>Delivery fee</span>
            <span>Rs 29</span>
          </div>
          <div className="summary-row">
            <span>Taxes</span>
            <span>Rs 32</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>To pay</span>
            <span>Rs 797</span>
          </div>
          <button className="primary-button" type="button">
            Place order
          </button>
          <p className="summary-note">
            Secure checkout with live order tracking.
          </p>
        </aside>
      </section>
    </div>
  );
}

export default Cart;
