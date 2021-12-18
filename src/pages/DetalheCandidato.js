import { useContext, useEffect } from "react";
import SchoolDataDetail from "../components/SchoolDataDetail";
import CandidatoDataDetail from "../components/CandidatoDataDetail";
import ExperienceCandidateDetail from "../components/ExperienceCandidateDetail";
import { CandidatosContext } from "../context/CandidatosContext";

const DetalheCandidato = () => {
  const {idCandidato, dadosCompletosCandidato, getDadosCompletosCandidato} = useContext(CandidatosContext);

  useEffect(() => { 
    getDadosCompletosCandidato(idCandidato);  
  }, [] );

  return ( 
    <div>
      <CandidatoDataDetail/>
      <SchoolDataDetail/>
      <ExperienceCandidateDetail/>
    </div>
  )
}

export default DetalheCandidato;