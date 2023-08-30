import React, { useState } from "react";
import { Iconic } from "@atoms/Iconic/iconic";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import './filterMolecule.scss';

/* const itemsData = [
    {
        item:"En Curso",
        color:"green"
    },
    {
        item:"Retrasado",
        color:"red"
    },
    {
        item:"Finalizado",
        color:"blue"
    },
    {
        item:"En fila",
        color:"black"
    },
] */

function FilterMolecule({itemsData,action}){
    const [showfilter,setshowFilter]=useState(true);
    const toggleFilter = () =>{
        setshowFilter(!showfilter);
    }
    if (!itemsData || itemsData.length === 0) {
        return <p>Error: No hay elementos en el filtro.</p>;
      }
    return(
        <div className="FilterMolecule-container">
             <div className="new-item">
                <HeadingAtom level={3}>Filter:</HeadingAtom> 
                <Iconic icon="arrow" action={toggleFilter}/>
            </div>
            <div className={showfilter ?"noShow":"filter-container"}>
                <ul className={showfilter ? "noShow" : undefined}>
                    {itemsData.map((item, index) => (
                        <li key={index} 
                            className={item.color}
                            onClick={() => action(item.name)}
                        >{item.item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export {FilterMolecule};