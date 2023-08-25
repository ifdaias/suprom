import { useEffect, useState } from 'react';
import './componentStyles/ProjectCard.css'
import { useNavigate } from 'react-router-dom';

const ProjectCard = () =>{

    const navigate = useNavigate();

    function toProject(){
        return navigate('/details')
    }
    
    const [projectTitle, setProjectTitle] = useState('Titulo del proyecto')
    return(
        <div className='cardBox' onClick={toProject}>
            <p className='cardTitle'S>{projectTitle}</p>
        </div>
    )
}


export default ProjectCard