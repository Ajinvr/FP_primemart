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
import Loader from './componets/Loader';
import SellerDashboard from './componets/dashboard/SellerDashboard';
import AdminDashboard from './componets/dashboard/AdminDashboard';
import Requests from './componets/dashboard/components/Requests';
import AllOrders from './componets/dashboard/components/AllOrders';
import Adminaddlisting from './componets/dashboard/components/Adminaddlisting';
import SelllerAddlisting from './componets/dashboard/components/SelllerAddlisting';
import AlllistingSeller from './componets/dashboard/components/AlllistingSeller';
import {cartquantity} from './redux/features/usercartSlice';
import Adminalllistings from './componets/dashboard/components/Adminalllistings';
import Adminlistings from './componets/dashboard/components/Adminlistings';


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
  const user = useSelector((state) => state.auth.value);
  const userrole = useSelector((state) => state.auth.value.usr);
  const [isloading, setisloading] = useState(true);

  
  // ===============================================================================================
  useEffect(() => {
    const checkLocalStorage = () => {
      let userData = localStorage.getItem('userData');
      if (userData) {
        let userdata = JSON.parse(userData);
        dispatch(authuser(userdata));
      } 
      setisloading(false);
    };
    checkLocalStorage();
  }, []);


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


  useEffect(() => {
    const timer = setTimeout(async () => {
        try {
            const res = await axiosInstance.get("/cart", {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (res && res.data) {
                dispatch(cartquantity(res.data.length))
            }

        } catch (error) {
            console.log(error);
        }
    }, 500);
    return () => clearTimeout(timer); 
}, [user.isAuthenticated == true]);



  return (
    <BrowserRouter>
      <Header />
      {isloading ? (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>
          <Loader/>    
        </div>
             
      ) : (
        <Routes>
          <Route path="/" element={<><Carousele /><Headline value="New arrivals"/><><Home /> <Footer/> </></>}/>
          <Route path="/search" element={<Footer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetail />} />

         

          {/* protected routes */}
          <Route path="/cart" element={<Protectedroute isAuthenticated={isAuthenticated}><Cart /></Protectedroute>} />
          <Route path="/profile" element={<Protectedroute isAuthenticated={isAuthenticated}><Profile /></Protectedroute>} />
          <Route path="/order" element={<Protectedroute isAuthenticated={isAuthenticated}><Order /></Protectedroute>} />
          
          {isAuthenticated && userrole == 'seller' &&(
            <>
              <Route path="/sellerdashboard" element={<Protectedroute isAuthenticated={isAuthenticated}><SellerDashboard/></Protectedroute>} />
              <Route path="/sellerdashboard/addlisting" element={<Protectedroute isAuthenticated={isAuthenticated}><SelllerAddlisting/></Protectedroute>} />
              <Route path="/sellerdashboard/alllisting" element={<Protectedroute isAuthenticated={isAuthenticated}><AlllistingSeller/></Protectedroute>} />
              <Route path="/sellerdashboard/allorders" element={<Protectedroute isAuthenticated={isAuthenticated}><SelllerAddlisting/></Protectedroute>} />
            </>
          )}
          
          {isAuthenticated && userrole == 'admin' &&(
            <>
            <Route path="/admindashboard" element={<Protectedroute isAuthenticated={isAuthenticated}><AdminDashboard/></Protectedroute>} />
            <Route path="/admindashboard/requests" element={<Protectedroute isAuthenticated={isAuthenticated}><Requests/></Protectedroute>} />
            <Route path="/admindashboard/allorders" element={<Protectedroute isAuthenticated={isAuthenticated}><AllOrders/></Protectedroute>} />
            <Route path="/admindashboard/addlisting" element={<Protectedroute isAuthenticated={isAuthenticated}><Adminaddlisting/></Protectedroute>} />
            <Route path="/admindashboard/alllistings" element={<Protectedroute isAuthenticated={isAuthenticated}><Adminalllistings/></Protectedroute>} />
            <Route path="/admindashboard/yourlistings" element={<Protectedroute isAuthenticated={isAuthenticated}><Adminlistings/></Protectedroute>} />
            </>
          )}

          <Route path="/*" element={<Notfound />} />
        </Routes>
      )}
    
    </BrowserRouter>
  );
}

export default App;
