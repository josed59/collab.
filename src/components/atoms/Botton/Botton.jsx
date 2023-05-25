import React from "react";
import './button.scss';

function Button({label,type}){
    return(
        <button className={'botton ' + type}>
            {label}
        </button>
    );
};

export {Button};