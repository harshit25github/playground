import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{
        // mutating logic
        addItem:(state,action)=>{
            state.items.push(action.payload)

        },
        removeItem:(state,action)=>{
            const index= state.items.findIndex((item)=>item.id == action.payload.id)

        },
        clearCart:(state)=>{state.items=[]}
    }
})


// we have to export 2 things from this actions and reducers

export default cartSlice.reducer;
export const {addItem,removeItem,clearCart} = cartSlice.actions