import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/app.css"
import { useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeproduct } from "../src/redux/features/productSlice";
import Protectedroute from './utils/Protectedroute';
import Notfound from './componets/Notfound';
import Header from "./componets/Header";
import Footer from './componets/Footer';
import Carousele from './componets/Carousel';
import Headline from './componets/Headline';
import Home from './componets/Home';
import Login from './componets/Login'
import Signup from './componets/signup'
import ProductDetail from './componets/ProductDetail';
import Addproduct from './componets/Addproduct';
import Profile from './componets/Profile';
import Cart from './componets/Cart';
import Order from './componets/Order';
import Payment from './componets/Payment';







function App() {
  const isAuthenticated = useSelector((state)=>state.auth.value.isAuthenticated)
   
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.1.37:5000/allproducts");
        dispatch(storeproduct(res.data));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <BrowserRouter>
            <Header/>
                 <Routes>
                  
                      <Route path='/' element={<> <Carousele/> <Headline value="New arrivals"/> <Home/></>}/> 
                      <Route path='/search'element={<Footer/>}/> 
                      <Route path='/login'element={<Login/>}/>
                      <Route path='/signup'element={<Signup/>}/>
                      <Route path='/product/:id'element={<ProductDetail/>}/> 
                     
                      {/* protected routes */}
                      <Route path='/cart'element={<Protectedroute isAuthenticated={isAuthenticated}> <Cart/> </Protectedroute>}/> 
                      <Route path='/profile'element={<Protectedroute isAuthenticated={isAuthenticated}> <Profile/> </Protectedroute>}/> 
                      <Route path='/admindashboard'element={<Protectedroute isAuthenticated={isAuthenticated}> <Profile/> </Protectedroute>}/> 
                      <Route path='/order'element={<Protectedroute isAuthenticated={isAuthenticated}> <Order/> </Protectedroute>}/> 
                      <Route path='/payment'element={<Protectedroute isAuthenticated={isAuthenticated}> <Payment/> </Protectedroute>}/> 
                      <Route path='/*' element={<Notfound/>}/> 
                 </Routes>
            <Footer/>
      </BrowserRouter>
  )
}

export default App