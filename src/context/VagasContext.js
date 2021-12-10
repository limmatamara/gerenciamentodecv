import React, {createContext,ReactNode,useState} from "react"

const VagasContext = createContext()

const VagasProvider = ({children}) =>{

  const [listaVagas,setListaVagas] = useState([])
  const [listaCandidatos,setListaCandidatos] = useState([])

  return(
    <VagasContext.Provider value={{listaVagas,setListaVagas, listaCandidatos, setListaCandidatos}}>
      {children}
    </VagasContext.Provider>
  )
}

export {VagasContext,VagasProvider}