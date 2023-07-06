import React from "react";
import './userlogo.scss';

function UserLogo ({text}){
    return(
        <div className="container-userLogo">
            {text}
        </div>
    );

}

export {UserLogo};