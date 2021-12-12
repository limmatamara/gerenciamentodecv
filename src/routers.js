import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Header from "./components/Header"
import { AuthProvider } from "./context/AuthContext"
import { VagasProvider } from "./context/VagasContext"
import Curriculos from "./pages/Curriculos"
import Home from "./pages/Home"

const Routers = () =>{
  return(
    <BrowserRouter>
      <AuthProvider>
        <VagasProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/curriculos" element={<Curriculos/>} />
          </Routes>
        </VagasProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers