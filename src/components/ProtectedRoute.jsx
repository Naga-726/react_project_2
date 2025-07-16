import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({children,allowedRoles}) => {

    const {token}=useAuth();
    if(!token){
        return <Navigate to='/signin' replace/>;
    }
    let user=null;
    try {
      user=jwtDecode(token);
    } catch (error) {
      console.error('invalid token',error);
      return <Navigate to='/signin' replace/>
      
    }
    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to='/unauthorised' replace/>
    }
  return children;
};

export default ProtectedRoute