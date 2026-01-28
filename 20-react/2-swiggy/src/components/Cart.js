import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../utils/slices/cartSlice";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);

  // Build a unique list with aggregated quantity per item (by id/name).
  const uniqueCartItems = Array.from(
    cartItems.reduce((map, item) => {
      const key = item.id ?? item.name;
      if (!key) {
        return map;
      }

      const existing = map.get(key);
      const itemQuantity = item.quantity ?? 1;

      if (existing) {
        existing.quantity += itemQuantity;
      } else {
        map.set(key, { ...item, quantity: itemQuantity });
      }

      return map;
    }, new Map())
  ).map(([, value]) => value);

  console.log("Cart Items in Cart Component:", cartItems);
  console.log("Unique Cart Items with Quantity:", uniqueCartItems);

  const dispatch = useDispatch();
  function handleReduceItem(itemId) {
    dispatch(removeItem({ id: itemId }));
  }
 
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
            <span>{cartItems.length} items</span>
          </div>
            {uniqueCartItems.map((item) => (<article key={item.id} className="cart-item">
            <div className="cart-item-media"></div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-subtext">
                {item.description || "A customer favorite."}
              </p>
              
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button type="button" onClick={()=>handleReduceItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={()=>handleIncreaseItem(item)}>+</button>
              </div>
              <span className="price">Rs {item.price/100}</span>
            </div>
          </article>))}
          

       
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
          <button className="primary-button" type="button" onClick={()=>dispatch(clearCart())}> Clear Cart </button>
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
