import React, {createContext, useState, useEffect} from "react";
import api from "../api"
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) =>{

  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.common['Authorization'] = token
      setAuth(true)
    }
    setLoading(false) 
  },[])  
  
  const [auth,setAuth] = useState(false)
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate()

  const handleLogin = async(user) =>{
    const {data} = await api.post('/auth',user)
    localStorage.setItem('token',data)
    api.defaults.headers.common['Authorization'] = data
    window.location.href = '/pessoa'
    // navigate('/pessoa')
    setAuth(true)
  }

  const handleLogout = () =>{
    localStorage.removeItem('token')
    api.defaults.headers.common['Authorization'] = ''
    window.location.href = '/login'
    // navigate('/login')
    setAuth(false)
  }

  if(loading){
    return(
      <h1>Loading</h1>
    )
  }
  
  return(
    <AuthContext.Provider value={{ auth,handleLogin,handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext,AuthProvider}