import React from "react";
import './header.scss';
import  {UserLogo} from '@atoms/UserLogo/UserLogo'
import CollabLogo from "@molecules/CollabLogo/CollabLogo";
import menuIcon from '@icon/menu.png';

function Header({handleClickMenuButton}){
    return(
        <nav className="container-nav">
            <ul>
                <li className="container-img hidde-on-desktop" onClick={handleClickMenuButton}>
                    <img src={menuIcon} /> 
                </li>
                <li>
                    <CollabLogo 
                        viewBox="35 35 150 60"
                        style={{ width:'150px', height:'44px'}}
                    />
                </li>
                <li className="email hidde-on-mobile">
                    <span >veronica@email.com</span>
                </li>
                <li>
                    
                    <UserLogo text="V"/>
                </li>
            </ul>     
        </nav>
    );
}

export {Header};