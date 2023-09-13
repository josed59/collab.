import React, { useState,useContext,useEffect} from "react";
import { Header } from "@molecules/Header/Header";
import { SideMenu } from "@molecules/SideMenu/SideMenu";
import { HomeMain } from "@molecules/HomeMain/HomeMain";
import { Outlet } from 'react-router-dom';
import {SecurePath,useLogin} from "@hooks/useLogin";
import { AppContext } from '@context/AppContext'; 
import SpinnerMolecule from "@molecules/SpinnerMolecule/SpinnerMolecule";


function MainTemplate(){
    const { session } = useLogin();
    const [menuVisible, setMenuVisible] = useState(false);
    const handleClickMenuButton = () => {
        setMenuVisible(!menuVisible);
      };
    const {state} = useContext(AppContext);

    useEffect(() => {
            session();
    }
    
    ,[]);
    
    return(
        <SecurePath>  
            <Header   handleClickMenuButton={handleClickMenuButton} />
            <SideMenu menuVisible={menuVisible} handleClickMenuButton={handleClickMenuButton} />
            <HomeMain>
                <Outlet />
            </HomeMain>
            {state.isLoading && <SpinnerMolecule/>}
        </SecurePath>
    );
}

export {MainTemplate};