import { useState } from "react";
import "./componentStyles/FormSteps.css";

const FirstStep = ({ handleChange, formState }) => {
  return (
    <div>
      <div className="rowDiv">
        <label className="labelForm">
          Título del proyecto:
          <br />
          <input
            type="text"
            name="projectTitle"
            className="inputForm"
            onChange={handleChange}
            value={formState.projectTitle}
            style={{ width: "30vw" }}
          />
        </label>
      </div>
      <div className="rowDiv">
        <label className="labelTextArea">
          Descripción del proyecto:
          <br />
          <textarea
            type="text"
            name="projectDescription"
            className="descriptionArea"
            onChange={handleChange}
            value={formState.projectDescription}
          />
        </label>
      </div>
      <div className="rowDiv">
        <label className="labelForm">
          Correo:
          <br />
          <input
            type="text"
            name="email"
            className="inputForm"
            onChange={handleChange}
            value={formState.email}
            style={{ width: "25vw" }}
          />
        </label>
      </div>
    </div>
  );
};

/*nameLeader: "",
        codeLeader: "",
        careerLeader: "",
        numberLeader: "",
        emailLeader: "",
        semesterLeader: "",*/
const SecondStep = ({ handleChange, formState, membersNo, increaseMembers, decreaseMembers }) => {
  

  return (
    <div>
      <div className="rowDiv" style={{ justifyContent: "space-between" }}>
        <label className="labelForm">
          Nombre del Líder del Proyecto
          <br />
          <input
            type="text"
            name="nameLeader"
            className="inputForm"
            onChange={handleChange}
            value={formState.nameLeader}
            style={{ width: "30vw" }}
          />
        </label>
        <label className="labelForm">
          Código del Líder del Proyecto
          <br />
          <input
            type="number"
            name="codeLeader"
            className="inputForm"
            onChange={handleChange}
            value={formState.codeLeader}
            style={{ width: "20vw" }}
          />
        </label>
        <label className="labelForm">
          Carrera del Líder del Proyecto
          <br />
          <input
            type="text"
            name="careerLeader"
            className="inputForm"
            onChange={handleChange}
            value={formState.careerLeader.toUpperCase()}
            style={{ width: "100%" }}
          />
        </label>
      </div>
      <div className="rowDiv" style={{ justifyContent: "space-between" }}>
        <label className="labelForm">
          WhatsApp del Líder del Proyecto
          <br />
          <input
            type="number"
            name="numberLeader"
            className="inputForm"
            onChange={handleChange}
            value={formState.numberLeader}
            style={{ width: "100%" }}
          />
        </label>
        <label className="labelForm">
          Correo del Líder del Proyecto (Institucional)
          <br />
          <input
            type="text"
            name="emailLeader"
            className="inputForm"
            onChange={handleChange}
            value={formState.emailLeader}
            style={{ width: "100%" }}
          />
        </label>
        <label className="labelForm">
          Semestre del Líder del Proyecto
          <br />
          <select
            name="semesterLeader"
            className="inputForm"
            onChange={handleChange}
            value={formState.semesterLeader}
            style={{ width: "100%" }}
          >
            <option value=""> </option>
            <option value="1">1</option> <option value="2">2</option>
            <option value="3">3</option> <option value="4">4</option>
            <option value="5">5</option> <option value="6">6</option>
            <option value="7">7</option> <option value="8">8</option>
            <option value="9">9</option> <option value="10">10</option>
            <option value="11">11</option> <option value="12">12</option>
            <option value="13">13</option> <option value="14">14</option>
            <option value="15">15</option> <option value="16">16</option>
            <option value="+">+</option>
          </select>
        </label>
      </div>



      {/*second member*/}
      {membersNo >= 2 && <div style={{marginTop: "5vw"}}>
      <div className="rowDiv" style={{ justifyContent: "space-between" }}>
        <label className="labelForm">
          Nombre del Segundo Integrante
          <br />
          <input
            type="text"
            name="name2"
            className="inputForm"
            onChange={handleChange}
            value={formState.name2}
            style={{ width: "30vw" }}
          />
        </label>
        <label className="labelForm">
          Código del Segundo Integrante
          <br />
          <input
            type="number"
            name="code2"
            className="inputForm"
            onChange={handleChange}
            value={formState.code2}
            style={{ width: "20vw" }}
          />
        </label>
        <label className="labelForm">
          Carrera del Segundo Integrante
          <br />
          <input
            type="text"
            name="career2"
            className="inputForm"
            onChange={handleChange}
            value={formState.career2.toUpperCase()}
            style={{ width: "100%" }}
          />
        </label>
      </div>
      <div className="rowDiv" style={{ justifyContent: "space-between" }}>
        <label className="labelForm">
          WhatsApp del Segundo Integrante
          <br />
          <input
            type="number"
            name="number2"
            className="inputForm"
            onChange={handleChange}
            value={formState.number2}
            style={{ width: "100%" }}
          />
        </label>
        <label className="labelForm">
          Correo del Segundo Integrante (Institucional)
          <br />
          <input
            type="text"
            name="email2"
            className="inputForm"
            onChange={handleChange}
            value={formState.email2}
            style={{ width: "100%" }}
          />
        </label>
        <label className="labelForm">
          Semestre del Segundo Integrante
          <br />
          <select
            name="semester2"
            className="inputForm"
            onChange={handleChange}
            value={formState.semester2}
            style={{ width: "100%" }}
          >
            <option value=""> </option>
            <option value="1">1</option> <option value="2">2</option>
            <option value="3">3</option> <option value="4">4</option>
            <option value="5">5</option> <option value="6">6</option>
            <option value="7">7</option> <option value="8">8</option>
            <option value="9">9</option> <option value="10">10</option>
            <option value="11">11</option> <option value="12">12</option>
            <option value="13">13</option> <option value="14">14</option>
            <option value="15">15</option> <option value="16">16</option>
            <option value="+">+</option>
          </select>
        </label>
      </div>
      </div>}



      {/*third member*/}
      {membersNo >= 3 && <div style={{marginTop: "5vw"}}>
      <div className="rowDiv" style={{ justifyContent: "space-between" }}>
        <label className="labelForm">
          Nombre del Tercer Integrante
          <br />
          <input
            type="text"
            name="name3"
            className="inputForm"
            onChange={handleChange}
            value={formState.name3}
            style={{ width: "30vw" }}
          />
        </label>
        <label className="labelForm">
          Código del Tercer Integrante
          <br />
          <input
            type="number"
            name="code3"
            className="inputForm"
            onChange={handleChange}
            value={formState.code3}
            style={{ width: "20vw" }}
          />
        </label>
        <label className="labelForm">
          Carrera del Tercer Integrante
          <br />
          <input
            type="text"
            name="career3"
            className="inputForm"
            onChange={handleChange}
            value={formState.career3.toUpperCase()}
            style={{ width: "100%" }}
          />
        </label>
      </div>
      <div className="rowDiv" style={{ justifyContent: "space-between" }}>
        <label className="labelForm">
          WhatsApp del Tercer Integrante
          <br />
          <input
            type="number"
            name="number3"
            className="inputForm"
            onChange={handleChange}
            value={formState.number3}
            style={{ width: "100%" }}
          />
        </label>
        <label className="labelForm">
          Correo del Tercer Integrante (Institucional)
          <br />
          <input
            type="text"
            name="email3"
            className="inputForm"
            onChange={handleChange}
            value={formState.email3}
            style={{ width: "100%" }}
          />
        </label>
        <label className="labelForm">
          Semestre del Tercer Integrante
          <br />
          <select
            name="semester3"
            className="inputForm"
            onChange={handleChange}
            value={formState.semester3}
            style={{ width: "100%" }}
          >
            <option value=""> </option>
            <option value="1">1</option> <option value="2">2</option>
            <option value="3">3</option> <option value="4">4</option>
            <option value="5">5</option> <option value="6">6</option>
            <option value="7">7</option> <option value="8">8</option>
            <option value="9">9</option> <option value="10">10</option>
            <option value="11">11</option> <option value="12">12</option>
            <option value="13">13</option> <option value="14">14</option>
            <option value="15">15</option> <option value="16">16</option>
            <option value="+">+</option>
          </select>
        </label>
      </div>
      </div>}



      <div className="rowDiv" style={{ justifyContent:"space-evenly",  }}>
        {membersNo > 1 && <button className="removeButton" onClick={decreaseMembers}>- Quitar integrante</button>}

        {membersNo <=2 && <button className="addButton" onClick={increaseMembers}>+ Agregar integrante</button>}

      </div>
    </div>
  );
};

