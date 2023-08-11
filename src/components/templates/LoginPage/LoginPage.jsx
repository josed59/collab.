import React,{useContext} from "react";
import { LoginForm } from "@molecules/LoginForm/LoginForm";
import { Link } from "@atoms/Link/Link";
import CollabLogo from "@molecules/CollabLogo/CollabLogo";
import SpinnerMolecule from "@molecules/SpinnerMolecule/SpinnerMolecule";
import './loginPage.scss';
import { AppContext } from '@context/AppContext'; 

function LoginPage(){
    const {state} = useContext(AppContext);
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
            {state.isLoading && <SpinnerMolecule/>}
        </main>
    );

}

export {LoginPage};