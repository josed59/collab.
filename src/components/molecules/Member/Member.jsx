import React,{useEffect}  from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Iconic } from "@atoms/Iconic/iconic";
import { PercentageAtom } from "@atoms/PercentageAtom/PercentageAtom";
import { CardTaskMolecule } from "@molecules/CardTaskMolecule/CardTaskMolecule";
import './member.scss';
import { FilterMolecule } from "@molecules/FilterMolecule/FilterMolecule";
import  useMember  from "@hooks/useMember";
import { useParams } from "react-router-dom";

let memberData = {};

function Member(){
    const {slug} = useParams();
    const {apiCalls,Utils,member,handlers} = useMember();
    
    const data = Utils.state.data?.tasks;
    useEffect(()=>{
        apiCalls.getAllStates();
        apiCalls.getUser(slug);
        apiCalls.getTasks(1,null,'All',slug);
        Utils.clearData();
    },[]
    );


    return(
        <section className="Member-header"> 
                <HeadingAtom level={1}>Team Membres</HeadingAtom>
                <div className="status-assing-container">
                    <div className="information">
                        <PercentageAtom alert={member?.teammember.color}>{member?.teammember.capacity}%</PercentageAtom>
                        <HeadingAtom level={2}>{member?.teammember.userName}</HeadingAtom>
                    </div>
                    <div className="assing">
                        <HeadingAtom level={3}>Assing:</HeadingAtom>
                        <Iconic icon="task" action={() => handlers.actionAssing(slug)}/>
                    </div>
                    <div className="search-item">
                    <Input
                            type="text"
                            placeholder="Search..."
                            inputId="searchTeamMember"
                            module="Search"
                            onChange={handlers.handleInputChange}
                            />
                    </div>
                    {/* <div className="new-item">
                        <HeadingAtom level={3}>filter:</HeadingAtom> 
                        <Iconic icon="arrow" action={toggleFilter}/>
                    </div> */}
                    <div className="memberFilter-container">
                    <FilterMolecule
                                itemsData = {Utils.dataDropdown}
                                action = {Utils.OnClickFilter}
                            />
                    </div>
                </div>
                <section className="cardTask-container" ref={Utils.containerRef}>
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
                        handler={() => { handlers.handlerToEditTask(task.taskId) }}
                        />
                    ))
                    ) : (
                    // Puedes mostrar un mensaje o componente alternativo si no hay datos
                    <p>No hay datos disponibles.</p>
                )}
                </section>
                
              
                
        </section>
    );
}

export {Member};
