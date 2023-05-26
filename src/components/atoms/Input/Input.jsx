import React from "react";
import './input.scss';

function Input ({type,placeholder,inputId,label,error}){
    return(
        <div className="container-button">
            <label htmlFor={inputId}>{label}</label>
            <input 
                id={inputId} 
                name={inputId} 
                className={'input ' + error}
                type={type} 
                placeholder={placeholder}
            />
        </div>
    );
}

export {Input};