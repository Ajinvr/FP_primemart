import React, { useEffect, useState } from 'react'
import '../../../styles/sellerdashboard.css'
import axiosInstance from '../../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../../redux/features/allusersSlice';
import { useNavigate } from 'react-router-dom';


function AllordersSeller() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.value);
  const [orders, setorders] = useState([])
  useEffect(() => {
   
    const getorders = async ()=>{
      try {
        console.log(user.token);
        const res = await axiosInstance.post('/getallordersseller',null, {
          headers: { Authorization: `Bearer ${user.token}`}
        });
        if (res.data.message == 'No orders found for this seller') {
          setorders([])  
      }else{
           setorders(res.data)
      }
      } catch (error) {
           console.log(error);
      } 
    }
    getorders()
  }, [])
  

  return(
    <>
    {orders.length > 0 ? (
          <div>order</div>
        ):(
          <div style={{display:"flex",justifyContent:"center",height:'100vh',alignItems:"center"}}><h1>No Orders Available Yet</h1></div>
        )}
    </>
  )
}

export default AllordersSeller