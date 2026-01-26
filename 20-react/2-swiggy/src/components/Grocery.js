import React from "react";

const Grocery = () => {
  return (
    <div className="page grocery-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="eyebrow">Grocery</p>
          <h1>Pantry essentials, delivered fast.</h1>
          <p className="subtext">
            Fresh produce, snacks, and daily needs at your doorstep.
          </p>
          <div className="restaurant-actions">
            <button className="primary-button" type="button">
              Start shopping
            </button>
            <button className="ghost-button" type="button">
              View deals
            </button>
          </div>
        </div>
        <div className="page-hero-card">
          <span className="chip">New</span>
          <div className="hero-image"></div>
          <div>
            <h3>Everyday savings</h3>
            <p className="subtext">Top brands, quick deliveries, smart picks.</p>
          </div>
        </div>
      </section>

      <section className="cards">
        <div className="section-title">
          <h2>Popular categories</h2>
          <span>6 picks</span>
        </div>
        <div className="card-grid">
          <article className="card">
            <div className="card-title">Fresh produce</div>
            <div className="card-meta">Fruits, vegetables, herbs</div>
          </article>
          <article className="card">
            <div className="card-title">Snacks</div>
            <div className="card-meta">Chips, cookies, munchies</div>
          </article>
          <article className="card">
            <div className="card-title">Beverages</div>
            <div className="card-meta">Juices, soda, coffee</div>
          </article>
          <article className="card">
            <div className="card-title">Dairy</div>
            <div className="card-meta">Milk, yogurt, cheese</div>
          </article>
          <article className="card">
            <div className="card-title">Staples</div>
            <div className="card-meta">Rice, atta, pulses</div>
          </article>
          <article className="card">
            <div className="card-title">Personal care</div>
            <div className="card-meta">Daily essentials</div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Grocery;
