import { BrowserRouter, Routes, Route, useLocation, Router, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import InfoScreen from "./screens/InfoScreen";
import Projects from "./screens/ProjectsScreen";
import ProjectDetailsScreen from "./screens/ProjectDetailsScreen";
import ProjectForm from "./screens/ProjectFormScreen";
import RegisterForm from "./screens/RegisterFormScreen";
import PopupForm from "./components/PopupForm";
import { useState, createContext, useEffect } from "react";

export const UserDataContext = createContext();

const App = () => {
  const location  = useLocation()
  const navigate = useNavigate();
  //handle popup
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const whiteList =  "/form, /register"

  const [userState, setUserState] = useState({
    name: "",
    code: "",
    password: "",
    userType: "",
    permissions: false
  });

  function changeUserState(attributeName, value) {
    setUserState({
      ...userState,
      [attributeName]: value,
      });
  }

  useEffect(() => {

  const logged = localStorage.getItem("IsLoggedIn")

  if(logged == "true"){
    const code = localStorage.getItem("Code")
    const userType = localStorage.getItem("UserType")
    const name = localStorage.getItem("Name")
    let perm = false;

    if(!userType.toUpperCase().includes("ESTUDIANTE")){
      perm = true
    }

    setUserState({
      code: code,
      userType: userType,
      name: name,
      permissions: perm,
      });

    setIsLoggedIn(true)
  }
  }, []);

  const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const switchIsLoggedIn = () => {
      if (isLoggedIn) {
        localStorage.setItem("IsLoggedIn", "false");
        localStorage.setItem("Code", "");
        localStorage.setItem("UserType", "");
        localStorage.setItem("Name", "");
        localStorage.setItem("LoginTime", "");
        setIsLoggedIn(false);
        changeUserState("code", "")
        changeUserState("userType", "")
        changeUserState("name", "")
        navigate("/home")
        window.location.reload()
      } else {
        /*
        localStorage.setItem("Code", JSON.stringify(userState.code));
        localStorage.setItem("UserType", JSON.stringify(userState.userType));*/
        localStorage.setItem("IsLoggedIn", "true");
        setIsLoggedIn(true);
        changeUserState("name", localStorage.getItem("Name"));
        changeUserState("code", localStorage.getItem("Code"));
        changeUserState("userType", localStorage.getItem("UserType"));

        let us = localStorage.getItem("UserType");
        let perm = false;
        if(!us.toUpperCase().includes("ESTUDIANTE")){
          perm = true
        }

        changeUserState('permissions', perm)
        navigate("/home")
        window.location.reload()
        
      }
    };
    
    return {
      isLoggedIn,
      switchIsLoggedIn,
      setIsLoggedIn,
    };
  };

  


  const { isLoggedIn, switchIsLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    
    var timeLogin = new Date(localStorage.getItem('LoginTime'))

    if(timeLogin != "Invalid Date"){
      
      //console.log("SETTING TIMEOUT")

      const interval = setInterval(() => {
        /*console.log("SE EJECUTA")
        console.log(window.location.pathname)*/
        var time = new Date();
        
        const logged = localStorage.getItem("IsLoggedIn")

        if(!whiteList.includes(window.location.pathname) && (time.getTime() > (timeLogin.getTime() + 60*60000)) && logged == "true"){
          setContent("La sesión ha expirado")
          togglePopup()
          clearInterval(interval)
          switchIsLoggedIn()
        }
      }, 60000);
    }
  }, [isLoggedIn]);

  return (
    <div
      style={{ overflowX: "hidden", overflowY: "hidden", position: "fixed" }}
    >
      <UserDataContext.Provider
        value={{
          userState: userState,
          changeUserState: changeUserState,
          isLoggedIn: isLoggedIn,
          switchIsLoggedIn: switchIsLoggedIn,
        }}
      >
        
          <NavBar />
          <Routes>
            <Route index element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/info" element={<InfoScreen />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/details" element={<ProjectDetailsScreen />} />
            <Route path="/form" element={<ProjectForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        
      </UserDataContext.Provider>
      {isOpen && <PopupForm handleClose={togglePopup} content={content} />}
    </div>
  );
};

export default App;