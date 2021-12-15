import { Formik, Field, Form, FieldArray } from "formik";
import styles from "./CadastroCandidato.module.css";
import api from "../api"

const CadastroCandidato = () => {

  const postCandidato = async (values) =>{
    const candidatoCreateDTO = {
      cargo: values.cargo,
      complemento: values.complemento,
      cpf: values.cpf,
      dataNascimento: values.dataNascimento,
      logradouro: values.rua,
      nome: values.nome,
      numero: values.numero,
      senioridade: values.senioridade,
      telefone: values.telefone
    }
    const {data} = await api.post('/candidato',candidatoCreateDTO)
    return data.idCandidato
  }

  const postCurriculo = async (values,idCandidato) =>{
    const curriculoDTO = values.curriculo
    const formData = new FormData()
    formData.append('file', values.curriculo)
    await api.post(`/curriculo/upload-curriculo/${idCandidato}`,formData)
  }


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
          experiencias: "",
          dadosEscolares: [],
          experiencias: [],
          curriculo: "",
          complemento:"",
          numero:"",
          telefone: ""
        }}
        onSubmit={async (values) => {         
            let idCandidato = await postCandidato(values)
            await postCurriculo(values,idCandidato)
            console.log('Objeto Inteiro: ',values)
          }
        }
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
                <Field
                  id="rua"
                  name="rua"
                  placeholder="Digite sua rua"
                />
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
                    setFieldValue("curriculo",e.target.files[0])
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
