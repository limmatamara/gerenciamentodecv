import React from "react";
import api from "../api";
import { Formik, Field, Form } from 'formik';
import styles from '../styles/Cadastro.module.css'

const Cadastro = () => {
  const cadastraNovoUsuario = async (cadastrarUsuario) => {
    await api.post('/user/create-cadastrador', cadastrarUsuario);
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.textContainer}>
        <p>Seja bem vindo!</p>
        <h1>Faça o seu cadastro</h1>

        <Formik
          initialValues={{
            nome: '',
            senha: '',
            email: '',
          }}
          onSubmit={(values) => {
            cadastraNovoUsuario(values);
            console.log(values)
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
              <Field id="email" name="email" placeholder="Digite seu e-mail" type="email" />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.labelContainer}>
              <label htmlFor="senha">Senha</label>
            </div>
            <div className={styles.fieldContainer}>
              <Field id="senha" name="senha" type="password" placeholder="Digite sua senha" />
            </div>
          </div>

          <button type="submit">Fazer Cadastro</button>
        </Form>
        </Formik>
      </div>
    </div>   
  )
}

export default Cadastro;