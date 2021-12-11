import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Curriculos from "./pages/Curriculos";
import Home from "./pages/Home";
import Login from "./pages/Login";


const Routers = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/curriculos" element={<Curriculos/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers