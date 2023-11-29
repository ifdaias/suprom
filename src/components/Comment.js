import { useEffect, useState } from 'react';
import './componentStyles/Comment.css'
import { useNavigate } from 'react-router-dom';

const Comment = ({name, text, date, ...props}) =>{

    const navigate = useNavigate();
    
    return(
        <div className='commentBox'>
            <div className='commentHeader'>
                <p className = 'commentAuthor'>{name}</p>
                <p className = 'commentDate'>{date}</p>
            </div>
            <p className = 'commentText'>{text}</p>
        </div>
    )
}


export default Comment