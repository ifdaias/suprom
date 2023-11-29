import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  NextButton,
  PrevNextButton,
  PrevSendButton,
} from "../components/FormSteps";
import "./screenStyles/ProjectForm.css";
import PopupForm from "../components/PopupForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const navigate = useNavigate();

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const regexIsCareer = /career/i;
  const regexCode = /^\d{9,10}$/i;
  const regexCareer = /^[A-Z]{3,10}$/;
  const regexPhone = /\d{9,15}/;
  const regexSemester = /^[\d\+]{1,2}$/i;

  const [step, setStep] = useState(1);
  const [userAdded, setUserAdded] = useState(false);
  const [membersNo, setMembersNo] = useState(1);

  const [formState, setFormState] = useState({
    projectTitle: "",
    projectDescription: "",
    email: "",

    //leader
    nameLeader: "",
    codeLeader: "",
    careerLeader: "",
    numberLeader: "",
    emailLeader: "",
    semesterLeader: "",

    //second member
    name2: "",
    code2: "",
    career2: "",
    number2: "",
    email2: "",
    semester2: "",

    //third member
    name3: "",
    code3: "",
    career3: "",
    number3: "",
    email3: "",
    semester3: "",

    adviser: "",
    adviser2: "",

    dueDate: "",

    module1: "",
    module2: "",
    module3: "",

    diagramFile: "",

    membersNo: 1,
  });

  function handleChange(e) {
    let value = "";
    if (regexIsCareer.test(e.target.name)) {
      value = e.target.value.toUpperCase();
    } else {
      value = e.target.value;
    }

    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  }

  const increaseMembers = () => {
    setFormState({
      ...formState,
      membersNo: membersNo + 1,
    });
    setMembersNo((membersNo) => membersNo + 1);
  };

  const decreaseMembers = () => {
    if (membersNo == 3) {
      nullMember("3");
    } else if (membersNo == 2) {
      nullMember("2");
    }
    setMembersNo((membersNo) => membersNo - 1);
  };

  function nullMember(memberNo) {
    setFormState({
      ...formState,
      [`name${memberNo}`]: "",
      [`code${memberNo}`]: "",
      [`career${memberNo}`]: "",
      [`number${memberNo}`]: "",
      [`email${memberNo}`]: "",
      [`semester${memberNo}`]: "",
    });
  }

  //handle popup
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (userAdded && !isOpen) {
      return navigate("/projects");
    }
  }, [userAdded, isOpen]);

  /*useEffect(() => {
    //console.log(formState);
    //console.log("USE STEP: " + step);
  });*/

  function renderSteps() {
    switch (step) {
      case 1:
        return <FirstStep handleChange={handleChange} formState={formState} />;
      case 2:
        return (
          <SecondStep
            handleChange={handleChange}
            formState={formState}
            membersNo={membersNo}
            increaseMembers={increaseMembers}
            decreaseMembers={decreaseMembers}
          />
        );
      case 3:
        return <ThirdStep handleChange={handleChange} formState={formState} />;
      case 4:
        return <FourthStep handleChange={handleChange} formState={formState} />;
      case 5:
        return <FifthStep handleChange={handleChange} formState={formState} />;
      default:
        break;
    }
  }

  function renderButtons() {
    if (step == 1) return <NextButton nextStep={nextStep} />;
    else if (step < 5)
      return <PrevNextButton nextStep={nextStep} prevStep={prevStep} />;
    else return <PrevSendButton prevStep={prevStep} sendForm={sendForm} />;
  }

  const prevStep = () => {
    //console.log("STEP: " + step);
    setStep((step) => step - 1);
  };

  const nextStep = () => {
    let isValid = false;
    switch (step) {
      case 1:
        //console.log("First STEP STEP: " + step);
        isValid = validateFirstStep();
        break;
      case 2:
        //console.log("SECOND STEP STEP: " + step);
        isValid = validateSecondStep();
        break;
      case 3:
        //console.log("THIRD");
        isValid = validateThirdStep();
        break;
      case 4:
        //console.log("FOURTH");
        isValid = validateFourthStep();
        break;
      default:
        break;
    }

    if (isValid) {
      setContent("");
      setStep((step) => step + 1);
      //console.log("STEP: " + step);
    } else {
      togglePopup();
    }
  };

  function sendForm() {
    if (step == 5 && validateFifthStep()) {
      //console.log("TODO BIEN");

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      };

      let adv2 = formState.adviser2;
      let No2 = "Asesor2"
      if(adv2 != undefined){
        if(adv2.length < 5){
          No2 = "NoSecondAdvisor"
          adv2 = ""
        }
      }

      

      const data = {
        Titulo: formState.projectTitle,
        Descripcion: formState.projectDescription,
        CorreoRegistro: formState.email,
        NombreLider: formState.nameLeader,
        CodigoLider: formState.codeLeader,
        CarreraLider: formState.careerLeader,
        NumeroLider: formState.numberLeader,
        CorreoLider: formState.emailLeader,
        SemestreLider: formState.semesterLeader,
        Nombre2: formState.name2,
        Codigo2: formState.code2,
        Carrera2: formState.career2,
        Numero2: formState.number2,
        Correo2: formState.email2,
        Semestre2: formState.semester2,
        Nombre3: formState.name3,
        Codigo3: formState.code3,
        Carrera3: formState.career3,
        Numero3: formState.number3,
        Correo3: formState.email3,
        Semestre3: formState.semester3,
        Asesor: formState.adviser,
        [`${No2}`]: adv2,
        Estado: formState.dueDate,
        Modulo1: formState.module1,
        Modulo2: formState.module2,
        Modulo3: formState.module3,
        LinkDiagrama: formState.diagramFile,
        NumeroMiembros: formState.membersNo,
      };

      axios
        .post("https://localhost:7082/k8k3dylm/new", data, {
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
    } else {
      togglePopup();
    }
  }

  function validateFirstStep() {
    if (
      formState.projectTitle.length > 5 &&
      formState.projectTitle.length <= 100
    ) {
      if (
        formState.projectDescription.length > 20 &&
        formState.projectDescription.length <= 500
      ) {
        if (regexEmail.test(formState.email) && formState.email.length <= 75) {
          return true;
        } else {
          if (formState.email.length > 75) setContent("Correo demasiado largo");
          else setContent("Ingrese un correo válido");
          return false;
        }
      } else {
        if (formState.projectDescription > 500)
          setContent("Descripción demasiado larga");
        else setContent("Ingrese una descripción válida");
        return false;
      }
    } else {
      if (formState.projectTitle > 100)
          setContent("Título demasiado largo");
        else 
      setContent("Ingrese un título válido");
      return false;
    }
  }

  function validateSecondStep() {
    let isValid = false;
    switch (membersNo) {
      case 1:
        isValid = validateMember("Leader");
        break;
      case 2:
        if (validateMember("Leader") && validateMember("2")) {
          isValid = true;
        }
        break;
      case 3:
        if (
          validateMember("Leader") &&
          validateMember("2") &&
          validateMember("3")
        ) {
          isValid = true;
        }
        break;
      default:
        break;
    }

    return isValid;
  }

  function validateMember(member) {
    //console.log("MEMBER: " + formState[`name${member}`]);

    if (formState[`name${member}`].length > 5) {
      if (regexCode.test(formState[`code${member}`])) {
        if (regexCareer.test(formState[`career${member}`])) {
          if (regexPhone.test(formState[`number${member}`])) {
            if (regexEmail.test(formState[`email${member}`])) {
              if (regexSemester.test(formState[`semester${member}`])) {
                //console.log("SEMES: " + formState[`semester${member}`]);
                return true;
              } else {
                //console.log("SEMES: " + formState[`semester${member}`]);
                setContent("Ingrese un semestre válido");
                return false;
              }
            } else {
              setContent("Ingrese un correo válido");
              return false;
            }
          } else {
            setContent("Ingrese un número de WhatsApp válido");
            return false;
          }
        } else {
          setContent("Ingrese el código de carrera en mayúsculas");
          return false;
        }
      } else {
        setContent("Ingrese un código válido");
        return false;
      }
    } else {
      setContent("Ingrese un nombre válido");
      return false;
    }
  }

  function validateThirdStep() {
    const regexDueDate = /(Desarrollo|Terminado)/i;

    if (formState.adviser.length > 5) {
      if (formState.adviser2.length > 0) {
        if (formState.adviser2.length < 5) {
          setContent("Ingrese segundo asesor válido");
          return false;
        }
      }
      if (regexDueDate.test(formState.dueDate)) {
        return true;
      } else {
        setContent("Ingrese una fecha válida");
        return false;
      }
    } else {
      setContent("Ingrese un nombre de asesor válido");
      return false;
    }
  }

  function validateFourthStep() {
    if (formState.module1.length > 20 && formState.module1.length <= 500) {
      if (formState.module2.length > 20 && formState.module2.length <= 500) {
        if (formState.module3.length > 20 && formState.module3.length <= 500) {
          return true;
        } else {
          if(formState.module1.length > 500)
          setContent("Justificación del Módulo 3 demasiado larga");
          else
          setContent("Ingrese una justificación más larga para el Módulo 3");
          return false;
        }
      } else {
        if(formState.module1.length > 500)
      setContent("Justificación del Módulo 2 demasiado larga");
      else
      setContent("Ingrese una justificación más larga para el Módulo 2");
        return false;
      }
    } else {
      if(formState.module1.length > 500)
      setContent("Justificación del Módulo 1 demasiado larga");
      else
      setContent("Ingrese una justificación más larga para el Módulo 1");
      return false;
    }
  }

  function validateFifthStep() {
    //console.log("validando cinco");
    const regexFile =
      /^https:\/\/(drive|docs)\.google\.com\/(file|document).{5,}/i;
    if (regexFile.test(formState.diagramFile)) {
      return true;
    } else {
      setContent("Ingrese un link de Google Drive válido");
      return false;
    }
  }

  return (
    <Layout screen="form" marginTop="1vw">
      <div className="boxForm">
        {renderSteps()}
        {renderButtons()}
        {isOpen && <PopupForm handleClose={togglePopup} content={content} />}
      </div>
      <p></p>
    </Layout>
  );
};

export default ProjectForm;
