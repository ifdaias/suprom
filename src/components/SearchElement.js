import { useEffect, useState } from 'react';
import './componentStyles/SearchElement.css'
import { useNavigate } from 'react-router-dom';

const SearchElement = (props) =>{

    const navigate = useNavigate();

    function toProject(){
        props.cleanSearch()
        if(window.location.pathname.includes('/details')){
            window.location.reload()
        }
        return navigate('/details', {state: {titulo: props.titulo}})
    }
    
    return(
        <div className='searchBox' onClick={toProject}>
            <p className='searchTitle'>{props.titulo}</p>
        </div>
    )
}


export default SearchElement