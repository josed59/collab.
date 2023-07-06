import React from 'react';
import './textarea.scss';

const TextareaAtom = ({ inputId, className, placeholder,label,isDisabled,defaultValue  }) => {
  return (
    <div className='textarea-container'>
        <label htmlFor={inputId}>{label}</label>
        <textarea
          id={inputId}
          name={inputId}
          className={className}
          placeholder={placeholder}
          rows="4"
          style={{resize: 'none'}}
          disabled={isDisabled ? true : false}
          defaultValue={defaultValue}
        ></textarea>
    </div>
  );
};

export  {TextareaAtom};
