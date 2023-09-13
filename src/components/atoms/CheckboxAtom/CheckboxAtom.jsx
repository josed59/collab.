import React,{useState,useEffect} from 'react';
import './checkboxAtom.scss'

const CheckboxAtom = ({ label, idCheck ,checked}) => {


  const [isChecked, setIsChecked] = useState(checked === undefined ? true : checked);

  useEffect(() => {
    setIsChecked(checked === undefined ? true : checked);
  }, [checked]);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); 
  };
  
  return (
    <div className='checkAtom-container'>
      <label htmlFor={idCheck}>{label}</label>
      <input 
      type="checkbox" 
      id={idCheck} 
      name={idCheck}  
      checked={isChecked} 
      onChange={handleCheckboxChange} 
      />
    </div>
  );
};

export {CheckboxAtom};