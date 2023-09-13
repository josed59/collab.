import React,{useRef} from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { TextareaAtom } from "@atoms/TextareaAtom/TextareaAtom";
import {DatepickerMolecule} from "@molecules/DatepickerMolecule/DatepickerMolecule";
import { Button } from  "@atoms/Botton/Botton";
import  useEditBacklog  from "@hooks/useEditBacklog";
import { useParams } from "react-router-dom";
import { Message } from "@atoms/Message/Message";

import './closeTask.scss'

function CloseTask (){
    const {
        state,
        refEditTask,
        handlerClose
    } = useEditBacklog();
    const {slug} = useParams();

    return(
        <section className="closetask-container">
            <div className="closetask-header-title">
                 <HeadingAtom level={1}>Backlog</HeadingAtom>
            </div>
            <div className="closetask-header-subtitle">
                <HeadingAtom level={2}>{state.data?.tasks?.title}</HeadingAtom>
                <span className={`closetask`} >Close Task</span>
            </div>
            <div className="closetask-center">
            <form ref={refEditTask} className="EditbacklogForm" id="EditbacklogForm"  onSubmit={(event) =>handlerClose(event,slug)}>
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
                    { state.errorMessage &&
                    <div>
                    <Message 
                        text = {state.errorMessage?.message}
                        type = {`login ${state.errorMessage?.style}`}
                        />
                    </div>
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