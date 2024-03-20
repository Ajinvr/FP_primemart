import React from 'react'
import { Navigate } from 'react-router-dom'

function CartProtectedroute({isAuthenticated,Children}) {
    if (isAuthenticated == false) {
        return <Navigate to={'/login'}/>
      }
        return <Navigate to={Children}/>
    }
export default CartProtectedroute