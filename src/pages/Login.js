import { Formik, Field, Form } from "formik";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  return (
    <div className={styles.loginBody}>
      <div className={styles.loginContainer}>
        <div className={styles.textContainer}>
          <p>Seja Bem Vindo</p>
          <h1>Faça o login na sua conta</h1>

          <Formik
            initialValues={{
              usuario: "",
              senha: "",
            }}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            <Form>
              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="usuario">E-mail</label>
                </div>
                <div className={styles.fieldContainer}>
                  <Field
                    id="usuario"
                    name="usuario"
                    placeholder="Digite seu E-mail"
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

              <button type="submit">Fazer Login</button>
            </Form>
          </Formik>
          <div className={styles.cadastroContainer}>
            <p>
              Não possui uma conta ainda?{" "}
              <Link to="/cadastro">Cadastre-se agora!</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
