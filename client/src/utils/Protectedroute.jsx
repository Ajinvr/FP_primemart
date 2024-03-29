import React from 'react'
import { Navigate } from 'react-router-dom'

function Protectedroute({isAuthenticated,children}) {

        if (isAuthenticated == false) {
             return <Navigate to={'/login'}/>
         }
             return children
}

export default Protectedroute