const ThirdStep = ({ handleChange, formState }) => {
  return (
    <div>
      <div className="rowDiv" style={{ justifyContent: "space-between" }}>
        <label className="labelForm">
          Nombre del Asesor del Proyecto:
          <br />
          <input
            type="text"
            name="adviser"
            className="inputForm"
            onChange={handleChange}
            value={formState.adviser}
            style={{ width: "33vw" }}
          />
        </label>
        <label className="labelForm">
          Nombre del Segundo Asesor (Opcional):
          <br />
          <input
            type="text"
            name="adviser2"
            className="inputForm"
            onChange={handleChange}
            value={formState.adviser2}
            style={{ width: "33vw" }}
          />
        </label>
      </div>
      <div className="rowDiv">
      <label className="labelForm">
          Fecha de Presentación del Proyecto
          <br />
          <select
            name="dueDate"
            className="inputForm"
            onChange={handleChange}
            value={formState.dueDate}
            style={{ width: "100%" }}
          >
            <option value=""> </option>
            <option value="Desarrollo">En DESARROLLO (Presenta el siguiente semestre)</option>
            <option value="Terminado">TERMINADO (Presenta este semestre)</option>
          </select>
        </label>
      </div>
    </div>
  );
};

const FourthStep = ({ handleChange, formState }) => {
  return (
    <div>
      <div className="rowDiv">
        <label className="labelTextArea">
          Justificación Módulo 1:
          <br />
          <textarea
            type="text"
            name="module1"
            className="descriptionArea"
            onChange={handleChange}
            value={formState.module1}
          />
        </label>
      </div>
      <div className="rowDiv">
        <label className="labelTextArea">
          Justificación Módulo 2:
          <br />
          <textarea
            type="text"
            name="module2"
            className="descriptionArea"
            onChange={handleChange}
            value={formState.module2}
          />
        </label>
      </div>
      <div className="rowDiv">
        <label className="labelTextArea">
          Justificación Módulo 3:
          <br />
          <textarea
            type="text"
            name="module3"
            className="descriptionArea"
            onChange={handleChange}
            value={formState.module3}
          />
        </label>
      </div>
    </div>
  );
};

