import { Formik, Field, Form, FieldArray } from "formik";
import styles from "./CadastroCandidato.module.css";
import api from "../api";
import { useState } from "react";

const CadastroCandidato = () => {
  
  const [disabledFieldsSchool,setDisabledFieldsSchool] = useState([])
  const [disabledFieldsExp,setDisabledFieldsExp] = useState([])

  const postCandidato = async (values) => {
    const candidatoCreateDTO = {
      cargo: values.cargo,
      complemento: values.complemento,
      cpf: values.cpf,
      dataNascimento: values.dataNascimento,
      logradouro: values.rua,
      nome: values.nome,
      numero: Number(values.numero),
      senioridade: values.senioridade,
      telefone: values.telefone,
    };
    const { data } = await api.post("/candidato", candidatoCreateDTO);
    return data.idCandidato;
  };

  const postCurriculo = async (values, idCandidato) => {
    const formData = new FormData();
    formData.append("file", values.curriculo);
    await api.post(`/curriculo/upload-curriculo/${idCandidato}`, formData);
  };

  const postExperiencia = async (values, idCandidato) => {
    values.experiencias.map(async (experiencia) => {
      let experienciaDTO = {
        dataFim: experiencia.dataFim == "" ? null : new Date(experiencia.dataFim),
        dataInicio: new Date(experiencia.dataInicio),
        descricao: experiencia.descricao,
        nomeEmpresa: experiencia.nomeEmpresa,
      };
      await api.post(
        `/experiencias?idCandidato=${idCandidato}`,
        experienciaDTO
      );
    });
  };

  const postDadosEscolares = async (values, idCandidato) => {
    values.dadosEscolares.map(async (dados) => {
      let dadosEscolaresDTO = {
        dataFim: dados.dataFim == "" ? null : new Date(dados.dataFim),
        dataInicio: new Date(dados.dataInicio),
        descricao: dados.descricao,
        instituicao: dados.instituicao,
      };
      await api.post(
        `/dados-escolares?idCandidato=${idCandidato}`,
        dadosEscolaresDTO
      );
    });
  };

  return (
    <div className={styles.cadastroContainer}>
      <Formik
        initialValues={{
          nome: "",
          cpf: "",
          dataNascimento: "",
          rua: "",
          cargo: "",
          senioridade: "",
          dadosEscolares: [],
          experiencias: [],
          curriculo: "",
          complemento: "",
          numero: "",
          telefone: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          let idCandidato = await postCandidato(values);
          await postCurriculo(values, idCandidato);
          await postExperiencia(values, idCandidato);
          await postDadosEscolares(values, idCandidato);
          alert("Candidato cadastrado com sucesso");
          resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={styles.formDiv}>
              <h1 className={styles.cadastroTitulo}>Cadastro de Candidatos</h1>
              <div className={styles.fieldDiv}>
                <label htmlFor="nome">Nome</label>
                <Field id="nome" name="nome" placeholder="Digite seu nome" />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="cpf">CPF</label>
                <Field id="cpf" name="cpf" placeholder="Digite seu CPF" />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <Field
                  id="dataNascimento"
                  name="dataNascimento"
                  placeholder="Digite sua data de nascimento"
                />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="telefone">Telefone</label>
                <Field
                  id="telefone"
                  name="telefone"
                  placeholder="Digite seu telefone"
                />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="rua">Rua</label>
                <Field id="rua" name="rua" placeholder="Digite sua rua" />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="complemento">Complemento</label>
                <Field
                  id="complemento"
                  name="complemento"
                  placeholder="Digite o complemento"
                />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="numero">Número</label>
                <Field
                  id="numero"
                  name="numero"
                  placeholder="Digite o numero"
                />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="cargo">Cargo</label>
                <Field id="cargo" name="cargo" placeholder="Digite seu cargo" />
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="senioridade">Senioridade</label>
                <Field
                  id="senioridade"
                  name="senioridade"
                  placeholder="Digite sua senioridade"
                />
              </div>
              <div className={styles.fieldDiv}>
                <label htmlFor="dadosEscolares">Dados Escolares</label>
                <FieldArray
                  name="dadosEscolares"
                  render={(arrayHelpers) => (
                    <div>
                      {values.dadosEscolares.map((dadosEscolares, index) => (
                        <div className={styles.arrayDiv} key={index}>
                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`dadosEscolares[${index}].instituicao`}
                            >
                              Instituição
                            </label>
                            <Field
                              placeholder="Instituição"
                              name={`dadosEscolares[${index}].instituicao`}
                            />
                          </div>

                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`dadosEscolares.${index}.descricao`}
                            >
                              Descrição
                            </label>
                            <Field
                              placeholder="Descrição"
                              name={`dadosEscolares.${index}.descricao`}
                            />
                          </div>
                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`dadosEscolares.${index}.dataInicio`}
                            >
                              Data Início
                            </label>
                            <Field
                              placeholder="Data início"
                              name={`dadosEscolares.${index}.dataInicio`}
                            />
                          </div>
                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`dadosEscolares.${index}.dataFim`}
                            >
                              Data Fim
                            </label>
                            <Field
                              placeholder="Data Fim"
                              name={`dadosEscolares.${index}.dataFim`}
                              id={`dadosEscolares.${index}.dataFim`}
                              disabled={disabledFieldsSchool.some(value => value == index)}
                            />
                            <label
                              className={styles.subLabels}
                              htmlFor={`dadosEscolares.${index}.atualmente`}
                            >
                              Atualmente?
                            </label>
                            <Field
                              value="atualmente"
                              type="checkbox"
                              name={`dadosEscolares.${index}.atualmente`}
                              onClick={()=>{
                                setFieldValue(`dadosEscolares.${index}.dataFim`,"")
                                if(disabledFieldsSchool.some(value => value == index)){
                                  const position = disabledFieldsSchool.indexOf(index)
                                  disabledFieldsSchool.splice(position,1)
                                } else{
                                  setDisabledFieldsSchool([...disabledFieldsSchool,index])
                                }                               
                              }}
                            />
                          </div>

                          <button
                            className={styles.arrayButtons}
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                        </div>
                      ))}
                      <button
                        className={styles.arrayButtonsAdd}
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            instituicao: "",
                            descricao: "",
                            dataInicio: "",
                            dataFim: "",
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                />
              </div>
              <div className={styles.fieldDiv}>
                <label htmlFor="dadosEscolares">Experiências</label>
                <FieldArray
                  name="experiencias"
                  render={(arrayHelpers) => (
                    <div>
                      {values.experiencias.map((experiencias, index) => (
                        <div className={styles.arrayDiv} key={index}>
                          {/** both these conventions do the same */}
                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`experiencias[${index}].nomeEmpresa`}
                            >
                              Nome da Empresa
                            </label>
                            <Field
                              placeholder="Nome da Empresa"
                              name={`experiencias[${index}].nomeEmpresa`}
                            />
                          </div>

                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`experiencias.${index}.descricao`}
                            >
                              Descrição
                            </label>
                            <Field
                              placeholder="Descrição"
                              name={`experiencias.${index}.descricao`}
                            />
                          </div>
                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`experiencias.${index}.dataInicio`}
                            >
                              Data Início
                            </label>
                            <Field
                              placeholder="Data início"
                              name={`experiencias.${index}.dataInicio`}
                            />
                          </div>
                          <div className={styles.fieldDiv}>
                            <label
                              className={styles.subLabels}
                              htmlFor={`experiencias.${index}.dataFim`}
                            >
                              Data Fim
                            </label>
                            <Field
                              placeholder="Data Fim"
                              name={`experiencias.${index}.dataFim`}
                              disabled={disabledFieldsExp.some(value => value == index)}
                            />
                            <label
                              className={styles.subLabels}
                              htmlFor={`experiencias.${index}.atualmente`}
                            >
                              Atualmente?
                            </label>
                            <Field
                              value="atualmente"
                              type="checkbox"
                              name={`experiencias.${index}.atualmente`}
                              onClick={()=>{
                                setFieldValue(`experiencias.${index}.dataFim`,"")
                                if(disabledFieldsExp.some(value => value == index)){
                                  const position = disabledFieldsExp.indexOf(index)
                                  disabledFieldsExp.splice(position,1)
                                } else{
                                  setDisabledFieldsExp([...disabledFieldsExp,index])
                                }                               
                              }}
                            />
                          </div>

                          <button
                            className={styles.arrayButtons}
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                        </div>
                      ))}
                      <button
                        className={styles.arrayButtonsAdd}
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            nomeEmpresa: "",
                            descricao: "",
                            dataInicio: "",
                            dataFim: "",
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                />
              </div>
              <div className={styles.fieldDiv}>
                <input
                  type="file"
                  id="curriculo"
                  name="curriculo"
                  placeholder="Upload do seu currículo"
                  onChange={(e) => {
                    setFieldValue("curriculo", e.target.files[0]);
                  }}
                />
              </div>
              <button className={styles.submitButton} type="submit">
                Fazer Cadastro
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastroCandidato;
