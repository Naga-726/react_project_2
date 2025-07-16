import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext=createContext();

export const AuthProvider = ({children}) => {

    const [token,setToken]=useState(null);

    useEffect(()=>{
        const storedToken=localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken);
        }
    
    },[])


    const signin=(newToken)=>{
        localStorage.setItem('token',newToken);
        setToken(newToken);
    }
    const logout=()=>{
        localStorage.removeItem('token');
        setToken(null);
    
    }
  return (
    <AuthContext.Provider value={{token,signin,logout}}>{children}</AuthContext.Provider>
  )
}

export const useAuth=()=>{ return useContext(AuthContext)}