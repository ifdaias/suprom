import { useEffect, useState } from 'react';
import './componentStyles/Layout.css'

const Layout = ({children, ...props}) =>{
    
    const [layoutClass, setLayoutClass] = useState()

    useEffect(() => {
        const screen = props.screen;
        if(screen == 'home' || screen == 'login')
            setLayoutClass('layoutRow')
        else if(screen == 'details' || screen == 'projects' || screen == "form" || screen == 'register')
            setLayoutClass('layoutColumn')
      });
    
    return(
        <div className={layoutClass} style={{height: '92vh', marginTop: `${props.marginTop}`, justifyContent: `${props.justifyContent}`, alignContent: `${props.alignContent}`}}>
            {children}
        </div>
    )
}


export default Layout