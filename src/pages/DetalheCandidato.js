import { useContext, useEffect } from "react";
import SchoolDataDetail from "../components/SchoolDataDetail";
import CandidatoDataDetail from "../components/CandidatoDataDetail";
import { CandidatosContext } from "../context/CandidatosContext";
import moment from "moment";
import { BiUser } from "react-icons/bi";
import { GrTarget} from "react-icons/gr"

const DetalheCandidato = () => {
  const {idCandidato, dadosCompletosCandidato, getDadosCompletosCandidato} = useContext(CandidatosContext);

  useEffect(() => { 
    getDadosCompletosCandidato(idCandidato);  
  }, [] );

  return (
    <div>  
      <CandidatoDataDetail/>
      <SchoolDataDetail/>
    </div>
  )
}

export default DetalheCandidato;