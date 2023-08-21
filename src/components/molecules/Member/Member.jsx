import React  from "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Iconic } from "@atoms/Iconic/iconic";
import { PercentageAtom } from "@atoms/PercentageAtom/PercentageAtom";
import { CardTaskMolecule } from "@molecules/CardTaskMolecule/CardTaskMolecule";
import { useParams,useNavigate } from "react-router-dom";
import './member.scss';
import { FilterMolecule } from "@molecules/FilterMolecule/FilterMolecule";


function Member(){
    const {slug} = useParams();
    const navigate = useNavigate();
    const actionAssing = () =>{
        navigate(`/assign/${slug}`);
    }

    return(
        <section className="Member-header"> 
                <HeadingAtom level={1}>Team Membres</HeadingAtom>
                <div className="status-assing-container">
                    <div className="information">
                        <PercentageAtom alert="high">100%</PercentageAtom>
                        <HeadingAtom level={2}>{slug}</HeadingAtom>
                    </div>
                    <div className="assing">
                        <HeadingAtom level={3}>Assing:</HeadingAtom>
                        <Iconic icon="task" action={actionAssing}/>
                    </div>
                    <div className="search-item">
                        <Input
                            type="text"
                            placeholder="Search..."
                            inputId="searchTeamMember"
                            module="Search"
                            />
                    </div>
                    {/* <div className="new-item">
                        <HeadingAtom level={3}>filter:</HeadingAtom> 
                        <Iconic icon="arrow" action={toggleFilter}/>
                    </div> */}
                    <div className="memberFilter-container">
                        <FilterMolecule/>
                    </div>
                </div>
                <section className="cardTask-container">
                    <CardTaskMolecule 
                        taskTitle="Jupiter Express"
                        description="Engage Jupiter express for outer solar system"
                        state="Retrasado"
                        size="M"
                        beginDate="13-06-2023"
                        dueDate="13-07-2023"
                        color="state-red"
                        name={slug}
                    />
                    <CardTaskMolecule 
                        taskTitle="Jupiter Express"
                        description="Engage Jupiter express for outer solar system"
                        state="En Curso"
                        size="M"
                        beginDate="13-06-2023"
                        dueDate="13-07-2023"
                        color="state-green"
                        name={slug}
                    />
                    <CardTaskMolecule 
                        taskTitle="Jupiter Express"
                        description="Engage Jupiter express for outer solar system"
                        state="Finalizado"
                        size="M"
                        beginDate="13-06-2023"
                        dueDate="13-07-2023"
                        color="state-blue"
                        name={slug}
                    />
                     <CardTaskMolecule 
                        taskTitle="Jupiter Express"
                        description="Engage Jupiter express for outer solar system"
                        state="En Fila"
                        size="M"
                        beginDate="13-06-2023"
                        dueDate="13-07-2023"
                        color="state-black"
                        name={slug}
                    />
                </section>
                
              
                
        </section>
    );
}

export {Member};
