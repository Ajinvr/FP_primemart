import React, { useState } from 'react'
import "../styles/login.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {authuser} from '../redux/features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let value;
  // Err===============================================
const [emailerr, setemailerr] = useState("");
const [passworderr, setpassworderr] = useState("");
// ====================================================
 

// ====================================================
const [emailv, setemail] = useState(false);
const [passwordv, setpassword] = useState(false);
// =====================================================


// Test Regex=========================================================
let emailtest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let passwordtest = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
// Test Regex end =========================================================



// submit============================================================

function submit(event) {
  // event.preventDefault();
  
 
  let email = document.querySelector("#Email")
  let password = document.querySelector("#Password")


// email
  if(email.value.length <1){
    setemailerr("This field cannot be blank");
  } else if (!emailtest.test(email.value)) {
    setemailerr("Enter a valid email");
  } else {
    setemail(true)
    setemailerr("");
  }
  
// password
  if(password.value.length <1){
    setpassworderr("This field cannot be blank");
  } else if (!passwordtest.test(password.value)) {
    setpassworderr("Password not strong");
  } else {
    setpassword(true)
    setpassworderr("");
  }

}

// Validation ===================================================

function emailtes() {
  let email = document.querySelector("#Email")
  
  if(email.value.length <1){
    setemailerr("This field cannot be blank");
  } else if (!emailtest.test(email.value)) {
    setemailerr("Enter a valid email");
  } else {
    setemail(true)
    setemailerr("");
  }
}


function passwordtes() {
  let password = document.querySelector("#Password")
  if(password.value.length <1){
    setpassworderr("This field cannot be blank");
  } else if (!passwordtest.test(password.value)) {
    setpassworderr("Password not strong");
  } else {
    setpassword(true)
    setpassworderr("");
  }
}

// Validation End ===================================================


// fech data=========================================================

async function login() {
       let email = document.querySelector("#Email").value;
      let password = document.querySelector("#Password").value;
if (emailv === true && passwordv === true) {
    try {
           const result = await axios.post('http://localhost:5000/login',{email,password})
                if (result.data.user == false) {
                    notify(result.data.message,result.data.toaststatus); 
                }
                   else if (result.data.user === true ) {
                        notify(result.data.message,result.data.toaststatus);
                        dispatch(authuser(result.data));
                              // setTimeout(() => {
                              //            navigate('/');
                              // }, 1000);
                    }

    }catch (error) {
      notify("Something went wrong. Please try again.","error");
    }

  }
}
  
 // toast notification===============================================

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

// end==============================================================


  return (
    <div className='maindiv'>
    <div className='anm'></div>

<div className='form'>
  <div className='rc'>
    <h3>login</h3>
  </div>
     
      <input onChange={()=>{emailtes()}} type="Email" placeholder='Email id' name="" id="Email" />
            <p>&nbsp;{emailerr}</p>
                 <input onChange={passwordtes} type="password" placeholder='Password' name="" id="Password" />
                       <p>&nbsp;{passworderr}</p>
                           <br />
     <div className='btnc'><button onClick={()=>{
          submit()
          login()
     }} >login</button></div>
 <div className='rc'><p><Link className='link' to="/signup">Don't have an account</Link></p></div>
 </div>
<ToastContainer/>
</div>
  )
}

export default Login