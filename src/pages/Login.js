import { Formik, Field, Form } from "formik";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import * as Yup from 'yup'

const Login = () => {
  const SignupSchema = Yup.object().shape({
    usuario: Yup.string().email("Email inválido").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
  });

  const { handleLogin } = useContext(AuthContext);
  return (
    <div className={styles.loginBody}>
      <div className={styles.loginContainer}>
        <div className={styles.textContainer}>
          <img className={styles.logo} src={logo} />
          <p>Seja Bem Vindo</p>
          <h1>Faça o login na sua conta</h1>

          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              usuario: "",
              senha: "",
            }}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ touched, errors }) => (
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
                  {touched.usuario && (
                    <p className={styles.errors}>{errors.usuario}</p>
                  )}
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
                  {touched.senha && (
                    <p className={styles.errors}>{errors.senha}</p>
                  )}
                </div>

                <button type="submit">Fazer Login</button>
              </Form>
            )}
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
