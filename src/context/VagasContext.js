import React, {createContext,ReactNode,useState} from "react"
import api from "../api"

const VagasContext = createContext()

const VagasProvider = ({children}) =>{

  const [listaVagas,setListaVagas] = useState([])
  const [listaCandidatos,setListaCandidatos] = useState([])
  const [loadingJobs,setLoadingJobs] = useState(true)
  const [loadingAddCandidate, setLoadingAddCandidate] = useState({state:false,cardId:0})
  const [vagaPages,setVagaPages] = useState()
  const [pagesLoaded,setPagesLoaded] = useState(0)

  const getListVagas = async () =>{
    const {data} = await api.get('/vaga/vaga-candidato-paginada?pagina=0&quantidade=10')
    // data.sort((a,b) => a.vaga.id > b.vaga.id ? 1 : -1)
    data.vagas.map((vaga)=>{
      vaga.candidatos.sort(function(a, b){
        if(a.nome[0] < b.nome[0]) { return -1; }
        if(a.nome[0] > b.nome[0]) { return 1; }
        return 0;
    })
    })
    setListaVagas(data.vagas)
    setVagaPages(data.paginasTotal)
    setLoadingJobs(false)
  }

  const loadNewPage = async (page) =>{
    const {data} = await api.get(`/vaga/vaga-candidato-paginada?pagina=${page+1}&quantidade=10`)
    data.vagas.map((vaga)=>{
      vaga.candidatos.sort(function(a, b){
        if(a.nome[0] < b.nome[0]) { return -1; }
        if(a.nome[0] > b.nome[0]) { return 1; }
        return 0;
    })
    })
    setListaVagas([...listaVagas,...data.vagas])
  }

  const getPagesAlreadyLoaded = async () =>{
    let pagesAlreadyLoaded = (pagesLoaded+1)*10
    const {data} = await api.get(`/vaga/vaga-candidato-paginada?pagina=0&quantidade=${pagesAlreadyLoaded}`)
    data.vagas.map((vaga)=>{
      vaga.candidatos.sort(function(a, b){
        if(a.nome[0] < b.nome[0]) { return -1; }
        if(a.nome[0] > b.nome[0]) { return 1; }
        return 0;
    })
    })
    setListaVagas(data.vagas)
  }

  return(
    <VagasContext.Provider value={{listaVagas,setListaVagas, listaCandidatos, setListaCandidatos,getListVagas,loadingJobs,loadingAddCandidate, setLoadingAddCandidate,vagaPages,loadNewPage,pagesLoaded,setPagesLoaded,getPagesAlreadyLoaded}}>
      {children}
    </VagasContext.Provider>
  )
}

export {VagasContext,VagasProvider}