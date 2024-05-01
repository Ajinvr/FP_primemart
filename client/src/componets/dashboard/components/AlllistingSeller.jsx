import React, { useEffect, useState } from 'react'
import '../../../styles/sellerdashboard.css'
import axiosInstance from '../../../axiosInstance'
import { useSelector ,useDispatch} from 'react-redux';
import {storeusers} from '../../../redux/features/allusersSlice';
import { useNavigate } from 'react-router-dom';
import '../../../styles/admincard.css'
import Loader from '../../Loader';
import Footer from '../../Footer';



function AlllistingSeller() {

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
      const res = await axiosInstance.post('/getlisistingseller', null,{
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
      
      const response = await axiosInstance.post('/', {
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
        console.log(response.data);
        fetchalllistings();
       
    } catch (error) {
        console.error('Error deleting listing:', error);
    }
    setdeleting(false)
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
                   <h4 onClick={()=> navigate('/sellerdashboard')}>orders</h4>  
                   <h4 className='Oncolor'>Listing</h4>
                   <h4 onClick={()=> navigate('/sellerdashboard/addlisting')} >Add listing</h4>   
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
                  <hr />
                  <p>Description : {listing.description}</p>
                  <hr />
                  <h5>Product id : {listing._id}</h5>
                  <hr />
                  <h5>Price : {listing.price}/-</h5>
                  <hr />
                  <h5>Stock : {listing.quantity}</h5>
             
              </div>
            ))
         ):(
          <div style={{display:"flex",justifyContent:"center",height:'100vh',alignItems:"center"}}>
             <div>
                <h1>No listings Available Yet</h1>
             <button onClick={() => navigate("/sellerdashboard/addlisting")} style={{height:'50px', width:"100%", backgroundColor:"blue", color:"white"}}>
               ADD YOUR FIRST LISTING
             </button>
           </div>
         </div>
      )}
</>
    )}
   <Footer/>
    </div>
  )
}

export default AlllistingSeller