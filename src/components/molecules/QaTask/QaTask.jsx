import React from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { TextareaAtom } from "@atoms/TextareaAtom/TextareaAtom";
import {DatepickerMolecule} from "@molecules/DatepickerMolecule/DatepickerMolecule";
import { Button } from  "@atoms/Botton/Botton";
import  useEditBacklog  from "@hooks/useEditBacklog";
import { useParams } from "react-router-dom";
import { Message } from "@atoms/Message/Message";
import './qaTask.scss'

function QaTask (){
    const {
        state,
        refEditTask,
        handlerUsertest
    } = useEditBacklog();
    const {slug} = useParams();

    
;
    return(
        <section className="qatask-container">
            <div className="qatask-header-title">
                 <HeadingAtom level={1}>Backlog</HeadingAtom>
            </div>
            <div className="qatask-header-subtitle">
                <HeadingAtom level={2}>{state.data?.tasks?.title}</HeadingAtom>
                <span className={`qatask`} >User Test</span>
            </div>
            <div className="qatask-center">
            <form ref={refEditTask} className="EditbacklogForm" id="EditbacklogForm"  onSubmit={(event) => handlerUsertest(event,slug)}>
                    <div className="Backlog-date">
                        <DatepickerMolecule 
                            idDatefrom="qadate"
                            titlefrom="Close"
                            placeholderfrom="Date"
                            isOnlyFrom={true}
                        />
                    </div>
                    <div>
                        <TextareaAtom 
                            inputId="qacomment"
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
                        <Button type='primary' label='Update' disable=''/> 
                    </div>
                    
            </form>
            </div> 
        </section>
    );
}

export {QaTask};