import React from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Iconic } from "@atoms/Iconic/iconic";
import { CardTaskMolecule } from "@molecules/CardTaskMolecule/CardTaskMolecule";
import {FilterMolecule} from "@molecules/FilterMolecule/FilterMolecule";
import './backlog.scss';
import { useNavigate } from "react-router-dom";

function Backlog(){
    const navigate =  useNavigate();
    const handlerAdd =() => {
        navigate('/backlognewtask');
    }
    const handlerTask = (taskid) =>{
        navigate(`/assigntask/${taskid}`);
    }

    return(
        <section className="backlog-container">
            <div className="backlog-header">
                <div className="tittle">
                    <HeadingAtom level={1}>Backlog</HeadingAtom>
                </div>
                <div className="backlog-bottom">
                    <div className="search">  
                        <div className="search-item">
                        <Input
                            type="text"
                            placeholder="Search..."
                            inputId="searchTeamMember"
                            module="Search"
                            />
                        </div>
                        <div className="backlog-filter">
                            <FilterMolecule/>
                        </div>
                    </div>
                    <div className="new">
                        <p>Add</p>
                        <Iconic icon="Add" action={handlerAdd}/>
                    </div>
                </div>
            </div>
            <div className="backlog-center-container">
                <CardTaskMolecule 
                    handler={()=>navigate(`/edittask/1`)}
                    taskTitle="Jupiter Express"
                    description="Engage Jupiter express for outer solar system"
                    state="Retrasado"
                    size="M"
                    beginDate="13-06-2023"
                    dueDate="13-07-2023"
                    color="state-red"
                    name="Cesar"
                />
                 <CardTaskMolecule 
                    taskTitle="Jupiter Express"
                    description="Engage Jupiter express for outer solar system"
                    state="Retrasado"
                    size="M"
                    beginDate="13-06-2023"
                    dueDate="13-07-2023"
                    color="state-red"
                    name="Jose"

                />
                 <CardTaskMolecule 
                    taskTitle="Jupiter Express"
                    description="Engage Jupiter express for outer solar system"
                    state="Retrasado"
                    size="M"
                    beginDate="13-06-2023"
                    dueDate="13-07-2023"
                    color="state-red"
                    name="UN"
                    handlerTask = {()=>handlerTask(1)}
                />
            </div>
        </section>
    );

}

export {Backlog};