import Layout from "../components/Layout";

const InfoScreen = () => {
  return (
    <Layout screen="details">
      <h1 style={{ zIndex: 3 }}>Objetivo</h1>
      <p style={{ zIndex: 3,  fontSize: '2vw', marginTop: '1.8vh', textAlign: 'justify',
  textJustify: 'inter-word'}}>
        El sistema universitario de proyectos modulares (SUPROM) es un gestor
        con soporte de inteligencia artificial. SUPROM nace de las necesidad de
        agilizar los proceso de los proyectos modulares así como de tener una
        biblioteca de los proyectos que se han presentado con anterioridad y así
        los alumnos puedan conocer y consultar las ideas presentadas por sus
        compañeros. Esto con la finalidad de propiciar la originalidad de los
        proyectos e incentivar la creatividad e innovación de los alumnos.
      </p>
      <iframe
        src="http://farkrozz.pythonanywhere.com/"
        
        style={{ width:"25%",
        height:"70%", position: "absolute", display: 'flex',marginLeft: '55.25vw', zIndex:3, border: 'none'}}
      ></iframe>
      <p></p>
    </Layout>
  );
};

export default InfoScreen;
