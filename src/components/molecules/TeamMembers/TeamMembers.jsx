import React , {useEffect} from  "react";
import { HeadingAtom } from "@atoms/HeadingAtom/HeadingAtom";
import { Input } from "@atoms/Input/Input";
import { Iconic } from "../../atoms/Iconic/iconic";
import { CardMolecule } from "@molecules/CardMolecule/CardMolecule";
import './teamMember.scss';
import { useNavigate } from "react-router-dom";
import { useTeamMembers } from "@hooks/useTeamMembers";



function TeamMembers(){
    const navigate = useNavigate();
    const {getUserTeamMembers,teammembers,containerRef,handleInputChange} =useTeamMembers();
    //const {  loading, containerRef } = useInfiniteScroll();
   

    const handlerClick = ()=>{
        navigate('/newteammembers');
    }
    const handlerClickCard = (member)=>{
        navigate(`/member/${member}`);
    }

    //get Team members
    useEffect(() => {
        getUserTeamMembers(1); // Llama solo cuando el componente se monta
      }, []);



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
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </section>
            <section className="teamMember-body" ref={containerRef}>
                { teammembers &&
                 teammembers.map(member => (
                    <CardMolecule
                      key={member.userId}
                      percentage={`${member.capacity} %`}
                      alert="high"
                      name={member.userName} // Usa los datos del estado local
                      handler={() => handlerClickCard(member.userId)}
                    />
                  ))  
                  
                } 
                
                {/* <CardMolecule 
                    percentage="60%"
                    alert="high"
                    name="Jose"
                    handler={()=>{handlerClickCard('Jose')}}
                /> */}
              
            </section>
        </>
    );
}

export {TeamMembers};