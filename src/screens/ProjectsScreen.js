import Layout from "../components/Layout"
import ProjectCard from "../components/ProjectCard"
import './screenStyles/Projects.css'

const Projects = () =>{
    //console.log(props.height)
    return(
        <Layout screen = 'projects'>
            <button className="registerButton">Registrar Proyecto</button>
            <p>Proyectos recientes</p>
            <div className="wrapper">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </Layout>
    )
}

export default Projects