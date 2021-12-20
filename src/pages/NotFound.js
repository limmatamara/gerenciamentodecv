import sadSmile404 from "../images/sadsmile404.png"
import styles from "./NotFound.module.css"
import { useEffect } from "react"
const NotFound = () =>{
  useEffect(()=>{
    setTimeout(()=>{
      window.location.href = '/'
    },3000)
  },[])
  return(
    <div className={styles.notFound}>
      <h1>Página não encontrada - Erro 404</h1>
      <img src={sadSmile404}/>
      <h2>Redirecionando a Home...</h2>
    </div>
  )
}

export default NotFound