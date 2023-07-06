import React from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Iconic } from "../../atoms/Iconic/iconic";
import { CardMolecule } from "@molecules/CardMolecule/CardMolecule";
import './teamMember.scss';
import { useNavigate } from "react-router-dom";

function TeamMembers(){
    const navigate = useNavigate();
    const handlerClick = ()=>{
        navigate('/newteammembers');
    }
    const handlerClickCard = (member)=>{
        navigate(`/member/${member}`);
    }
    return(
        <>
            <section className="teamMember-header"> 
                <HeadingAtom level={1}>Team Membres</HeadingAtom>
                
                <div className="new-search-container">
                    <div className="new-item">
                        <HeadingAtom level={3}>New</HeadingAtom> 
                        <Iconic icon="Add" action={handlerClick}/>
                    </div>
                    <div className="search-item">
                        <Input
                            type="text"
                            placeholder="Search..."
                            inputId="searchTeamMember"
                        />
                    </div>
                </div>
            </section>
            <section className="teamMember-body">
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                    handler={()=>{handlerClickCard('Jose')}}
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
                <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                />
            </section>
        </>
    );
}

export {TeamMembers};