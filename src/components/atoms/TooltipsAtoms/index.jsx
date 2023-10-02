import React,{useState} from "react";
import './tooltipsAtoms.scss';

export default function TooltipsAtoms ({children,text}) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const handleOpenTooltip = () => {
      setIsTooltipVisible(true);
    };
  
    const handleCloseTooltip = () => {
      setIsTooltipVisible(false);
    };
  
    return(
        <div className="tooltip" onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
            
            {children}
            <span className="tooltiptext" style={{ visibility: isTooltipVisible ? 'visible' : 'hidden' }}>
                {text}
            </span>
         </div>
    );
};