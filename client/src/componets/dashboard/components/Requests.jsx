import React, { useEffect, useState } from 'react'
import '../../../styles/sellerdashboard.css'
import axiosInstance from '../../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer';

function Requests() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.value);

    const [open, setopen] = useState(false)
    const [request, setrequest] = useState('')
   

    const togglesidebar = () => {
      setopen(prevState => !prevState);
    };
  
    useEffect(() => {
      const fetchRequest = async () => {
        try {
          const res = await axiosInstance.post('/getallorders', null, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequest();
    }, []);
    
    
    return (
      <div className='dashboard-main'>
            <div className='menu-btn-div'>
                <span  style={{cursor:'pointer'}} onClick={togglesidebar}  className="material-symbols-outlined menu-Btn">
                     menu
                </span>
                
                <h4>User requests</h4>

            </div>
  
                {open && (
                     <div onMouseLeave={()=>{setTimeout(()=>{togglesidebar()},500)}} className='sidebar-main'>
                         <h4 onClick={()=>navigate('/admindashboard')}>All users</h4>
                         <h4 className='Oncolor'>All requests</h4>
                         <h4 onClick={()=> navigate('/admindashboard/allorders')}> All orders</h4>  
                         <h4 onClick={()=>navigate('/admindashboard/alllistings')}>All listings</h4>
                         <h4 onClick={()=>navigate('/admindashboard/yourlistings')}>Your listings</h4>
                         <h4 onClick={()=> navigate('/admindashboard/addlisting')} >Add listing</h4>
                     </div>
                )}
  
           {request && request.length > 0 ?(
            
               <div>data</div>

           ):(
            <div style={{display:"flex",justifyContent:"center",height:'100vh',alignItems:"center"}}><h1>No request available</h1></div>
           )}
        {/* <Footer/> */}
      </div>
    )
}

export default Requests