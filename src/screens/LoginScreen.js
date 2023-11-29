import "./screenStyles/Login.css";
import Phrase from "../components/Phrase";
import { useContext, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../App";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import PopupForm from "../components/PopupForm";

const Login = () => {
  const { userState, changeUserState, switchIsLoggedIn } =
    useContext(UserDataContext);

  const navigate = useNavigate();

  //handle popup
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function containsSpecialChars(str) {
    const specialChars = /[`!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
    return specialChars.test(str);
  }

  function handleChangeUsername(e) {
    const value = e.target.value;
    changeUserState("code", value);
  }

  function handleChangePassword(e) {
    const value = e.target.value;
    changeUserState("password", value);
  }

  function verifyCredentials() {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };

    const data = {
      Codigo: userState.code,
      Contrasena: userState.password,
    };

    var _this = this
    axios
      .put("https://localhost:7082/u3dk8/check", data, {
        headers: headers,
      })
      .then(function (response) {
        //console.log("RESPUESTA LLOGIN");
        //console.log(response.data);
        if (response.data.Nombre != undefined){
          localStorage.setItem("Name", response.data.Nombre);
          localStorage.setItem("Code", data.Codigo);
          localStorage.setItem("UserType", response.data.TipoUsuario);
          localStorage.setItem("LoginTime", new Date())
          switchIsLoggedIn()
          
        }
        else{
          setContent(response.data);
          togglePopup()
        }
      })
      .catch(function (error) {
        //console.log(JSON.stringify(error));
        setContent("Ha ocurrido un error")
        togglePopup()
      });
  }

  async function loginOnPress() {
    const regexCode = /\d{9,}/i;
    let validCredentials = false;

    while (!validCredentials) {
      if (regexCode.test(userState.code)) {
        if (userState.password.length > 0) {
          validCredentials = true;
        } else {
          //console.warn("Ingrese una contraseña");
          setContent("Ingrese una contraseña");
          break;
        }
      } else {
        //console.warn("Ingrese un código válido");
        setContent("Ingrese un código válido");
        break;
      }
    }

    if (validCredentials) verifyCredentials();
    else togglePopup();
  }

  function _handleKeyDown (e) {
    if (e.key === 'Enter') {
      loginOnPress()
    }
  }

  return (
    <Layout screen="login">
      <div className="box">
        <h1 className="suprom">SUPROM</h1>
        <div className="field">
          <input
            type="number"
            id="codigo"
            name="codigo"
            placeholder="Código..."
            onChange={handleChangeUsername}
            value={userState.code || ''}
            onKeyDown={_handleKeyDown}
          />
        </div>
        <div className="field">
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            placeholder="Contraseña..."
            onChange={handleChangePassword}
            value={userState.password || ''}
            onKeyDown={_handleKeyDown}
          />
        </div>
        <button onClick={loginOnPress} className="loginButton">
          Ingresar
        </button>
        <Link to={"/register"} className="register">
          <p>Registrarse</p>
        </Link>
      </div>
      <Phrase text={"Ingresa tu código y contraseña"} paddingRight="0" />
      {isOpen && <PopupForm handleClose={togglePopup} content={content} />}
    </Layout>
  );
};

export default Login;
