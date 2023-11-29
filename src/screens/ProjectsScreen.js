import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import "./screenStyles/Projects.css";
import { UserDataContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { render } from "@testing-library/react";

class FetchProjects extends React.Component {
  state = { projects: "" };
  componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };

    axios
      .get("https://localhost:7082/k8k3dylm/latest", {
        headers: headers,
      })
      .then((response) => {
        this.setState({
          projects: response.data,
        });
      })
      .catch(function (error) {
        //console.log("SIN CONEXION: " + error);
      });
  }
  render() {
    return <CreateProjects projects={this.state.projects} />;
  }
}



const CreateProjects = ({ projects }) => {
  let projectArray = [];
  var titu, descr

  if (projects.length > 0) {
    for (let i = 0; i < projects.length; i++) {
        titu = projects[i].titulo
        descr = projects[i].descripcion
      projectArray.push({titulo: titu, descripcion: descr});
    }
  }

  const listProjects = projectArray.map((proj, index) => (
    <ProjectCard  {...proj} key={index} />
  ));

  //

  return <div className="wrapper">{listProjects}</div>;
};

const Projects = () => {
  const navigate = useNavigate();

  function toProjectForm() {
    return navigate("/form");
  }

  const { isLoggedIn } = useContext(UserDataContext);
  return (
    <Layout screen="projects">
      {isLoggedIn && (
        <button className="registerButton" onClick={toProjectForm}>
          Registrar Proyecto
        </button>
      )}

      <p>Proyectos recientes</p>
        <FetchProjects />

    </Layout>
  );
};

export default Projects;
