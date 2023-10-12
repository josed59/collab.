import React, { useRef,useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Iconic } from "@atoms/Iconic/iconic";
import { TextareaAtom } from "@atoms/TextareaAtom/TextareaAtom";
import {DropdownAtom} from "@atoms/DropdownAtom/DropdownAtom";
import { CheckboxAtom } from "@atoms/CheckboxAtom/CheckboxAtom";
import { Button } from  "@atoms/Botton/Botton";
import {DatepickerMolecule} from "@molecules/DatepickerMolecule/DatepickerMolecule";
import { Message } from "@atoms/Message/Message";
import MessageModal from "@molecules/MessageModal";
import TooltipsAtoms from "@atoms/TooltipsAtoms/";
import './editBacklog.scss';
import { useNavigate } from "react-router-dom";
import  useTask  from "@hooks/useTask";
import  useEditBacklog  from "@hooks/useEditBacklog";
 

function Editbacklog(){
    const {dataDropdown,
           getTaskSizes,
    } = useTask();
    const {
        state,
        getTasks,
        parseDate,
        handlerOnSubmit,
        refEditTask,
        handlerIcon,
        onDelteConfirmation
    } = useEditBacklog();
    const {slug} = useParams();
    //Variable to show modal
    const [showModal, setShowModal] = useState(false);
    
    // Función para abrir el modal
    const openModal = () => {
        setShowModal(true);
    };
    
    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    }



    useEffect(() => {
        getTaskSizes();
        getTasks(slug);
      }, []);


      const from = state.data?.tasks?.from ?  parseDate(state.data?.tasks?.from) : null; 
      const toDate = state.data?.tasks?.to ?  parseDate(state.data?.tasks?.to) : null; 


    return(
        <section className="Editbacklog-container">
        <div className="Editbacklog-header">
            <div className="Editbacklog-header-title">
                 <HeadingAtom level={1}>Backlog</HeadingAtom>
            </div>
            <div className="Editbacklog-header-subtitle">
                <HeadingAtom level={2}>{state.data?.tasks?.title}</HeadingAtom>
                <span className={`Editbacklog ${state.data?.tasks?.color}`} >{state.data?.tasks?.item}</span>
                <TooltipsAtoms text='Assing Task'>
                    <Iconic icon="task" action={() =>handlerIcon('edit',slug)}/>
                </TooltipsAtoms>
                {(state.data?.tasks?.userTest === true && state.data?.tasks?.qaDate === null ) && (
                    <TooltipsAtoms text='QA'>
                        <Iconic icon="qa" action={() => handlerIcon('qa', slug)} />
                    </TooltipsAtoms>
                )}
                <TooltipsAtoms text='Close'>
                    <Iconic icon="check" action={() =>handlerIcon('check',slug)}/>
                </TooltipsAtoms>
                <TooltipsAtoms text="Delete">
                            <Iconic icon="delete" action={openModal}/>
                </TooltipsAtoms>
            </div>
        </div>
        <div className="Editbacklog-center">
            <form ref={refEditTask} className="EditbacklogForm" id="EditbacklogForm"  onSubmit={(event) => handlerOnSubmit(event,slug)}>
                    <div>
                        <TextareaAtom 
                            inputId="description"
                            className=""
                            placeholder="Brief Task Description"
                            label="Description"
                            isDisabled = 'true'
                            defaultValue = {state.data?.tasks?.description}
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
                            fromDate={from}
                            toDate = {toDate}
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
                            selectedValue = {state.data?.tasks?.taskSizeId}
                        />
                    </div>
                    <CheckboxAtom 
                        label="Stand By"
                        idCheck="isStandBy"
                        checked = {state.data?.tasks?.taskStateName === 'StandBy'}
                    />
                    { state.errorMessage &&
                    <div>
                    <Message 
                        text = {state.errorMessage?.message}
                        type = {`login ${state.errorMessage?.style}`}
                        />
                    </div>
                     }
                    <div>
                        <Button type='primary' label='Update' disable=''/> 
                    </div>
                    
            </form>
        </div>
        <div className="Editbacklog-bottom"></div>
        //Modal 
        {showModal && 
            <MessageModal 
                onClose = {closeModal}  
                isOpen ={showModal}
                messageText={`Do you really want to delete task "${state.data?.tasks?.title}"?`}
                messageTitle="Confirm"
                onConfirm={()=>onDelteConfirmation(slug,state.user?.email)}
                />
        }


    </section>
    );
};

export {Editbacklog};