import { useContext, useEffect } from 'react';
import { CandidatosContext } from '../context/CandidatosContext';
import { Link } from 'react-router-dom';
import CardCandidatos from '../components/CardCandidatos';
import styles from '../styles/ListaCandidatos.module.css'
import loadingGif from "../images/loading.gif"

const ListaCandidatos = () => {

  const {getListaCandidatos, listaCandidatos, setListaCandidatos} = useContext(CandidatosContext);
  
  useEffect(() => {
    getListaCandidatos();  
  }, [] );


  return (
    <div className={styles.listagemContainer}>
      <h1>Listagem de Currículos do Sistema</h1>
      <div>
        <div className={styles.infosEAdd}>          
          <h2>{listaCandidatos.length} CURRÍCULOS CADASTRADOS</h2>
          <button><Link to="/cadastro-candidato">Cadastrar Novo</Link>{" "}</button>
        </div>

        <CardCandidatos/>   
      </div>             
    </div>
  )
}

export default ListaCandidatos;