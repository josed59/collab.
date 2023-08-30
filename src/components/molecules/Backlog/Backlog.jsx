import React,{useEffect} from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Iconic } from "@atoms/Iconic/iconic";
import { CardTaskMolecule } from "@molecules/CardTaskMolecule/CardTaskMolecule";
import {FilterMolecule} from "@molecules/FilterMolecule/FilterMolecule";
import './backlog.scss';
import { useNavigate } from "react-router-dom";
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
        handlerTask
     } = useTask();
     const data = state.data?.tasks;
    const navigate =  useNavigate();
    const handlerAdd =() => {
        navigate('/backlognewtask');
    }
 

    useEffect(() => {
        console.log("use effect");
        getAllStates();
        getTasks(1);
      }, [containerRef]);

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
            { data &&
                 data.map(task => (
                    
                      <CardTaskMolecule 
                        key={task.taskId}
                         taskTitle={task.title}
                         description={task.description}
                         state={task.item}
                         size={task.taskSizeName}
                         beginDate={task.from}
                         dueDate={task.to}
                         color={task.color}
                         name={task.assign === 'Unassigned' ?'': getValueUntilFirstSpace(task.assign)}
                         handlerTask = {()=>handlerTask(task.taskId)}
                         nameicon = {task.assign}
                     />
                  ))  
                  
                } 
            </div>
        </section>
    );

}

export {Backlog};