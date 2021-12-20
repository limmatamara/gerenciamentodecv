import styles from "./Header.module.css"
import Menu from "./Menu"
import Logo from "../images/iconBranco.png"
import { Link } from "react-router-dom"


const Header = () =>{
  return(
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <div>
          <Link to="/"><img className={styles.logo} src={Logo} /> </Link>
        </div>
        <Menu/>
      </div>
    </header>
  )
}

export default Header