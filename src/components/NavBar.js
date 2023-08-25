import './componentStyles/NavBar.css'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../App';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () =>{
    const {logInOut, switchLogInOut} = useContext(UserDataContext);
    const navigate = useNavigate()
    
    function toLogin(){
        return navigate('/login')
    }

    function signOut(){
        switchLogInOut()
        return navigate('/')
    }

        return(
            <div className='navBarContainer'>
                    <h1 className='logo'>SUPROM</h1>
                
                {logInOut == 'Ingresar' && <h1 className='login' onClick={toLogin}>{logInOut}</h1>}

                {logInOut == 'Salir' &&  <h1 className='login'  onClick={signOut}>{logInOut}</h1>}
                
                <nav className="navBar">
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <p>Inicio</p>
                    </Link>
                    <Link to={'/projects'} style={{textDecoration: 'none'}}>
                        <p>Proyectos</p>
                    </Link>
                    <Link to={'/info'} style={{textDecoration: 'none'}}>
                        <p style={{marginRight: '10%'}}>Información</p>
                    </Link>
                    <input placeholder='Buscar...'></input>
                </nav>
            </div>
        )
}

export default NavBar