import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Header from "./components/Header"
import { VagasProvider } from "./context/VagasContext"
import Curriculos from "./pages/Curriculos"
import Home from "./pages/Home"

const Routers = () =>{
  return(
    <BrowserRouter>
      <VagasProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/curriculos" element={<Curriculos/>} />
        </Routes>
      </VagasProvider>
    </BrowserRouter>
  )
}

export default Routers