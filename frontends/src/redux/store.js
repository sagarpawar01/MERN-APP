import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import favouriteReducer from './features/favourites/favouriteSlice'
import authReducer from './features/auth/authSlice'
import cartReducer from './features/cart/cartSlice'
import shopReducer from './features/shop/shopSlice'
import { getFavouritesFromLocalStorage } from "../utils/localStorage";

const initialFavourites = getFavouritesFromLocalStorage() || []
console.log(initialFavourites,"initialFavourites")

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
        favourites : favouriteReducer,
        cart : cartReducer,
        shop : shopReducer
    },
    preloadedState : {
        favourites :initialFavourites
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

setupListeners(store.dispatch)
export default store