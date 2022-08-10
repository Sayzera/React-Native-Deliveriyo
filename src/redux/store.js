import { configureStore } from "@reduxjs/toolkit";

import basketSlice from "./basketSlice";
import restaurantSlice from "./restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    restaurant: restaurantSlice,
  } 
})

