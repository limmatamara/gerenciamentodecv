import {Link} from "react-router-dom"
import styles from "./Menu.module.css"
import { useMatch, useResolvedPath } from 'react-router'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext'
import api from "../api";

function CustomLink({ children, to }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ fontWeight: match ? "bold" : "normal" }}
        to={to}
      >
        {children}
      </Link>
    </div>
  );
}
const Menu = () =>{
  const [infoLogado,setInfoLogado] = useState()
  useEffect(()=>{
    (async()=>{
      const {data} = await api.get('/user')
      setInfoLogado(data)
    })() 
  },[])
  const { handleLogout }  = useContext(AuthContext)
  return(
    <nav className={styles.nav}>
      <ul>
        <li>
          <span className={styles.hello}>{`Olá ${infoLogado ? infoLogado.nome : 'Usuário'}`}</span>
        </li>
        <li>
          <CustomLink to="/">Vagas</CustomLink>
        </li>
        <li>
          <CustomLink to ="/curriculos">Currículos</CustomLink>
        </li>
        <li>
          <button onClick={()=>{
            handleLogout()
          }} className={styles.logout}>Deslogar</button>
        </li>
      </ul>
    </nav>
  )
}

export default Menu