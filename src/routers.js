import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Header from "./components/Header"
import { AuthProvider } from "./context/AuthContext"
import { VagasProvider } from "./context/VagasContext"
import Cadastro from "./pages/Cadastro"
import DetalheCandidato from "./pages/DetalheCandidato"
import ListaCandidatos from "./pages/ListaCandidatos"
import Home from "./pages/Home"
import { useState, useEffect } from "react"
import CadastroCandidato from "./pages/CadastroCandidato"
import { CandidatosProvider } from "./context/CandidatosContext"
import NotFound from "./pages/NotFound"

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
              {isLogin 
              ? 
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/curriculos' element={<ListaCandidatos/>} />
                <Route path='/infocandidato' element={<DetalheCandidato/>} />
                <Route path='/cadastro-candidato' element={<CadastroCandidato/>}/>
                <Route path="*" element={<NotFound/>}></Route>
              </Routes> 
              :
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path="*" element={<NotFound/>}></Route>
              </Routes>}
            </VagasProvider>
        </CandidatosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers