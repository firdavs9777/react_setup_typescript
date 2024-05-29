import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../App';
import HomeScreen from '../components/HomeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
     <Route index={true} path='/' element={<HomeScreen/>}/> 
    </Route>
  )
)

export default router;