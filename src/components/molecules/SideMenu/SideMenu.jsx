import React,{useEffect} from "react"; 
import { useLocation } from "react-router-dom";
import { MenuItem } from "@molecules/MenuItem/MenuItem";
import { Iconic } from "@atoms/Iconic/iconic";
import useScreenSize from "@hooks/useScreenSize";
import './sideMenu.scss';

const data =[
    {   
        id:"Jose",
        name:"Jose",
    },
    {   
        id:"Cesar",
        name:"Cesar",
    }
];



function SideMenu({menuVisible, handleClickMenuButton}){
    const location = useLocation();
    const {screenWidth} = useScreenSize();
    let  menuStyle = {};
    if (menuVisible){
        console.log('screenWidth');
        console.log(screenWidth);
         menuStyle = {
            display: menuVisible ? 'block' : 'hidden',
            visibility:  menuVisible ? 'visible' : 'hidden',
            opacity: menuVisible ? '1' : '0',
            height: '100vh',
            top: '0',
            position: 'fixed', 
            transition: 'opacity 0.3s ease',
          };
 
        if(screenWidth >= 768) {
            menuStyle = {};
          }

        }
        
        useEffect(() => {
          // Ejecutar acciones o lógica adicional al cambiar la ruta
          if(menuVisible && (screenWidth <= 768)){
            handleClickMenuButton();
            console.log('Ruta cambiada:', location.pathname);
          }
        }, [location]);
      
    

    return(
        <aside className="menu-aside" style={menuStyle}>
            <ul>
                <li onClick={handleClickMenuButton}>
                    <Iconic icon="exit"/> 
                </li>
                <li >
                    <MenuItem 
                        text="Teams Members" 
                        to="/teammenbers"
                        icon="arrow"
                        data = {data}
                    />
                </li>
                <li >
                    <MenuItem 
                        text="Backlog" 
                        to="/backlog"
                    />
                </li>
                <li >
                    <MenuItem 
                        text="Project" 
                        to="/"
                    />
                </li>
                <li>
                    <MenuItem 
                        text="Log Out" 
                        to="/"
                    />
                </li>
            </ul>
           
        </aside>
    );
}

export {SideMenu};