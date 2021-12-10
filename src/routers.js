import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Header from "./components/Header"
import Curriculos from "./pages/Curriculos"
import Home from "./pages/Home"

const Routers = () =>{
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/curriculos" element={<Curriculos/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers