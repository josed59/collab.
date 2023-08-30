import React, { useState } from "react";
import { PercentageAtom } from "@atoms/PercentageAtom/PercentageAtom";
import "./cardMolecule.scss"
 
function CardMolecule({percentage,name,alert,handler,select}){
   
    return(
        <div className={`cardMolecule-container ${select ? "select" : ""}` } onClick={handler}>
            <PercentageAtom alert={alert}>{percentage}</PercentageAtom>
            <section className="cardMolecule-name">
                {name}
            </section>
        </div>
    );
}

export {CardMolecule};
