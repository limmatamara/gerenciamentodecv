import { Formik, Field, Form, FieldArray } from "formik";
import styles from "./CadastroCandidato.module.css";
import api from "../api";
import { useState } from "react";
import * as Yup from 'yup'
import { ErrorMessage } from "formik";
import ReactInputMask from "react-input-mask";
import moment from "moment";

const CadastroCandidato = () => {
  
  const [disabledFieldsSchool,setDisabledFieldsSchool] = useState([])
  const [disabledFieldsExp,setDisabledFieldsExp] = useState([])
  const [fileInputValue,setFileInputValue] = useState("")

  const changeFile = (e,setFieldValue) =>{
    setFieldValue("curriculo", e.target.files[0]);
    console.log(e.target)
    setFileInputValue(e.name)
  }

  const removeCPFMask = (value) =>{
    return value.replaceAll("-","").replaceAll(".","").replaceAll("_","")
  }

  const formatDateRaw = (value) =>{
    return value.replaceAll('_','').replaceAll('/','')
  }

  const formatDateToApi = (value) =>{
    return moment(value, 'DD/MM/YYYY', true).format('YYYY-MM-DD')
  }

  const validateDate = (value) => {
    let today = moment()
    let formatedDate = moment(value, 'DDMMYYYY', true).format('YYYY-MM-DD')
    return (moment(formatedDate).isValid() && today.diff(moment(value, 'DDMMYYYY'), 'days') > 0)
  }

  const postCandidato = async (values) => {
    const candidatoCreateDTO = {
      cargo: values.cargo,
      complemento: values.complemento,
      cpf: removeCPFMask(values.cpf),
      dataNascimento: formatDateToApi(values.dataNascimento),
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

  const SignupSchema = Yup.object().shape({
    nome: Yup.string().required('Campo Obrigatório'),
    cargo: Yup.string().required('Campo Obrigatório'),
    complemento: Yup.string().required('Campo Obrigatório'),
    cpf: Yup.string().transform(value => {
      return removeCPFMask(value)
    }).required('Campo Obrigatório').length(11,'CPF deve conter 11 números'),
    dataNascimento: Yup.string().transform(value => {
      return formatDateRaw(value)
    }).required('Campo Obrigatório').length(8,'Digite a data completa').test("data-valida","Digite uma data válida",validateDate),
    rua: Yup.string().required('Campo Obrigatório'),
    nome: Yup.string().required('Campo Obrigatório'),
    numero: Yup.string().required('Campo Obrigatório'),
    senioridade: Yup.string().required('Campo Obrigatório'),
    telefone: Yup.string().required('Campo Obrigatório'),
    experiencias: Yup.array()
    .of(Yup.object().shape({
      nomeEmpresa: Yup.string().required('Campo Obrigatório'),
      dataInicio: Yup.string().required('Campo Obrigatório'),
      descricao: Yup.string().required('Campo Obrigatório'),
    })),
    dadosEscolares: Yup.array()
    .of(Yup.object().shape({
      instituicao: Yup.string().required('Campo Obrigatório'),
      dataInicio: Yup.string().required('Campo Obrigatório'),
      descricao: Yup.string().required('Campo Obrigatório'),
    }))
  });

  return (
    <div className={styles.cadastroContainer}>
      <Formik
        validationSchema={SignupSchema}
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
          setDisabledFieldsSchool([])
          setDisabledFieldsExp([])
          resetForm();
          setFileInputValue("")
        }}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form>
            <div className={styles.formDiv}>
              <h1 className={styles.cadastroTitulo}>Cadastro de Candidatos</h1>
              <div className={styles.fieldDiv}>
                <label htmlFor="nome">Nome</label>
                <Field id="nome" name="nome" placeholder="Digite seu nome" />
                {errors.nome && touched.nome && <p className={styles.errors}>{errors.nome}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="cpf">CPF</label>
                <Field id="cpf" name="cpf" render={({field})=>(
                  <ReactInputMask {...field} placeholder="Digite seu CPF" mask={'999.999.999-99'} />
                )} />
                {errors.cpf && touched.cpf && <p className={styles.errors}>{errors.cpf}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <Field
                  id="dataNascimento"
                  name="dataNascimento"
                  render={({field})=>(
                    <ReactInputMask {...field} placeholder="Digite sua data de nascimento" mask={'99/99/9999'} />
                  )}
                />
                {errors.dataNascimento && touched.dataNascimento && <p className={styles.errors}>{errors.dataNascimento}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="telefone">Telefone</label>
                <Field
                  id="telefone"
                  name="telefone"
                  placeholder="Digite seu telefone"
                />
                {errors.telefone && touched.telefone && <p className={styles.errors}>{errors.telefone}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="rua">Rua</label>
                <Field id="rua" name="rua" placeholder="Digite sua rua" />
                {errors.rua && touched.rua && <p className={styles.errors}>{errors.rua}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="complemento">Complemento</label>
                <Field
                  id="complemento"
                  name="complemento"
                  placeholder="Digite o complemento"
                />
                {errors.complemento && touched.complemento && <p className={styles.errors}>{errors.complemento}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="numero">Número</label>
                <Field
                  id="numero"
                  name="numero"
                  placeholder="Digite o numero"
                />
                {errors.numero && touched.numero && <p className={styles.errors}>{errors.numero}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="cargo">Cargo</label>
                <Field id="cargo" name="cargo" placeholder="Digite seu cargo" />
                {errors.cargo && touched.cargo && <p className={styles.errors}>{errors.cargo}</p>}
              </div>

              <div className={styles.fieldDiv}>
                <label htmlFor="senioridade">Senioridade</label>
                <Field
                  id="senioridade"
                  name="senioridade"
                  placeholder="Digite sua senioridade"
                />
                {errors.senioridade && touched.senioridade && <p className={styles.errors}>{errors.senioridade}</p>}
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
                            <ErrorMessage name={`dadosEscolares[${index}].instituicao`} render={msg => <p className={styles.errors}>{msg}</p>} />         
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
                            <ErrorMessage name={`dadosEscolares[${index}].descricao`} render={msg => <p className={styles.errors}>{msg}</p>} />                                 
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
                            <ErrorMessage name={`dadosEscolares[${index}].dataInicio`} render={msg => <p className={styles.errors}>{msg}</p>} />                                 
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
                            <ErrorMessage name={`experiencias[${index}].nomeEmpresa`} render={msg => <p className={styles.errors}>{msg}</p>} />
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
                            <ErrorMessage name={`experiencias[${index}].descricao`} render={msg => <p className={styles.errors}>{msg}</p>} />
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
                            <ErrorMessage name={`experiencias[${index}].dataInicio`} render={msg => <p className={styles.errors}>{msg}</p>} />
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
                  value={fileInputValue}
                  onChange={(e) => {
                    changeFile(e,setFieldValue)
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
