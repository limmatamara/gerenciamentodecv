import { CandidatosContext } from "../context/CandidatosContext";
import { useContext } from "react";
import moment from "moment";
import { BiUser } from "react-icons/bi";
import { SiTarget} from "react-icons/si";
import styles from './CandidatoDataDetail.module.css'

const CandidatoDataDetail = () => {
  const {dadosCompletosCandidato} = useContext(CandidatosContext);
  
  
  return (
    <div className={styles.container}>  
      {dadosCompletosCandidato.map(dados => (        
        <div key={dados.candidato.idCandidato} >
          <div className={styles.infoCandidatoContainer}>
            <div className={styles.userContainer}>
              <BiUser className={styles.iconUser}/>
              <h2>{dados.candidato.nome}</h2>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.textInfoContainer}>
                <h2><SiTarget className={styles.iconInfo}/> Informações</h2>
                <p><span>CPF:</span> {dados.candidato.cpf}</p>
                <p><span>Data de Nascimento:</span> {moment(dados.candidato.dataNascimento).format('DD/MM/YYYY')}</p>
                <p><span>Endereço:</span> {dados.candidato.logradouro}</p>
              </div>
            </div>
          </div>               
        </div>          
      ))}     
    </div>
  )
}

export default CandidatoDataDetail;