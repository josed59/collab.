import React,{useEffect} from "react";
import { createPortal } from 'react-dom';
import './modalAtom.scss';

export default function ModalAtom({children,isOpen}){

    
    
    /* Define the node where to render */
    const modal = document.getElementById('modal');

    // Agregar la clase al cuerpo de la página cuando el modal está abierto
     useEffect(() => {
        console.log("modal effect",isOpen)
        if (isOpen) {
        modal.classList.add('modal-open');
        } else {
            modal.classList.remove('modal-open');
        }
        return () => {
            modal.classList.remove('modal-open');
          };
    }, [isOpen]);
    
    return(
        <div className="modalBody">
            {createPortal(
                children
                ,modal
            )}
        </div>
    );
    
}
