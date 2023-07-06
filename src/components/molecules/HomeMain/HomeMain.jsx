import React from "react";
import './homemain.scss'

 function HomeMain({children}){
    return(
        <main className="mainHome">
                {children}
        </main>
    );
 }

 export {HomeMain};