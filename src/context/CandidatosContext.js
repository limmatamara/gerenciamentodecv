import React, {createContext,ReactNode,useState} from "react"
import api from "../api"
import moment from "moment"

const CandidatosContext = createContext()

const CandidatosProvider = ({children}) =>{

  const [listaCandidatos,setListaCandidatos] = useState([]);
  const [loadingCandidatos, setLoadingCandidatos] = useState(true);
  const [editCandidato,setEditCandidato] = useState({})
  const [editMode,setEditMode] = useState(false)
  const [idCandidato, setIdCandidato] = useState(0);
  const [dadosCompletosCandidato, setDadosCompletosCandidato]= useState([]);
  
  const getListaCandidatos = async () =>{
    const {data} = await api.get('/candidato')
    data.sort((a,b) => a.idCandidato > b.idCandidato ? 1 : -1)
    setLoadingCandidatos(false)
    setListaCandidatos(data)
  }

  const getCandidatoCompleto = async (idCandidato) =>{
    const {data} = await api.get(`/candidato/dados-completos?idCandidato=${idCandidato}`)
    data[0].candidato.dataNascimento = moment(data[0].candidato.dataNascimento,'YYYY-MM-DD').format('DD/MM/YYYY')

    data[0].experiencias.map((experiencia)=>{
      experiencia.dataInicio =  moment(experiencia.dataInicio,'YYYY-MM-DD').format('DD/MM/YYYY')   
      if(experiencia.dataFim === null){
        experiencia.dataFim = ""
      } else{
        experiencia.dataFim =  moment(experiencia.dataFim,'YYYY-MM-DD').format('DD/MM/YYYY')
      }
    })

    data[0].dadosEscolares.map((dadoEscolar)=>{
      dadoEscolar.dataInicio =  moment(dadoEscolar.dataInicio,'YYYY-MM-DD').format('DD/MM/YYYY')
      if(dadoEscolar.dataFim === null){
        dadoEscolar.dataFim = ""
      } else{
        dadoEscolar.dataFim =  moment(dadoEscolar.dataFim,'YYYY-MM-DD').format('DD/MM/YYYY')
      }
    })
    

    setEditCandidato(data[0])
    setEditMode(true)
    console.log(data[0])
  }

  const getDadosCompletosCandidato = async (idCandidato) => {
    console.log("buscar dados do id ", idCandidato);
    const {data} = await api.get('/candidato/dados-completos?idCandidato=' + idCandidato );
    setDadosCompletosCandidato(data);
  }

  return(
    <CandidatosContext.Provider value={{listaCandidatos,setListaCandidatos, listaCandidatos, setListaCandidatos,getListaCandidatos,loadingCandidatos,getCandidatoCompleto,editCandidato,editMode,setEditMode,idCandidato, setIdCandidato,dadosCompletosCandidato,getDadosCompletosCandidato}}>
      {children}
    </CandidatosContext.Provider>
  )
}

export {CandidatosContext,CandidatosProvider}