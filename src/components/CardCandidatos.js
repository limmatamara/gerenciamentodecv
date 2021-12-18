import { useContext } from "react";
import { CandidatosContext } from "../context/CandidatosContext";
import { BsPencil } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import { BsBriefcase } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from './CardCandidatos.module.css';
import moment from "moment";


const CardCandidatos = () => {
  const {listaCandidatos, editCandidato, idCandidato, setIdCandidato} = useContext(CandidatosContext);
  return (
      
        <div className={styles.container}>
          <div className={styles.cardContainer}>
          {listaCandidatos.map(candidato => (   
           
              <div key={candidato.idCandidato} className={styles.candidatoContainer}>
                 <Link to="/infocandidato" onClick={ () => setIdCandidato(candidato.idCandidato)} >  
                <h3>{candidato.nome} <BsPencil className={styles.iconEdit}/></h3>
                <p><BiUser className={styles.iconUser}/></p>                          
                <p> <BsCalendar className={styles.icons}/>{moment(candidato.dataNascimento).format('DD/MM/YYYY')}</p>
                <p> <BsBriefcase className={styles.icons}/> {candidato.cargo}</p>
                <p> <BsGraphUp className={styles.icons}/>{candidato.senioridade}</p> 
                </Link>  
              </div> 
               
          ))}
          </div>

        </div>
      
  )
}

export default CardCandidatos;