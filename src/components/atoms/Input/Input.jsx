import React from "react";
import './input.scss';

function Input ({type,placeholder,inputId,label,error,module,onChange}){
    
    return(
        <div className="container-button">
            <label htmlFor={inputId}>{label}</label>
            <input 
                id={inputId} 
                name={inputId} 
                className={`input ${error ? 'error' : ''} ${module ? module : ''}`}
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

export {Input};