import React, { useEffect, useState } from 'react'
import '../../../styles/sellerdashboard.css'
import axiosInstance from '../../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../../redux/features/allusersSlice';
import { useNavigate } from 'react-router-dom';
import Addproduct from './Addproduct';

function Adminaddlisting() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const navigate = useNavigate();
  
    const [open, setopen] = useState(false)
    
    const togglesidebar = () => {
      setopen(prevState => !prevState);
    };
  
    return (
      <div className='dashboard-main'>
            <div className='menu-btn-div'>
                <span  style={{cursor:'pointer'}} onClick={togglesidebar}  className="material-symbols-outlined menu-Btn">
                     menu
                </span>
                <h3>Add listing</h3>
            </div>
  
                {open && (
                     <div onMouseLeave={()=>{setTimeout(()=>{togglesidebar()},500)}} className='sidebar-main'>
                       <h4 onClick={()=>navigate('/admindashboard')}>All users</h4>
                       <h4 onClick={()=> navigate('/admindashboard/requests')}>All requests</h4>
                       <h4 onClick={()=> navigate('/admindashboard/allorders')}> All orders</h4>  
                       <h4 onClick={()=>navigate('/admindashboard/alllistings')}>All listings</h4>
                       <h4 onClick={()=>navigate('/admindashboard/yourlistings')}>Your listings</h4>
                       <h4 className='Oncolor'>Add listing</h4>
                     </div>
                )}
  
            <div>
            <Addproduct/>
            </div>
  
      </div>
    )
}

export default Adminaddlisting