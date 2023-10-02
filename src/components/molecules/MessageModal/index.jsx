import React from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Iconic } from "@atoms/Iconic/iconic";
import { Button } from  "@atoms/Botton/Botton";
import ModalAtom from  "@atoms/ModalAtom";

import './MessageModal.scss';

export default function MessageModal ({ onClose,isOpen,messageText,messageTitle,onConfirm }) {

      
   
    return(
        <ModalAtom isOpen={isOpen}>
            <section className="moleculeContainer">
                 <div className="header">
                    <Iconic icon="exit" action={onClose}/>
                    <HeadingAtom level={1}>{messageTitle}</HeadingAtom>
                </div>
                <div className="body">
                    <HeadingAtom level={2}>{messageText}</HeadingAtom>
                </div>
                <div className="bottom_molecule">
                    <Button type='primary' label='Cancel' disable='' handler={onClose}/> 
                    <Button type='primary' label='Ok' disable=''handler={onConfirm}/> 

                    
                </div> 
            </section>
        </ModalAtom>
    );


}