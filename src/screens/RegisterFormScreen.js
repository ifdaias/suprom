import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./screenStyles/ProjectForm.css";
import axios from "axios";
import PopupForm from "../components/PopupForm";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [userAdded, setUserAdded] = useState(false);
  const [codeLength, setCodeLength] = useState("20vw");
  const [nameLength, setNameLength] = useState("35vw");

  const [newUserState, setNewUserState] = useState({
    code: "",
    name: "",
    password: "",
    verifyPassword: "",
    email: "",
    userType: "",
    phone: "",
    career: "",
  });

  //handle popup
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (userAdded && !isOpen) {
      return navigate("/login");
    }
  }, [userAdded, isOpen]);

  useEffect(() => {
    if(newUserState.userType == "Estudiante"){
      setCodeLength("15vw")
      setNameLength("25vw")
    }
    else{
      setCodeLength("20vw")
      setNameLength("35vw")
    }

  }, [newUserState.userType]);

  function handleChange(e) {
    const value = e.target.value;
    setNewUserState({
      ...newUserState,
      [e.target.name]: value,
    });
  }

  function validateRegisterData() {
    const regexCode = /^\d{9,10}$/i;
    const regexEmail = /^[\w-\.]+@(academicos|alumnos)\.udg\.mx$/i;
    const regexPhone = /\d{9,15}/;
    const regexCareer = /^[A-Z]{3,10}$/
    let validRegister = false;


    while (!validRegister) {
      if (regexCode.test(newUserState.code)) {
        if (newUserState.name.length > 0) {
            if(newUserState.userType == "Estudiante"){
              if(regexCareer.test(newUserState.career)){

              }
              else{
                setContent("Ingrese su código de carrera en mayúsculas");
                break;
              }
            }
          if (newUserState.password.length > 0) {
            if (newUserState.password === newUserState.verifyPassword) {
              if (regexEmail.test(newUserState.email)) {
                if (regexPhone.test(newUserState.phone)) {
                  if (newUserState.userType.length > 0) {
                    validRegister = true;
                    break;
                  } else {
                    setContent("Ingrese un tipo de usuario");
                    break;
                  }
                } else {
                  setContent("Ingrese un teléfono válido");
                  break;
                }
              } else {
                setContent("Ingrese un correo valido");
                break;
              }
            } else {
              setContent("Las contraseñas no coinciden");
              break;
            }
          } else {
            setContent("Ingrese una contraseña");
            break;
          }
        } else {
          setContent("Ingrese un nombre valido");
          break;
        }
      } else {
        setContent("Ingrese un código válido");
        break;
      }
    }

    if (validRegister) {
      addUser();
    } else togglePopup();
  }

  function addUser() {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };

    const data = {
      Codigo: newUserState.code,
      Nombre: newUserState.name,
      Contrasena: newUserState.password,
      Correo: newUserState.email,
      TipoUsuario: newUserState.userType,
      Telefono: newUserState.phone,
      Carrera: newUserState.career,
    };

    axios
      .post("https://localhost:7082/u3dk8/new", data, {
        headers: headers,
      })
      .then(function (response) {
        setContent(response.data);
        //console.log(response.data);
        if (response.data.includes("agregado")) setUserAdded(true);
        togglePopup();
      })
      .catch(function (error) {
        setContent("Ha ocurrido un error");
        //console.log("SIN CONEXION: " + JSON.stringify(error));
        togglePopup();
      });
  }

  return (
    <Layout screen="register" marginTop="2.5vw">
      <div className="boxForm" style={{ width: "80%", alignSelf: "center", zIndex:5 }}>
        <div className="rowDiv" style={{ justifyContent: "space-between" }}>
          <label className="labelForm">
            Código:
            <br />
            <input
              type="number"
              name="code"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.code}
              style={{ width: `${codeLength}` }}
            />
          </label>
          <label className="labelForm">
            Nombre completo:
            <br />
            <input
              type="text"
              name="name"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.name}
              style={{ width: `${nameLength}`}}
            />
          </label>
          {newUserState.userType == "Estudiante" && <label className="labelForm">
            Carrera:
            <br />
            <input
              type="text"
              name="career"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.career}
              style={{ width: "14vw" }}
            />
          </label>}
        </div>
        <div className="rowDiv" style={{ justifyContent: "space-between" }}>
          <label className="labelForm">
            Contraseña:
            <br />
            <input
              type="password"
              name="password"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.password}
              style={{ width: "27vw" }}
            />
          </label>
          <label className="labelForm">
            Confirmar contraseña:
            <br />
            <input
              type="password"
              name="verifyPassword"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.verifyPassword}
              style={{ width: "27vw" }}
            />
          </label>
        </div>
        <div className="rowDiv" style={{ justifyContent: "space-between" }}>
          <label className="labelForm">
            Correo (institucional):
            <br />
            <input
              type="text"
              name="email"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.email}
              style={{ width: "23vw" }}
            />
          </label>
          <label className="labelForm">
            Teléfono:
            <br />
            <input
              type="number"
              name="phone"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.phone}
              style={{ width: "18vw" }}
            />
          </label>
          <label className="labelForm">
            Tipo de usuario:
            <br />
            <select
              name="userType"
              className="inputForm"
              onChange={handleChange}
              value={newUserState.userType}
              style={{ width: "12vw" }}
            >
              <option value=""> </option>
              <option value="Estudiante">Estudiante</option>
              <option value="Juez">Juez</option>
              <option value="Asesor">Asesor</option>
              <option value="Coordinador">Coordinador</option>
            </select>
          </label>
        </div>
        <div
          className="rowDiv"
          style={{ justifyContent: "flex-end", marginBottom: 0 }}
        >
          <button className="sendButton" onClick={validateRegisterData}>
            Registrarse
          </button>
          {isOpen && <PopupForm handleClose={togglePopup} content={content} />}
        </div>
      </div>
    </Layout>
  );
};

export default RegisterForm;
