// eslint-disable-next-line eqeqeq
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setpath } from '../../redux/features/redirectSlice';
function Dashboard() {
        const dispatch = useDispatch();
            const navigate = useNavigate();
                const UserRole = useSelector(state => state.auth.value.usr);
  
  function NavigateToDashboard() {
          if (UserRole == 'admin') {
                        navigate('/admindashboard')
          }else if(UserRole == 'seller'){
                        navigate('/sellerdashboard')
          }
  }

 function NavigateToLogin () {
        dispatch(setpath('/sellerregistration'))
               navigate('/sellerregistration')
 } 

  return (
    <>
      { UserRole == null ? (
                     <div><a className='dm' onClick={NavigateToLogin}>Become a seller</a></div>
                 ):(
                     <div><a className='dm' onClick={NavigateToDashboard}>Go To Dashboard</a></div>
                         )
      }
    </>
  )
}

export default Dashboard