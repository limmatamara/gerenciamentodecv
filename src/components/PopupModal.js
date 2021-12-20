import Popup from "reactjs-popup";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useContext } from "react";
import { VagasContext } from "../context/VagasContext";
import api from "../api";
import { useState, useEffect } from "react";
import "../styles/Popup.css";
import loadingGif from "../images/loading.gif";
import ReactTooltip from "react-tooltip";

const PopupModal = ({ cardInfo }) => {
  const {
    listaVagas,
    getListVagas,
    loadingAddCandidate,
    setLoadingAddCandidate,
    getPagesAlreadyLoaded,
  } = useContext(VagasContext);

  const [naoCadastrados, setNaoCadastrados] = useState([]);
  const [loadingCandidate, setLoadingCandidate] = useState(true);

  const maxLengthVerify = (max, value) => {
    return value.length > max ? `${value.substring(0, max)}...` : value;
  };

  const getNaoCadastrados = async () => {
    setLoadingCandidate(true);
    const { data } = await api.get("/candidato");
    let candidatosNaoInscritos = data.filter((candidato) => {
      if (
        !cardInfo.candidatos.some(
          (candidatoInscrito) =>
            candidatoInscrito.idCandidato == candidato.idCandidato
        )
      ) {
        return candidato;
      }
    });
    setLoadingCandidate(false);
    setNaoCadastrados(candidatosNaoInscritos);
  };
  return (
    <>
      {cardInfo.vaga.Status != "Aberta" ? (
        <>
          <AiFillPlusCircle
            data-tip
            data-for="disabledTip"
            className={"disabledPopup"}
          />
          <ReactTooltip id="disabledTip" place="top" effect="solid">
            A vaga não está mais aberta
          </ReactTooltip>
        </>
      ) : (
        <Popup
          onOpen={() => {
            getNaoCadastrados();
          }}
          trigger={<AiFillPlusCircle className={"abledPopup"} />}
          modal
          nested
        >
          {(close) => (
            <div className="mainDiv">
              <h4 className="titulo-popup">{cardInfo.vaga.Titulo}</h4>
              {loadingCandidate ? (
                <img className={"loadingGif"} src={loadingGif} />
              ) : naoCadastrados.length != 0 ? (
                <ul>
                  {naoCadastrados.map((candidato) => (
                    <li className="usuarioLi" key={candidato.idCandidato}>
                      <div className="candidatoInfo">
                        <div className="sideInfo">
                          <BiUser />
                          <p>{maxLengthVerify(40, candidato.nome)}</p>
                        </div>
                        <div className="sideInfo">
                          <IoDocumentTextOutline />
                          <p>{candidato.cpf}</p>
                        </div>
                      </div>
                      <div className="adicionarCandidatoDiv">
                        <AiFillPlusCircle
                          onClick={async () => {
                            setLoadingAddCandidate({
                              state: true,
                              cardId: cardInfo.vaga.id,
                            });
                            close();
                            await api.post(
                              `https://gerenciamento-cv.herokuapp.com/vaga/vincular-candidato?idCandidato=${candidato.idCandidato}&idVaga=${cardInfo.vaga.id}`
                            );
                            getPagesAlreadyLoaded();
                            setLoadingAddCandidate({
                              state: false,
                              cardId: null,
                            });
                          }}
                          className={"adicionarCandidato"}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <h4 className="todosRegistrados">Todos os candidatos foram registrados!</h4>
              )}
            </div>
          )}
        </Popup>
      )}
    </>
  );
};

export default PopupModal;
