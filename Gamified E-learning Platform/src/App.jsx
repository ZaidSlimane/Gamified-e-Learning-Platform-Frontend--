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


function App() {
    // const { unityProvider,sendMessage  } = useUnityContext({
    //     loaderUrl: "../public/quizGame/Build/quizGame.loader.js",
    //     dataUrl: "../public/quizGame/Build/quizGame.data",
    //     frameworkUrl: "../public/quizGame/Build/quizGame.framework.js",
    //     codeUrl: "../public/quizGame/Build/quizGame.wasm",
    // });
    // const handleClickStartGame = () => {
    //     sendMessage("GameController", "StartGameWithStudentId", "4");
    // };
    return (

        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/courses/:courseId" element={<EnrollPage/>}/>
                <Route path="/courses/:courseId/chapter/:chapterId" element={<ChapterPage/>}/>
                <Route path="/question" element={<LeaveQuestionPage/>}/>
            </Routes>
        </Router>
        // <div>
        //     <Unity unityProvider={unityProvider} />
        //     <button onClick={handleClickStartGame}>Start Game</button>
        // </div>

    );
}

export default App;
