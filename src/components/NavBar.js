import "./componentStyles/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { UserDataContext } from "../App";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchElement from "./SearchElement";
import ProjectCard from "./ProjectCard";

const NavBar = () => {
    const location = useLocation();
  const { isLoggedIn, switchIsLoggedIn } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]); //almacena tabla estatica
  const [tableProjects, setTableProjects] = useState([]); //almacena tabla dinamica
  const [search, setSearch] = useState([]); //controla lo que se escribe en la tabla de search
    const [wrapper, setWrapper] = useState(1)
    const [visible, setVisible] = useState('hidden')

  useEffect(() => {
    setWrapper(1)
        setVisible("hidden")
        //console.log("HIDE")
        
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };

    //project details
    axios
      .get("https://localhost:7082/k8k3dylm/titles", {
        headers: headers,
      })
      .then((response) => {
        //console.log(response.data);
        setProjects(response.data);
        setTableProjects(response.data);
      })
      .catch(function (error) {
        //console.log("SIN CONEXION: " + error);
      });
  }, []);

  function toLogin() {
    return navigate("/login");
  }

  function signOut() {
    switchIsLoggedIn();
    return navigate("/");
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (searchTerm) => {
    let searchResults = tableProjects.filter((element) => {
      if (
        element.titulo
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    });
    setProjects(searchResults);
    //console.log(searchResults);
  };

  const cleanSearch = useCallback(() => {
    switchWrapper()
    setSearch("");
 }, []);

 function switchWrapper(){
    if(wrapper == 1){
        setWrapper(5)
        setVisible("visible")
        //console.log("SHOW")
    }
    else if(wrapper == 5){
        setWrapper(1)
        setVisible("hidden")
        //console.log("HIDE")
    }
 }

  return (
    <div className="navBarContainer">
      <h1 className="logo">SUPROM</h1>

      {isLoggedIn == false && (
        <h1 className="login" onClick={toLogin}>
          Ingresar
        </h1>
      )}

      {isLoggedIn == true && (
        <h1 className="login" onClick={signOut}>
          Salir
        </h1>
      )}

      <nav className="navBar" style={{zIndex: wrapper}}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <p className="navBarTag">Inicio</p>
        </Link>
        <Link to={"/projects"} style={{ textDecoration: "none" }}>
          <p className="navBarTag"> Proyectos</p>
        </Link>
        <Link to={"/info"} style={{ textDecoration: "none" }}>
          <p className="navBarTag" style={{ marginRight: "10%" }}>
            Información
          </p>
        </Link>
        <div className="searchWrapper">
          <input
            placeholder="Buscar..."
            value={search}
            onChange={handleChange}
            style={{ width: "33vw", height: "5vh" }}
            onFocus={() => {setWrapper(5)
              setVisible("visible")
              //console.log("SHOW")
            }}
            onBlur={() => {setWrapper(1)
              setVisible("hidden")
              //console.log("HIDE")
            }}
          ></input>

          {projects && search.length > 0 && (
            <div className="searchContainer" style={{visibility: `${visible}`}}
            >
              {projects.map((projects) => (
                <SearchElement key={projects.titulo} titulo={projects.titulo} cleanSearch={cleanSearch}></SearchElement>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
