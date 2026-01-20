import React from "react";
import ReactDom from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
/**
 * 
 * Header - Logo , home , Abbout and Cart 
 * Body - Filters and Cards 
 * Footer - Links , Address and Contact 
 */






const Applayout = ()=>{
    return (
        <div className="app">
            <Header/>
            <Body/>
            <Footer/>

        </div>
    )
}

const root= ReactDom.createRoot(document.getElementById('root'));   

root.render(<Applayout/>)
