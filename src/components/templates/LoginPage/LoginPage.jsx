import React from "react";
import { LoginForm } from "@molecules/LoginForm/LoginForm";
import { Link } from "@atoms/Link/Link";
import CollabLogo from "@molecules/CollabLogo/CollabLogo";
import './loginPage.scss';


function LoginPage(){
    return(
        <main className="main-login">
            <section className="container-login">
                <CollabLogo />
                <LoginForm />
                <div className="link-pass">
                    <Link 
                    text='Forgot your password'
                    color='red'
                    action='#'
                    />
                </div>
            </section>
        </main>
    );

}

export {LoginPage};