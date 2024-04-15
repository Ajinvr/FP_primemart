// eslint-disable-next-line eqeqeq
import React, { useState } from 'react'
import '../../styles/sellerdashboard.css'
import Users from './components/Users';
import axiosInstance from '../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../redux/features/allusersSlice';



function SellerDashboard() {
  const dispatch = useDispatch();

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
  
  

  return (
    <div className='dashboard-main'>
          <div className='menu-btn-div'>
              <span  style={{cursor:'pointer'}} onClick={togglesidebar}  className="material-symbols-outlined menu-Btn">
                   menu
              </span>
              
             
              <div className='dashboard-serach-bar'>
                  <select  onChange={serchvalueset} className='search-user-dropdown' id="dropdown">
                       <option value="email">Search By</option>
                       <option value="email">Email</option>
                       <option value="role">Role</option>
                  </select>
                  <div className='dashboard-serach-bar-input'> 
                      <input id='adminSearch' placeholder='Dashboars Search' type="text" onChange={(e)=>{setserchtext(e.target.value);}} />
                      <span onClick={search}  className="material-symbols-outlined">search</span>
                  </div>
              </div>
               
            
          </div>

              {open && (
                   <div onMouseLeave={()=>{setTimeout(()=>{togglesidebar()},500)}} className='sidebar-main'>
                   <h4>requests</h4>
                   <h4>orders</h4>  
                   <h4>users</h4>  
                   </div>
              )}

          <div>
           <Users/>
          </div>

    </div>
  )
}

export default SellerDashboard