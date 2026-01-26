import React from "react";
import { useParams } from "react-router";
import { CDN_URL } from "../utils/contants";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { withVegTag } from "./RestaurantCard";
import { AccordionItem } from "./Accordion.js";
import RestaurantCategory from "./RestaurantCategory.js";


const RestaurantShimmer = () => {
  return (
    <div className="page restaurant-page restaurant-shimmer">
      <section className="restaurant-shimmer-hero">
        <div className="restaurant-shimmer-info">
          <div className="skeleton-block skeleton-title"></div>
          <div className="skeleton-block skeleton-line md"></div>
          <div className="skeleton-block skeleton-line sm"></div>
          <div className="restaurant-shimmer-pills">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="skeleton-block skeleton-pill" key={index}></div>
            ))}
          </div>
          <div className="restaurant-shimmer-actions">
            <div className="skeleton-block skeleton-button"></div>
            <div className="skeleton-block skeleton-button"></div>
          </div>
        </div>
        <div className="restaurant-shimmer-card">
          <div className="skeleton-block skeleton-chip"></div>
          <div className="skeleton-block skeleton-image"></div>
          <div className="skeleton-block skeleton-line md"></div>
          <div className="skeleton-block skeleton-line sm"></div>
        </div>
      </section>

      <section className="restaurant-shimmer-content">
        <div className="restaurant-shimmer-menu">
          <div className="skeleton-block skeleton-title"></div>
          <div className="restaurant-shimmer-filters">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="skeleton-block skeleton-pill" key={index}></div>
            ))}
          </div>
          <div className="restaurant-shimmer-list">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="restaurant-shimmer-item" key={index}>
                <div className="restaurant-shimmer-item-info">
                  <div className="skeleton-block skeleton-line lg"></div>
                  <div className="skeleton-block skeleton-line md"></div>
                  <div className="skeleton-block skeleton-line sm"></div>
                </div>
                <div className="restaurant-shimmer-item-media">
                  <div className="skeleton-block skeleton-thumb"></div>
                  <div className="skeleton-block skeleton-pill"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="restaurant-shimmer-sidebar">
          <div className="restaurant-shimmer-sidecard">
            <div className="skeleton-block skeleton-title"></div>
            <div className="skeleton-block skeleton-line md"></div>
            <div className="skeleton-block skeleton-line sm"></div>
            <div className="skeleton-block skeleton-line md"></div>
          </div>
          <div className="restaurant-shimmer-sidecard">
            <div className="skeleton-block skeleton-title"></div>
            <div className="skeleton-block skeleton-line md"></div>
            <div className="skeleton-block skeleton-line sm"></div>
          </div>
        </aside>
      </section>
    </div>
  );
};

const Restaurant = () => {
  const { id } = useParams();
  const { restaurantMenu, restaurantInfo , categories } = useRestaurantMenu(id);
    const [toOpen , setToOpen] = React.useState(null);
  

  const heroImageStyle = restaurantInfo?.cloudinaryImageId
    ? {
        backgroundImage: `linear-gradient(120deg, rgba(255, 106, 61, 0.2), rgba(255, 159, 104, 0.35)), url(${
          CDN_URL + restaurantInfo.cloudinaryImageId
        })`,
      }
    : undefined;

  if (restaurantInfo === null || restaurantMenu === null) {
    return <RestaurantShimmer />;
  }


  return (
    <div className="page restaurant-page">
      <section className="page-hero restaurant-hero">
        <div className="page-hero-content">
          <p className="eyebrow">Restaurant</p>
          <h1>{restaurantInfo?.name || "Restaurant"}</h1>
          <p className="subtext">
            {restaurantInfo?.cuisines?.length
              ? restaurantInfo.cuisines.join(" | ")
              : "Explore the menu"}
          </p>
          <div className="restaurant-meta">
            <span className="meta-pill">
              <span className="rating">
                {restaurantInfo?.avgRatingString ||
                  restaurantInfo?.avgRating ||
                  "--"}
              </span>{" "}
              {restaurantInfo?.totalRatingsString || "ratings"}
            </span>
            <span className="meta-pill">
              {restaurantInfo?.sla?.slaString ||
                (restaurantInfo?.sla?.deliveryTime
                  ? `${restaurantInfo.sla.deliveryTime} mins`
                  : "30 mins")}
            </span>
            <span className="meta-pill">
              {restaurantInfo?.costForTwoMessage ||
                restaurantInfo?.costForTwo ||
                "Rs -- for two"}
            </span>
          </div>
          <div className="restaurant-actions">
            <button className="primary-button" type="button">
              Order now
            </button>
            <button className="ghost-button" type="button">
              Directions
            </button>
          </div>
        </div>
        <div className="page-hero-card restaurant-hero-card">
          <span className="chip">
            {restaurantInfo?.isOpen ? "Open now" : "Closed"}
          </span>
          <div className="restaurant-hero-image" style={heroImageStyle}></div>
          <div className="restaurant-hero-info">
            <h3>Chef's pick</h3>
            <p className="subtext">Smoky butter chicken thali + garlic naan</p>
          </div>
        </div>
      </section>

      <section className="restaurant-content">
        <div className="restaurant-menu">
          <div className="section-title">
            <h2>Menu</h2>
            <span>{restaurantMenu.length} items</span>
          </div>
        

         
           

            
            <div className="accordion">

           
            {categories.map((category,index) => <AccordionItem isOpen={toOpen === index} onClose={(e) => {e.stopPropagation(); console.log('closing'); setToOpen(null)}} onToggle={() =>{console.log('toggling'); setToOpen(index)}}   key={index} title={category?.card?.card?.title} content={restaurantMenu.map((item) => <RestaurantCategory item={item}  />)}/>)
            }
          </div>
        </div>

        <aside className="restaurant-sidebar">
          <div className="sidebar-card">
            <h3>Restaurant info</h3>
            <div className="info-row">
              <span>Outlet</span>
              <span>
                {restaurantInfo?.locality || "--"},{" "}
                {restaurantInfo?.areaName || "--"}
              </span>
            </div>
            <div className="info-row">
              <span>Timings</span>
              <span>{restaurantInfo?.availability?.nextCloseTime || "--"}</span>
            </div>
            <div className="info-row">
              <span>Distance</span>
              <span>{restaurantInfo?.sla?.lastMileTravelString || "--"}</span>
            </div>
            <div className="info-row">
              <span>Safety</span>
              <span>Contactless delivery</span>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Offers</h3>
            <div className="offer-card">
              <span className="chip">Flat 20% OFF</span>
              <p className="subtext">
                On orders above Rs 299. Use code <strong>SPICE20</strong>.
              </p>
            </div>
            <div className="offer-card">
              <span className="chip is-soft">Free delivery</span>
              <p className="subtext">Enjoy free delivery on your first order.</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Restaurant;
