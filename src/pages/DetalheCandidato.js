import { useContext, useEffect, useState } from "react";
import SchoolDataDetail from "../components/SchoolDataDetail";
import CandidatoDataDetail from "../components/CandidatoDataDetail";
import ExperienceCandidateDetail from "../components/ExperienceCandidateDetail";
import { CandidatosContext } from "../context/CandidatosContext";
import styles from "./DetalheCandidato.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { BsBriefcase } from "react-icons/bs";
import { SiTarget} from "react-icons/si";
import moment from "moment";
import {FiBookOpen} from "react-icons/fi";
import { GoGraph } from "react-icons/go"
import api from "../api";

const DetalheCandidato = () => {
  const {
    idCandidato,
    dadosCompletosCandidato,
    getDadosCompletosCandidato
  } = useContext(CandidatosContext);

  const [linkCurriculo,setLinkCurriculo] = useState()

  const downloadCurriculo = async () => {
    console.log(localStorage.getItem('token'));
    api({
      url: `https://gerenciamento-cv.herokuapp.com/curriculo/download-curriculo/${idCandidato}`,
      headers: {Authorization: localStorage.getItem('token')},
      method: 'GET',
      responseType: 'blob'
  })
      .then((response) => {
            const url = window.URL
                  .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'curriculo.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      })
  }

  return (
    <section className={styles.detalheCandidatoContainer}>
      {dadosCompletosCandidato.map((dados) => (
        <>
          <div className={styles.leftCol}>
            <div className={styles.leftName}>
              <AiOutlineUser className={styles.iconUser} />
              <p className={styles.leftContentText}>{dados.candidato.nome}</p>
            </div>
            <div className={styles.leftName}>
              <BsGraphUp className={styles.iconUser}/>
              <p className={styles.leftContentText}>{dados.candidato.senioridade}</p>
            </div>
            <div className={styles.leftName}>
              <BsBriefcase className={styles.iconUser}/>
              <p className={styles.leftContentText}>{dados.candidato.cargo}</p>
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.rightInfos}>
              <h3><SiTarget className={styles.iconInfo}/>Informações</h3>
              <p className={styles.personInfoP}><span>CPF:</span> {dados.candidato.cpf}</p>
              <p className={styles.personInfoP}><span>Data Nascimento:</span> {moment(dados.candidato.dataNascimento,'YYYY-MM-DD').format('DD/MM/YYYY')}</p>
              <p className={styles.personInfoP}><span>Rua:</span> {dados.candidato.logradouro}</p>
              <p className={styles.personInfoP}><span>Bairro:</span> {dados.candidato.complemento}</p>
              <p className={styles.personInfoP}><span>Número:</span> {dados.candidato.numero}</p>
              <a className={styles.curriculoDownload} target="_blank" onClick={()=>{
                downloadCurriculo()
              }} href={linkCurriculo}>Download Currículo</a>
            </div>
            <div className={styles.rightInfos}>
              <h3><FiBookOpen className={styles.iconInfo} />Dados Escolares</h3>
              {dados.dadosEscolares.map((dadoEscolar)=>(
                <div>
                  <p className={styles.personInfoP}><span>Instituição:</span> {dadoEscolar.instituicao}</p>
                  <p className={styles.personInfoP}><span>Data Início:</span> {moment(dadoEscolar.dataInicio,'YYYY-MM-DD').format('DD/MM/YYYY')}</p>
                  <p className={styles.personInfoP}><span>Data Fim:</span> {dadoEscolar.dataFim == null ? "Cursando" : moment(dadoEscolar.dataFim,'YYYY-MM-DD').format('DD/MM/YYYY')}</p>
                  <p className={styles.personInfoP}><span>Descrição:</span> {dadoEscolar.descricao}</p>
                  <div className={styles.separator}>&nbsp;</div>
                </div>
              ))}
            </div>
            <div className={styles.rightInfos}>
              <h3><GoGraph className={styles.iconInfo} />Experiências</h3>
              {dados.experiencias.map((exp)=>(
                <div>
                  <p className={styles.personInfoP}><span>Empresa:</span> {exp.nomeEmpresa}</p>
                  <p className={styles.personInfoP}><span>Data Início:</span> {moment(exp.dataInicio,'YYYY-MM-DD').format('DD/MM/YYYY')}</p>
                  <p className={styles.personInfoP}><span>Data Fim:</span> {exp.dataFim == null ? "Atualmente" : moment(exp.dataFim,'YYYY-MM-DD').format('DD/MM/YYYY')}</p>
                  <p className={styles.personInfoP}><span>Descrição:</span> {exp.descricao}</p>
                  <div className={styles.separator}>&nbsp;</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ))}
    </section>
  );
};

export default DetalheCandidato;
