import React from "react";
import api from "../api";
import { Formik, Field, Form } from "formik";
import styles from "../styles/Cadastro.module.css";
import { Link } from "react-router-dom";

const Cadastro = () => {
  const cadastraNovoUsuario = async (cadastrarUsuario) => {
    try {
      const { data } = await api.post(
        "/user/create-cadastrador",
        cadastrarUsuario
      );
      alert(`O cadastro para ${data.nome} foi criado com sucesso`);
      window.location.href = '/'
    } catch (error) {
      alert("Ocorreu um erro ao buscar os items");
    }
  };

  return (
    <div className={styles.cadastroBody}>
      <div className={styles.cadastroContainer}>
        <div className={styles.textContainer}>
          <p>Seja bem vindo!</p>
          <h1>Faça o seu cadastro</h1>

          <Formik
            initialValues={{
              nome: "",
              senha: "",
              email: "",
            }}
            onSubmit={(values) => {
              cadastraNovoUsuario(values);
            }}
          >
            <Form>
              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="nome">Nome</label>
                </div>
                <div className={styles.fieldContainer}>
                  <Field id="nome" name="nome" placeholder="Digite seu nome" />
                </div>
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

              <button type="submit"> Fazer Cadastro</button>
            </Form>
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
