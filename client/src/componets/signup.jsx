import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/signup.css"
import { useDispatch } from 'react-redux';
import {authuser} from '../redux/features/authSlice';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State for error messages
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // State for validation
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  // Regex patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

  // Validation functions
  function validateName() {
    const nameInput = document.querySelector('#Name');
    if (nameInput.value.length < 1) {
      setNameErr("This field cannot be blank");
    } else if (nameInput.value.length < 3) {
      setNameErr("Name should be at least 3 letters");
    } else {
      setNameValid(true);
      setNameErr("");
    }
  }

  function validateEmail() {
    const emailInput = document.querySelector("#Email");
    if (emailInput.value.length < 1) {
      setEmailErr("This field cannot be blank");
    } else if (!emailPattern.test(emailInput.value)) {
      setEmailErr("Enter a valid email");
    } else {
      setEmailValid(true);
      setEmailErr("");
    }
  }

  function validatePassword() {
    const passwordInput = document.querySelector("#Password");
    if (passwordInput.value.length < 1) {
      setPasswordErr("This field cannot be blank");
    } else if (!passwordPattern.test(passwordInput.value)) {
      setPasswordErr("Password not strong");
    } else {
      setPasswordValid(true);
      setPasswordErr("");
    }
  }

  // Handle form submission
  async function handleSubmit() {
    const nameInput = document.querySelector("#Name").value;
    const emailInput = document.querySelector("#Email").value;
    const passwordInput = document.querySelector("#Password").value;

    if (nameValid && emailValid && passwordValid) {
      const formData = {
        name: nameInput,
        email: emailInput,
        password: passwordInput
      };

      try {
        const result = await axios.post('http://localhost:5000/signup', formData);
        if (result.data.message == "email already exists" || result.status === 409) {
          setEmailErr("Email already exists",);
          notify(result.data.message,result.data.toaststatus);

        } else if (result.status === 201) {
          notify(result.data.message,result.data.toaststatus);
          dispatch(authuser(result.data));
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          console.log(result.data);
          notify("Something went wrong. Please try again.","error");
        }
      } catch (error) {
        console.log(error);
        notify("Something went wrong. Please try again.","error");
        console.error(error);
      }
    }
  }

  // Toast notification functions
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

  
  return (
    <div className='maindiv'>
      <div className='anm'></div>
      <div className='form'>
      <div className='rc'>
          <h3>Signup</h3>
      </div>
        <input onChange={validateName} type="text" placeholder='Name' name="Name" id="Name" />
        <p className='nameerr'>&nbsp;{nameErr}</p>

       
        <input onChange={validateEmail} type="Email" placeholder='Email id' name="Email" id="Email" />
        <p className='emailerr'>&nbsp;{emailErr}</p>

        
        <input onChange={validatePassword} type="password" placeholder='Password' name="Password" id="Password" />
        <p className='passworderr'>&nbsp;{passwordErr}</p>

        <div className='btnc'>
          <button onClick={handleSubmit}>Sign up</button>
        </div>
        <div className='rc'>
          <p><Link className='link' to="/login">Already have an account</Link></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
