import React from "react";
import ReactDom from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import {createBrowserRouter,RouterProvider, Outlet} from 'react-router'
import About from "./components/About";
import Cart from "./components/Cart";
import Error from "./components/Error";
import Restaurant from "./components/Restaurant";
/**
 * 
 * Header - Logo , home , Abbout and Cart 
 * Body - Filters and Cards 
 * Footer - Links , Address and Contact 
 */


/**
 * if path - '/' render Header , Body and Footer
 * if path - '/about' render Header , About and Footer
 * if path - '/cart' render Header , Cart and Footer
 * Outlet - to render child routes ,
 * Error - to render error page
 * @returns 
 */



const Applayout = ()=>{
    return (
        <div className="app">
            <Header/>
            <Outlet/>
            <Footer/>

        </div>
    )
}
const appRouter = createBrowserRouter([{
    path:'/',
    element:<Applayout/>,
    errorElement:<Error/>,
    children:[
        {
            path:'/',
            element:<Body/>
        },
        {
    path:'/about',
    element:<About/>
},
{
    path: '/cart',
    element:<Cart/>
},
{
    path:'/restaurant/:id',
    element:<Restaurant/>
}

    ]
},

])


const root= ReactDom.createRoot(document.getElementById('root'));   

root.render(<RouterProvider router={appRouter}/>)
