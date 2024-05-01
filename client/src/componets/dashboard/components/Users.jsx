import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance'; 
import '../../../styles/users.css'
import { useDispatch, useSelector } from 'react-redux';
import { storeusers } from '../../../redux/features/allusersSlice';


function Users() {
  const dispatch = useDispatch();
  let users = useSelector((state) => state.users.value);
  const currentuser = useSelector(state => state.auth.value);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/allusers'); 
      dispatch(storeusers(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  const changerole = async (e)=>{
     let role = e.target.value
    try {
       const response = await axiosInstance.put(`/user/modifyrole/${e.target.id}`, {
        role
      },{
        headers: { Authorization: `Bearer ${currentuser.token}` }
      }); 
    } catch (error) {
      console.log('Error updating users role');
    }
    fetchUsers()
  }

  return (
    <>
    <div className='users-div-allign'>
      {users && users.length > 0 ? (
        <div>
          <h1 style={{ marginTop: "20px", marginBottom: "20px" }}> All Users</h1>
          <table className='all-users-table-tag'>
            <thead>
              <tr>
                <th className='all-users-th-tag'>No</th>
                <th className='all-users-th-tag'>User id</th>
                <th className='all-users-th-tag'>Name</th>
                <th className='all-users-th-tag'>Email</th>
                <th className='all-users-th-tag'>Role</th>
                <th className='all-users-th-tag'>Seller</th>
                <th className='all-users-th-tag'>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} style={{ border: "1px solid" }}>
                  <td className='all-users-td-tag'>{index + 1}</td>
                  <td className='all-users-td-tag'>{user._id}</td>
                  <td className='all-users-td-tag'>{user.name}</td>
                  <td className='all-users-td-tag'>{user.email}</td>
                  <td className='all-users-td-tag'>{user.role}</td>
                  {user.role !== "seller" ? (
                    <td className='all-users-td-tag'> <button onClick={changerole} className='admin-pannel-btns' id={user._id} value={"seller"}>Make</button> </td>
                  ) : (
                    <td className='all-users-td-tag'> <button onClick={changerole} className='admin-pannel-btns-remove' id={user._id} value={"user"}>Remove</button> </td>
                  )}
                  {user.role !== "admin" ? (
                    <td className='all-users-td-tag'> <button onClick={changerole} className='admin-pannel-btns' id={user._id} value={'admin'}>Make </button> </td>
                  ) : (
                    <td className='all-users-td-tag'> <button onClick={changerole} className='admin-pannel-btns-remove' id={user._id} value={'user'}>Remove</button> </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>No users found</h2>
      )}
     
    </div>
  
   
    </>
  );
}

export default Users;
