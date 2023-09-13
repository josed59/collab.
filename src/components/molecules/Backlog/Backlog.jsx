import React,{useEffect} from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Iconic } from "@atoms/Iconic/iconic";
import { CardTaskMolecule } from "@molecules/CardTaskMolecule/CardTaskMolecule";
import {FilterMolecule} from "@molecules/FilterMolecule/FilterMolecule";
import './backlog.scss';
import  useTask  from "@hooks/useTask";



function Backlog(){
    const {
        dataDropdown,
        getTasks,
        getAllStates,
        OnClickFilter,
        state,
        getValueUntilFirstSpace,
        containerRef,
        handleInputChange,
        handlerTask,
        handlerAdd,
        handlerToEditTask,
        clearData
     } = useTask();
     const data = state.data?.tasks;

    
    useEffect(() => {
        console.log("use effect backlog")
        getAllStates();
        getTasks(1);
        clearData();
      }, []);

 

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
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="backlog-filter">
                            <FilterMolecule
                                itemsData = {dataDropdown}
                                action = {OnClickFilter}
                            />
                        </div>
                    </div>
                    <div className="new">
                        <p>Add</p>
                        <Iconic icon="Add" action={handlerAdd}/>
                    </div>
                </div>
            </div>
            <div className="backlog-center-container" ref={containerRef} >
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
                    name={task.assign === 'Unassigned' ? '' : getValueUntilFirstSpace(task.assign)}
                    handlerTask={(event) => handlerTask(task.taskId, event)}
                    nameicon={task.assign}
                    handler={() => { handlerToEditTask(task.taskId) }}
                    />
                ))
                ) : (
                // Puedes mostrar un mensaje o componente alternativo si no hay datos
                <p>No hay datos disponibles.</p>
                )}
            </div>
        </section>
    );

}

export {Backlog};