import React,{useRef} from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { TextareaAtom } from "@atoms/TextareaAtom/TextareaAtom";
import {DatepickerMolecule} from "@molecules/DatepickerMolecule/DatepickerMolecule";
import { Button } from  "@atoms/Botton/Botton";


import './qaTask.scss'

function QaTask (){
    const refqatask = useRef();
    const handlerOnSubmit = (e) => {
        e.preventDefault;
    };
    return(
        <section className="qatask-container">
            <div className="qatask-header-title">
                 <HeadingAtom level={1}>Backlog</HeadingAtom>
            </div>
            <div className="qatask-header-subtitle">
                <HeadingAtom level={2}>Juppiter Espress</HeadingAtom>
                <span className={`qatask`} >User Test</span>
            </div>
            <div className="qatask-center">
            <form ref={refqatask} className="EditbacklogForm" id="EditbacklogForm"  onSubmit={handlerOnSubmit}>
                    <div className="Backlog-date">
                        <DatepickerMolecule 
                            idDatefrom="closedate"
                            titlefrom="Close"
                            placeholderfrom="Date"
                            isOnlyFrom={true}
                        />
                    </div>
                    <div>
                        <TextareaAtom 
                            inputId="closecomment"
                            className=""
                            placeholder="Comments..."
                            label="Comment"
                        />
                    </div>
                    { /* error &&
                        <div>
                        <Message 
                            text = "User / Email or Password do not match"
                            type = "login"
                            />
                        </div> */
                    }
                    <div className="EditbacklogForm-button">
                        <Button type='primary' label='Update' disable=''/> 
                    </div>
                    
            </form>
            </div> 
        </section>
    );
}

export {QaTask};