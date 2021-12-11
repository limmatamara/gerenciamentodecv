import styles from "./Card.module.css";
import { FaAccessibleIcon } from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import moment from "moment";

import "reactjs-popup/dist/index.css";
import { VagasContext } from '../context/VagasContext'
import { useContext, useEffect, useState } from 'react'
import PopupModal from "./PopupModal";

const Card = ({ info }) => {

  const {listaCandidatos} = useContext(VagasContext)

  const maxLengthVerify = (max, value) => {
    return value.length > max ? `${value.substring(0, max)}...` : value;
  };

  const [naoCadastrados,setNaoCadastrados] = useState([])

  useEffect(()=>{
    const candidatosNaoInscritos = listaCandidatos.filter((candidato) => {
      if(!info.ListaDeCandidatos.some((candidatoInscrito)=> candidatoInscrito.id == candidato.id)){
        return candidato
      }
    })
    setNaoCadastrados(candidatosNaoInscritos)
  },[])

  console.log(naoCadastrados)

  const data = info.DataAbertura;
  return (
    <div className={styles.card}>
      <div className={styles.topInfo}>
        <div className={styles.topLeftInfo}>
          <div className={styles.initialDiv}>
            <h4>{info.Titulo}</h4>
            {info.PCD && <FaAccessibleIcon className={styles.pcd} />}
          </div>
          <p className={styles.customerPlace}>
            <span className={styles.cliente}>{info.Cliente}</span>
            {info.Estado && info.Cidade ? (
              <span className={styles.local}>
                &nbsp;{`- ${info.Estado}, ${info.Cidade}`}
              </span>
            ) : (
              <span className={styles.local}>&nbsp;- Remoto</span>
            )}
          </p>
        </div>
        <div className={styles.topRightInfo}>
          <div className={styles.statusBadge}>
            <AiFillInfoCircle />
            <p>{info.Status}</p>
          </div>
          <span>{moment(data).format("DD/MM/YYYY")}</span>
        </div>
      </div>
      <div className={styles.bottomInfo}>
        <div className={styles.bottomLeftInfo}>
          <p>
            <span>Analista: </span>
            {info.Analista
              ? maxLengthVerify(32, info.Analista)
              : "Não informado"}
          </p>
        </div>
        <div className={styles.bottomRightInfo}>
          <p>
            <span>Responsável: </span>
            {info.Responsavel
              ? maxLengthVerify(32, info.Responsavel)
              : "Não informado"}
          </p>
        </div>
      </div>
      <div className={styles.apliesDiv}>
        {info.ListaDeCandidatos.map((candidato) => (
          <div key={candidato.id} className={styles.nameDiv}>
            <BiUser />
            <span>{maxLengthVerify(32, candidato.Nome)}</span>
          </div>
        ))}
      </div>
      <div className={styles.plusDiv}>
        <PopupModal cardInfo={info} titulo={info.Titulo} naoCadastrados={naoCadastrados}/>
      </div>
    </div>
  );
};

export default Card;
