import { Component, useEffect, useState, useContext } from "react";
import "./screenStyles/ProjectDetails.css";
import Layout from "../components/Layout";
import Comment from "../components/Comment";
import ProgressBar from "../components/ProgressBar";
import PopupForm from "../components/PopupForm";
import { useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";
import { UserDataContext } from "../App";

const ProjectDetailsScreen = ({ route, navigation }) => {
  const location = useLocation();
  const [projectState, setProjectState] = useState("");
  const [members, setMembers] = useState("");
  const [leavingMeassage, setLeavingMessage] = useState(false);
  const [comment, setComment] = useState("");
  const [changingStatus, setChangingStatus] = useState(false);
  const [status, setStatus] = useState("");
  const [allComments, setAllComments] = useState("");
  const { userState } = useContext(UserDataContext);
  //handle popup
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //console.log(userState)
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };

    //project details
    axios
      .get("https://localhost:7082/k8k3dylm/" + location.state.titulo, {
        headers: headers,
      })
      .then((response) => {
        setProjectState(response.data);
        setStatus(response.data.estado)
      })
      .catch(function (error) {
        //console.log("SIN CONEXION: " + error);
      });

    //members
    axios
      .get("https://localhost:7082/k8k3dylm/members/" + location.state.titulo, {
        headers: headers,
      })
      .then((response) => {
        setMembers(response.data);
      })
      .catch(function (error) {
        //console.log("SIN CONEXION: " + error);
      });
  }, []);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };
    //comments
    axios
      .get("https://localhost:7082/c36dh6/comments/" + location.state.titulo, {
        headers: headers,
      })
      .then((response) => {
        setAllComments(response.data);
      })
      .catch(function (error) {
        //console.log("SIN CONEXION: " + error);
      });
  }, [leavingMeassage]);

  class RenderMembers extends React.Component {
    render() {
      return <CreateMembers members={members} />;
    }
  }

  const CreateMembers = ({ members }) => {
    let memberArray = [];
    var nom;

    if (members.length > 0) {
      for (let i = 0; i < members.length; i++) {
        if (members[i].rol.includes("Miembro")) {
          nom = members[i].nombre + " - " + members[i].codigoMiembro;
          memberArray.push({ nombre: nom });
        }
      }
    }

    const listMembers = memberArray.map((memb, index) => (
      <li className="pItem" key={index}>
        <span style={{color: '#4FB993'}}>
        {memb.nombre}
        </span>
      </li>
    ));

    return <div>{listMembers}</div>;
  };

  class RenderAdvisors extends React.Component {
    render() {
      return <CreateAdvisors members={members} />;
    }
  }

  const CreateAdvisors = ({ members }) => {
    let advisorArray = [];
    var nom;

    if (members.length > 0) {
      for (let i = 0; i < members.length; i++) {
        if (members[i].rol.includes("Asesor") && members[i].nombre.length >  0) {
          nom = members[i].nombre;
          advisorArray.push({ nombre: nom });
        }
      }
    }

    const listAdvisors = advisorArray.map((memb, index) => (
      <li className="pItem" key={index}>
        <span style={{color: '#4FB993'}}>
        {memb.nombre}
        </span>
      </li>
    ));

    return <div>{listAdvisors}</div>;
  };

  ////////////////////////
  class RenderComments extends React.Component {
    render() {
      return <CreateComments comments={allComments} />;
    }
  }
  const CreateComments = ({ comments }) => {
    let commentArray = [];
    var nom, fech, txt;

    if (comments.length > 0) {
      for (let i = 0; i < comments.length; i++) {
        nom = comments[i].nombreRolAutor;
        fech = comments[i].fechaCreacion;
        txt = comments[i].texto;

        commentArray.push({ name: nom, date: fech, text: txt });
      }
    }

    const listComments = commentArray.map((com, index) => (
      <Comment key={index} name={com.name} text={com.text} date={com.date} />
    ));

    return <div>{listComments}</div>;
  };
  ////////////////////////
  function addComment() {
    if (comment.length > 0) {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      };

      const data = {
        CodigoAutor: userState.code,
        TituloProyecto: location.state.titulo,
        Texto: comment,
      };

      axios
        .post("https://localhost:7082/c36dh6/new", data, {
          headers: headers,
        })
        .then(function (response) {
          setComment("");
          setLeavingMessage(false);
        })
        .catch(function (error) {
          setContent("Ha ocurrido un error");
          togglePopup();
        });
    } else {
      setContent("Ingrese un comentario válido");
      togglePopup();
    }
  }

  function handleChangeComment(e) {
    setComment(e.target.value);
  }

  function changeStatus() {
    if (status.length > 0) {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      };

      const data = {
        Titulo: location.state.titulo,
        Estado: status,
      };

      axios
        .put("https://localhost:7082/k8k3dylm/status", data, {
          headers: headers,
        })
        .then(function (response) {
          if(response.data.includes("SUCCESS")){
          projectState.estado = status
          setChangingStatus(false);
          }
          else{
            setContent("Ha ocurrido un error");
            togglePopup();
          }
        })
        .catch(function (error) {
          setContent("Ha ocurrido un error");
          togglePopup();
        });
    } else {
      setContent("Ingrese un estado válido");
      togglePopup();
    }
  }

  function handleChangeStatus(e) {
    setStatus(e.target.value);
  }

  function isMember() {
    if (members.length > 0) {
      for (let i = 0; i < members.length; i++) {
        if (members[i].codigoMiembro != undefined && userState.code.length > 0) {
          if (members[i].codigoMiembro.includes(userState.code)) {
            return true;
          }
        }
      }
    }
  }

  return (
    <Layout screen="details">
      <h1 className="projectTitle">{location.state.titulo}</h1>
      <p className="projectDescription">{projectState.descripcion}</p>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <p className="pDetails">Estado del proyecto:&nbsp;</p>
        <p className="pDetails" style={{ color: "#4FB993" }}>
          {projectState.estado}{" "}
        </p>
      </div>
      <ProgressBar completed={projectState.estado}></ProgressBar>

      {userState.permissions == true && (
        <div>
          {changingStatus == false && (
            <button
              className="commentButton"
              onClick={() => {
                setChangingStatus(true);
              }}
            >
              Cambiar estado
            </button>
          )}
          {changingStatus == true && (
            <div>
                <select
                  className="selectStatus"
                  onChange={handleChangeStatus}
                  value={status}
                >
                  <option value=""> </option>
                  <option value="Desarrollo">Desarrollo</option> 
                  <option value="Aprobado">Aprobado</option> 
                  <option value="Terminado">Terminado</option> 
                  <option value="Por presentar">Por presentar</option> 
                  <option value="Finalizado">Finalizado</option> 
                  <option value="Rechazado">Rechazado</option> 
                </select>
              <div>
                <button className="commentButton" onClick={changeStatus}>
                  Cambiar
                </button>
                <button
                  className="cancelCommentButton"
                  onClick={() => {
                    setChangingStatus(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="membersContainer">
        <div>
          <p className="pDetails">Integrantes</p>
          <ul style={{marginTop: '-2vh'}}>
            <RenderMembers />
          </ul>
        </div>
        <div>
          <p className="pDetails">Asesores</p>
          <ul style={{marginTop: '-2vh'}}>
            <RenderAdvisors />
          </ul>
        </div>
      </div>
      {(userState.permissions == true || isMember()) && (
        <div>
          <h1 className="projectTitle" style={{ fontSize: "2.3vw" }}>
            Comentarios
          </h1>

          {leavingMeassage == false && userState.permissions && (
            <button
              className="commentButton"
              onClick={() => {
                setLeavingMessage(true);
              }}
            >
              Agregar comentario
            </button>
          )}

          {leavingMeassage == true && (
            <div>
              <div>
                <textarea
                  className="commentArea"
                  type="text"
                  name="commentTextArea"
                  onChange={handleChangeComment}
                  value={comment}
                />
              </div>
              <div>
                <button className="commentButton" onClick={addComment}>
                  Enviar
                </button>
                <button
                  className="cancelCommentButton"
                  onClick={() => {
                    setLeavingMessage(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <RenderComments />
        </div>
      )}
      <p></p>
      <p></p>
      {isOpen && <PopupForm handleClose={togglePopup} content={content} />}
    </Layout>
  );
};

export default ProjectDetailsScreen;
