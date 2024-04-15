import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import { useDispatch, useSelector } from 'react-redux';
import { storeproduct } from '../src/redux/features/productSlice';
import Protectedroute from './utils/Protectedroute';
import Notfound from './componets/Notfound';
import Header from './componets/Header';
import Footer from './componets/Footer';
import Carousele from './componets/Carousel';
import Headline from './componets/Headline';
import Home from './componets/Home';
import Login from './componets/Login';
import Signup from './componets/signup';
import ProductDetail from './componets/ProductDetail';
import Profile from './componets/Profile';
import Cart from './componets/Cart';
import Order from './componets/Order';
import axiosInstance from './axiosInstance';
import { authuser } from './redux/features/authSlice';
import Addproduct from './componets/dashboard/components/Addproduct';
import Loader from './componets/Loader';
import SellerDashboard from './componets/dashboard/SellerDashboard';



function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
  const [isloading, setisloading] = useState(true); // Initially set to true

  
  // ===============================================================================================
  useEffect(() => {
    const checkLocalStorage = () => {
      let userData = localStorage.getItem('userData');
      if (userData) {
        let userdata = JSON.parse(userData);
        dispatch(authuser(userdata));
      } else {
        console.log('no');
      }
      setisloading(false);
    };
    checkLocalStorage();
  }, [dispatch]);


// ===============================================================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/allproducts');
        dispatch(storeproduct(res.data));
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);



  return (
    <BrowserRouter>
      <Header />
      {isloading ? (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>
          <Loader/>    
        </div>
             
      ) : (
        <Routes>
          <Route path="/" element={<><Carousele /><Headline value="New arrivals"/><Home /></>}/>
          <Route path="/search" element={<Footer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetail />} />

         

          {/* protected routes */}
          <Route path="/cart" element={<Protectedroute isAuthenticated={isAuthenticated}><Cart /></Protectedroute>} />
          <Route path="/profile" element={<Protectedroute isAuthenticated={isAuthenticated}><Profile /></Protectedroute>} />
          <Route path="/order" element={<Protectedroute isAuthenticated={isAuthenticated}><Order /></Protectedroute>} />
          <Route path="/sellerdashboard" element={<Protectedroute isAuthenticated={true}><SellerDashboard/></Protectedroute>} />
          <Route path="/admindashboard" element={<Protectedroute isAuthenticated={true}><Addproduct /></Protectedroute>} />

          <Route path="/*" element={<Notfound />} />
        </Routes>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
