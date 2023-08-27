import React, { useEffect } from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { DropdownAtom } from "@atoms/DropdownAtom/DropdownAtom";
import { CheckboxAtom } from "@atoms/CheckboxAtom/CheckboxAtom";
import { TextareaAtom } from "@atoms/TextareaAtom/TextareaAtom";
import { Button } from  "@atoms/Botton/Botton";
import { Message } from "@atoms/Message/Message";
import {DatepickerMolecule} from "@molecules/DatepickerMolecule/DatepickerMolecule";
import './backlogNew.scss';
import  useTask  from "@hooks/useTask";

/* const dataDropdown = [
    { valor: '1', nombre: 'S' },
    { valor: '2', nombre: 'M' },
    { valor: '3', nombre: 'L' },
    { valor: '4', nombre: 'XL' },
  ]; */

function BacklogNew(){
    const [dataDropdown,
           getTaskSizes,
           containerRef,
           handlerOnSubmit,
           state
        ] = useTask();


    useEffect(() => {
        console.log("use effect");
        getTaskSizes();
      }, []);
    

    return(

        <section className="backlogNew-container">
            <div className="backlogNew-header">
                <HeadingAtom level={1}>Backlog</HeadingAtom>
            </div>
            <div className="Backlog-center">
                <form ref={containerRef} className="backlogNewForm" id="backlogNewForm"  onSubmit={(event)=>handlerOnSubmit(event)}>
                <div>
                    <Input 
                    inputId="title"
                    label="Title"
                    type='text'
                    placeholder="Example Task 1"
                    error = ''
                    />
                </div>
                <div>
                    <TextareaAtom 
                        inputId="description"
                        className=""
                        placeholder="Brief Task Description"
                        label="Description"
                    />
                </div>
                <div className="Backlog-date">
                    <DatepickerMolecule 
                        idDatefrom="begindate"
                        titlefrom="From"
                        placeholderfrom="From"
                        idDateto="duendate"
                        titleto="To"
                        placeholderto="To"
                    />
                </div>
                <div>
                    <DropdownAtom 
                        data={dataDropdown}
                        idDropdown="sizeid"
                        label="Size"
                    />
                </div>
                <div>
                    <CheckboxAtom 
                        label="User Test"
                        idCheck="userTest"
                    />
                </div>
                { state.data?.message &&
                    <div>
                    <Message 
                        text = {state.data.message}
                        type = {`login ${state.data?.style}`}
                        />
                    </div>
                }
                <div>
                    <Button type='primary' label='Add' disable=''/> 
                </div>
                
                </form>
            </div>
        

        </section>
    );
 
}

export {BacklogNew};