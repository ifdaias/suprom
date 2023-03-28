import './NavBar.css'
const NavBar = () =>{
        return(
            <div className='navBarContainer'>
                <h1 className='logo'>SUPROM</h1>
                <h1 className='login'>Ingresar</h1>
                <nav className="navBar">
                    <p>Inicio</p>
                    <p>Proyectos</p>
                    <p style={{marginRight: '10%'}}>Información</p>
                    <input placeholder='Buscar...'></input>
                </nav>
            </div>
        )
}

export default NavBar