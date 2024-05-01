// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react'
import '../../../styles/sellerdashboard.css'
import axiosInstance from '../../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../../redux/features/allusersSlice';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer';



function AllOrders() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = useSelector(state => state.auth.value);

  const [open, setopen] = useState(false)
  const [serchvalue, setserchvalue] = useState('email')
  const [serchtext, setserchtext] = useState('email')
  const [orders, setorders] = useState('')

  const togglesidebar = () => {
    setopen(prevState => !prevState);
  };

  const serchvalueset = (event) => {
    const selectedValue = event.target.value;
    setserchvalue(selectedValue);
  }
  

useEffect(() => {
  const fetchallorders = async () => {
    try {
      const res = await axiosInstance.post('/getallorders', null,{
        headers: { Authorization: `Bearer ${currentuser.token}` }
      });
      if (res.data.message == 'No orders found') {
          setorders([])  
      }else{
        setorders(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchallorders();
}, [])



  const search = async () => {
    try {
      const res = await axiosInstance.post('/getAllOrderssearch', {
        serchvalue,serchtext
      }, {
        headers: { Authorization: `Bearer ${currentuser.token}` }
      });
     
      if (res.data.message == 'No orders found') {
          setorders([])  
      }else{
           setorders(res.data)
      }
     
     } catch (error) {
       console.error('Error fetching users:', error);
     }
  }
  
  
  return (
    <div className='dashboard-main'>
          <div className='menu-btn-div'>
              <span  style={{cursor:'pointer'}} onClick={togglesidebar}  className="material-symbols-outlined menu-Btn">
                   menu
              </span>
              
             
              <div className='dashboard-serach-bar'>
                  <select  onChange={serchvalueset} className='search-user-dropdown' id="dropdown">
                       <option value='All'>All</option>
                       <option value="email">email</option>
                       <option value="userid">user id</option>
                       <option value="sellerid">seller id</option>
                       <option value="_id">order id</option>
                  </select>
                  <div className='dashboard-serach-bar-input'> 
                      <input id='adminSearch' placeholder='Dashboars Search' type="text" onChange={(e)=>{setserchtext(e.target.value);}} />
                      <span onClick={search}  className="material-symbols-outlined">search</span>
                  </div>
              </div>
               
            
          </div>

              {open && (
                   <div onMouseLeave={()=>{setTimeout(()=>{togglesidebar()},500)}} className='sidebar-main'>
                       <h4 onClick={()=>navigate('/admindashboard')}>All users</h4>
                       <h4 onClick={()=> navigate('/admindashboard/requests')}>All requests</h4>
                       <h4 className='Oncolor'> All orders</h4>  
                       <h4 onClick={()=>navigate('/admindashboard/alllistings')}>All listings</h4>
                       <h4 onClick={()=>navigate('/admindashboard/yourlistings')}>Your listings</h4>
                       <h4 onClick={()=> navigate('/admindashboard/addlisting')}>Add listing</h4>
                   </div>
              )}

        {orders.length > 0 ? (
          <div>order</div>
        ):(
          <div style={{display:"flex",justifyContent:"center",height:'100vh',alignItems:"center"}}><h1>No Orders Available Yet</h1></div>
        )}
     {/* <Footer/> */}
    </div>
  )
}

export default AllOrders