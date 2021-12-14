import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Header from "./components/Header"
import { AuthProvider } from "./context/AuthContext"
import { VagasProvider } from "./context/VagasContext"
import Curriculos from "./pages/Curriculos"
import Cadastro from "./pages/Cadastro"
import Home from "./pages/Home"
import { useState, useEffect } from "react"

const Routers = () =>{
  const [isLogin, setIsLogin] = useState(false)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setIsLogin(true)
    }
  },[])
  return(
    <BrowserRouter>
      <AuthProvider>
        <VagasProvider>
          {isLogin && <Header/>}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/curriculos" element={<Curriculos/>} />
            <Route path='/cadastro' element={<Cadastro/>}/>
          </Routes>
        </VagasProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers