import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../App';
import HomeScreen from '../components/Home/HomeScreen';
import Login from '../components/Auth/Login';
import MainCart from '../components/Cart/MainCart';
import ProductScreen from '../components/Product/Product';
import Register from '../components/Auth/Register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} /> 
      <Route index={true} path='/login' element={<Login />} /> 
      <Route index={true} path='/register' element={<Register />} /> 
      <Route index={true} path='/product/:id' element={<ProductScreen />} /> 
       <Route index={true} path='/cart' element={<MainCart/>}/> 
    </Route>
  )
)

export default router;