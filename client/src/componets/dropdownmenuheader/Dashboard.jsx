import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Combine import statements for readability
import { useNavigate } from 'react-router-dom';
import { setpath } from '../../redux/features/redirectSlice';

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const UserRole = useSelector(state => state.auth.value.usr);

    function NavigateToDashboard() {
        // Check UserRole against admin or seller role
        if (UserRole === 'admin') { // Use strict equality operator (===) for comparison
            navigate('/admindashboard');
        } else if (UserRole === 'seller') { // Use strict equality operator (===) for comparison
            navigate('/sellerdashboard');
        }
    }

    function NavigateToLogin() {
        dispatch(setpath('/sellerregistration'));
        if (UserRole === null || UserRole === undefined) {
            navigate('/login')
        }else{
            navigate('/sellerregistration');
        }
        
    }

    return (
        <>
            {UserRole == null || UserRole === 'user' ? ( // Check if UserRole is null or 'user'
                <div><a className='dm' onClick={NavigateToLogin}>Become a seller</a></div>
            ) : (
                <div><a className='dm' onClick={NavigateToDashboard}>Go To Dashboard</a></div>
            )}
        </>
    );
}

export default Dashboard;
