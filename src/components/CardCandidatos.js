import { useContext } from "react";
import { CandidatosContext } from "../context/CandidatosContext";
import { BsPencil } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import { BsBriefcase } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from '../styles/CardCandidatos.module.css';
import moment from "moment";

const CardCandidatos = () => {
  const maxLengthVerify = (max, value) => {
    return value.length > max ? `${value.substring(0, max)}...` : value;
  };
  const {listaCandidatos, editCandidato, idCandidato, setIdCandidato,getCandidatoCompleto,getDadosCompletosCandidato} = useContext(CandidatosContext);
  return (
      
        <div className={styles.container}>
          <div className={styles.cardContainer}>
          {listaCandidatos.map(candidato => (   
           
              <div key={candidato.idCandidato} className={styles.candidatoContainer}>
                 <Link to="/infocandidato" onClick={async () => {
                   await getDadosCompletosCandidato(candidato.idCandidato)
                   setIdCandidato(candidato.idCandidato)
                 }} >  
                <h3>{maxLengthVerify(32,candidato.nome)}<Link to="/cadastro-candidato">
              <BsPencil onClick={()=>{
                getCandidatoCompleto(candidato.idCandidato)
              }} className={styles.iconEdit}/></Link></h3>
                <p><BiUser className={styles.iconUser}/></p>                          
                <p> <BsCalendar className={styles.icons}/>{moment(candidato.dataNascimento).format('DD/MM/YYYY')}</p>
                <p> <BsBriefcase className={styles.icons}/> {maxLengthVerify(54,candidato.cargo)}</p>
                <p> <BsGraphUp className={styles.icons}/>{maxLengthVerify(54,candidato.senioridade)}</p> 
                </Link>  
              </div> 
               
          ))}
          </div>

        </div>
      
  )
}

export default CardCandidatos;