import React, {createContext, useState } from "react";
import api from "../api";

const CandidatosContext = createContext();

const CandidatosProvider = ({children}) => {
  const [listaCandidatos,setListaCandidatos] = useState([]);
  const [loadingCandidatos,setLoadingCandidatos] = useState(true);

  const getListaCandidatos = async () => {
    const {data} = await api.get('/candidato/dados-completos');
    data.sort((a,b) => a.candidato.id > b.candidato.id ? 1 : -1)
    // data.map((vaga)=>{
    //   vaga.candidatos.sort(function(a, b){
    //     if(a.nome[0] < b.nome[0]) { return -1; }
    //     if(a.nome[0] > b.nome[0]) { return 1; }
    //     return 0;
    // })
    // })
    
  setLoadingCandidatos(false);
  setListaCandidatos(data);
  }
  
  return (
    <CandidatosContext.Provider value={{listaCandidatos, setListaCandidatos, loadingCandidatos, setLoadingCandidatos, getListaCandidatos}}>
      {children}
    </CandidatosContext.Provider>
  )
}
export {CandidatosContext, CandidatosProvider}