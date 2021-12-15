import Header from '../components/Header';
import { useContext, useEffect } from 'react';
import { CandidatosContext } from '../context/CandidatosContext';
import loadingGif from "../images/loading.gif"

const ListaCandidatos = () => {

  const {getListaCandidatos, listaCandidatos} = useContext(CandidatosContext)
  
  useEffect(() => {
    getListaCandidatos();  
  }, [] )
  return (
    <>
      <h1>Listagem de Currículos do Sistema</h1>
      <h3>{listaCandidatos.length} CURRÍCULOS CADASTRADOS</h3>
      <button>Cadastrar Novo </button>
    </>
  )
}

export default ListaCandidatos;