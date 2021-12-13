import {Link} from "react-router-dom"
import styles from "./Menu.module.css"
import { useMatch, useResolvedPath } from 'react-router'
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'

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
  const { handleLogout }  = useContext(AuthContext)
  return(
    <nav className={styles.nav}>
      <ul>
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