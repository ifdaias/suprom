import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import Phrase from "./components/Phrase";
import Login from "./components/Login";
import './assets/Fonts.css'

const  App = () => {
  return (
    <div>
        <NavBar />
          <Layout height={"89vh"}>
            <Phrase text={"Sistema\n Universitario\n De\n Proyectos\n Modulares"}/>
            <img src='/media/landing2.png' style={{width: '40vw'}}></img>
          </Layout>
    </div>
  );
  return(
      <Login />
  );
}

export default App;
