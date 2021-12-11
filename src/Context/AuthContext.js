import React, { createContext , useEffect , useState } from "react";
import api from "../api";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  useEffect (() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = token;
      setAuth(true);
    }
    setLoading(false);
  }, []);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  

  const handleLogin = async (user) => {
    const { data } = await api.post('/auth', user);
    localStorage.setItem('token', data);
    api.defaults.headers.common['Authorization'] = data;
    window.location.href = '/curriculos';
    setAuth(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    window.location.href='/login';
    setAuth(false);

  }

  if (loading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    )
  }
  return (
    <div>
      <AuthContext.Provider value={{auth, handleLogin, handleLogout }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export { AuthContext, AuthProvider}