import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
// Define the type for a cart item
interface CartItem {
  _id: string;
  price: number;
  qty: number;
  name: string;
  image: string;
  countInStock: number;
  // Add other properties as needed
}
interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Define the type for the state
export interface CartState {
  cartItems: CartItem[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

// Get the initial state from localStorage or use a default value
const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : {
      cartItems: [],
      itemsPrice: "0.00",
      shippingPrice: "0.00",
      taxPrice: "0.00",
      totalPrice: "0.00",
      shippingAddress: [],
      paymentMethod: "Paypal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      return updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (index) => index._id !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      console.log(action.payload);
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems
} = cartSlice.actions;
export default cartSlice.reducer;
