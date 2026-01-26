import { CDN_URL } from "../utils/contants.js"
// name import 

export const RestaurantInfo = ({title, subtitle, deliveryDuration , tags , rating , price,cloudinaryImageId,onClick})=>{
    // console.log(CDN_URL+cloudinaryImageId)
    return(
        <article className="card" onClick={onClick}>
                        <img className="card-media" src={CDN_URL+cloudinaryImageId}></img>
                        <div className="card-title">{title}</div>
                        <div className="card-meta">
                            <span>{subtitle}</span>
                            <span>{deliveryDuration}</span>
                        </div>
                        <div className="card-tags">
                           
                            {tags?.length && tags.map(tag=> <span key={Math.random()} className="card-tag">{tag}</span>)}
                        </div>
                        <div className="card-footer">
                            <span className="rating">{rating}</span>
                            <span>Rs {price} for two</span>
                        </div>
                    </article>
    )
}

// accept input RestaurantInfo => output RestaurantInfo with Veg tag
export const withVegTag = (RestaurantInfo)=>{
    return (props)=>{
        return(
            <div className="veg-wrapper">
            <label className="veg-tag">Veg</label>
            <RestaurantInfo {...props}/>
            </div>
        )
    }
}