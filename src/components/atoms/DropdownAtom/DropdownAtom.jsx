import React, {useState} from "react";
import './dropdownAtom.scss';

function DropdownAtom({data,idDropdown,label,selectedValue}){

    const [value, setValue] = useState(""); // Estado para almacenar el valor seleccionado
    if(!data || data.length === 0 ) {
        return <div>No hay datos disponibles para mostrar.</div>;
      }

    return(
        <div className="dropdownAtom-container">
            <label htmlFor={idDropdown}>{label}</label>
            <select 
                id={idDropdown} 
                name={idDropdown} 
                value={value === "" ? selectedValue : value}
                onChange={(e) => {
                    setValue(e.target.value);
                  }}
                >
                {data.map((item, index) => (
                <option key={index} value={item.valor}>
                    {item.nombre}
                </option>
                ))}
            </select>
        </div>
    );


};

export {DropdownAtom};