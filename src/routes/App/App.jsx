import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { TeamMembers } from "@molecules/TeamMembers/TeamMembers";
import { NewTeamMember } from "@molecules/NewTeamMember/NewTeamMember";
import { Member } from "@molecules/Member/Member";
import { MemberBacklog } from "@molecules/MemberBacklog/MemberBacklog";
import { Backlog } from "@molecules/Backlog/Backlog";
import { BacklogNew } from "@molecules/BacklogNew/BacklogNew";
import { AssignTask } from "@molecules/AssignTask/AssignTask";
import { Editbacklog } from "@molecules/Editbacklog/EditBacklog";
import { CloseTask } from "@molecules/CloseTask/CloseTask";
import { QaTask } from "@molecules/QaTask/QaTask";
import { LoginPage } from '@templates/LoginPage/LoginPage';
import { MainTemplate } from '@templates/MainTemplate/MainTemplate';

import '@styles/styles.scss';



function App(){
    return(
       <HashRouter>
            <Routes>
               <Route path='/login' element={ <LoginPage />} />
                <Route path="/" element={ <MainTemplate />}>
                     <Route index  element={<Navigate to="/teammenbers" />} />
                     <Route path="/teammenbers" element={<TeamMembers />} />
                     <Route path="/newteammembers" element={<NewTeamMember />} />
                     <Route path="/member/:slug" element={<Member/>} />
                     <Route path="/assign/:slug" element={<MemberBacklog/>} />
                     <Route path="/backlog" element={<Backlog/>} />
                     <Route path="/backlognewtask" element={<BacklogNew/>} />
                     <Route path="assigntask/:slug" element={<AssignTask/>} />
                     <Route path="closetask/:slug" element={<CloseTask/>} />
                     <Route path="qatask/:slug" element={<QaTask/>} />
                     <Route path="edittask/:slug" element={<Editbacklog/>} />
                     <Route path='about' element={ <h1> about text </h1>} />
                </Route>
               <Route path='*' element={ <h1>Not Found</h1>} />
            </Routes>
       </HashRouter>
    );

}

export {App};