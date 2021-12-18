import { useContext } from "react";
import { CandidatosContext } from "../context/CandidatosContext";
import { BsPencil } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import { BsBriefcase } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import styles from './CardCandidatos.module.css';
import moment from "moment";
import { Link } from "react-router-dom";


const CardCandidatos = () => {
  const {listaCandidatos,getCandidatoCompleto} = useContext(CandidatosContext);
  return (
      <div className={styles.container}>
        <div className={styles.cardContainer}>
        {listaCandidatos.map(candidato => (      
            <div key={candidato.idCandidato} className={styles.candidatoContainer}>
              <h3>{candidato.nome}<Link to="/cadastro-candidato">
              <BsPencil onClick={()=>{
                getCandidatoCompleto(candidato.idCandidato)
              }} className={styles.iconEdit}/></Link></h3>
              <BiUser className={styles.iconUser}/>                             
              <p> <BsCalendar className={styles.icons}/><span>{moment(candidato.dataNascimento).format('DD/MM/YYYY')}</span></p>
              <p> <BsBriefcase className={styles.icons}/><span>{candidato.cargo}</span></p>
              <p> <BsGraphUp className={styles.icons}/><span>{candidato.senioridade}</span></p> 
            </div>             
        ))}
        </div>
      </div>
  )
}

export default CardCandidatos;