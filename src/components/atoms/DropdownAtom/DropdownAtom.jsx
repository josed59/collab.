import React from "react";
import './dropdownAtom.scss';

function DropdownAtom({data,idDropdown,label}){

    if(!data || data.length === 0 ) {
        return <div>No hay datos disponibles para mostrar.</div>;
      }

    return(
        <div className="dropdownAtom-container">
            <label htmlFor={idDropdown}>{label}</label>
            <select id={idDropdown} name={idDropdown}>
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