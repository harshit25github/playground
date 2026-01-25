import React from "react"
import { LOGO_URL } from "../utils/contants"
import { Link } from "react-router"

const Header = ()=>{
    const [userState,setUserState] = React.useState('login')
    
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
                    <Link to='/cart'>Cart</Link>
                    <button className={userState} onClick={()=>setUserState(e=>e==='login'?'logout':'login')}>{userState}</button>
                   
                </ul>
            </nav>         
        </header>
    )
}

export default Header