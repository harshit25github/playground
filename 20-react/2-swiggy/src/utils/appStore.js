import {configureStore} from "@reduxjs/toolkit";
import  cartSlice  from "./slices/cartSlice";

export const appStore = configureStore({
    reducer:{
        cart : cartSlice
    }
})