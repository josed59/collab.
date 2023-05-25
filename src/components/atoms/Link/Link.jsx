import React from "react";
import './link.scss'

function Link({text, color, action}){
    return(
        <a className={'link ' + color} href={action}>{text}</a>
    );
}

export {Link}