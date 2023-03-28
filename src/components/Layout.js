import { Component } from "react";
import './Layout.css'

const Layout = ({children, ...props}) =>{
    console.log(props.height)
    return(
        <div className="layout" style={{height: props.height}}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Layout