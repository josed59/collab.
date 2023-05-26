import React from "react";
import './message.scss';

function Message({text, type}){
    return(
        <span className={type}>
            {text}
        </span>
    );
}

export {Message};