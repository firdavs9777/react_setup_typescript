import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import HomeScreen from "../components/Home/HomeScreen";
import Login from "../components/Auth/Login";
import MainCart from "../components/Cart/MainCart";
import ProductScreen from "../components/Product/Product";
import Register from "../components/Auth/Register";
import ShippingAddress from "../components/Product/ShippingScreen";
import PrivateRoute from "./PrivateRouter";
import Payment from "../components/Product/Payment";
import PlaceOrder from "../components/Product/PlaceOrder";
import OrderScreen from "../components/Product/OrderScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route index={true} path="/login" element={<Login />} />
      <Route index={true} path="/register" element={<Register />} />
      <Route index={true} path="/product/:id" element={<ProductScreen />} />
      <Route index={true} path="/cart" element={<MainCart />} />
      {/* Private Route started from here */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/shipping" element={<ShippingAddress />} />
        <Route index={true} path="/payment" element={<Payment />} />
        <Route index={true} path="/placeorder" element={<PlaceOrder />} />
         <Route index={true} path="/order/:id" element={<OrderScreen />} />
      </Route>
    </Route>
  )
);

export default router;
