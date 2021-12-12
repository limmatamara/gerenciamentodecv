import Login from "./Login"
import Vagas from "./Vagas"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Home = () =>{
  const { auth }  = useContext(AuthContext)
  return(
    <div>
      {auth ? <Vagas/> : <Login/>}
    </div>
  )
}

export default Home