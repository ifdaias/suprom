import { Component, useState } from "react";
import './screenStyles/ProjectDetails.css'
import Layout from "../components/Layout";

const ProjectDetailsScreen = () =>{
    const [projectTitle, setProjectTitle] = useState('Titulo del proyecto')
    const [projectDescription, setprojectDescription] = useState('eem im ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempom ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempom ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempom ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempom ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempopsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor m ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

    return(
        <Layout screen='details'>
            <h1 className="projectTitle">{projectTitle}</h1>
            <p className="projectDescription">{projectDescription}</p>
            
            <p>Estado del proyecto:</p>
            <div className="membersContainer">

                <div>
                <p>Integrantes</p>
                <ul>
                    <li>Juan Perez</li>
                    <li>Pepe Pecas</li>
                    <li>Don Mauricio</li>
                </ul>
                </div>

                <div>
                <p>Tutor</p>
                <ul>
                    <li>El señor de la noche</li>
                </ul>
                </div>

            </div>

            <h2>Bitácora</h2>

            <p></p>
        </Layout>
    )
}

export default ProjectDetailsScreen