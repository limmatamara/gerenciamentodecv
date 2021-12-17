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
import DetalheCandidato from "./pages/DetalheCandidato"
import ListaCandidatos from "./pages/ListaCandidatos"
import Home from "./pages/Home"
import { useState, useEffect } from "react"
import { CandidatosProvider } from "./context/CandidatosContext"

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
        <CandidatosProvider>
            <VagasProvider>
              {isLogin && <Header/>}
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/curriculos" element={<Curriculos/>} />
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/listadecandidatos' element={<ListaCandidatos/>} />
                <Route path='/infocandidato' element={<DetalheCandidato/>} />
              </Routes>
            </VagasProvider>
        </CandidatosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers