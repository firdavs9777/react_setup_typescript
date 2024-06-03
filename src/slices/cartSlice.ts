import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a cart item
interface CartItem {
  _id: string;
  price: number;
  qty: number;
  // Add other properties as needed
}

// Define the type for the state
interface CartState {
  cartItems: CartItem[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

// Get the initial state from localStorage or use a default value
const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [], itemsPrice: '0.00', shippingPrice: '0.00', taxPrice: '0.00', totalPrice: '0.00' };

const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
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

      // Calculate item price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price
      state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

      // Calculate the tax price
      state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);

      // Calculate total price
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
      );

      // Store the updated state in localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((_, index) => index !== action.payload);

      // Recalculate prices after removing an item
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
      );

      // Store the updated state in localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice;
