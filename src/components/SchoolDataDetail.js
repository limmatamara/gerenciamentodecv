import {FiBookOpen} from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { CandidatosContext } from "../context/CandidatosContext";
import { useContext } from "react";
import moment from "moment";
import styles from "./SchoolDataDetail.module.css"

const SchoolDataDetail = () => {
  const {dadosCompletosCandidato} = useContext(CandidatosContext);
  const dataAtual =  moment();
  
  return (      
    <div className={styles.container}>
      <div className={styles.schoolDetail}>
        {dadosCompletosCandidato.map(dados => (       
          <div key={dados.candidato.idCandidato}>
            <div className={styles.infoSenioridadeContainer}>                  
              <BsGraphUp className={styles.iconUser}/>
              <h2>{dados.candidato.senioridade}</h2>
            </div>  
          </div>             
        ))}     

      <div className={styles.infoSchool}>
        <div className={styles.infoSchoolDetail}>
          <h2> <FiBookOpen className={styles.iconBook} />Dados Escolares</h2>
          {dadosCompletosCandidato.map(dadosCompletos => (   
            dadosCompletos.dadosEscolares.map(dados =>
            <div key={dados.idInstituicao}>
            <div className={styles.cardSchool}> 
            <div className={styles.textCardSchool}>
              <p><span>Instituição :</span> {dados.instituicao}</p>
              <div className={styles.infoData}>
                {console.log(dados.dataInicio)}
                <p><span>Data de Início:</span> {moment(dados.dataInicio).format('DD/MM/YYYY')}</p>
                  <p><span>Data de Conclusão:</span> 
                  {(moment(dados.dataFim)<= (dataAtual)) 
                    ? (moment(dados.dataFim).format('DD/MM/YYYY')) 
                    : <p>Ainda Cursando</p>}
                </p>
              </div>
              <p><span>Descriao:</span>{dados.descricao}</p>
              </div>
            </div>
            </div> 
              )
              ))}
            </div>
          </div>
      </div>
    </div>     
  )
}

export default SchoolDataDetail;