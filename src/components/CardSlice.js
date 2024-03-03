import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cardData: [], 
    cartItems:[]// Initial card data state
  };
export const CardSlice = createSlice({
    name: 'Card',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setCardData: (state, action) => {
            state.cardData = action.payload;
          },
          setcartItems: (state, action) => {
            state.cartItems = action.payload;
          },
    addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.name === action.payload.name);
            if (existingItem) {
              existingItem.quantity += action.payload.quantity;
            } else {
              state.cartItems.push(action.payload);
            }
          },
          updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.cartItems.find(item => item.name === name);
            if (itemToUpdate) {
              itemToUpdate.quantity = quantity;
            }
          },  
           deleteData:(state,action)=>{
            const {name} = action.payload;
            const itemToDelete = state.cartItems.filter((item)=> item.name != name);
            if(itemToDelete){
                state.cartItems=itemToDelete;
            }
           } 
    },
  })
  
  export const { Addqty, setCardData, addToCart, updateQuantity, deleteData } = CardSlice.actions
  export const selectCartItems = state => state.card.cartItems;
  export default CardSlice.reducer
  