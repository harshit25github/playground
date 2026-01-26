import React from 'react'
import { CDN_URL } from '../utils/contants';

const RestaurantCategory = ({item}) => {
    const formatPrice = (price) => {
    if (price == null) return "Rs --";
    const value = price > 1000 ? Math.round(price / 100) : price;
    return `Rs ${value}`;
  };

              const rating =
                item?.ratings?.aggregatedRating?.rating ||
                item?.rating ||
                "--";
              const isVeg =
                item?.isVeg ||
                item?.itemAttribute?.vegClassifier === "VEG";
              const imageId = item?.imageId;
              const itemImageStyle = imageId
                ? {
                    backgroundImage: `linear-gradient(120deg, rgba(255, 106, 61, 0.2), rgba(255, 159, 104, 0.35)), url(${
                      CDN_URL + imageId
                    })`,
                  }
                : undefined;

              return (
                 
                <article className="menu-item" key={item.id || item.name}>
                  <div className="menu-item-info">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      {isVeg && <span className="chip is-soft">Veg</span>}
                    </div>
                    <p className="subtext">
                      {item.description || "A customer favorite."}
                    </p>
                    <div className="menu-item-meta">
                      <span className="rating">{rating}</span>
                      <span>{item.isBestseller ? "Bestseller" : "Popular"}</span>
                      <span className="price">
                        {formatPrice(item.price ?? item.defaultPrice)}
                      </span>
                    </div>
                  </div>
                  <div className="menu-item-cta">
                    <div
                      className="menu-item-media"
                      style={itemImageStyle}
                    ></div>
                    <button className="menu-add-button" type="button">
                      Add +
                    </button>
                  </div>
                </article>
               
              );
};

export default RestaurantCategory