import React from "react";
import './iconic.scss'

function Iconic({icon , action}){
    return(
        <span className={icon}  onClick={action} > </span> 
    );
}

export {Iconic};