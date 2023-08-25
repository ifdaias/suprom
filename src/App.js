import {BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import InfoScreen from './screens/InfoScreen';
import Projects from './screens/ProjectsScreen';
import ProjectDetailsScreen from './screens/ProjectDetailsScreen';
import { useState, createContext } from 'react';

export const UserDataContext = createContext()

const  App = () => {
  const [username, setUsername] = useState('Juanito Perez');
  const [password, setPassword] = useState('123*');

  const useLogInOut = () =>{
    const [logInOut, setLogInOut] = useState('Ingresar')

    const switchLogInOut = () => {
      if(logInOut == 'Ingresar')
        setLogInOut('Salir')
      if(logInOut == 'Salir')
        setLogInOut('Ingresar')
    }
    return {
      logInOut, 
      switchLogInOut}
  }

  const {logInOut, switchLogInOut} = useLogInOut();
  
  return (
    <div style={{overflowX:'hidden', overflowY:'hidden',position:'fixed'}}>
      <UserDataContext.Provider value={{username, setUsername, password, setPassword, logInOut, switchLogInOut}}>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route index element={<HomeScreen />}/>
            <Route path='/home' element={<HomeScreen />}/>
            <Route path='/login' element={<LoginScreen />}/>
            <Route path='/info' element={<InfoScreen />}/>
            <Route path='/projects' element={<Projects />}/>
            <Route path='/details' element={<ProjectDetailsScreen />}/>
          </Routes>
        </BrowserRouter>
      </UserDataContext.Provider>
    </div>
  );
}

export default App;