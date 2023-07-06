import React from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Iconic } from "@atoms/Iconic/iconic";
import { Input } from "@atoms/Input/Input";
import { CardMolecule } from "@molecules/CardMolecule/CardMolecule";
import { Button } from  "@atoms/Botton/Botton";
import './assigntask.scss';


 
function AssignTask(){
    return(
        <section className="AssignTask-container">
            <div className="AssignTask-header">
                <div className="AssignTask-header-title">
                    <HeadingAtom level={1}>Team Members</HeadingAtom>
                </div>
                <div className="AssignTask-header-subtTitle">
                    <HeadingAtom level={3}>Task title</HeadingAtom>
                    <Iconic icon="task"/>
                </div>
                <Input
                    type="text"
                    placeholder="Search..."
                    inputId="searchTeamMember"
                    module="Search"
                />
            </div>
            <div className="AssignTask-center">
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
            </div>
            <div className="AssignTask-bottom">
                <Button type='primary' label='Assig' disable=''/> 
            </div>

        </section>
    );
};

export {AssignTask};
