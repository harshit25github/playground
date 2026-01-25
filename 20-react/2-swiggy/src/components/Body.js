import React, { useEffect } from "react"
import { restaurants } from "../utils/mockData"
import { RestaurantInfo } from "./RestaurantCard"
import Simmer from "./Simmer"
import { useNavigate } from "react-router"

const Body = ()=>{
    const [restuarantData,setRestaurantData] = React.useState([])
    const [filteredData,setFilteredData] = React.useState([])
    const [searchText,setSearchText] = React.useState('')
    const navigate = useNavigate()
 useEffect(()=>{
   console.log('rendered ')
   fetchData()
 },[])


const fetchData = async ()=>{
    try {
          const data = await fetch('https://namastedev.com/api/v1/listRestaurants')
        const json = await data.json()
        // console.log(json)
        // const restaurantCardObj = json.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
        // console.log(restaurantCardObj)
        const cards = json.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants || []
        console.log(cards)
        setRestaurantData(cards)
        setFilteredData(cards)
    } catch (error) {
        console.log('error while fetching restaurant data',error)
    }
  
} 
//conditional rendering 
// if(restuarantData.length === 0 )return <Simmer/>
                                          
    return (
        restuarantData.length === 0  ? <Simmer/>   :  
        
        (<main className="body">
            <section className="hero">
                <div>
                    <p className="eyebrow">Delivering near you</p>
                    <h1>Discover food you will love, fast.</h1>
                    <p className="subtext">
                        Explore restaurants, track delivery time, and find your
                        next favorite meal.
                    </p>
                </div>
                <div className="hero-card">
                    <span className="hero-badge">30 mins</span>
                    <div className="hero-image"></div>
                </div>
            </section>

            <section className="filter">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search restaurants or dishes"
                        value={searchText} // bind my state to the input tag 
                        onChange={(e)=>{
                            console.log(e.target.value) 
                            setSearchText(e.target.value)
                             const newFilteredRestaurants = restuarantData.filter(restaurant=>restaurant.info.name.toLowerCase().includes(e.target.value.toLowerCase())) 
                        console.log(newFilteredRestaurants)   
                        setFilteredData(newFilteredRestaurants)
                        }}
                        />
                    {/* <button className="search-button" type="button" onClick={()=>{
                        // update the filter for the current restaurant list 
                        console.log('search button clicked')
                        console.log(searchText)
                        console.log(restuarantData)
                    const newFilteredRestaurants = restuarantData.filter(restaurant=>restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())) 
                        console.log(newFilteredRestaurants)   
                        setFilteredData(newFilteredRestaurants)
                       
                    }}>
                        Search
                    </button> */}
                </div>
                <div className="filter-actions">
                    <button className="pill is-active" type="button"  onClick={()=>{
                        setSearchText('')
                        setFilteredData(restuarantData)}}>
                        All
                    </button>
                    <button className="pill" type="button" onClick={()=>{
                        return setRestaurantData(el=>el.filter(el=>el.info.avgRating>4.4) )
                    }}>
                        Top Rated
                    </button>
                    <button className="pill" type="button">
                        Fast Delivery
                    </button>
                    <button className="pill" type="button">
                        Pure Veg
                    </button>
                </div>
            </section>

            <section className="cards">
                <div className="section-title">
                    <h2>Popular near you</h2>
                    <span>6 options</span>
                </div>
                <div className="card-grid">
                    {filteredData.map(restaurant=> <RestaurantInfo 
                    key={restaurant.info.id}
                    title={restaurant.info.name}
                    subtitle={restaurant.info.cuisines.join(", ")}
                    deliveryDuration={restaurant.info.sla.deliveryTime + " mins"}
                    tags={restaurant.info.tags}
                    rating={restaurant.info.avgRating}
                    price={restaurant.info.costForTwo}
                    onClick={()=>{navigate(`/restaurant/${restaurant.info.id}`)}}
                    
                    cloudinaryImageId={restaurant.info.cloudinaryImageId}
                    />)}
                </div>
            </section>
        </main>)
    
    )
}

export default Body