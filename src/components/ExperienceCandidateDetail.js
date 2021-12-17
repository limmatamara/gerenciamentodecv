import { BsBriefcase } from "react-icons/bs";
import { GoGraph } from "react-icons/go"
import { CandidatosContext } from "../context/CandidatosContext";
import { useContext } from "react";
import moment from "moment";
import styles from "./ExperienceCandidateDetail.module.css"

const ExperienceCandidateDetail = () => {
  const {dadosCompletosCandidato} = useContext(CandidatosContext);
  return (      
    <div className={styles.container}>
      <div className={styles.experienceDetail}>
        {dadosCompletosCandidato.map(dados => (       
          <div key={dados.candidato.idCandidato}>
            <div className={styles.infoCargoContainer}>                  
              <BsBriefcase className={styles.iconUser}/>
              <h2>{dados.candidato.cargo}</h2>
            </div>  
          </div>             
        ))}     

        <div className={styles.infoExperience}>
            <div className={styles.textInfoDetail}>
              <h2> <GoGraph className={styles.iconGraph} />Experiências</h2>
              {dadosCompletosCandidato.map(dadosCompletos => (   
                dadosCompletos.experiencias.map(dados =>
                <div key={dados.idExperiencia}>
                  <div className={styles.cardExperience}>                     
                      <p><span>Nome da Empresa:</span> {dados.nomeDaEmpresa}</p>
                      <div className={styles.infoData}>
                        <p><span>Data de Início:</span> {moment(dados.dataInicio).format('DD/MM/YYYY')}</p>
                        <p><span>Data de Conclusão:</span> {moment(dados.dataFim).format('DD/MM/YYYY')}</p>
                      </div>
                      <p><span>Descriao:</span>{dados.descricao}</p>
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

export default ExperienceCandidateDetail;