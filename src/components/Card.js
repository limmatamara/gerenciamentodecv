import styles from "../styles/Card.module.css";
import { FaAccessibleIcon } from "react-icons/fa";
import { AiFillInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import moment from "moment";
import "reactjs-popup/dist/index.css";
import PopupModal from "./PopupModal";
import loadingGif from "../images/loading.gif"
import { useContext } from "react";
import { VagasContext } from "../context/VagasContext";
import api from "../api"

const Card = ({ info }) => {

  const {loadingAddCandidate,getListVagas,setLoadingAddCandidate,getPagesAlreadyLoaded} = useContext(VagasContext)

  const maxLengthVerify = (max, value) => {
    return value.length > max ? `${value.substring(0, max)}...` : value;
  };

  const data = info.vaga.DataAbertura;
  return (
    <div className={styles.card}>
      <div className={styles.topInfo}>
        <div className={styles.topLeftInfo}>
          <div className={styles.initialDiv}>
            <h4>{info.vaga.Titulo}<span>{info.vaga.PCD && <FaAccessibleIcon className={styles.pcd} />}</span></h4>
          </div>
          <p className={styles.customerPlace}>
            <span className={styles.cliente}>{info.vaga.Cliente}</span>
            {info.vaga.Estado && info.vaga.Cidade ? (
              <span className={styles.local}>
                &nbsp;{`- ${info.vaga.Estado}, ${info.vaga.Cidade}`}
              </span>
            ) : (
              <span className={styles.local}>&nbsp;- Remoto</span>
            )}
          </p>
        </div>
        <div className={styles.topRightInfo}>
          <div className={`${styles.statusBadge} ${info.vaga.Status == 'Aberta' ? styles.greenBadge : info.vaga.Status == 'Em Andamento' ? styles.blueBadge : info.vaga.Status == 'Finalizada' ? styles.grayBadge : info.vaga.Status == 'Suspensa' ? styles.yellowBadge : styles.redBadge}`}>
            <AiFillInfoCircle />
            <p>{info.vaga.Status}</p>
          </div>
          <span>{moment(data).format("DD/MM/YYYY")}</span>
        </div>
      </div>
      <div className={styles.bottomInfo}>
        <div className={styles.bottomLeftInfo}>
          <p>
            <span>Analista:</span>
            {info.vaga.Analista
              ? maxLengthVerify(32, info.vaga.Analista)
              : "Não informado"}
          </p>
        </div>
        <div className={styles.bottomRightInfo}>
          <p>
            <span>Responsável: </span>
            {info.vaga.Responsavel
              ? maxLengthVerify(32, info.vaga.Responsavel)
              : "Não informado"}
          </p>
        </div>
      </div>
      <div className={styles.apliesDiv}>
      {loadingAddCandidate.state == true && loadingAddCandidate.cardId == info.vaga.id 
        ? 
        <img className={styles.loadingGif} src={loadingGif} /> 
        :          
        info.candidatos.map((candidato) => (
          <div key={candidato.idCandidato} className={styles.nameDiv}>
            <BiUser className={styles.personIcon} />
            <span>{maxLengthVerify(28, candidato.nome)}</span>
            {info.vaga.Status == 'Aberta' 
            ?             
            <AiFillCloseCircle onClick={async ()=>{
              setLoadingAddCandidate({state:true,cardId:info.vaga.id})
              await api.delete(`https://gerenciamento-cv.herokuapp.com/vaga/desvincular-candidato?idCandidato=${candidato.idCandidato}&idVaga=${info.vaga.id}`)
              getPagesAlreadyLoaded()
              setLoadingAddCandidate({state:false,cardId:null})
            }} className={styles.closeIcon} /> 
            : 
            null}
          </div>
        ))}
      </div>
      <div className={styles.plusDiv}>
        {info.candidatos.length == 0 && <span>&nbsp;</span>}
        <PopupModal cardInfo={info}/>
      </div>
    </div>
  );
};

export default Card;
