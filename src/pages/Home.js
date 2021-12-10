import Login from "./Login"
import Vagas from "./Vagas"

const Home = () =>{
  const logado = true // Variável que futuramente será nosso Auth vendo se o usuário está logado, alterar pra false pra mostrar o login
  return(
    <div>
      {logado ? <Vagas/> : <Login/>}
    </div>
  )
}

export default Home