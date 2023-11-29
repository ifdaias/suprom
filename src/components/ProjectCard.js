import { useEffect, useState } from 'react';
import './componentStyles/ProjectCard.css'
import { useNavigate } from 'react-router-dom';

const ProjectCard = (props) =>{

    const navigate = useNavigate();

    function toProject(){
        return navigate('/details', {state: {titulo: props.titulo}})
    }
    
    return(
        <div className='cardBox' onClick={toProject}>
            <p className='cardTitle'>{props.titulo}</p>
        </div>
    )
}


export default ProjectCard