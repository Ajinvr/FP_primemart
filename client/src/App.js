import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./componets/Header";
import Footer from './componets/Footer';
import Home from './componets/Home';
import Carousele from './componets/Carousel';
import Login from './componets/Login'
import Signup from './componets/signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductDetail from './componets/ProductDetail';
import Addproduct from './componets/Addproduct';
import { useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeproduct } from "../src/redux/features/productSlice";
import CartProtectedroute from './utills/CartProtectedroute';
import Profile from './componets/Profile';
import Cart from './componets/Cart';


function App() {
  const isAuthenticated = useSelector((state)=>state.auth.value.isAuthenticated)
   
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.1.37:5000/allproducts");
        dispatch(storeproduct(res.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <BrowserRouter>
            <Header/>
                 <Routes>
                  
                      <Route path='/' element={<> <Carousele/> <Home/></>}/> 
                      <Route path='/search'element={<Footer/>}/> 
                      <Route path='/login'element={<Login/>}/>
                      <Route path='/signup'element={<Signup/>}/>
                      <Route path='/product/:id'element={<ProductDetail/>}/> 
                      {/* protected routes */}
                      <Route path='/addproduct/:id' element={<CartProtectedroute isAuthenticated={isAuthenticated}> <Addproduct/> </CartProtectedroute> }/>
                      <Route path='/cart' element={<Cart/>}/>  
                      <Route path='/profile' element={<CartProtectedroute isAuthenticated={isAuthenticated}> <Profile/> </CartProtectedroute> }/>  
                 
                 </Routes>
            <Footer/>
      </BrowserRouter>
  )
}

export default App