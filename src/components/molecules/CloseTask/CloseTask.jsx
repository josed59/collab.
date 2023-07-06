import React,{useRef} from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { TextareaAtom } from "@atoms/TextareaAtom/TextareaAtom";
import {DatepickerMolecule} from "@molecules/DatepickerMolecule/DatepickerMolecule";
import { Button } from  "@atoms/Botton/Botton";


import './closeTask.scss'

function CloseTask (){
    const refcloseTask = useRef();
    const handlerOnSubmit = (e) => {
        e.preventDefault;
    };
    return(
        <section className="closetask-container">
            <div className="closetask-header-title">
                 <HeadingAtom level={1}>Backlog</HeadingAtom>
            </div>
            <div className="closetask-header-subtitle">
                <HeadingAtom level={2}>Juppiter Espress</HeadingAtom>
                <span className={`closetask`} >Close Task</span>
            </div>
            <div className="closetask-center">
            <form ref={refcloseTask} className="EditbacklogForm" id="EditbacklogForm"  onSubmit={handlerOnSubmit}>
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
                        <Button type='primary' label='Close' disable=''/> 
                    </div>
                    
            </form>
            </div> 
        </section>
    );
}

export {CloseTask};