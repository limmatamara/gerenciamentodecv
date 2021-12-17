import React, {createContext,ReactNode,useState} from "react"
import api from "../api"

const CandidatosContext = createContext()

const CandidatosProvider = ({children}) =>{

  const [listaCandidatos,setListaCandidatos] = useState([]);
  const [loadingCandidatos, setLoadingCandidatos] = useState(true);
  
  const getListaCandidatos = async () =>{
    const {data} = await api.get('/candidato')
    setLoadingCandidatos(false)
    setListaCandidatos(data)
  }

  return(
    <CandidatosContext.Provider value={{listaCandidatos,setListaCandidatos, listaCandidatos, setListaCandidatos,getListaCandidatos,loadingCandidatos,}}>
      {children}
    </CandidatosContext.Provider>
  )
}

export {CandidatosContext,CandidatosProvider}