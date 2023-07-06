import React, { useRef } from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Iconic } from "@atoms/Iconic/iconic";
import { TextareaAtom } from "@atoms/TextareaAtom/TextareaAtom";
import {DropdownAtom} from "@atoms/DropdownAtom/DropdownAtom";
import { Button } from  "@atoms/Botton/Botton";
import {DatepickerMolecule} from "@molecules/DatepickerMolecule/DatepickerMolecule";
import './editBacklog.scss';
import { useNavigate } from "react-router-dom";
 
const dataDropdown = [
    { valor: '1', nombre: 'S' },
    { valor: '2', nombre: 'M' },
    { valor: '3', nombre: 'L' },
    { valor: '4', nombre: 'XL' },
  ];

function Editbacklog(){
    const refEditTask = useRef();
    const navigate = useNavigate();
    const handlerOnSubmit = (e) => {
        e.preventDefault;
    };
    const handlerIcon = (type,idTask) =>{
        (type==='qa') ? navigate(`/qatask/${idTask}`) : navigate(`/closetask/${idTask}`);
    }
    const status = 'red';
    return(
        <section className="Editbacklog-container">
        <div className="Editbacklog-header">
            <div className="Editbacklog-header-title">
                 <HeadingAtom level={1}>Backlog</HeadingAtom>
            </div>
            <div className="Editbacklog-header-subtitle">
                <HeadingAtom level={2}>Juppiter Espress</HeadingAtom>
                <span className={`Editbacklog ${status}`} >Retrasado</span>
                <Iconic icon="qa" action={() =>handlerIcon('qa',1)}/>
                <Iconic icon="check" action={() =>handlerIcon('check',1)}/>
            </div>
        </div>
        <div className="Editbacklog-center">
            <form ref={refEditTask} className="EditbacklogForm" id="EditbacklogForm"  onSubmit={handlerOnSubmit}>
                    <div>
                        <TextareaAtom 
                            inputId="description"
                            className=""
                            placeholder="Brief Task Description"
                            label="Description"
                            isDisabled = 'true'
                            defaultValue = 'Engage Jupiter Express for outer solar system.'
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
                        <TextareaAtom 
                            inputId="comment"
                            className=""
                            placeholder="Comments..."
                            label="Comment"
                        />
                    </div>
                    <div>
                        <DropdownAtom 
                            data={dataDropdown}
                            idDropdown="sizeid"
                            label="Size"
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
                    <div>
                        <Button type='primary' label='Update' disable=''/> 
                    </div>
                    
            </form>
        </div>
        <div className="Editbacklog-bottom"></div>


    </section>
    );
};

export {Editbacklog};