// eslint-disable-next-line eqeqeq
import React, { useState } from 'react'
import '../../styles/sellerdashboard.css'
import axiosInstance from '../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../redux/features/allusersSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import AllordersSeller from './components/AllordersSeller';
import Footer from '../Footer';


function SellerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentuser = useSelector(state => state.auth.value);

  const [open, setopen] = useState(false)
  const [serchvalue, setserchvalue] = useState('email')
  const [serchtext, setserchtext] = useState('email')
 
  const togglesidebar = () => {
    setopen(prevState => !prevState);
  };

  const serchvalueset = (event) => {
    const selectedValue = event.target.value;
    setserchvalue(selectedValue);
  }
  


  const search = async () => {
    try {
      
      const response = await axiosInstance.post('/allusersearch', {
        serchvalue,serchtext
      }, {
        headers: { Authorization: `Bearer ${currentuser.token}` }
      });
     
     dispatch(storeusers(response.data))
     
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/allusers'); 
      dispatch(storeusers(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  return (
    <div className='dashboard-main'>
          <div className='menu-btn-div'>
              <span  style={{cursor:'pointer'}} onClick={togglesidebar}  className="material-symbols-outlined menu-Btn">
                   menu
              </span>
              
             
              <div className='dashboard-serach-bar'>
                  <select  onChange={serchvalueset} className='search-user-dropdown' id="dropdown">
                       <option value='All'>All</option>
                       <option value="email">Email</option>
                       <option value="role">Role</option>
                       <option value="_id">User id</option>
                  </select>
                  <div className='dashboard-serach-bar-input'> 
                      <input id='adminSearch' placeholder='Dashboars Search' type="text" onChange={(e) => {setserchtext(e.target.value);}} />
                      <span onClick={search}  className="material-symbols-outlined">search</span>
                  </div>
              </div>
               
            
          </div>

              {open && (
                   <div onMouseLeave={()=>{setTimeout(()=>{togglesidebar()},500)}} className='sidebar-main'>
                   <h4 className='Oncolor'>Orders</h4>
                   <h4 onClick={()=>navigate('/sellerdashboard/alllisting') }>Listing</h4>  
                   <h4 onClick={()=>navigate('/sellerdashboard/addlisting')}>Add listing</h4>  
                   </div>
              )}

          <div style={{minHeight:"100vh",marginBottom:'30px'}}>
           <AllordersSeller/>
          </div>
<Footer/>
    </div>
  )
}

export default SellerDashboard