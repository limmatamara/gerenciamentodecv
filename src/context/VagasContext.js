import React, {createContext,ReactNode,useState} from "react"
import api from "../api"

const VagasContext = createContext()

const VagasProvider = ({children}) =>{

  const [listaVagas,setListaVagas] = useState([])
  const [listaCandidatos,setListaCandidatos] = useState([])
  const [loadingJobs,setLoadingJobs] = useState(true)
  const [loadingAddCandidate, setLoadingAddCandidate] = useState({state:false,cardId:0})

  const getListVagas = async () =>{
    const {data} = await api.get('/vaga/vagas-candidatos')
    data.sort((a,b) => a.vaga.id > b.vaga.id ? 1 : -1)
    data.map((vaga)=>{
      vaga.candidatos.sort(function(a, b){
        if(a.nome[0] < b.nome[0]) { return -1; }
        if(a.nome[0] > b.nome[0]) { return 1; }
        return 0;
    })
    })
    setLoadingJobs(false)
    setListaVagas(data)
  }

  return(
    <VagasContext.Provider value={{listaVagas,setListaVagas, listaCandidatos, setListaCandidatos,getListVagas,loadingJobs,loadingAddCandidate, setLoadingAddCandidate}}>
      {children}
    </VagasContext.Provider>
  )
}

export {VagasContext,VagasProvider}