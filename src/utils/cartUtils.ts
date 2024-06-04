export const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
interface CartState {
  cartItems: CartItem[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}
interface CartItem {
  _id: string;
  price: number;
  qty: number;
  // Add other properties as needed
}
export const updateCart = (state:CartState ) => {
      // Calculate item price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc:number, item: CartItem) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price
      state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

      // Calculate the tax price
      state.taxPrice = addDecimals(Number((0.15 * Number(state.itemsPrice)).toFixed(2)));

      // Calculate total price
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
  );
       // Store the updated state in localStorage
      localStorage.setItem('cart', JSON.stringify(state));
}