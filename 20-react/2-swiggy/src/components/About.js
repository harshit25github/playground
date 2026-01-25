import React from "react";

function About() {
  return (
    <div className="page about-page">
      <section className="page-hero about-hero">
        <div className="page-hero-content">
          <p className="eyebrow">Our story</p>
          <h1>Built for busy hunger.</h1>
          <p className="subtext">
            We connect neighborhood kitchens with hungry people through smart
            discovery, reliable delivery, and a touch of delight.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">12K+</span>
              <span className="stat-label">restaurants</span>
            </div>
            <div className="stat">
              <span className="stat-number">1.8M</span>
              <span className="stat-label">deliveries</span>
            </div>
            <div className="stat">
              <span className="stat-number">35</span>
              <span className="stat-label">cities</span>
            </div>
          </div>
        </div>
        <div className="page-hero-card about-hero-card">
          <span className="chip">Since 2015</span>
          <div className="about-hero-visual"></div>
          <div>
            <h3>Local favorites, curated daily.</h3>
            <p className="subtext">
              We spotlight the kitchens people love, backed by real-time
              ratings and local insights.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2>What we believe</h2>
        <div className="value-grid">
          <article className="value-card">
            <h3>Speed with care</h3>
            <p>
              Every route is optimized so food arrives hot, intact, and right on
              time.
            </p>
          </article>
          <article className="value-card">
            <h3>Discovery matters</h3>
            <p>
              Smart filters and trusted reviews help you pick your next meal
              confidently.
            </p>
          </article>
          <article className="value-card">
            <h3>Partners first</h3>
            <p>
              We build tools that help restaurants grow and keep delivery teams
              informed.
            </p>
          </article>
        </div>
      </section>

      <section className="about-steps">
        <h2>How we work</h2>
        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <div>
              <h3>Curate</h3>
              <p>
                We highlight top-rated kitchens and trending local picks so you
                never scroll endlessly.
              </p>
            </div>
          </article>
          <article className="step-card">
            <span className="step-number">02</span>
            <div>
              <h3>Prepare</h3>
              <p>
                Orders are confirmed instantly and monitored so prep starts
                without delay.
              </p>
            </div>
          </article>
          <article className="step-card">
            <span className="step-number">03</span>
            <div>
              <h3>Deliver</h3>
              <p>
                Riders receive live route updates and deliver with real-time
                tracking.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="about-banner">
        <div>
          <h2>Grow with us</h2>
          <p className="subtext">
            Partner with Swiggy to reach more customers or join the team to
            deliver joy.
          </p>
        </div>
        <div className="about-actions">
          <button className="primary-button" type="button">
            Partner with us
          </button>
          <button className="ghost-button" type="button">
            View careers
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;
