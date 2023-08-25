import React, { Component, } from 'react'
import Phrase from "../components/Phrase";
import Layout from '../components/Layout';

const HomeScreen = () => {

    
    return(
        <Layout screen='home'>
        <Phrase text={"Sistema\n Universitario\n De\n Proyectos\n Modulares"}/>
        <img src='/media/landing2.png' style={{width: '40vw'}}></img>
        </Layout>
    )

}

export default HomeScreen