import React from "react";
import './button.scss';

function Button({label,type,disable,handler}){
    return(
        <button className={'botton ' + type + disable}
                onClick = {handler}
        >
            {label}
        </button>
    );
};

export {Button};