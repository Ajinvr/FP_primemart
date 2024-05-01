import React, { useState } from 'react'
import '../../../styles/sellerdashboard.css'
import axiosInstance from '../../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../../redux/features/allusersSlice';
import { useNavigate } from 'react-router-dom';
import Addproduct from './Addproduct';


function SelllerAddlisting() {
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
                     <h4 onClick={()=> navigate('/sellerdashboard')}>orders</h4>  
                     <h4 onClick={()=> navigate('/sellerdashboard/alllisting')}>Listing</h4>
                     <h4 className='Oncolor'>Add listing</h4>   
                     </div>
                )}
  
            <div>
             <Addproduct/>
            </div>
  
      </div>
    )
}

export default SelllerAddlisting