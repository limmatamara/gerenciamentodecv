import {Link} from "react-router-dom"
import styles from "./Menu.module.css"
import { useMatch, useResolvedPath } from 'react-router'

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
  return(
    <nav className={styles.nav}>
      <ul>
        <li>
          <CustomLink to="/">Vagas</CustomLink>
        </li>
        <li>
          <CustomLink to ="/curriculos">Currículos</CustomLink>
        </li>
      </ul>
    </nav>
  )
}

export default Menu