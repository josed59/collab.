import React,{useEffect} from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Iconic } from "@atoms/Iconic/iconic";
import { Input } from "@atoms/Input/Input";
import { CardMolecule } from "@molecules/CardMolecule/CardMolecule";
import { Message } from "@atoms/Message/Message";
import { Button } from  "@atoms/Botton/Botton";
import { useParams  } from "react-router-dom";
import { useTeamMembers } from "@hooks/useTeamMembers"; 
import  useTask  from "@hooks/useTask";
import './assigntask.scss';


 
function AssignTask(){
    let { slug } = useParams();
    console.log(slug);
    const {getUserTeamMembers,teammembers,containerRef,handleInputChange} =useTeamMembers();
    const {
        handlerTeamMemberClick,
        select,
        state,
        handlerAssing
     } = useTask();

    //get Team members
    useEffect(() => {
        getUserTeamMembers(1); // Llama solo cuando el componente se monta
      }, [containerRef]);


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
                    onChange={handleInputChange}
                />
            </div>
            <div className="AssignTask-center" ref={containerRef}>
            { teammembers &&
                 teammembers.map(member => (
                    <CardMolecule
                      key={member.userId}
                      percentage={`${member.capacity} %`}
                      alert="high"
                      name={member.userName} // Usa los datos del estado local
                      handler = {()=>  handlerTeamMemberClick(member.userId) }
                      select = {member.userId === select?.userId}
                    />
                  ))  
                  
                } 
            </div>
            <div className="AssignTask-bottom">
                <form onSubmit={(event) =>handlerAssing(event,slug)}>
                    <Button type='primary' label='Assig' disable=''/> 
                </form>
            </div>
            { state.errorMessage?.message &&
                    <div>
                    <Message 
                        text = {state.errorMessage.message}
                        type = {`login ${state.errorMessage?.style}`}
                        />
                    </div>
                }

        </section>
    );
};

export {AssignTask};
