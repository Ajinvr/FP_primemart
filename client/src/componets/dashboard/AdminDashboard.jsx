// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react'
import '../../styles/sellerdashboard.css'
import Users from './components/Users';
import axiosInstance from '../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../redux/features/allusersSlice';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = useSelector(state => state.auth.value);

  const [width, setWidth] = useState(window.innerWidth);
  const [open, setopen] = useState(false)
  const [serchvalue, setserchvalue] = useState('email')
  const [serchtext, setserchtext] = useState('email')
 

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);


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
    <>
   {width > 748 ? ( 
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
                      <input id='adminSearch' placeholder='Dashboars Search' type="text" onChange={(e)=>{setserchtext(e.target.value);}} />
                      <span onClick={search}  className="material-symbols-outlined">search</span>
                  </div>
              </div>
               
            
          </div>

              {open && (
                   <div onMouseLeave={()=>{setTimeout(()=>{togglesidebar()},500)}} className='sidebar-main'>
                       <h4 className='Oncolor'>All users</h4>
                       <h4 onClick={()=> navigate('/admindashboard/requests')}>All requests</h4>
                       <h4 onClick={()=> navigate('/admindashboard/allorders')}> All orders</h4>  
                       <h4 onClick={()=>navigate('/admindashboard/alllistings')}>All listings</h4>
                       <h4 onClick={()=>navigate('/admindashboard/yourlistings')}>Your listings</h4>
                       <h4 onClick={()=>navigate('/admindashboard/addlisting')}>Add a listing</h4>
                   </div>
              )}

          <div>
           <Users/>
          </div>
       <Footer/>
    </div>
    ):(
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", width:"100vw",padding:"20px"}}>
         <h4 style={{textAlign: "center"}}>Turn your device to landscape or switch to a bigger device.<br/> To view this page</h4>
      </div>
    )}
    </>
  )
}

export default AdminDashboard