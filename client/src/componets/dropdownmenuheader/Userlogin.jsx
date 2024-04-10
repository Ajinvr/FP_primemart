// eslint-disable-next-line eqeqeq
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setpath } from '../../redux/features/redirectSlice';
import { useNavigate } from 'react-router-dom';
import { resetAuth } from "../../redux/features/authSlice";
import { ToastContainer, toast } from 'react-toastify';
const notify = (message,status) => {
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


function Userlogin() {
        const dispatch = useDispatch();
              const navigate = useNavigate();
                    const isAuthenticated = useSelector(state => state.auth.value.isAuthenticated);
 
  return (
    <>
    {isAuthenticated == false ? (
      <div><a className='dm'  onClick={()=>{navigate('/login');dispatch(setpath('/'))}} >Login</a></div>
    ):(
      <div onClick={()=>{navigate('/');dispatch(resetAuth());localStorage.clear();notify('Logout success',"success")}} style={{color:'red'}} >Logout</div>
    )}
    <ToastContainer />
    </>
  )
}

export default Userlogin