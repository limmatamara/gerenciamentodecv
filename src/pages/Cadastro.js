import React from "react";
import api from "../api";
import { Formik, Field, Form } from "formik";
import styles from "../styles/Cadastro.module.css";
import { Link } from "react-router-dom";
import * as Yup from 'yup'

const Cadastro = () => {
  
  const SignupSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    senha: Yup.string().required('Campo obrigatório').min(8,'Senha curta demais').max(32,'Senha longa demais').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "A senha deve conter uma letra maiúscula, uma minúscula, um número e um caracter especial"
    ).test('espaco-branco','A senha não pode conter espaços em branco',function(v){
      if(v != undefined){
        return !v.split("").some(letra => letra == ' ')
      }
    })
  });


  const cadastraNovoUsuario = async (cadastrarUsuario) => {
    try {
      const { data } = await api.post(
        "/user/create-cadastrador",
        cadastrarUsuario
      );
      alert(`O cadastro para ${data.nome} foi criado com sucesso`);
      window.location.href = '/'
    } catch (error) {
      alert("Ocorreu um erro ao registrar sua conta");
    }
  };

  return (
    <div className={styles.cadastroBody}>
      <div className={styles.cadastroContainer}>
        <div className={styles.textContainer}>
          <p>Seja bem vindo!</p>
          <h1>Faça o seu cadastro</h1>

          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              nome: "",
              senha: "",
              email: "",
            }}
            onSubmit={(values) => {
              cadastraNovoUsuario(values);
            }}
          >
            {({errors,touched})=>(
              <Form>
              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="nome">Nome</label>
                </div>
                <div className={styles.fieldContainer}>
                  <Field id="nome" name="nome" placeholder="Digite seu nome" />
                </div>
                {touched.nome && <p className={styles.errors}>{errors.nome}</p>}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="email">Email</label>
                </div>
                <div className={styles.fieldContainer}>
                  <Field
                    id="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    type="email"
                  />
                </div>
                {touched.email && <p className={styles.errors}>{errors.email}</p>}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="senha">Senha</label>
                </div>
                <div className={styles.fieldContainer}>
                  <Field
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>
              {touched.senha && <p className={styles.errors}>{errors.senha}</p>}
              <button type="submit"> Fazer Cadastro</button>
            </Form>
            )}
          </Formik>
          <div className={styles.loginContainer}>
            <p>
              Já possui uma conta? <Link to="/">Faça o login!</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
