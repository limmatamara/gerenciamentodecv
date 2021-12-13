import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Curriculos from "./pages/Curriculos";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";


const Routers = () =>{
  return(
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/curriculos" element={<Curriculos/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers