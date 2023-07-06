import React ,{useState}from "react";
import { NavLink,Link } from "react-router-dom";

import './menuItem.scss' ;
import { Iconic } from "@atoms/Iconic/iconic";

function MenuItem({text, to,icon,data }){
    const [isContentVisible, setIsContentVisible] = useState(false);

    const toggleContent = () => {
      setIsContentVisible(!isContentVisible);
    };

    
   return(
    <>
        <div  className="menuItem-container">
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `navlink ${ isActive ? "active" : ""}`
                }
            >
                {text}
            </NavLink>
            { icon && 
                <Iconic icon="arrow" action={toggleContent}/> 
            }
        </div>
        {isContentVisible && <div className="subMenu-container">
            { data &&
                data.map((item,index) =>(
                    <p key={index}>
                            <Link to={`member/${item.id}`}>{item.name}</Link>
                    </p>
                    )
                )     
            }
            {data && <p><Link to="/teammenbers">Ver todos</Link></p>}
        </div>}

    </>
        
    
   );
}

export {MenuItem};