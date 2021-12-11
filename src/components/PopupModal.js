import Popup from "reactjs-popup";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useContext } from "react";
import { VagasContext } from "../context/VagasContext";

import "./Popup.css";

const PopupModal = ({ naoCadastrados, titulo, cardInfo }) => {
  const {listaVagas, setListaVagas} = useContext(VagasContext)
  return (
    <>
      <Popup trigger={<AiFillPlusCircle />} modal nested>
        {() => (
          <div className="mainDiv">
            <h4 className="titulo-popup">{titulo}</h4>
            <ul>
              {naoCadastrados.map((candidato) => (
                <li className="usuarioLi" key={candidato.id}>
                  <div className="candidatoInfo">
                    <div className="sideInfo"><BiUser/><p>{candidato.Nome}</p></div>
                    <div className="sideInfo"><IoDocumentTextOutline/><p>{candidato.CPF}</p></div>
                  </div>
                  <div className="adicionarCandidatoDiv">
                    <AiFillPlusCircle onClick={()=>{
                      let novaListaDeCandidatos = [...cardInfo.ListaDeCandidatos,candidato]
                      let novaListaVagas = listaVagas.filter((vaga)=> vaga.id != cardInfo.id)
                      cardInfo.ListaDeCandidatos = novaListaDeCandidatos
                      novaListaVagas.push(cardInfo)
                      novaListaVagas.sort((a,b) => a.id > b.id ? 1 : -1)
                      setListaVagas(novaListaVagas)
                    }} className={"adicionarCandidato"}/>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Popup>
    </>
  );
};

export default PopupModal;
