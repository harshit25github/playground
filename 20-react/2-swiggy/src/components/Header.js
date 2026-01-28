import React, { use, useContext } from "react"
import { LOGO_URL } from "../utils/contants"
import { Link } from "react-router"
import { Banner } from "./StatusBanner.js"
import { useOnlineStatus } from "../utils/useOnlineStatus.js"
import UserContext from "../utils/UserContext.js"
import { useSelector } from "react-redux"

const Header = ()=>{
    const [userState,setUserState] = React.useState('login')
    const userInf = useContext(UserContext);
    console.log("User Info from Context:", userInf);
    // subscribe to a redux store slice using useSelector hook
    const cartItems = useSelector((store)=>store.cart.items)
    console.log("Cart Items from Redux Store:", cartItems);

    return (
        <header className="header">
            <div className="brand">
                <img
                    className="logo"
                    src={LOGO_URL}
                    alt="Swiggy logo"
                />
            
            </div>
            <nav className="nav-items">
                <ul>
                    <Link to='/' >Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/cart'>Cart ( {cartItems?.length} )</Link>
                    <Link to='/grocery'>Grocery</Link>
                    <button className={userState} onClick={()=>setUserState(e=>e==='login'?'logout':'login')}>{userState}</button>
                   
                </ul>
            </nav>    
            <div className="user-info">
                <span>{userInf.username}</span>
                </div> 
            <Banner />    
            {/* {!isOnline && <div className="offline-status"> You are offline </div>   } */}
        </header>
    )
}

export default Header