import React from "react";
import './button.scss';

function Button({label,type,disable}){
    return(
        <button className={'botton ' + type + disable}>
            {label}
        </button>
    );
};

export {Button};