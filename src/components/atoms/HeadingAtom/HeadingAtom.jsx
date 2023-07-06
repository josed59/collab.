import React from "react";
import './headingAtom.scss';

function HeadingAtom({level,children}){
    const Tag = `h${level}`;
    return(
       <Tag className={`heading-h${level}`}>{children}</Tag>
    );

}

export {HeadingAtom};