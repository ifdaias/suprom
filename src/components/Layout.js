import { useEffect, useState } from 'react';
import './componentStyles/Layout.css'

const Layout = ({children, ...props}) =>{
    
    const [layoutClass, setLayoutClass] = useState()

    useEffect(() => {
        const screen = props.screen;
        if(screen == 'home' || screen == 'login')
            setLayoutClass('layoutRow')
        else if(screen == 'details' || screen == 'projects' || screen == 'details')
            setLayoutClass('layoutColumn')
      });
    
    return(
        <div className={layoutClass} style={{height: '89vh'}}>
            {children}
        </div>
    )
}


export default Layout