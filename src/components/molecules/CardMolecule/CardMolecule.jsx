import React from "react";
import { PercentageAtom } from "@atoms/PercentageAtom/PercentageAtom";
import "./cardMolecule.scss"
 
function CardMolecule({percentage,name,alert,handler}){
    return(
        <div className="cardMolecule-container" onClick={handler}>
            <PercentageAtom alert={alert}>{percentage}</PercentageAtom>
            <section className="cardMolecule-name">
                {name}
            </section>
        </div>
    );
}

export {CardMolecule};
