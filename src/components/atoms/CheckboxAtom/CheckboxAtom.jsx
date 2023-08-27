import React from 'react';
import './checkboxAtom.scss'

const CheckboxAtom = ({ label, idCheck }) => {
  return (
    <div className='checkAtom-container'>
      <label htmlFor={idCheck}>{label}</label>
      <input type="checkbox" id={idCheck} name={idCheck} />
    </div>
  );
};

export {CheckboxAtom};