import React from "react"
import { LOGO_URL } from "../utils/contants"

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
                    <li>Home</li>
                    <li>About</li>
                    <li>Cart</li>
                    <button className={userState} onClick={()=>setUserState(e=>e==='login'?'logout':'login')}>{userState}</button>
                   
                </ul>
            </nav>         
        </header>
    )
}

export default Header