import React from "react";
import './input.scss';

function Input ({type,placeholder,inputId,label}){
    return(
        <div className="container-button">
            <label htmlFor={inputId}>{label}</label>
            <input 
                id={inputId}  
                className="input" 
                type={type} 
                placeholder={placeholder}
            />
        </div>
    );
}

export {Input};