const FifthStep = ({ handleChange, formState }) => {
  return (
    <div className="rowDiv">
        <label className="labelForm">
          Sube el diagrama de Gantt a tu cuenta de Google Drive y pega aquí el link (debe ser visible públicamente)
          <br />
          <input
            type="text"
            name="diagramFile"
            className="inputForm"
            onChange={handleChange}
            value={formState.diagramFile}
            style={{ width: "35vw" }}
          />
        </label>
      </div>
  );
};

const NextButton = ({ nextStep }) => {
  return (
    <div className="divButton" style={{ justifyContent: "flex-end" }}>
      <button className="stepButton" onClick={nextStep}>
        Siguiente
      </button>
    </div>
  );
};

const PrevNextButton = ({ nextStep, prevStep }) => {
  return (
    <div className="divButton" style={{ justifyContent: "space-between" }}>
      <button className="stepButton" onClick={prevStep}>
        Regresar
      </button>
      <button className="stepButton" onClick={nextStep}>
        Siguiente
      </button>
    </div>
  );
};

const PrevSendButton = ({ prevStep, sendForm }) => {
  return (
    <div className="divButton" style={{ justifyContent: "space-between" }}>
      <button className="stepButton" onClick={prevStep}>
        Regresar
      </button>
      <button className="sendButton" onClick={sendForm}>Enviar</button>
    </div>
  );
};

export { FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep, NextButton, PrevNextButton, PrevSendButton };
