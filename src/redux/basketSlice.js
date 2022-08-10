import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  items: [],
}

const basketSlice = createSlice({
   name: 'basket',
    initialState,
    reducers: {
      addItemToBasket(state, action) {
        state.items = [...state.items, action.payload];
      },
      removeItemFromBasket(state, action) {
        // dizinin sonundaki bir elemanı sil
        // let oldItems = state.items.filter(item => item.id != action.payload);
        
        // let items = state.items.filter(item => item.id == action.payload);
        // items.pop();
        // state.items = [...oldItems, ...items];

        const index = state.items.findIndex(item => item.id == action.payload);

        let newBasket = [...state.items];

        if(index >= 0 ) {
          newBasket.splice(index, 1);
        } else {
          console.warn(`
            Item with id ${action.payload} not found in basket.`)
        } 

        state.items = newBasket;
         
      },
      removeFromBasket(state,action) {
          state.items = state.items.filter(item => item.id != action.payload);
      } 

    },
    extraReducers: (builder) => {

    }
})

/**
 * states
 */
export const selectBasketItems = (state) => state.basket.items

export const selectBasketItemsWithId = (state,id) =>  {
  let result =  state.basket.items.filter(item => item.id === id)
  return result;
}

export const selectBasketTotal =  (state) => 
          state.basket.items.reduce((total,item) => 
          total + item.price,0)


  


export const {addItemToBasket,removeItemFromBasket,removeFromBasket} = basketSlice.actions;

export default basketSlice.reducer