import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    {
      id: 1,
      name: "Nike Air Max 2019",
      desc: "36EU - 4US",
      price: 259,
      pic: "https://soyouz2.my-store.ch/api/img?p=products/2023/9/1B0B5E61-B705-45E8-A984-D1DBF440AC38/15949128_3&st=11&v=1700468842",
      qty: 1,
    },
  ],
  cartOpen: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isProduct = state.products.find(product => product.id === action.payload.id);
      if(isProduct){
        isProduct.qty += 1;
      } else{
        state.products.push(action.payload);
      }
    },
    decToCart: (state, action) => {
      const isProduct = state.products.find(product => product.id === action.payload.id);
      if(isProduct && isProduct.qty > 1){
        isProduct.qty -= 1;
      } else{
        state.products = state.products.filter((product)=> product.id !== action.payload.id);
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product)=> product.id !== action.payload.id )
    },
    hideCart: (state, action) => {
      state.cartOpen = !state.cartOpen;
    },
  },
})

export const { addToCart, decToCart, removeFromCart, hideCart } = cartSlice.actions

export default cartSlice.reducer