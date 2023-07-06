import React,{ useRef } from "react";
import { Input } from "@atoms/Input/Input";
import { Button } from "@atoms/Botton/Botton";
import { Message } from "@atoms/Message/Message";
import {useLogin} from "@hooks/useLogin"

import './loginForm.scss';


function LoginForm(){
    const formRef = useRef(null);
    const { login, loading, error } = useLogin();
    
    const handlerOnSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const credentials = {
          username: formData.get('email'),
          password: formData.get('pass')
        };
        login(credentials);
    };

    const style = error ? 'error' : '';
    const styleLoding = loading ? 'disable' : '';


    return(
        <form ref={formRef} className="LoginForm" onSubmit={handlerOnSubmit}>
        <div>
            <Input 
            inputId="email"
            label="User or Email"
            type='text'
            placeholder="Ejemplo@correo.com"
            error = {style}
        />
        </div>
        <div>
          <Input 
            inputId="pass"
            label="Password"
            type='password'
            placeholder="***********"
            error = {style}
        />
        </div>
        { error &&
            <div>
            <Message 
                text = "User / Email or Password do not match"
                type = "login"
                />
            </div>
        }
        <div>
            <Button type='primary' label='Log in' disable={styleLoding}/> 
        </div>
        
        </form>
    );
}

export {LoginForm}