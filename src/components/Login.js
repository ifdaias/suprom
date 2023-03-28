import './Login.css'
import Phrase from './Phrase'
import NavBar from './NavBar'
import Layout from './Layout'
import { useEffect } from 'react'
import axios from 'axios'


const Login = () => {
    
    async function verifyUser(cod, nip) {
        /*const response = await fetch(`148.202.152.33/login23siiau.php?codigo=${cod}&nip=${nip}`)
        return await console.log(response.json());*/
    }

    useEffect(() => {

        fetch('http://148.202.152.33/login23siiau.php?codigo=215497467&nip=DanteKrato', { mode: 'no-cors'})
            .then(response => console.log('Response: ' + response.data))
            .then(data => console.log('Data: ' + data))
            .catch(error => console.log('Error: ' + error));
      });

    return (
        <div>
            <NavBar></NavBar>
        <Layout height={"89vh"}>
            <div className='box'>
                    <h1 className='suprom'>SUPROM</h1>
                    <div className='field'>
                        <input type="number" id="codigo" name="codigo" placeholder='Código...'/>
                    </div>
                    <div className='field'>
                            <input type="password" id="contrasena" name="contrasena" placeholder='Contraseña...'/>
                    </div>
                    <button onClick={async () => {await this.verifyUser('215497467', 'DanteKrato')} } >Ingresar</button>
            </div>
            <Phrase text={"Ingresa tu código y NIP de SIIAU"} />
        </Layout>
        </div>
    )
}

export default Login