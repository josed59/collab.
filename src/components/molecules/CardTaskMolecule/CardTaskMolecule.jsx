import React from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Iconic } from "@atoms/Iconic/iconic";
import "./cardTaskMolecule.scss"
 
function CardTaskMolecule ({taskTitle,state,handler,size,beginDate, dueDate,description,color,name,handlerTask,nameicon}){

    return(
        <div className="carTaskdMolecule-container" onClick={handler}>
            <div className="top">
                <div className="top-left">
                    <HeadingAtom level={2}>{taskTitle}</HeadingAtom>
                    <span className="size">{size}</span>
                </div>
                <div className="top-right">
                    <span className={`state ${ color ? color : ''}` }>{state}</span>
                </div>
            </div>
            <div className="center">
                <span className="description">{description}</span>
            </div>
            <div className="bottom">
                <div className="bottom-top">
                    <span className="tittle_date">Fecha Plan</span>
                </div>
                <div className="date-assing-contend">
                    <div className="bottom-center">
                        <div className="bottom-left">
                            <span className="begin-date">Begin Date: {beginDate}</span>
                            <span className="due-date">Due Date: {dueDate}</span>
                        </div>
                    </div>
                        <div className="bottom-right">
                            <span> 
                                {
                                    nameicon !=='Unassigned' ? nameicon : <Iconic icon="task" action={handlerTask}/>
                                }
                            </span>
                        </div>
                </div>

            </div>
        </div>
    );
}

export {CardTaskMolecule};