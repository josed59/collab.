import React, { useState } from "react";
import { Header } from "@molecules/Header/Header";
import { SideMenu } from "@molecules/SideMenu/SideMenu";
import { HomeMain } from "@molecules/HomeMain/HomeMain";
import { Outlet } from 'react-router-dom';

function MainTemplate(){

    const [menuVisible, setMenuVisible] = useState(false);
    const handleClickMenuButton = () => {
        setMenuVisible(!menuVisible);
      };

    return(
        <>  
            <Header   handleClickMenuButton={handleClickMenuButton} />
            <SideMenu menuVisible={menuVisible} handleClickMenuButton={handleClickMenuButton} />
            <HomeMain>
                <Outlet />
            </HomeMain>
            
        </>
    );
}

export {MainTemplate};