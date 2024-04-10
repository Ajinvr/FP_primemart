// eslint-disable-next-line eqeqeq
import React from 'react'
import { useDispatch } from 'react-redux';
import { setpath } from '../../redux/features/redirectSlice';
import { useNavigate } from 'react-router-dom';
function Orders() {
        const dispatch = useDispatch();
             const navigate = useNavigate();
  return (
    <div><a className='dm' onClick={()=>{navigate('/profile');dispatch(setpath('/profile'))}}>Orders</a></div>
  )
}

export default Orders