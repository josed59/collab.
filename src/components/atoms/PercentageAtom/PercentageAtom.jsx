import React from "react";
import './percentageAtom.scss';

function PercentageAtom({children,alert}){
    return(
        <div className={`PercentageAtom_container alert-${alert}`}>
            <div className="PercentageAtom_capacity">
                {children}
            </div>
        </div>
    );
};

export {PercentageAtom};