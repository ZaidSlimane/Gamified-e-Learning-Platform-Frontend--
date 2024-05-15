import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./views/signUp/SignUp.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import CoursesPage from "./views/coursesPage/CoursesPage.jsx";
import LandingPage from "./views/landingPage/LandingPage.jsx";
import EnrollPage from "./views/enrollPage/EnrollPage.jsx";
import ChapterPage from "./views/chapterPgae/ChapterPage.jsx";
import {Unity, useUnityContext} from "react-unity-webgl";
import LeaveQuestionPage from "./views/leaveQuestionPage/LeaveQuestionPage.jsx";
import GamePage from "./views/gamePage/GamePage.jsx";
import StudentDashboard from "./views/studentDashboard/StudentDashboard.jsx";


function App() {
    // const { unityProvider,sendMessage  } = useUnityContext({
    return (

        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/courses/:courseId" element={<EnrollPage/>}/>
                <Route path="/courses/:courseId/chapter/:chapterId" element={<ChapterPage/>}/>
                <Route path="/question/:courseId/:chapterId" element={<LeaveQuestionPage/>}/>
                <Route path="/game/:enrollmentId/:chapterId" element={<GamePage/>}/>
                <Route path="/student" element={<StudentDashboard/>}/>
            </Routes>
        </Router>


    );
}

export default App;
