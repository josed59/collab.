import React from "react";
import './tooltipsAtoms.scss';

export default function TooltipsAtoms ({children,text}) {
    return(
        <div className="tooltip">
            
            {children}
            <span className="tooltiptext">{text}</span>
         </div>
    );
};