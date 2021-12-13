import Popup from "reactjs-popup";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useContext } from "react";
import { VagasContext } from "../context/VagasContext";
import api from "../api";
import { useState, useEffect } from "react";
import "./Popup.css";
import loadingGif from "../images/loading.gif"

const PopupModal = ({ cardInfo }) => {
  const {listaVagas,getListVagas,loadingAddCandidate, setLoadingAddCandidate} = useContext(VagasContext)

  const [naoCadastrados,setNaoCadastrados] = useState([])
  const [loadingCandidate,setLoadingCandidate] = useState(true)

  const getNaoCadastrados = async () =>{
    const {data} = await api.get('/candidato')
    let candidatosNaoInscritos = data.filter((candidato) => {
      if(!cardInfo.candidatos.some((candidatoInscrito) => candidatoInscrito.idCandidato == candidato.idCandidato)){
        return candidato
      }
    })
    setLoadingCandidate(false)
    setNaoCadastrados(candidatosNaoInscritos)
  }
  return (
    <>
      <Popup onOpen={()=>{
        getNaoCadastrados()
      }} trigger={<AiFillPlusCircle/>} modal nested>
        {(close) => (
          <div className="mainDiv">
            <h4 className="titulo-popup">{cardInfo.vaga.Titulo}</h4>
            {loadingCandidate 
            ?
            <img className={"loadingGif"} src={loadingGif}/>
            :             
            <ul>
              {naoCadastrados.map((candidato) => (
                <li className="usuarioLi" key={candidato.idCandidato}>
                  <div className="candidatoInfo">
                    <div className="sideInfo"><BiUser/><p>{candidato.nome}</p></div>
                    <div className="sideInfo"><IoDocumentTextOutline/><p>{candidato.cpf}</p></div>
                  </div>
                  <div className="adicionarCandidatoDiv">
                    <AiFillPlusCircle onClick={async ()=>{
                      setLoadingAddCandidate({state:true,cardId:cardInfo.vaga.id})
                      close()
                      await api.post(`https://gerenciamento-cv.herokuapp.com/vaga/vincular-candidato?idCandidato=${candidato.idCandidato}&idVaga=${cardInfo.vaga.id}`)
                      getListVagas()
                      setLoadingAddCandidate({state:false,cardId:null})
                    }} className={"adicionarCandidato"}/>
                  </div>
                </li>
              ))}
            </ul>}
          </div>
        )}
      </Popup>
    </>
  );
};

export default PopupModal;