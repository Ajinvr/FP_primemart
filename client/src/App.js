import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/app.css"
import React,{ useEffect, useState} from 'react';
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
import Profile from './componets/Profile';
import Cart from './componets/Cart';
import Order from './componets/Order';
import axiosInstance from './axiosInstance'
import { authuser } from "./redux/features/authSlice";
import Addproduct from './componets/dashboard/components/Addproduct'

// eslint-disable-next-line eqeqeq

function App() {

     const dispatch = useDispatch();

     useEffect(()=>{
          const checkLocalStorage = () => {
               const userData = localStorage.getItem('userData');
                 if (userData) {
                        let userdata = JSON.parse(userData);
                        isAuthenticated = userdata.isAuthenticated
                                  dispatch(authuser(userdata));
                               
                    } else {
                        console.log("no");
                    }
           };
           checkLocalStorage();
     },[dispatch])
     

let isAuthenticated  =  
       
// useSelector((state)=>state.auth.value.isAuthenticated)

  useEffect(() => {
            const fetchData = async () => {
                 try {
                       const res = await axiosInstance.get('/allproducts')
                            dispatch(storeproduct(res.data));
                 } catch (error) {
                         console.log("Error fetching data:", error);
                 }
            };
    fetchData();
  }, []);

  

 

  useEffect(() => {
    // Simulating token expiration error
    const error = { code: 'TOKEN_EXPIRED' };

    // Example logic to catch token expiration errors
    const errorHandler = (error) => {
      if (error.code === 'TOKEN_EXPIRED') {
        // Redirect to login page
       console.log('token redirect');
      }
    };

    // Listen for errors
    window.addEventListener('error', errorHandler);

    return () => {
      // Cleanup event listener
      window.removeEventListener('error', errorHandler);
    };
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
                      <Route path='/order'element={<Protectedroute isAuthenticated={isAuthenticated}> <Order/> </Protectedroute>}/> 
                      <Route path='/sellerdashboard'element={<Protectedroute isAuthenticated={true}> <Addproduct/> </Protectedroute>}/> 
                      <Route path='/*' element={<Notfound/>}/> 
                 </Routes>
            <Footer/>
      </BrowserRouter>
  )
}

export default App