import React, {createContext,ReactNode,useState} from "react"
import api from "../api"

const CandidatosContext = createContext()

const CandidatosProvider = ({children}) =>{

  const [listaCandidatos,setListaCandidatos] = useState([]);
  const [loadingCandidatos, setLoadingCandidatos] = useState(true);
  const [idCandidato, setIdCandidato] = useState(0);
  const [dadosCompletosCandidato, setDadosCompletosCandidato]= useState([]);
  
  const getListaCandidatos = async () =>{
    const {data} = await api.get('/candidato')
    setLoadingCandidatos(false)
    setListaCandidatos(data)
  }

  const getDadosCompletosCandidato = async (idCandidato) => {
    console.log("buscar dados do id ", idCandidato);
    const {data} = await api.get('/candidato/dados-completos?idCandidato=' + idCandidato );
    setDadosCompletosCandidato(data);
  }


  return(
    <CandidatosContext.Provider value={{listaCandidatos,getDadosCompletosCandidato, dadosCompletosCandidato, setListaCandidatos,listaCandidatos, setListaCandidatos,getListaCandidatos, idCandidato, setIdCandidato}}>
      {children}
    </CandidatosContext.Provider>
  )
}

export {CandidatosContext,CandidatosProvider}