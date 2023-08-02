import React, { useState } from "react";
import { Header } from "@molecules/Header/Header";
import { SideMenu } from "@molecules/SideMenu/SideMenu";
import { HomeMain } from "@molecules/HomeMain/HomeMain";
import { Outlet } from 'react-router-dom';
import {SecurePath} from "@hooks/useLogin";



function MainTemplate(){

    const [menuVisible, setMenuVisible] = useState(false);
    const handleClickMenuButton = () => {
        setMenuVisible(!menuVisible);
      };

    return(
        <SecurePath>  
            <Header   handleClickMenuButton={handleClickMenuButton} />
            <SideMenu menuVisible={menuVisible} handleClickMenuButton={handleClickMenuButton} />
            <HomeMain>
                <Outlet />
            </HomeMain>
        </SecurePath>
    );
}

export {MainTemplate};