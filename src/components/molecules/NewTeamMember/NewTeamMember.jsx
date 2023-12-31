import React, { useRef,useState,useContext } from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Button } from "@atoms/Botton/Botton";
import { Message } from "@atoms/Message/Message";
import {useTeamMembers} from "@hooks/useTeamMembers";
import { AppContext } from '@context/AppContext'; 


import './newTeamMember.scss';

function NewTeamMember(){
    const {state} = useContext(AppContext);
    const {insertNewTeamMember,handlerOnSubmit} =useTeamMembers();
    const formRef = useRef();
    /*  ({styleName: '',
    styleEmail: '',
    });
    
   const validarEmail= (email) => {
        // Expresión regular para validar el formato de email
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
      

    const handlerOnSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const newUser = {
            Email: formData.get('Email'),
            Name: formData.get('Name').trim(),
        };
        
    
        if(!newUser.Email || 
            !newUser.Name ){
            setError({
                ...error,
                styleName: 'error',
                styleEmail: 'error',
                message:'All fields must be completed.'
            })
            return
        }
        if(!validarEmail(newUser.Email)){

            setError({
                ...error,
                styleName: '',
                styleEmail: 'error',
                message:'Invalid email address'
            })
            return
        }
        //createUser(newUser);
    }; */
   

    return(
        <div className="newTeamMember-container">
            <section className="newTeamMember-header"> 
                <HeadingAtom level={1}>Team Members</HeadingAtom>
                <HeadingAtom level={2}>New</HeadingAtom> 
            </section>
            <form ref={formRef} className="newMemberForm" onSubmit={(event) => handlerOnSubmit(event,formRef)}>
                <div>
                    <Input 
                    inputId="Name"
                    label="Name"
                    type='text'
                    placeholder="Veronica Salazar"
                    error = {state.data?.styleName}
                />
                </div>
                <div>
                <Input 
                    inputId="Email"
                    label="Email"
                    type='text'
                    placeholder="email@example.com"
                    error = {state.data?.styleEmail}
                />
                </div>
                { state.data?.message &&
                    <div>
                    <Message 
                        text = {state.data.message}
                        type = {`login ${state.data?.style}`}
                        />
                    </div>
                }
                <div>
                </div>
                <div>
                    <Button type='primary' label='Create' disable={''}/> 
                </div>
                
            </form>
        </div>
    );
}

export {NewTeamMember};