import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { PercentageAtom } from "@atoms/PercentageAtom/PercentageAtom";
import { CardTaskMolecule } from "@molecules/CardTaskMolecule/CardTaskMolecule";
import { Button } from "@atoms/Botton/Botton";
import { Message } from "@atoms/Message/Message";

import  useMemberBacklog  from "@hooks/useMemberBacklog";
import './memberBacklog.scss';

function MemberBacklog(){
    const {slug} = useParams();
    const {apiCall,Utils,member,handler} = useMemberBacklog();
    const data = Utils.state.data?.tasks;


    useEffect(()=>{
        console.log('memberBacklog primer use effect')
        apiCall.getUser(slug);
        Utils.clearData();
        apiCall.getTasks(1,null,null,null,true,slug);
    },[]);


    return(
        <section className="memberBacklog-container">
            <div className="memberBacklog-header">
                <div className="memberBacklog-header-top">
                    <div className="percentage">
                        <PercentageAtom alert={member?.teammember.color}>{member?.teammember.capacity}%</PercentageAtom>
                    </div>
                    <div className="tittle">
                        <HeadingAtom level={1}>Team Membres</HeadingAtom>
                        <HeadingAtom level={2}>{`Assign ${member?.teammember.userName}`}</HeadingAtom>
                    </div>
                </div>
                <div className="search">
                    <Input
                        type="text"
                        placeholder="Search..."
                        inputId="searchTeamMember"
                        module="Search"
                        onChange={handler.handleInputChange}
                    />
                </div>

            </div>
            <div className="memberBacklog-center" ref={Utils.containerRef}>
            {data && Array.isArray(data) && data.length > 0 ? (
                data.map((task) => (
                    <CardTaskMolecule
                    key={task.taskId}
                    taskTitle={task.title}
                    description={task.description}
                    state={task.item}
                    size={task.taskSizeName}
                    beginDate={task.from}
                    dueDate={task.to}
                    color={task.color}
                    name={task.assign === 'Unassigned' ? '' : Utils.getValueUntilFirstSpace(task.assign)}
                    nameicon={task.assign}
                    handler={() => { handler.handlerAssing(task.taskId) }}
                    select = {Utils.select.includes(task.taskId)}
                    />
                ))
                ) : (
                // Puedes mostrar un mensaje o componente alternativo si no hay datos
                <p>No hay datos disponibles.</p>
                )}
                {/* <CardTaskMolecule 
                    taskTitle="Jupiter Express"
                    description="Engage Jupiter express for outer solar system"
                    state="Ingresado"
                    size="M"
                    beginDate="13-06-2023"
                    dueDate="13-07-2023"
                    color="state-black"
                 /> */}
            </div>
            <div className="memberBacklog-bottom">
                <form onSubmit={(event) => handler.handlerAssingTaks(event,slug)}>
                    <Button type='primary' label='Assign' disable={''}/> 
                </form>
            </div>

            { Utils.state.errorMessage?.message &&
                    <div>
                    <Message 
                        text = {Utils.state.errorMessage.message}
                        type = {`login ${Utils.state.errorMessage?.style}`}
                        />
                    </div>
                }
        </section>
    );
}

export {MemberBacklog};