import './screenStyles/Login.css'
import Phrase from '../components/Phrase'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { UserDataContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'


const Login = () => {
    const {username, setUsername, password, setPassword, switchLogInOut} = useContext(UserDataContext);


    const navigate = useNavigate()

    function containsSpecialChars(str) {
        const specialChars = /[`!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
        return specialChars.test(str);
    }

    function verifyCredentials(cod, nip) {
        /*const response = await fetch(`148.202.152.33/login23siiau.php?codigo=${cod}&nip=${nip}`)*/
        return axios.get('https://api.publicapis.org/entries')
            .then(function (response) {
            console.log(response.data);
            return response.data;
            })
            .catch(function (error) {
            console.log(JSON.stringify(error));
            return error;
            });
    }

    async function loginOnPress(user, pass){
        let {userIsValid, passIsValid} = false;

        if(user != null)
            if(!/e/.test(user))
                userIsValid = true;

        if(pass != null)
            passIsValid = true;

        if(userIsValid){
            if(passIsValid){
                if(await verifyCredentials(user, pass)){
                    switchLogInOut()
                    return navigate('/home')
                }
                else
                 console.warn('Credenciales no existen')
            }
            else
             console.warn('Ingrese una contraseña')
        }
        else
            console.warn('Ingrese un codigo valido')
    }

    useEffect(() => {

        /*fetch('http://148.202.152.33/login23siiau.php?codigo=215497467&nip=DanteKrato', { mode: 'no-cors'})
            .then(response => console.log('Response: ' + response.data))
            .then(data => console.log('Data: ' + data))
            .catch(error => console.log('Error: ' + error));*/
            console.log('DESDE LOGIN: ' + username + password)
      });

    return (
        <Layout screen='login'>
            <div className='box'>
                    <h1 className='suprom'>SUPROM</h1>
                    <div className='field'>
                        <input type="number" id="codigo" name="codigo" placeholder='Código...'/>
                    </div>
                    <div className='field'>
                            <input type="password" id="contrasena" name="contrasena" placeholder='Contraseña...'/>
                    </div>
                    <button onClick={() => loginOnPress('215497467', 'DanteKrato')} >Ingresar</button>
            </div>
            <Phrase text={"Ingresa tu código y NIP de SIIAU"} />
        </Layout>
    )
}

export default Login