import React from "react";
import { useParams } from "react-router-dom";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { PercentageAtom } from "@atoms/PercentageAtom/PercentageAtom";
import { CardTaskMolecule } from "@molecules/CardTaskMolecule/CardTaskMolecule";
import { Button } from "@atoms/Botton/Botton";


import './memberBacklog.scss';

function MemberBacklog(){
    const {slug} = useParams();
    return(
        <section className="memberBacklog-container">
            <div className="memberBacklog-header">
                <div className="memberBacklog-header-top">
                    <div className="percentage">
                        <PercentageAtom alert="high">100%</PercentageAtom>
                    </div>
                    <div className="tittle">
                        <HeadingAtom level={1}>Team Membres</HeadingAtom>
                        <HeadingAtom level={2}>{`Assign ${slug}`}</HeadingAtom>
                    </div>
                </div>
                <div className="search">
                    <Input
                        type="text"
                        placeholder="Search..."
                        inputId="searchTeamMember"
                        module="Search"
                    />
                </div>

            </div>
            <div className="memberBacklog-center">
                <CardTaskMolecule 
                    taskTitle="Jupiter Express"
                    description="Engage Jupiter express for outer solar system"
                    state="Ingresado"
                    size="M"
                    beginDate="13-06-2023"
                    dueDate="13-07-2023"
                    color="state-black"
                 />
            </div>
            <div className="memberBacklog-bottom">
                <Button type='primary' label='Assign' disable={''}/> 
            </div>
        </section>
    );
}

export {MemberBacklog};