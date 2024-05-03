import React, { useEffect, useState } from 'react'
import '../../../styles/sellerdashboard.css'
import axiosInstance from '../../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../../redux/features/allusersSlice';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer';
import Loader from '../../Loader';
import { ToastContainer, toast } from 'react-toastify';

function Adminalllistings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = useSelector(state => state.auth.value);

  const [open, setopen] = useState(false)
  const [serchvalue, setserchvalue] = useState('email')
  const [serchtext, setserchtext] = useState('email')
  const [listings, setlistings] = useState([])
  const [loading, setloading] = useState(true)
  const [deleting,setdeleting] = useState(false)

  const togglesidebar = () => {
    setopen(prevState => !prevState);
  };

  const serchvalueset = (event) => {
    const selectedValue = event.target.value;
    setserchvalue(selectedValue);
  }
  
  const fetchalllistings = async () => {
    try {
      const res = await axiosInstance.post('/getlisistingadmin', null,{
        headers: { Authorization: `Bearer ${currentuser.token}` }
      });
     
      if (res.data.message == 'no listings were added') {
          setlistings('')  
      }else{
        setlistings(res.data.listings)
      }
    } catch (error) {
      setlistings('')  
    }
  };


  useEffect(() => {
    fetchalllistings();
    setloading(false)
  }, [])
  



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
  
  
  const deletelisting = async (e) => {
    let status 
    let message
    setdeleting(true)
try {
   let productid = e.target.id; 
   const response = await axiosInstance.delete('/deleteproduct', {
       data:{
           productid
       },
       headers: {
           Authorization: `Bearer ${currentuser.token}`
       }
   });
     message = response.data.message
      status = response.data.toaststatus
   fetchalllistings();
  
} catch (error) {
        message = 'Error deleting listing'
        status = 'error'
   console.error('Error deleting listing:', error);

}
setdeleting(false)
notify(message,status)
}



const notify = (message, status) => {
  
toast[status](message, {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
});
};



if (loading) {
 return(
  <div style={{height:'100vh',width:'100vw',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Loader/>    
  </div>
 )
}

if (deleting) {
return(
     <div style={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}} >
               <h1>Deleting listing...</h1>
     </div>
)
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
                       <option value="userid">user id</option>
                       <option value="_id">Product id</option>
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
                       <h4 onClick={()=> navigate('/admindashboard/allorders')}> All orders</h4>  
                       <h4 className='Oncolor'>All listings</h4>
                       <h4 onClick={()=>navigate('/admindashboard/yourlistings')}>Your listings</h4>
                       <h4 onClick={()=>navigate('/admindashboard/addlisting')}>Add listing</h4>
                   </div>
              )}

{loading ? (
         <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>
         <Loader/>    
       </div>
    ):(
       <>
         {listings ? (
            listings.map((listing, index) => (
              <div className='responsive-table-div' key={index}>  
                  <div style={{width:"100%"}}>
                      <img className='responsive-table-div-img' src={listing.filename} alt="" />
                      <hr />
                      <button className='listing-edit-btn listing-btns'>edit</button>
                      <button onClick={deletelisting} id={listing._id} className='listing-delete-btn listing-btns'>delete</button>
                  </div>
                                 
                  <h5>Title : {listing.title}</h5>
                  <hr/>
                  <p>Description : {listing.description}</p>
                  <hr/>
                  <h5>Product id : {listing._id}</h5>
                  <hr/>
                  <h5>Price : {listing.price}/-</h5>
                  <hr/>
                  <h5>Stock : {listing.quantity}</h5>
             
              </div>
            ))
         ):(
          <div style={{display:"flex",justifyContent:"center",height:'100vh',alignItems:"center"}}>
             <div>
                <h1>No listings Available Yet</h1>
             <button onClick={() => navigate("/admindashboard/addlisting")} style={{height:'50px', width:"100%", backgroundColor:"blue", color:"white"}}>
               ADD YOUR FIRST LISTING
             </button>
           </div>
         </div>
      )}
</>
    )}
       <Footer/>
       <ToastContainer/>
    </div>
  )
}

export default Adminalllistings